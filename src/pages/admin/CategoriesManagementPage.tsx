import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useCategories, Category, Subcategory } from '../../context/CategoriesContext';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiSave, FiX } from 'react-icons/fi';

export function CategoriesManagementPage() {
  const { categories, addCategory, updateCategory, deleteCategory, addSubcategory, updateSubcategory, deleteSubcategory } = useCategories();
  
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<{categoryId: string, subcategoryId: string} | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '🔬',
    color: 'text-blue-600'
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: '',
    path: '',
    icon: '📦'
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    if (categoryForm.name.trim()) {
      addCategory({
        name: categoryForm.name,
        icon: categoryForm.icon,
        color: categoryForm.color,
        subcategories: []
      });
      setCategoryForm({ name: '', icon: '🔬', color: 'text-blue-600' });
      setShowAddCategory(false);
    }
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (subcategoryForm.name.trim() && subcategoryForm.path.trim()) {
      addSubcategory(categoryId, {
        name: subcategoryForm.name,
        path: subcategoryForm.path,
        icon: subcategoryForm.icon
      });
      setSubcategoryForm({ name: '', path: '', icon: '📦' });
      setShowAddSubcategory(null);
    }
  };

  const handleUpdateCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && categoryForm.name.trim()) {
      updateCategory(categoryId, {
        name: categoryForm.name,
        icon: categoryForm.icon,
        color: categoryForm.color
      });
      setCategoryForm({ name: '', icon: '🔬', color: 'text-blue-600' });
      setEditingCategory(null);
    }
  };

  const handleUpdateSubcategory = (categoryId: string, subcategoryId: string) => {
    if (subcategoryForm.name.trim() && subcategoryForm.path.trim()) {
      updateSubcategory(categoryId, subcategoryId, {
        name: subcategoryForm.name,
        path: subcategoryForm.path,
        icon: subcategoryForm.icon
      });
      setSubcategoryForm({ name: '', path: '', icon: '📦' });
      setEditingSubcategory(null);
    }
  };

  const startEditCategory = (category: Category) => {
    setCategoryForm({
      name: category.name,
      icon: category.icon as string,
      color: category.color
    });
    setEditingCategory(category.id);
  };

  const startEditSubcategory = (subcategory: Subcategory, categoryId: string) => {
    setSubcategoryForm({
      name: subcategory.name,
      path: subcategory.path,
      icon: subcategory.icon
    });
    setEditingSubcategory({ categoryId, subcategoryId: subcategory.id });
  };

  const colorOptions = [
    'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600',
    'text-indigo-600', 'text-orange-600', 'text-teal-600', 'text-pink-600',
    'text-yellow-600', 'text-gray-600', 'text-emerald-600', 'text-amber-600'
  ];

  const iconOptions = [
    '🔬', '🪑', '✂️', '🔧', '📷', '📦', '💧', '❤️', '⭐', '👥', '🛡️'
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <button
            onClick={() => setShowAddCategory(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Add Category Form */}
        {showAddCategory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color} value={color}>{color.replace('text-', '').replace('-600', '')}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Category
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              {/* Category Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedCategories.includes(category.id) ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color.replace('text-', 'bg-').replace('-600', '-100')} ${category.color}`}>
                      {category.color.replace('text-', '').replace('-600', '')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingCategory === category.id ? (
                      <>
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <FiSave className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditCategory(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowAddSubcategory(showAddSubcategory === category.id ? null : category.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {expandedCategories.includes(category.id) && (
                <div className="p-4">
                  {/* Add Subcategory Form */}
                  {showAddSubcategory === category.id && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Subcategory</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={subcategoryForm.name}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, name: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Subcategory name"
                        />
                        <input
                          type="text"
                          value={subcategoryForm.path}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, path: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="/products?category=..."
                        />
                        <select
                          value={subcategoryForm.icon}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => setShowAddSubcategory(null)}
                          className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddSubcategory(category.id)}
                          className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Subcategories List */}
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{subcategory.icon}</span>
                          {editingSubcategory?.categoryId === category.id && editingSubcategory?.subcategoryId === subcategory.id ? (
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={subcategoryForm.name}
                                onChange={(e) => setSubcategoryForm(prev => ({ ...prev, name: e.target.value }))}
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-32"
                              />
                              <input
                                type="text"
                                value={subcategoryForm.path}
                                onChange={(e) => setSubcategoryForm(prev => ({ ...prev, path: e.target.value }))}
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-48"
                              />
                            </div>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">{subcategory.name}</div>
                              <div className="text-sm text-gray-500">{subcategory.path}</div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {editingSubcategory?.categoryId === category.id && editingSubcategory?.subcategoryId === subcategory.id ? (
                            <>
                              <button
                                onClick={() => handleUpdateSubcategory(category.id, subcategory.id)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                              >
                                <FiSave className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingSubcategory(null)}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditSubcategory(subcategory, category.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteSubcategory(category.id, subcategory.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}