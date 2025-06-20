import { Template } from '../types';

export const defaultTemplates: Template[] = [
  {
    id: 'weekly-essentials',
    name: 'Weekly Essentials',
    icon: '🥬',
    items: [
      { name: 'Milk', quantity: '1 gallon', category: 'Dairy', priority: 'high', note: '' },
      { name: 'Bread', quantity: '1 loaf', category: 'Bakery', priority: 'high', note: '' },
      { name: 'Eggs', quantity: '1 dozen', category: 'Dairy', priority: 'high', note: '' },
      { name: 'Bananas', quantity: '1 bunch', category: 'Fruits', priority: 'medium', note: '' },
      { name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat', priority: 'high', note: '' },
      { name: 'Rice', quantity: '1 bag', category: 'Pantry', priority: 'medium', note: '' }
    ]
  },
  {
    id: 'monthly-stock-up',
    name: 'Monthly Stock-Up',
    icon: '📦',
    items: [
      { name: 'Toilet Paper', quantity: '12 pack', category: 'Household', priority: 'high', note: '' },
      { name: 'Paper Towels', quantity: '6 pack', category: 'Household', priority: 'medium', note: '' },
      { name: 'Laundry Detergent', quantity: '1 bottle', category: 'Household', priority: 'high', note: '' },
      { name: 'Pasta', quantity: '4 boxes', category: 'Pantry', priority: 'medium', note: '' },
      { name: 'Canned Tomatoes', quantity: '6 cans', category: 'Pantry', priority: 'medium', note: '' },
      { name: 'Olive Oil', quantity: '1 bottle', category: 'Pantry', priority: 'medium', note: '' }
    ]
  },
  {
    id: 'comfort-food',
    name: 'Rainy Day Comfort Food',
    icon: '🍲',
    items: [
      { name: 'Ice Cream', quantity: '1 pint', category: 'Frozen', priority: 'high', note: 'Chocolate chip' },
      { name: 'Hot Chocolate', quantity: '1 box', category: 'Beverages', priority: 'medium', note: '' },
      { name: 'Cookies', quantity: '1 pack', category: 'Snacks', priority: 'medium', note: '' },
      { name: 'Soup', quantity: '4 cans', category: 'Pantry', priority: 'high', note: 'Chicken noodle' },
      { name: 'Cheese', quantity: '1 block', category: 'Dairy', priority: 'medium', note: 'Cheddar' },
      { name: 'Crackers', quantity: '1 box', category: 'Snacks', priority: 'medium', note: '' }
    ]
  },
  {
    id: 'healthy-living',
    name: 'Healthy Living',
    icon: '🥗',
    items: [
      { name: 'Spinach', quantity: '1 bag', category: 'Vegetables', priority: 'high', note: 'Organic' },
      { name: 'Avocados', quantity: '4 pieces', category: 'Fruits', priority: 'high', note: '' },
      { name: 'Greek Yogurt', quantity: '1 container', category: 'Dairy', priority: 'high', note: 'Plain' },
      { name: 'Quinoa', quantity: '1 bag', category: 'Pantry', priority: 'medium', note: '' },
      { name: 'Salmon', quantity: '2 fillets', category: 'Seafood', priority: 'high', note: 'Fresh' },
      { name: 'Almonds', quantity: '1 bag', category: 'Snacks', priority: 'medium', note: 'Unsalted' }
    ]
  }
];