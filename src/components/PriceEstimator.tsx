import React, { useState } from 'react';
import { X, Calculator, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PriceEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [budget, setBudget] = useState(state.settings.budget || 5000);

  const getCurrencySymbol = () => {
    switch (state.settings.currency) {
      case 'LKR': return 'Rs.';
      case 'INR': return '₹';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const updateItemPrice = (itemId: string, price: number) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id: itemId, updates: { estimatedPrice: price } }
    });
  };

  const updateBudget = (newBudget: number) => {
    setBudget(newBudget);
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { budget: newBudget }
    });
  };

  const totalEstimated = state.currentList?.items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0) || 0;
  const remainingBudget = budget - totalEstimated;
  const isOverBudget = totalEstimated > budget;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Price Estimator
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                state.settings.darkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Budget Overview */}
          <div className={`p-4 rounded-xl mb-6 ${
            isOverBudget 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className={`w-5 h-5 ${isOverBudget ? 'text-red-500' : 'text-green-500'}`} />
                <span className={`font-semibold ${isOverBudget ? 'text-red-800' : 'text-green-800'}`}>
                  Budget Tracker
                </span>
              </div>
              {isOverBudget && <AlertTriangle className="w-5 h-5 text-red-500" />}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="font-semibold">{getCurrencySymbol()}{budget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Total:</span>
                <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  {getCurrencySymbol()}{totalEstimated.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Remaining:</span>
                <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  {getCurrencySymbol()}{remainingBudget.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isOverBudget ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((totalEstimated / budget) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Budget Setting */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${
              state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Set Budget ({getCurrencySymbol()})
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => updateBudget(Number(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 ${
                state.settings.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-400'
                  : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
              }`}
              placeholder="Enter your budget"
            />
          </div>

          {/* Item Price List */}
          <div className="space-y-4">
            <h3 className={`font-bold ${
              state.settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Item Prices
            </h3>
            
            {state.currentList?.items.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-xl ${
                  state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${
                    state.settings.darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {item.name}
                  </span>
                  {item.quantity && (
                    <span className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={item.estimatedPrice || ''}
                  onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 ${
                    state.settings.darkMode
                      ? 'bg-gray-600 border-gray-500 text-white focus:border-emerald-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                  }`}
                  placeholder={`${getCurrencySymbol()}0.00`}
                />
              </div>
            ))}
          </div>

          {/* Quick Price Suggestions */}
          <div className="mt-6">
            <h4 className={`font-semibold mb-3 ${
              state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Quick Add Common Prices ({getCurrencySymbol()})
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 200, 500, 750, 1000].map(price => (
                <button
                  key={price}
                  onClick={() => {
                    // Add to the first item without a price
                    const itemWithoutPrice = state.currentList?.items.find(item => !item.estimatedPrice);
                    if (itemWithoutPrice) {
                      updateItemPrice(itemWithoutPrice.id, price);
                    }
                  }}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    state.settings.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCurrencySymbol()}{price}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className={`w-full py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                state.settings.darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};