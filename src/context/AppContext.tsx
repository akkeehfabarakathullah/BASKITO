import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GroceryItem, GroceryList, AppSettings } from '../types';

interface AppState {
  lists: GroceryList[];
  currentList: GroceryList | null;
  settings: AppSettings;
  searchHistory: string[];
}

type AppAction =
  | { type: 'SET_LISTS'; payload: GroceryList[] }
  | { type: 'SET_CURRENT_LIST'; payload: GroceryList }
  | { type: 'ADD_ITEM'; payload: GroceryItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<GroceryItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'TOGGLE_ITEM'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: string }
  | { type: 'CREATE_LIST'; payload: { name: string; template?: boolean } }
  | { type: 'DELETE_LIST'; payload: string };

const initialState: AppState = {
  lists: [],
  currentList: null,
  settings: {
    darkMode: false,
    storeMode: false,
    notifications: true,
    defaultCategory: 'Other',
    currency: 'LKR',
    dietaryPreferences: [],
    sustainabilityMode: false,
    gamificationEnabled: true
  },
  searchHistory: []
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LISTS':
      return { ...state, lists: action.payload };
    
    case 'SET_CURRENT_LIST':
      return { ...state, currentList: action.payload };
    
    case 'ADD_ITEM':
      if (!state.currentList) return state;
      const updatedList = {
        ...state.currentList,
        items: [...state.currentList.items, action.payload]
      };
      return {
        ...state,
        currentList: updatedList,
        lists: state.lists.map(list => 
          list.id === updatedList.id ? updatedList : list
        )
      };
    
    case 'UPDATE_ITEM':
      if (!state.currentList) return state;
      const listWithUpdatedItem = {
        ...state.currentList,
        items: state.currentList.items.map(item =>
          item.id === action.payload.id 
            ? { ...item, ...action.payload.updates }
            : item
        )
      };
      return {
        ...state,
        currentList: listWithUpdatedItem,
        lists: state.lists.map(list =>
          list.id === listWithUpdatedItem.id ? listWithUpdatedItem : list
        )
      };
    
    case 'DELETE_ITEM':
      if (!state.currentList) return state;
      const listWithoutItem = {
        ...state.currentList,
        items: state.currentList.items.filter(item => item.id !== action.payload)
      };
      return {
        ...state,
        currentList: listWithoutItem,
        lists: state.lists.map(list =>
          list.id === listWithoutItem.id ? listWithoutItem : list
        )
      };
    
    case 'TOGGLE_ITEM':
      if (!state.currentList) return state;
      const listWithToggledItem = {
        ...state.currentList,
        items: state.currentList.items.map(item =>
          item.id === action.payload 
            ? { ...item, completed: !item.completed }
            : item
        )
      };
      return {
        ...state,
        currentList: listWithToggledItem,
        lists: state.lists.map(list =>
          list.id === listWithToggledItem.id ? listWithToggledItem : list
        )
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'ADD_TO_SEARCH_HISTORY':
      const newHistory = [action.payload, ...state.searchHistory.filter(item => item !== action.payload)].slice(0, 10);
      return {
        ...state,
        searchHistory: newHistory
      };
    
    case 'CREATE_LIST':
      const newList: GroceryList = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: [],
        createdAt: new Date().toISOString(),
        template: action.payload.template
      };
      return {
        ...state,
        lists: [...state.lists, newList],
        currentList: newList
      };
    
    case 'DELETE_LIST':
      const remainingLists = state.lists.filter(list => list.id !== action.payload);
      return {
        ...state,
        lists: remainingLists,
        currentList: state.currentList?.id === action.payload ? 
          (remainingLists[0] || null) : state.currentList
      };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem('baskito-lists');
    const savedSettings = localStorage.getItem('baskito-settings');
    const savedHistory = localStorage.getItem('baskito-search-history');
    
    if (savedLists) {
      const lists = JSON.parse(savedLists);
      dispatch({ type: 'SET_LISTS', payload: lists });
      if (lists.length > 0) {
        dispatch({ type: 'SET_CURRENT_LIST', payload: lists[0] });
      }
    }
    
    if (savedSettings) {
      dispatch({ type: 'UPDATE_SETTINGS', payload: JSON.parse(savedSettings) });
    }
    
    if (savedHistory) {
      state.searchHistory = JSON.parse(savedHistory);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('baskito-lists', JSON.stringify(state.lists));
  }, [state.lists]);

  useEffect(() => {
    localStorage.setItem('baskito-settings', JSON.stringify(state.settings));
  }, [state.settings]);

  useEffect(() => {
    localStorage.setItem('baskito-search-history', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};