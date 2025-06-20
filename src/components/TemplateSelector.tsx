import React from 'react';
import { Copy, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { defaultTemplates } from '../data/templates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();

  const createFromTemplate = (templateId: string) => {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (!template) return;

    // Create new list
    const newListName = `${template.name} - ${new Date().toLocaleDateString()}`;
    dispatch({ type: 'CREATE_LIST', payload: { name: newListName } });

    // Add template items
    template.items.forEach(templateItem => {
      const newItem = {
        id: `${Date.now()}-${Math.random()}`,
        ...templateItem,
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
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Templates
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
            {defaultTemplates.map(template => (
              <div
                key={template.id}
                className={`border-2 rounded-2xl p-5 transition-all duration-200 hover:shadow-lg ${
                  state.settings.darkMode
                    ? 'border-gray-700 hover:border-emerald-500 bg-gray-700/50'
                    : 'border-gray-200 hover:border-emerald-300 bg-gray-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{template.icon}</span>
                      <div>
                        <h3 className={`font-bold text-lg ${
                          state.settings.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {template.name}
                        </h3>
                        <p className={`text-sm ${
                          state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {template.items.length} items included
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm space-y-1 ${
                      state.settings.darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {template.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {template.items.length > 3 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          <span>+ {template.items.length - 3} more items...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => createFromTemplate(template.id)}
                    className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 ml-4"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Use</span>
                  </button>
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