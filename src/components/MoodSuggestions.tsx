import React from 'react';
import { X, Heart, Coffee, Zap, Moon, Sun, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MoodSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const moodSuggestions = [
  {
    mood: 'Feeling Lazy',
    icon: '😴',
    description: 'Quick 3-ingredient meals',
    items: ['Instant Noodles', 'Frozen Pizza', 'Microwave Rice', 'Canned Soup', 'Bread', 'Peanut Butter']
  },
  {
    mood: 'Want Comfort Food',
    icon: '🤗',
    description: 'Cozy, warm meals',
    items: ['Hot Chocolate', 'Soup', 'Mac & Cheese', 'Ice Cream', 'Cookies', 'Warm Bread']
  },
  {
    mood: 'Feeling Healthy',
    icon: '💪',
    description: 'Nutritious choices',
    items: ['Spinach', 'Quinoa', 'Avocado', 'Greek Yogurt', 'Berries', 'Nuts', 'Salmon']
  },
  {
    mood: 'Need Energy',
    icon: '⚡',
    description: 'Power-packed foods',
    items: ['Bananas', 'Energy Bars', 'Coffee', 'Dark Chocolate', 'Oats', 'Almonds']
  },
  {
    mood: 'Romantic Dinner',
    icon: '💕',
    description: 'Special occasion meals',
    items: ['Candles', 'Pasta', 'Parmesan', 'Fresh Herbs', 'Strawberries', 'Chocolate', 'Cheese Plate','Sparkling Drink'
    ]
  },
  {
    mood: 'Party Time',
    icon: '🎉',
    description: 'Crowd-pleasing snacks',
    items: ['Chips', 'Dips', 'Soda', 'Pizza', 'Popcorn', 'Candy', 'Beer']
  },
  {
    mood: 'Rainy Day',
    icon: '🌧️',
    description: 'Warm, cozy foods',
    items: ['Tea', 'Soup', 'Crackers', 'Honey', 'Ginger', 'Lemon', 'Blanket Snacks']
  },
  {
    mood: 'Summer Vibes',
    icon: '☀️',
    description: 'Fresh, light foods',
    items: ['Watermelon', 'Ice Cream', 'Salad', 'Lemonade', 'Grapes', 'Cucumber', 'Mint']
  }
];

export const MoodSuggestions: React.FC<MoodSuggestionsProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();

  const addMoodItems = (items: string[]) => {
    items.forEach(itemName => {
      const newItem = {
        id: `${Date.now()}-${Math.random()}`,
        name: itemName,
        quantity: '',
        category: 'Other',
        priority: 'medium' as const,
        note: 'Mood suggestion',
        completed: false,
        dateAdded: new Date().toISOString()
      };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    });
    onClose();
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
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Mood Based Suggestions
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

          <div className="space-y-4">
            {moodSuggestions.map((mood, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  state.settings.darkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mood.icon}</span>
                    <div>
                      <h3 className={`font-bold ${
                        state.settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {mood.mood}
                      </h3>
                      <p className={`text-sm ${
                        state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {mood.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => addMoodItems(mood.items)}
                    className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {mood.items.slice(0, 4).map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        state.settings.darkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                  {mood.items.length > 4 && (
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      +{mood.items.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
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