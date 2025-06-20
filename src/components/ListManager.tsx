import React, { useState } from 'react';
import { Plus, Trash2, X, List, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ListManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListManager: React.FC<ListManagerProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [newListName, setNewListName] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);

  const createNewList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    dispatch({ type: 'CREATE_LIST', payload: { name: newListName.trim() } });
    setNewListName('');
    setShowNewForm(false);
  };

  const selectList = (list: any) => {
    dispatch({ type: 'SET_CURRENT_LIST', payload: list });
    onClose();
  };

  const deleteList = (listId: string) => {
    if (state.lists.length <= 1) return; // Prevent deleting the last list
    dispatch({ type: 'DELETE_LIST', payload: listId });
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <List className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                My Lists
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

          <div className="space-y-4 mb-6">
            {state.lists.map(list => {
              const completedCount = list.items.filter(item => item.completed).length;
              const totalCount = list.items.length;
              const isActive = state.currentList?.id === list.id;
              const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

              return (
                <div
                  key={list.id}
                  className={`border-2 rounded-2xl p-5 transition-all duration-200 ${
                    isActive 
                      ? state.settings.darkMode
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-emerald-500 bg-emerald-50'
                      : state.settings.darkMode
                        ? 'border-gray-700 hover:border-emerald-500 bg-gray-700/50'
                        : 'border-gray-200 hover:border-emerald-300 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => selectList(list)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${
                          isActive ? 'bg-emerald-500' : 'bg-gray-400'
                        }`} />
                        <h3 className={`font-bold text-lg ${
                          isActive 
                            ? state.settings.darkMode ? 'text-emerald-400' : 'text-emerald-700'
                            : state.settings.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {list.name}
                        </h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            isActive 
                              ? state.settings.darkMode ? 'text-emerald-300' : 'text-emerald-600'
                              : state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {completedCount}/{totalCount} completed
                          </p>
                          <span className={`text-xs font-semibold ${
                            isActive 
                              ? state.settings.darkMode ? 'text-emerald-400' : 'text-emerald-700'
                              : state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {Math.round(completionPercentage)}%
                          </span>
                        </div>
                        
                        {totalCount > 0 && (
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${completionPercentage}%` }}
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className={`text-xs ${
                            state.settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Created {new Date(list.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </button>
                    
                    {state.lists.length > 1 && (
                      <button
                        onClick={() => deleteList(list.id)}
                        className={`p-2 rounded-lg transition-colors ml-3 ${
                          state.settings.darkMode
                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {showNewForm ? (
            <form onSubmit={createNewList} className="space-y-4">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="New list name"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-400'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
                }`}
                autoFocus
              />
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewForm(false);
                    setNewListName('');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    state.settings.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  Create
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNewForm(true)}
              className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>New List</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};