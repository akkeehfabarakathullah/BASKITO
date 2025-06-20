export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  photo?: string;
  note?: string;
  dateAdded: string;
  reminderDate?: string;
  estimatedPrice?: number;
  usualQuantity?: string;
  expiryDate?: string;
  isEcoFriendly?: boolean;
  nutritionInfo?: NutritionInfo;
  dietaryTags?: string[];
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: string;
  template?: boolean;
  emoji?: string;
  mealPlan?: MealPlan[];
}

export interface MealPlan {
  id: string;
  day: string;
  meal: string;
  ingredients: string[];
}

export interface AppSettings {
  darkMode: boolean;
  storeMode: boolean;
  notifications: boolean;
  defaultCategory: string;
  budget?: number;
  voiceEnabled?: boolean;
  currency: 'USD' | 'LKR' | 'INR' | 'EUR';
  dietaryPreferences: string[];
  sustainabilityMode: boolean;
  gamificationEnabled: boolean;
}

export interface Template {
  id: string;
  name: string;
  items: Omit<GroceryItem, 'id' | 'completed' | 'dateAdded'>[];
  icon: string;
}

export interface SmartSuggestion {
  id: string;
  name: string;
  category: string;
  reason: string;
  confidence: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface MoodSuggestion {
  mood: string;
  icon: string;
  items: string[];
  description: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}