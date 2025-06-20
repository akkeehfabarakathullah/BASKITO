import React from 'react';
import { ShoppingCart, Moon, Sun, Settings, List, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenLists: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenLists }) => {
  const { state, dispatch } = useApp();

  const toggleDarkMode = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { darkMode: !state.settings.darkMode }
    });
  };

  const completedCount = state.currentList?.items.filter(item => item.completed).length || 0;
  const totalCount = state.currentList?.items.length || 0;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <header className={`backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300 ${
      state.settings.darkMode 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-emerald-100'
    }`}>
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-2 h-2 text-yellow-800" />
              </div>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Baskito
              </h1>
              {state.currentList && (
                <div className="flex items-center space-x-2">
                  <p className={`text-sm ${
                    state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {completedCount}/{totalCount} completed
                  </p>
                  {totalCount > 0 && (
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={onOpenLists}
              className={`p-3 rounded-xl transition-all duration-200 ${
                state.settings.darkMode 
                  ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-200 ${
                state.settings.darkMode 
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              {state.settings.darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onOpenSettings}
              className={`p-3 rounded-xl transition-all duration-200 ${
                state.settings.darkMode 
                  ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};