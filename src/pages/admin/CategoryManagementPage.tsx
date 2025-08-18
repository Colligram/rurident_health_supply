import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPlus, FiEdit, FiTrash2, FiTag, FiSave, FiX } from 'react-icons/fi';
import { categoryService, Category, Subcategory } from '../../services/categoryService';

export function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    subcategories: [] as Subcategory[]
  });
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: '',
    path: '',
    icon: ''
  });

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await categoryService.getCategories();
      if (result.success && result.data) {
        setCategories(result.data);
      } else {
        console.error('Failed to load categories:', result.error);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '', subcategories: [] });
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      subcategories: category.subcategories || []
    });
    setShowModal(true);
  };

  const handleAddSubcategory = () => {
    if (!subcategoryForm.name.trim()) {
      alert('Subcategory name is required');
      return;
    }
    
    const newSubcategory: Subcategory = {
      id: Date.now().toString(),
      name: subcategoryForm.name,
      path: subcategoryForm.path || `/products?category=${subcategoryForm.name.toLowerCase().replace(/\s+/g, '-')}`,
      icon: subcategoryForm.icon || '📦'
    };
    
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, newSubcategory]
    });
    
    setSubcategoryForm({ name: '', path: '', icon: '' });
  };

  const handleRemoveSubcategory = (subcategoryId: string) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter(sub => sub.id !== subcategoryId)
    });
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        const result = await categoryService.deleteCategory(categoryId);
        if (result.success) {
          await loadCategories(); // Reload categories after deletion
        } else {
          alert('Failed to delete category: ' + result.error);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        // Update existing category
        const result = await categoryService.updateCategory(editingCategory.id, formData);
        if (!result.success) {
          alert('Failed to update category: ' + result.error);
          return;
        }
      } else {
        // Add new category
        const result = await categoryService.addCategory(formData);
        if (!result.success) {
          alert('Failed to add category: ' + result.error);
          return;
        }
      }

      await loadCategories(); // Reload categories after save
      setShowModal(false);
      setFormData({ name: '', description: '', icon: '', subcategories: [] });
      setSubcategoryForm({ name: '', path: '', icon: '' });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const emojiOptions = ['🦷', '⚙️', '📦', '🎓', '🔧', '🔬', '🩺', '📷', '💉', '🧪', '🔪', '📍', '⚡', '💧', '✂️', '🦴', '🧬', '💎', '🧵', '🔗', '📏', '📸', '📹', '🖥️', '📐', '🔄', '🧤', '👤', '🔮', '🧽', '🔩'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
            <span className="text-lg text-gray-600">Loading categories...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
              <p className="text-gray-600 mt-2">Manage product categories and subcategories</p>
            </div>
            <button
              onClick={handleAddCategory}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Subcategories ({category.subcategories.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span key={sub.id} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {sub.icon} {sub.name}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <FiTag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first category</p>
            <button
              onClick={handleAddCategory}
              className="btn-primary"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: emoji })}
                        className={`text-2xl p-2 rounded-lg border-2 transition-colors ${
                          formData.icon === emoji 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Or enter custom emoji/icon"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Subcategories Management */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategories
                  </label>
                  
                  {/* Add Subcategory Form */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Subcategory</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        value={subcategoryForm.name}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                        placeholder="Subcategory name"
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={subcategoryForm.path}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, path: e.target.value })}
                        placeholder="Path (optional, auto-generated if empty)"
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={subcategoryForm.icon}
                          onChange={(e) => setSubcategoryForm({ ...subcategoryForm, icon: e.target.value })}
                          placeholder="Icon (emoji)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={handleAddSubcategory}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Existing Subcategories */}
                  {formData.subcategories.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Current Subcategories</h4>
                      {formData.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{subcategory.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{subcategory.name}</p>
                              <p className="text-xs text-gray-500">{subcategory.path}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveSubcategory(subcategory.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', description: '', icon: '', subcategories: [] });
                    setSubcategoryForm({ name: '', path: '', icon: '' });
                    setEditingCategory(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{editingCategory ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}