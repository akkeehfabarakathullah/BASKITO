import React from 'react';
import { X, Sparkles, TrendingUp, Calendar, Star, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SmartSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();

  // Smart suggestions based on user history and patterns
  const getSmartSuggestions = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();
    
    // Seasonal suggestions
    const seasonalItems = {
      0: ['Oranges', 'Winter Squash', 'Hot Chocolate'], // January
      1: ['Strawberries', 'Valentine Treats', 'Heart-shaped cookies'], // February
      2: ['Spring Vegetables', 'Fresh Herbs', 'Asparagus'], // March
      3: ['Easter Ham', 'Spring Onions', 'Fresh Peas'], // April
      4: ['Strawberries', 'Spring Lettuce', 'Mother\'s Day Flowers'], // May
      5: ['Summer Fruits', 'BBQ Supplies', 'Ice Cream'], // June
      6: ['Watermelon', 'Corn on the Cob', 'Grilling Meat'], // July
      7: ['Peaches', 'Tomatoes', 'Summer Squash'], // August
      8: ['Apples', 'Back to School Snacks', 'Pumpkin'], // September
      9: ['Pumpkin', 'Halloween Candy', 'Apple Cider'], // October
      10: ['Turkey', 'Cranberries', 'Sweet Potatoes'], // November
      11: ['Holiday Baking', 'Eggnog', 'Christmas Ham'] // December
    };

    // Day-based suggestions
    const dayBasedItems = {
      0: ['Sunday Brunch Items', 'Pancake Mix', 'Fresh Fruit'], // Sunday
      1: ['Meal Prep Containers', 'Chicken Breast', 'Rice'], // Monday
      2: ['Taco Tuesday', 'Ground Beef', 'Tortillas'], // Tuesday
      3: ['Midweek Snacks', 'Energy Bars', 'Coffee'], // Wednesday
      4: ['Weekend Prep', 'Pizza Ingredients', 'Cool Drinks'], // Thursday
      5: ['Date Night', 'Wine', 'Fancy Cheese'], // Friday
      6: ['Weekend Treats', 'Ice Cream', 'Movie Snacks'] // Saturday
    };

    // Frequently bought together
    const commonPairs = [
      { main: 'Milk', suggestions: ['Cereal', 'Cookies', 'Coffee'] },
      { main: 'Bread', suggestions: ['Butter', 'Jam', 'Peanut Butter'] },
      { main: 'Pasta', suggestions: ['Tomato Sauce', 'Parmesan Cheese', 'Garlic'] },
      { main: 'Chicken', suggestions: ['Rice', 'Vegetables', 'Seasoning'] }
    ];

    return {
      seasonal: seasonalItems[currentMonth] || [],
      dayBased: dayBasedItems[currentDay] || [],
      commonPairs: commonPairs
    };
  };

  const suggestions = getSmartSuggestions();

  const addSuggestedItem = (itemName: string, category: string = 'Other') => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: '',
      category,
      priority: 'medium' as const,
      note: 'Smart suggestion',
      completed: false,
      dateAdded: new Date().toISOString()
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });
    dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: itemName });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Smart Suggestions
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

          <div className="space-y-6">
            {/* Seasonal Suggestions */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h3 className={`font-bold ${
                  state.settings.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Seasonal Picks
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.seasonal.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      state.settings.darkMode ? 'bg-gray-700/50' : 'bg-orange-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      state.settings.darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {item}
                    </span>
                    <button
                      onClick={() => addSuggestedItem(item, 'Seasonal')}
                      className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-based Suggestions */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className={`font-bold ${
                  state.settings.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Perfect for Today
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.dayBased.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      state.settings.darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      state.settings.darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {item}
                    </span>
                    <button
                      onClick={() => addSuggestedItem(item, 'Daily')}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Bought Together */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-emerald-500" />
                <h3 className={`font-bold ${
                  state.settings.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Great Combinations
                </h3>
              </div>
              <div className="space-y-3">
                {suggestions.commonPairs.map((pair, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      state.settings.darkMode ? 'bg-gray-700/50' : 'bg-emerald-50'
                    }`}
                  >
                    <p className={`font-semibold mb-2 ${
                      state.settings.darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      If you're buying {pair.main}, consider:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pair.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => addSuggestedItem(suggestion, 'Combo')}
                          className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors flex items-center space-x-1"
                        >
                          <span>{suggestion}</span>
                          <Plus className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory-based Suggestions */}
            {state.searchHistory.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <h3 className={`font-bold ${
                    state.settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your Favorites
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {state.searchHistory.slice(0, 6).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => addSuggestedItem(item, 'Favorite')}
                      className={`p-3 rounded-xl text-left transition-all duration-200 ${
                        state.settings.darkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-200' 
                          : 'bg-purple-50 hover:bg-purple-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item}</span>
                        <Plus className="w-4 h-4 text-purple-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};