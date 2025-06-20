export const categories = [
  'Fruits',
  'Vegetables', 
  'Meat',
  'Seafood',
  'Dairy',
  'Bakery',
  'Pantry',
  'Frozen',
  'Beverages',
  'Snacks',
  'Household',
  'Personal Care',
  'Other'
];

export const categoryColors: Record<string, string> = {
  'Fruits': 'bg-red-100 text-red-800',
  'Vegetables': 'bg-green-100 text-green-800',
  'Meat': 'bg-pink-100 text-pink-800',
  'Seafood': 'bg-blue-100 text-blue-800',
  'Dairy': 'bg-yellow-100 text-yellow-800',
  'Bakery': 'bg-orange-100 text-orange-800',
  'Pantry': 'bg-amber-100 text-amber-800',
  'Frozen': 'bg-cyan-100 text-cyan-800',
  'Beverages': 'bg-purple-100 text-purple-800',
  'Snacks': 'bg-indigo-100 text-indigo-800',
  'Household': 'bg-gray-100 text-gray-800',
  'Personal Care': 'bg-pink-100 text-pink-800',
  'Other': 'bg-slate-100 text-slate-800'
};

export const priorityColors: Record<string, string> = {
  'low': 'bg-green-100 text-green-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-red-100 text-red-800'
};