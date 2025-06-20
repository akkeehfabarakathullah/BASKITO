import React, { useState } from 'react';
import { X, Calendar, ChefHat, Plus, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MealPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mealSuggestions = {
  'Monday': [
    { name: 'Pasta Carbonara', ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan Cheese', 'Black Pepper'] },
    { name: 'Chicken Stir Fry', ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Soy Sauce', 'Garlic', 'Rice'] },
    { name: 'Vegetable Curry', ingredients: ['Mixed Vegetables', 'Coconut Milk', 'Curry Powder', 'Onions', 'Rice'] }
  ],
  'Tuesday': [
    { name: 'Taco Tuesday', ingredients: ['Ground Beef', 'Tortillas', 'Lettuce', 'Tomatoes', 'Cheese', 'Sour Cream'] },
    { name: 'Fish & Chips', ingredients: ['White Fish', 'Potatoes', 'Flour', 'Oil', 'Peas'] },
    { name: 'Vegetarian Tacos', ingredients: ['Black Beans', 'Tortillas', 'Avocado', 'Corn', 'Lime'] }
  ],
  'Wednesday': [
    { name: 'Chicken Curry', ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions', 'Rice'] },
    { name: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onions', 'Garlic'] },
    { name: 'Buddha Bowl', ingredients: ['Quinoa', 'Chickpeas', 'Sweet Potato', 'Spinach', 'Tahini'] }
  ],
  'Thursday': [
    { name: 'Pizza Night', ingredients: ['Pizza Base', 'Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Mushrooms'] },
    { name: 'Grilled Salmon', ingredients: ['Salmon', 'Asparagus', 'Lemon', 'Olive Oil', 'Herbs'] },
    { name: 'Lentil Soup', ingredients: ['Red Lentils', 'Vegetables', 'Vegetable Stock', 'Herbs', 'Bread'] }
  ],
  'Friday': [
    { name: 'Fish Tacos', ingredients: ['White Fish', 'Tortillas', 'Cabbage', 'Lime', 'Cilantro'] },
    { name: 'Beef Stir Fry', ingredients: ['Beef Strips', 'Broccoli', 'Bell Peppers', 'Soy Sauce', 'Noodles'] },
    { name: 'Margherita Pizza', ingredients: ['Pizza Base', 'Tomato Sauce', 'Fresh Mozzarella', 'Basil'] }
  ],
  'Saturday': [
    { name: 'BBQ Ribs', ingredients: ['Pork Ribs', 'BBQ Sauce', 'Coleslaw', 'Corn', 'Potatoes'] },
    { name: 'Paella', ingredients: ['Rice', 'Seafood Mix', 'Saffron', 'Bell Peppers', 'Peas'] },
    { name: 'Mushroom Risotto', ingredients: ['Arborio Rice', 'Mushrooms', 'Vegetable Stock', 'Parmesan', 'Wine'] }
  ],
  'Sunday': [
    { name: 'Roast Chicken', ingredients: ['Whole Chicken', 'Potatoes', 'Carrots', 'Herbs', 'Gravy'] },
    { name: 'Pancakes', ingredients: ['Flour', 'Eggs', 'Milk', 'Butter', 'Maple Syrup', 'Berries'] },
    { name: 'Vegetable Lasagna', ingredients: ['Lasagna Sheets', 'Mixed Vegetables', 'Cheese', 'Tomato Sauce'] }
  ]
};

export const MealPlanner: React.FC<MealPlannerProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [selectedMeals, setSelectedMeals] = useState<{[key: string]: any}>({});

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const selectMeal = (day: string, meal: any) => {
    setSelectedMeals(prev => ({
      ...prev,
      [day]: meal
    }));
  };

  const generateGroceryList = () => {
    const allIngredients = Object.values(selectedMeals).flatMap((meal: any) => meal.ingredients);
    const uniqueIngredients = [...new Set(allIngredients)];

    // Create new list
    const newListName = `Meal Plan - ${new Date().toLocaleDateString()}`;
    dispatch({ type: 'CREATE_LIST', payload: { name: newListName } });

    // Add ingredients as items
    uniqueIngredients.forEach(ingredient => {
      const newItem = {
        id: `${Date.now()}-${Math.random()}`,
        name: ingredient,
        quantity: '',
        category: 'Other',
        priority: 'medium' as const,
        note: 'From meal plan',
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
      <div className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Weekly Meal Planner
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
            {days.map(day => (
              <div key={day} className={`p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <h3 className={`font-bold text-lg ${
                    state.settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {day}
                  </h3>
                </div>

                {selectedMeals[day] ? (
                  <div className={`p-3 rounded-lg border-2 border-orange-300 ${
                    state.settings.darkMode ? 'bg-gray-600' : 'bg-orange-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          state.settings.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedMeals[day].name}
                        </h4>
                        <p className={`text-sm ${
                          state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {selectedMeals[day].ingredients.join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedMeals(prev => {
                          const newMeals = { ...prev };
                          delete newMeals[day];
                          return newMeals;
                        })}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {mealSuggestions[day as keyof typeof mealSuggestions].map((meal, index) => (
                      <button
                        key={index}
                        onClick={() => selectMeal(day, meal)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                          state.settings.darkMode
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                            : 'bg-white hover:bg-orange-50 text-gray-800 border border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Utensils className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{meal.name}</span>
                        </div>
                        <p className={`text-xs mt-1 ${
                          state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {meal.ingredients.slice(0, 3).join(', ')}...
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className={`flex-1 py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Close
              </button>
              {Object.keys(selectedMeals).length > 0 && (
                <button
                  onClick={generateGroceryList}
                  className="flex-1 py-4 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Grocery List</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};