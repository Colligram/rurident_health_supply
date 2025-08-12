import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPlus, FiEdit, FiTrash2, FiTag, FiSave, FiX } from 'react-icons/fi';

interface Subcategory {
  id: string;
  name: string;
  path: string;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  subcategories: Subcategory[];
}

export function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: '1', 
      name: 'Dental Laboratory', 
      description: 'Laboratory equipment and tools for dental technicians', 
      icon: '🔬', 
      createdAt: '2024-01-01',
      subcategories: [
        { id: 'dl1', name: 'Crown and Bridge', path: '/products?category=crown-and-bridge', icon: '👑' },
        { id: 'dl2', name: 'Orthodontics', path: '/products?category=orthodontics', icon: '🦷' },
        { id: 'dl3', name: 'Complete Dentures', path: '/products?category=complete-dentures', icon: '🦴' },
        { id: 'dl4', name: 'Partial Dentures (Cobalt Chrome)', path: '/products?category=partial-dentures-cobalt-chrome', icon: '⚙️' }
      ]
    },
    { 
      id: '2', 
      name: 'Dental Chairs', 
      description: 'Professional dental chairs and units', 
      icon: '🪑', 
      createdAt: '2024-01-01',
      subcategories: [
        { id: 'dc1', name: 'Electric Chairs', path: '/products?category=electric-chairs', icon: '⚡' },
        { id: 'dc2', name: 'Hydraulic Chairs', path: '/products?category=hydraulic-chairs', icon: '💧' },
        { id: 'dc3', name: 'Portable Units', path: '/products?category=portable-units', icon: '📦' }
      ]
    },
    { 
      id: '3', 
      name: 'Equipment', 
      description: 'Medical and dental equipment', 
      icon: '⚙️', 
      createdAt: '2024-01-01',
      subcategories: [
        { id: 'eq1', name: 'Handpieces', path: '/products?category=handpieces', icon: '🔧' },
        { id: 'eq2', name: 'Scalers', path: '/products?category=scalers', icon: '🔪' },
        { id: 'eq3', name: 'Surgical Tools', path: '/products?category=surgical-tools', icon: '🩺' }
      ]
    },
    { 
      id: '4', 
      name: 'Consumables', 
      description: 'Daily use consumables and disposables', 
      icon: '📦', 
      createdAt: '2024-01-01',
      subcategories: [
        { id: 'cs1', name: 'Gloves', path: '/products?category=gloves', icon: '🧤' },
        { id: 'cs2', name: 'Masks', path: '/products?category=masks', icon: '😷' },
        { id: 'cs3', name: 'Dental Materials', path: '/products?category=dental-materials', icon: '🧪' }
      ]
    },
    { 
      id: '5', 
      name: 'Student Kits', 
      description: 'Complete student dental kits', 
      icon: '🎓', 
      createdAt: '2024-01-01',
      subcategories: [
        { id: 'sk1', name: 'Basic Kits', path: '/products?category=basic-kits', icon: '📚' },
        { id: 'sk2', name: 'Advanced Kits', path: '/products?category=advanced-kits', icon: '🔬' },
        { id: 'sk3', name: 'Specialty Kits', path: '/products?category=specialty-kits', icon: '⭐' }
      ]
    }
  ]);
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

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        subcategories: formData.subcategories || []
      };
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
    setFormData({ name: '', description: '', icon: '', subcategories: [] });
    setSubcategoryForm({ name: '', path: '', icon: '' });
    setEditingCategory(null);
  };

  const emojiOptions = ['🦷', '⚙️', '📦', '🎓', '🔧', '🔬', '🩺', '📷', '💉', '🧪', '🔪', '📍', '⚡', '💧', '✂️', '🦴', '🧬', '💎', '🧵', '🔗', '📏', '📸', '📹', '🖥️', '📐', '🔄', '🧤', '👤', '🔮', '🧽', '🔩'];

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