import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { categoryService, Category, Subcategory } from '../../services/categoryService';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX } from 'react-icons/fi';
import { useCategories } from '../../context/CategoriesContext';

export function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState<string>('');
  const { refreshCategories } = useCategories();

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    const res = await categoryService.getCategories();
    if (res.success && res.data) {
      setCategories(res.data);
    } else {
      setError(res.error || 'Failed to load categories');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    const res = await categoryService.addCategory({
      name: name.trim(),
      description: description.trim(),
      icon: '📦',
      subcategories: []
    } as any);
    if (res.success) {
      setName('');
      setDescription('');
      await loadCategories();
      await refreshCategories();
      alert('Category added');
    } else {
      alert(res.error || 'Failed to add category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    const res = await categoryService.deleteCategory(id);
    if (res.success) {
      await loadCategories();
      await refreshCategories();
    } else {
      alert(res.error || 'Failed to delete category');
    }
  };

  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcategoryName.trim() || !selectedCategoryForSub) return;
    
    const category = categories.find(c => c.id === selectedCategoryForSub);
    if (!category) return;

    const newSubcategory: Subcategory = {
      id: `${category.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: newSubcategoryName.trim(),
      path: `/${category.name.toLowerCase()}/${newSubcategoryName.toLowerCase().replace(/\s+/g, '-')}`,
      icon: '📦'
    };

    const updatedSubcategories = [...(category.subcategories || []), newSubcategory];
    
    const res = await categoryService.updateCategory(selectedCategoryForSub, {
      subcategories: updatedSubcategories
    });
    
    if (res.success) {
      setNewSubcategoryName('');
      setSelectedCategoryForSub('');
      await loadCategories();
      await refreshCategories();
      alert('Subcategory added successfully');
    } else {
      alert(res.error || 'Failed to add subcategory');
    }
  };

  const handleDeleteSubcategory = async (categoryId: string, subcategoryId: string) => {
    if (!confirm('Delete this subcategory?')) return;
    
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const updatedSubcategories = category.subcategories?.filter(sub => sub.id !== subcategoryId) || [];
    
    const res = await categoryService.updateCategory(categoryId, {
      subcategories: updatedSubcategories
    });
    
    if (res.success) {
      await loadCategories();
      await refreshCategories();
      alert('Subcategory deleted successfully');
    } else {
      alert(res.error || 'Failed to delete subcategory');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleAdd} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button className="btn-primary flex items-center justify-center">
            <FiPlus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </form>

        {/* Add Subcategory Form */}
        <form onSubmit={handleAddSubcategory} className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Subcategory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={selectedCategoryForSub}
              onChange={(e) => setSelectedCategoryForSub(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              placeholder="Subcategory name"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button 
              type="submit"
              disabled={!selectedCategoryForSub || !newSubcategoryName.trim()}
              className="btn-primary flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Subcategory
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-6 text-gray-600">Loading...</div>
          ) : error ? (
            <div className="p-6 text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((c) => (
                    <React.Fragment key={c.id}>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{c.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span>{c.subcategories?.length || 0} subcategories</span>
                            <button
                              onClick={() => setEditingCategory(editingCategory === c.id ? null : c.id)}
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              {editingCategory === c.id ? 'Hide' : 'Manage'}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {editingCategory === c.id && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">Subcategories for {c.name}</h4>
                              {c.subcategories && c.subcategories.length > 0 ? (
                                <div className="space-y-2">
                                  {c.subcategories.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                      <div>
                                        <span className="font-medium text-gray-900">{sub.name}</span>
                                        <span className="text-sm text-gray-500 ml-2">({sub.path})</span>
                                      </div>
                                      <button
                                        onClick={() => handleDeleteSubcategory(c.id, sub.id)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <FiTrash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">No subcategories yet</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}