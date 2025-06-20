import React, { useState } from 'react';
import { Plus, ShoppingCart, Zap, List as ListIcon, Sparkles, Mic, Calculator, ChefHat, Heart, Trophy } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { GroceryItem } from './components/GroceryItem';
import { AddItemForm } from './components/AddItemForm';
import { TemplateSelector } from './components/TemplateSelector';
import { ListManager } from './components/ListManager';
import { Settings } from './components/Settings';
import { SmartSuggestions } from './components/SmartSuggestions';
import { PriceEstimator } from './components/PriceEstimator';
import { VoiceInput } from './components/VoiceInput';
import { MealPlanner } from './components/MealPlanner';
import { MoodSuggestions } from './components/MoodSuggestions';
import { Achievements } from './components/Achievements';

const AppContent: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPriceEstimator, setShowPriceEstimator] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showMealPlanner, setShowMealPlanner] = useState(false);
  const [showMoodSuggestions, setShowMoodSuggestions] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Create default list if none exists
  React.useEffect(() => {
    if (state.lists.length === 0) {
      dispatch({ type: 'CREATE_LIST', payload: { name: 'My Grocery List' } });
    }
  }, [state.lists.length, dispatch]);

  const getCurrencySymbol = () => {
    switch (state.settings.currency) {
      case 'LKR': return 'Rs.';
      case 'INR': return '₹';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const uncompletedItems = state.currentList?.items.filter(item => !item.completed) || [];
  const completedItems = state.currentList?.items.filter(item => item.completed) || [];
  const totalEstimatedCost = state.currentList?.items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0) || 0;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      state.settings.darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'
    }`}>
      {/* Enhanced Background with Fresh Grocery Theme */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-green-500/5 to-teal-500/8" />
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-green-400/25 rounded-full animate-pulse" />
        <div className="absolute top-40 right-16 w-8 h-8 bg-emerald-400/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-teal-400/30 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-7 h-7 bg-green-400/25 rounded-full animate-pulse delay-500" />
        <div className="absolute top-60 left-1/2 w-5 h-5 bg-emerald-300/25 rounded-full animate-pulse delay-1500" />
        
        {/* Fresh Grocery Icons Floating */}
        <div className="absolute top-32 right-32 text-green-400/15 text-4xl animate-bounce delay-300">🥕</div>
        <div className="absolute bottom-40 left-32 text-emerald-400/15 text-3xl animate-bounce delay-700">🍎</div>
        <div className="absolute top-80 left-16 text-teal-400/15 text-2xl animate-bounce delay-1200">🥬</div>
        <div className="absolute top-96 right-20 text-green-400/15 text-3xl animate-bounce delay-900">🥦</div>
        <div className="absolute bottom-60 right-40 text-emerald-400/15 text-2xl animate-bounce delay-1800">🍊</div>
      </div>

      <div className="relative z-10">
        <Header 
          onOpenSettings={() => setShowSettings(true)}
          onOpenLists={() => setShowLists(true)}
        />

        <main className="max-w-md mx-auto px-4 py-6">
          {!state.currentList ? (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Baskito!</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your smart grocery companion with AI-powered suggestions, voice input, meal planning, and budget tracking.
              </p>
              <button
                onClick={() => setShowLists(true)}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
              >
                Create Your First List
              </button>
            </div>
          ) : (
            <>
              {/* Enhanced Quick Actions with Advanced Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 px-5 rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Item</span>
                </button>
                <button
                  onClick={() => setShowVoiceInput(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-5 rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                >
                  <Mic className="w-5 h-5" />
                  <span>Voice Add</span>
                </button>
                <button
                  onClick={() => setShowMealPlanner(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-5 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
                >
                  <ChefHat className="w-5 h-5" />
                  <span>Meal Plan</span>
                </button>
                <button
                  onClick={() => setShowMoodSuggestions(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-5 rounded-2xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-0.5"
                >
                  <Heart className="w-5 h-5" />
                  <span>Mood</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => setShowTemplates(true)}
                  className="bg-white/80 backdrop-blur-sm text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md border border-white/50 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Templates</span>
                </button>
                <button
                  onClick={() => setShowSuggestions(true)}
                  className="bg-white/80 backdrop-blur-sm text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md border border-white/50 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Smart Tips</span>
                </button>
                <button
                  onClick={() => setShowAchievements(true)}
                  className="bg-white/80 backdrop-blur-sm text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md border border-white/50 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Awards</span>
                </button>
              </div>

              {/* Price Estimator Card */}
              {totalEstimatedCost > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg border border-white/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Estimated Total</p>
                        <p className="text-sm text-gray-600">{uncompletedItems.length} items remaining</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{getCurrencySymbol()}{totalEstimatedCost.toFixed(2)}</p>
                      <button
                        onClick={() => setShowPriceEstimator(true)}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Manage Prices
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Current List */}
              {state.currentList && (
                <div className="space-y-8">
                  {/* Active Items */}
                  {uncompletedItems.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                            <ListIcon className="w-4 h-4 text-white" />
                          </div>
                          Shopping List
                        </h2>
                        <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {uncompletedItems.length} items
                        </div>
                      </div>
                      <div className="space-y-4">
                        {uncompletedItems.map(item => (
                          <GroceryItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Items */}
                  {completedItems.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-500 flex items-center">
                          <div className="w-7 h-7 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
                            <ShoppingCart className="w-4 h-4 text-gray-600" />
                          </div>
                          Completed
                        </h2>
                        <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                          {completedItems.length} done
                        </div>
                      </div>
                      <div className="space-y-3">
                        {completedItems.map(item => (
                          <GroceryItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Empty State */}
                  {state.currentList.items.length === 0 && (
                    <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl">
                      <div className="relative mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto flex items-center justify-center">
                          <ShoppingCart className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                          <Plus className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Your smart list is ready!</h3>
                      <p className="text-gray-600 mb-8 leading-relaxed max-w-xs mx-auto">
                        Add items manually, use voice input, plan meals, or try our smart suggestions.
                      </p>
                      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                        <button
                          onClick={() => setShowAddForm(true)}
                          className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
                        >
                          Add Item
                        </button>
                        <button
                          onClick={() => setShowVoiceInput(true)}
                          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
                        >
                          Voice Add
                        </button>
                        <button
                          onClick={() => setShowMealPlanner(true)}
                          className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg shadow-orange-500/25"
                        >
                          Meal Plan
                        </button>
                        <button
                          onClick={() => setShowMoodSuggestions(true)}
                          className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-pink-500/25"
                        >
                          Mood
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>

        {/* Modals */}
        <AddItemForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
        <TemplateSelector isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
        <ListManager isOpen={showLists} onClose={() => setShowLists(false)} />
        <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <SmartSuggestions isOpen={showSuggestions} onClose={() => setShowSuggestions(false)} />
        <PriceEstimator isOpen={showPriceEstimator} onClose={() => setShowPriceEstimator(false)} />
        <VoiceInput isOpen={showVoiceInput} onClose={() => setShowVoiceInput(false)} />
        <MealPlanner isOpen={showMealPlanner} onClose={() => setShowMealPlanner(false)} />
        <MoodSuggestions isOpen={showMoodSuggestions} onClose={() => setShowMoodSuggestions(false)} />
        <Achievements isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;