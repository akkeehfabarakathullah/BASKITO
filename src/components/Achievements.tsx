import React from 'react';
import { X, Trophy, Star, Target, Leaf, Clock, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AchievementsProps {
  isOpen: boolean;
  onClose: () => void;
}

const achievements = [
  {
    id: 'first-list',
    title: 'List Creator',
    description: 'Created your first grocery list',
    icon: '📝',
    color: 'from-blue-400 to-blue-600',
    earned: true
  },
  {
    id: 'voice-user',
    title: 'Voice Commander',
    description: 'Used voice input to add items',
    icon: '🎤',
    color: 'from-purple-400 to-purple-600',
    earned: false
  },
  {
    id: 'eco-warrior',
    title: 'Eco Warrior',
    description: 'Added 10 eco-friendly items',
    icon: '🌱',
    color: 'from-green-400 to-green-600',
    earned: false
  },
  {
    id: 'budget-master',
    title: 'Budget Master',
    description: 'Stayed under budget for 5 shopping trips',
    icon: '💰',
    color: 'from-yellow-400 to-yellow-600',
    earned: false
  },
  {
    id: 'speed-shopper',
    title: 'Speed Shopper',
    description: 'Completed shopping in under 30 minutes',
    icon: '⚡',
    color: 'from-orange-400 to-orange-600',
    earned: false
  },
  {
    id: 'healthy-choice',
    title: 'Health Enthusiast',
    description: 'Added 20 healthy items',
    icon: '🥗',
    color: 'from-emerald-400 to-emerald-600',
    earned: false
  },
  {
    id: 'meal-planner',
    title: 'Meal Planner',
    description: 'Created a weekly meal plan',
    icon: '🍽️',
    color: 'from-red-400 to-red-600',
    earned: false
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Used the app for 7 consecutive days',
    icon: '🔥',
    color: 'from-pink-400 to-pink-600',
    earned: false
  }
];

export const Achievements: React.FC<AchievementsProps> = ({ isOpen, onClose }) => {
  const { state } = useApp();

  if (!isOpen) return null;

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${
                  state.settings.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Achievements
                </h2>
                <p className={`text-sm ${
                  state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {earnedCount}/{totalCount} unlocked
                </p>
              </div>
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

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                state.settings.darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progress
              </span>
              <span className={`text-sm font-bold ${
                state.settings.darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {Math.round((earnedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  achievement.earned
                    ? state.settings.darkMode
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-yellow-50 border border-yellow-200'
                    : state.settings.darkMode
                      ? 'bg-gray-700/50 opacity-60'
                      : 'bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.earned
                      ? `bg-gradient-to-br ${achievement.color} shadow-lg`
                      : 'bg-gray-300'
                  }`}>
                    {achievement.earned ? (
                      <span className="text-xl">{achievement.icon}</span>
                    ) : (
                      <Trophy className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${
                      achievement.earned
                        ? state.settings.darkMode ? 'text-yellow-400' : 'text-yellow-700'
                        : state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned
                        ? state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                        : state.settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
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