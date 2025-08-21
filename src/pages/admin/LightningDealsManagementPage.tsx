import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiUpload, FiImage } from 'react-icons/fi';

interface LightningDeal {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  sold: string;
  badge: string;
  rating: number;
  reviews: number;
  is_new: boolean;
  description: string;
}

export function LightningDealsManagementPage() {
  const [deals, setDeals] = useState<LightningDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDeal, setEditingDeal] = useState<string | null>(null);
  const [newDeal, setNewDeal] = useState<Partial<LightningDeal>>({
    name: '',
    image: '',
    price: '',
    originalPrice: '',
    sold: '',
    badge: '',
    rating: 0,
    reviews: 0,
    is_new: false,
    description: ''
  });

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      // For now, use mock data - in production, this would fetch from API
      const mockDeals: LightningDeal[] = [
        {
          id: '1',
          name: 'Professional Dental Handpiece Set',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
          price: 'KES 45,000',
          originalPrice: 'KES 65,000',
          sold: '156 sold',
          badge: 'Local',
          rating: 4.8,
          reviews: 89,
          is_new: false,
          description: 'High-quality dental handpiece set with multiple attachments for various dental procedures.'
        },
        {
          id: '2',
          name: 'Digital X-Ray Sensor Kit',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
          price: 'KES 125,000',
          originalPrice: 'KES 180,000',
          sold: '2.1K+ sold',
          badge: 'Best Seller',
          rating: 4.9,
          reviews: 234,
          is_new: false,
          description: 'Advanced digital X-ray sensor kit with high resolution imaging.'
        }
      ];
      setDeals(mockDeals);
    } catch (err) {
      setError('Failed to load lightning deals');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.name?.trim() || !newDeal.price?.trim()) return;

    const dealToAdd: LightningDeal = {
      id: Date.now().toString(),
      name: newDeal.name.trim(),
      image: newDeal.image || 'https://via.placeholder.com/400x400?text=No+Image',
      price: newDeal.price.trim(),
      originalPrice: newDeal.originalPrice || newDeal.price.trim(),
      sold: newDeal.sold || '0 sold',
      badge: newDeal.badge || 'New',
      rating: newDeal.rating || 0,
      reviews: newDeal.reviews || 0,
      is_new: newDeal.is_new || true,
      description: newDeal.description || ''
    };

    // In production, this would be an API call
    setDeals(prev => [...prev, dealToAdd]);
    setNewDeal({
      name: '',
      image: '',
      price: '',
      originalPrice: '',
      sold: '',
      badge: '',
      rating: 0,
      reviews: 0,
      is_new: false,
      description: ''
    });
    alert('Lightning deal added successfully');
  };

  const handleDeleteDeal = async (id: string) => {
    if (!confirm('Delete this lightning deal?')) return;
    // In production, this would be an API call
    setDeals(prev => prev.filter(deal => deal.id !== id));
    alert('Lightning deal deleted successfully');
  };

  const handleImageUpload = (dealId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setDeals(prev => prev.map(deal => 
          deal.id === dealId ? { ...deal, image: imageUrl } : deal
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewDealImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setNewDeal(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lightning Deals Management</h1>
          <p className="text-gray-600">Manage lightning deals products and their photos</p>
        </div>

        {/* Add New Lightning Deal Form */}
        <form onSubmit={handleAddDeal} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Lightning Deal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={newDeal.name || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={newDeal.price || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, price: e.target.value }))}
                placeholder="KES 45,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
              <input
                type="text"
                value={newDeal.originalPrice || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, originalPrice: e.target.value }))}
                placeholder="KES 65,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
              <select
                value={newDeal.badge || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, badge: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Badge</option>
                <option value="Local">Local</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Hot">Hot</option>
                <option value="Premium">Premium</option>
                <option value="Essential">Essential</option>
                <option value="New">New</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={newDeal.rating || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                placeholder="4.8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reviews Count</label>
              <input
                type="number"
                value={newDeal.reviews || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, reviews: parseInt(e.target.value) || 0 }))}
                placeholder="89"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newDeal.description || ''}
                onChange={(e) => setNewDeal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Product description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewDealImageUpload}
                  className="hidden"
                  id="new-deal-image-upload"
                />
                <label
                  htmlFor="new-deal-image-upload"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <FiUpload className="w-4 h-4" />
                  <span>Upload Image</span>
                </label>
                {newDeal.image && (
                  <img src={newDeal.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newDeal.is_new || false}
                  onChange={(e) => setNewDeal(prev => ({ ...prev, is_new: e.target.checked }))}
                  className="form-checkbox h-4 w-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Mark as New Product</span>
              </label>
              
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <FiPlus className="w-4 h-4" />
                <span>Add Lightning Deal</span>
              </button>
            </div>
          </div>
        </form>

        {/* Lightning Deals List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Current Lightning Deals</h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-gray-600">Loading...</div>
          ) : error ? (
            <div className="p-6 text-red-600">{error}</div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(deal.id, e)}
                          className="hidden"
                          id={`image-upload-${deal.id}`}
                        />
                        <label
                          htmlFor={`image-upload-${deal.id}`}
                          className="bg-white/80 hover:bg-white p-2 rounded-full cursor-pointer transition-colors"
                        >
                          <FiImage className="w-4 h-4 text-gray-700" />
                        </label>
                        <button
                          onClick={() => handleDeleteDeal(deal.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {deal.badge && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {deal.badge}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{deal.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-green-600">{deal.price}</span>
                        {deal.originalPrice !== deal.price && (
                          <span className="text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{deal.sold}</span>
                        <span>⭐ {deal.rating} ({deal.reviews})</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{deal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {deals.length === 0 && (
                <div className="text-center py-12">
                  <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No lightning deals yet</p>
                  <p className="text-sm text-gray-400">Add your first lightning deal above</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}