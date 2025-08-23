import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { productMappingService, CreateProductMappingRequest } from '../../services/productMappingService';
import { useCategories } from '../../context/CategoriesContext';

interface AddProductMappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (mapping: { productName: string; subcategory: string; category?: string }) => void;
  initialProductName?: string;
}

export function AddProductMappingModal({
  isOpen,
  onClose,
  onSuccess,
  initialProductName = ''
}: AddProductMappingModalProps) {
  const { categories, loading: loadingCategories } = useCategories();
  const [formData, setFormData] = useState<CreateProductMappingRequest>({
    productName: '',
    subcategory: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        productName: initialProductName,
        subcategory: '',
        category: ''
      });
      setError(null);
    }
  }, [isOpen, initialProductName]);

  // Get all subcategories from categories
  const allSubcategories = categories?.flatMap(cat => 
    cat.subcategories?.map(sub => ({
      name: sub.name,
      category: cat.name
    })) || []
  ) || [];

  const handleInputChange = (field: keyof CreateProductMappingRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubcategoryChange = (subcategoryName: string) => {
    const subcategoryInfo = allSubcategories.find(sub => sub.name === subcategoryName);
    setFormData(prev => ({
      ...prev,
      subcategory: subcategoryName,
      category: subcategoryInfo?.category || prev.category
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName.trim() || !formData.subcategory.trim()) {
      setError('Product name and subcategory are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await productMappingService.createMapping({
        productName: formData.productName.trim(),
        subcategory: formData.subcategory.trim(),
        category: formData.category?.trim() || undefined
      });

      // Call success callback
      onSuccess({
        productName: result.mapping.productName,
        subcategory: result.mapping.subcategory,
        category: result.mapping.category
      });

      onClose();
    } catch (error: any) {
      setError(error.message || 'Failed to create product mapping. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Product Mapping
            </h3>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory *
              </label>
              {allSubcategories.length > 0 ? (
                <select
                  required
                  value={formData.subcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isSubmitting || loadingCategories}
                >
                  <option value="">Select subcategory</option>
                  {allSubcategories.map((sub, index) => (
                    <option key={`${sub.name}-${index}`} value={sub.name}>
                      {sub.name} ({sub.category})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter subcategory"
                  disabled={isSubmitting}
                />
              )}
            </div>

            {/* Category (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Category (auto-filled from subcategory)"
                disabled={isSubmitting}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.productName.trim() || !formData.subcategory.trim()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Adding...' : 'Add Mapping'}
              </button>
            </div>
          </form>

          {/* Example */}
          <div className="px-6 pb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                <strong>Example:</strong> Product "Biofilm Remover" → Subcategory "Periodontal" → Category "Clinical Machines & Equipment"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}