import React, { useState } from 'react';
import { Edit, Camera, X, Package, Tag, AlertCircle, DollarSign, Calendar, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../utils/categories';
import { usePhotoCapture } from '../hooks/usePhotoCapture';
import { GroceryItem } from '../types';

interface EditItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  item: GroceryItem;
}

export const EditItemForm: React.FC<EditItemFormProps> = ({ isOpen, onClose, item }) => {
  const { state, dispatch } = useApp();
  const { capturePhoto, isCapturing } = usePhotoCapture();
  
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(item.priority);
  const [note, setNote] = useState(item.note || '');
  const [photo, setPhoto] = useState<string | null>(item.photo || null);
  const [estimatedPrice, setEstimatedPrice] = useState(item.estimatedPrice?.toString() || '');
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [isEcoFriendly, setIsEcoFriendly] = useState(item.isEcoFriendly || false);

  const getCurrencySymbol = () => {
    switch (state.settings.currency) {
      case 'LKR': return 'Rs.';
      case 'INR': return '₹';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const updates = {
      name: name.trim(),
      quantity: quantity.trim(),
      category,
      priority,
      note: note.trim(),
      photo: photo || undefined,
      estimatedPrice: estimatedPrice ? parseFloat(estimatedPrice) : undefined,
      expiryDate: expiryDate || undefined,
      isEcoFriendly
    };

    dispatch({ type: 'UPDATE_ITEM', payload: { id: item.id, updates } });
    onClose();
  };

  const handlePhotoCapture = async () => {
    const photoData = await capturePhoto();
    if (photoData) {
      setPhoto(photoData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl ${
        state.settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Edit className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${
                state.settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Edit Item
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Item Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="e.g., Organic Bananas"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 flex items-center ${
                  state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Package className="w-4 h-4 mr-2" />

                  Quantity
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                    state.settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="2 lbs"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 flex items-center ${
                  state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price ({getCurrencySymbol()})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={estimatedPrice}
                  onChange={(e) => setEstimatedPrice(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                    state.settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="250.00"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 flex items-center ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <Tag className="w-4 h-4 mr-2" />
                
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 flex items-center ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Priority
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      priority === p
                        ? p === 'high' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                          : p === 'medium' 
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/25' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25'
                        : state.settings.darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 flex items-center ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <Calendar className="w-4 h-4 mr-2" />
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="e.g., Brand preference, special instructions"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className={`flex items-center space-x-3 ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Eco-Friendly</span>
              </label>
              <button
                type="button"
                onClick={() => setIsEcoFriendly(!isEcoFriendly)}
                className={`w-14 h-7 rounded-full transition-all duration-300 ${
                  isEcoFriendly ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                  isEcoFriendly ? 'translate-x-7' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 flex items-center ${
                state.settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handlePhotoCapture}
                  disabled={isCapturing}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    state.settings.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{isCapturing ? 'Capturing...' : 'Update Photo'}</span>
                </button>
                {photo && (
                  <div className="relative">
                    <img src={photo} alt="Preview" className="w-14 h-14 object-cover rounded-xl shadow-md" />
                    <button
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  state.settings.darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
              >
                <Edit className="w-4 h-4" />
                <span>Update Item</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};