import React, { useState } from 'react';
import { Check, Trash2, Camera, AlertCircle, Package, Star, Edit, Calendar, Leaf } from 'lucide-react';
import { GroceryItem as GroceryItemType } from '../types';
import { useApp } from '../context/AppContext';
import { categoryColors, priorityColors } from '../utils/categories';
import { EditItemForm } from './EditItemForm';

interface GroceryItemProps {
  item: GroceryItemType;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  const { state, dispatch } = useApp();
  const [showPhoto, setShowPhoto] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const getCurrencySymbol = () => {
    switch (state.settings.currency) {
      case 'LKR': return 'Rs.';
      case 'INR': return '₹';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE_ITEM', payload: item.id });
  };

  const deleteItem = () => {
    dispatch({ type: 'DELETE_ITEM', payload: item.id });
  };

  const getPriorityIcon = () => {
    switch (item.priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const isExpiringSoon = () => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = () => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <>
      <div className={`backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 ${
        item.completed 
          ? state.settings.darkMode
            ? 'bg-gray-800/60 border-gray-700 opacity-70'
            : 'bg-white/60 border-gray-200 opacity-70'
          : state.settings.darkMode
            ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-800/90'
            : 'bg-white/80 border-white/50 hover:bg-white/90'
      }`}>
        <div className="p-5">
          <div className="flex items-start space-x-4">
            <button
              onClick={toggleComplete}
              className={`flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                item.completed
                  ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/25'
                  : state.settings.darkMode
                    ? 'border-gray-600 hover:border-emerald-400 hover:bg-emerald-400/10'
                    : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
              }`}
            >
              {item.completed && <Check className="w-4 h-4" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-semibold text-lg ${
                      item.completed 
                        ? state.settings.darkMode
                          ? 'line-through text-gray-500'
                          : 'line-through text-gray-500'
                        : state.settings.darkMode
                          ? 'text-white'
                          : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    {getPriorityIcon()}
                    {item.isEcoFriendly && (
                      <Leaf className="w-4 h-4 text-green-500" title="Eco-friendly" />
                    )}
                    {isExpired() && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        Expired
                      </span>
                    )}
                    {isExpiringSoon() && !isExpired() && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        Expires Soon
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {item.quantity && (
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className={`text-sm font-medium ${
                          state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {item.quantity}
                        </p>
                      </div>
                    )}

                    {item.estimatedPrice && (
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${
                          state.settings.darkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {getCurrencySymbol()}{item.estimatedPrice.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {item.expiryDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className={`text-sm ${
                          isExpired() ? 'text-red-500 font-semibold' :
                          isExpiringSoon() ? 'text-yellow-600 font-semibold' :
                          state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Expires: {new Date(item.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {item.note && (
                      <p className={`text-sm italic ${
                        state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        "{item.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setShowEditForm(true)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      state.settings.darkMode
                        ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
                        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {item.photo && (
                    <button
                      onClick={() => setShowPhoto(true)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        state.settings.darkMode
                          ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700'
                          : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={deleteItem}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      state.settings.darkMode
                        ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  categoryColors[item.category] || categoryColors.Other
                }`}>
                  {item.category}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  priorityColors[item.priority]
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPhoto && item.photo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl">
            <div className="p-6">
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPhoto(false)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditItemForm 
        isOpen={showEditForm} 
        onClose={() => setShowEditForm(false)} 
        item={item}
      />
    </>
  );
};