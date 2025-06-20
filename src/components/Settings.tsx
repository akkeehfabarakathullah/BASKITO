import React from 'react';
import { X, Moon, Sun, Smartphone, Bell, Info, Globe, Leaf, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();

  const updateSetting = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
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
                <Info className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Settings
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

          <div className="space-y-8">
            <div className="space-y-5">
              <h3 className={`text-lg font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Appearance
              </h3>
              
              <div className={`flex items-center justify-between p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
                  }`}>
                    {state.settings.darkMode ? (
                      <Moon className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Dark Mode
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Switch to dark theme
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('darkMode', !state.settings.darkMode)}
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    state.settings.darkMode ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    state.settings.darkMode ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.storeMode 
                      ? state.settings.darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                      : state.settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <Smartphone className={`w-5 h-5 ${
                      state.settings.storeMode ? 'text-emerald-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Store Mode
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Simplified view for shopping
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('storeMode', !state.settings.storeMode)}
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    state.settings.storeMode ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    state.settings.storeMode ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className={`text-lg font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Preferences
              </h3>

              <div className={`p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Currency
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Choose your preferred currency
                    </p>
                  </div>
                </div>
                <select
                  value={state.settings.currency || 'LKR'}
                  onChange={(e) => updateSetting('currency', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 ${
                    state.settings.darkMode
                      ? 'bg-gray-600 border-gray-500 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="LKR">Sri Lankan Rupee (Rs.)</option>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              
              <div className={`flex items-center justify-between p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.sustainabilityMode 
                      ? state.settings.darkMode ? 'bg-green-500/20' : 'bg-green-100'
                      : state.settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <Leaf className={`w-5 h-5 ${
                      state.settings.sustainabilityMode ? 'text-green-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Sustainability Mode
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Track eco-friendly choices
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('sustainabilityMode', !state.settings.sustainabilityMode)}
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    state.settings.sustainabilityMode ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    state.settings.sustainabilityMode ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.gamificationEnabled 
                      ? state.settings.darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
                      : state.settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <Trophy className={`w-5 h-5 ${
                      state.settings.gamificationEnabled ? 'text-yellow-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Achievements
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Enable shopping achievements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('gamificationEnabled', !state.settings.gamificationEnabled)}
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    state.settings.gamificationEnabled ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    state.settings.gamificationEnabled ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className={`text-lg font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Notifications
              </h3>
              
              <div className={`flex items-center justify-between p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    state.settings.notifications 
                      ? state.settings.darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                      : state.settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <Bell className={`w-5 h-5 ${
                      state.settings.notifications ? 'text-blue-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      state.settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Reminders
                    </p>
                    <p className={`text-sm ${
                      state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Get shopping reminders
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('notifications', !state.settings.notifications)}
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    state.settings.notifications ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    state.settings.notifications ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className={`pt-6 border-t ${
              state.settings.darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <p className={`font-bold ${
                    state.settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Baskito v2.0
                  </p>
                </div>
                <p className={`text-sm ${
                  state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Smart grocery planning with AI features
                </p>
                <p className={`text-xs ${
                  state.settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Made with ❤️ for smarter shopping
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};