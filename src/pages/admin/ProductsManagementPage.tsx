import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiDownload, FiPackage, FiGrid, FiList } from 'react-icons/fi';
import { formatPrice } from '../../utils';
import { useProducts } from '../../context/ProductsContext';

// Mock products data - in production this would come from your backend
const mockProducts = [
  {
    id: '1',
    name: 'Premium Dental Chair Unit',
    category: 'Dental Chairs',
    price: 450000,
    stock: 5,
    status: 'active',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Digital X-Ray System',
    category: 'Equipment',
    price: 280000,
    stock: 3,
    status: 'active',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Complete Student Kit',
    category: 'Student Kits',
    price: 25000,
    stock: 12,
    status: 'active',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Composite Filling Kit',
    category: 'Materials',
    price: 8500,
    stock: 0,
    status: 'out_of_stock',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-12'
  }
];

export function ProductsManagementPage() {
  const { products, deleteProduct, toggleProductSelection } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const categories = ['all', 'Dental Chairs', 'Equipment', 'Student Kits', 'Materials', 'Consumables'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0 && confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      selectedProducts.forEach(productId => deleteProduct(productId));
      setSelectedProducts([]);
    }
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Out of Stock</span>;
    }
    if (stock <= 5) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Low Stock</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">In Stock</span>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            {selectedProducts.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Delete ({selectedProducts.length})
              </button>
            )}
            <Link to="/admin/products/new" className="btn-primary">
              <FiPlus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock > 0).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock === 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 hidden sm:inline">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${
                    viewMode === 'table' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.images[0] || 'https://via.placeholder.com/48'}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.inStock ? 'active' : 'out_of_stock', product.stock)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Product"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Product"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Product"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first product'
                  }
                </p>
                {!searchTerm && selectedCategory === 'all' && (
                  <Link to="/admin/products/new" className="btn-primary">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Product
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Grid View - 2 columns on mobile, responsive scaling */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiPackage className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      className="rounded border-gray-300 focus:ring-primary-500"
                    />
                  </div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-2 right-2">
                    {getStockBadge(product.stock)}
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">{product.name}</h3>
                  
                  {/* Category */}
                  <p className="text-xs md:text-sm text-gray-600 mb-2">{product.category}</p>
                  
                  {/* Price */}
                  <div className="mb-3">
                    <span className="font-bold text-gray-900 text-sm md:text-base">
                      {formatPrice(product.salePrice || product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                      <span className="text-xs text-gray-500 line-through ml-1">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-1">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FiEdit className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* No Products Message for Grid View */}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first product'
                  }
                </p>
                {!searchTerm && selectedCategory === 'all' && (
                  <Link to="/admin/products/new" className="btn-primary">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Product
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}