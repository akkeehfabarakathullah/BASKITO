import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface VoiceInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceInput(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const processVoiceInput = (text: string) => {
    // Parse voice input for grocery items
    const lowerText = text.toLowerCase();
    
    // Common patterns for adding items
    const addPatterns = [
      /add (.+)/,
      /buy (.+)/,
      /get (.+)/,
      /need (.+)/,
      /purchase (.+)/
    ];

    let itemToAdd = '';
    for (const pattern of addPatterns) {
      const match = lowerText.match(pattern);
      if (match) {
        itemToAdd = match[1];
        break;
      }
    }

    // If no pattern matched, treat the whole text as an item
    if (!itemToAdd) {
      itemToAdd = text.trim();
    }

    // Extract quantity if mentioned
    const quantityMatch = itemToAdd.match(/(\d+)\s*(.+)/);
    let quantity = '';
    let itemName = itemToAdd;

    if (quantityMatch) {
      quantity = quantityMatch[1];
      itemName = quantityMatch[2];
    }

    // Clean up the item name
    itemName = itemName.replace(/^(of|the|a|an)\s+/i, '').trim();
    
    if (itemName) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName.charAt(0).toUpperCase() + itemName.slice(1),
        quantity: quantity,
        category: 'Other',
        priority: 'medium' as const,
        note: 'Added by voice',
        completed: false,
        dateAdded: new Date().toISOString()
      };

      dispatch({ type: 'ADD_ITEM', payload: newItem });
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: itemName });
      
      // Provide audio feedback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Added ${itemName} to your list`);
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const isSupported = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-md shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Voice Input
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

          {!isSupported ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MicOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Voice Input Not Supported
              </h3>
              <p className={`text-sm ${
                state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Safari.
              </p>
            </div>
          ) : (
            <div className="text-center">
              {/* Voice Input Button */}
              <div className="mb-6">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isListening
                      ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </button>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${
                  state.settings.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {isListening ? 'Listening...' : 'Tap to Start'}
                </h3>
                <p className={`text-sm ${
                  state.settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isListening 
                    ? 'Say something like "Add milk" or "Buy 2 apples"'
                    : 'Press the microphone to add items by voice'
                  }
                </p>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className={`p-4 rounded-xl mb-6 ${
                  state.settings.darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Volume2 className="w-4 h-4 text-blue-500" />
                    <span className={`text-sm font-medium ${
                      state.settings.darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      You said:
                    </span>
                  </div>
                  <p className={`text-lg ${
                    state.settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    "{transcript}"
                  </p>
                </div>
              )}

              {/* Voice Commands Help */}
              <div className={`p-4 rounded-xl ${
                state.settings.darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-3 ${
                  state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Voice Commands
                </h4>
                <div className="space-y-2 text-sm">
                  <div className={`${state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    • "Add milk" or "Buy bread"
                  </div>
                  <div className={`${state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    • "Get 2 apples" or "Need 1 gallon milk"
                  </div>
                  <div className={`${state.settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    • "Purchase chicken breast"
                  </div>
                </div>
              </div>
            </div>
          )}

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