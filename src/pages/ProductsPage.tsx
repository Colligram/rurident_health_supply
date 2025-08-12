import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiSearch, FiFilter, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatPrice } from '../utils';

export function ProductsPage() {
  const { products, loading, error } = useProducts(); // Assuming these are provided by context
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all'); // Added for price filtering
  const [showInStockOnly, setShowInStockOnly] = useState(false); // Added for stock filtering

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 pt-32">
        <div className="container-max">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Get unique categories from products
  const categories = useMemo(() => {
    if (!products || !Array.isArray(products)) return ['all'];
    return ['all', ...new Set(products.map(p => p.category))];
  }, [products]);


  // Ensure wishlist is available before using it
  const safeWishlist = wishlist || [];

  // Filter products based on search term, category, price range, and stock
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price filtering
      const matchesPrice = (() => {
        const price = product.salePrice || product.price || 0;
        switch (priceRange) {
          case 'under-1000': return price < 1000;
          case '1000-5000': return price >= 1000 && price <= 5000;
          case '5000-10000': return price >= 5000 && price <= 10000;
          case 'over-10000': return price > 10000;
          default: return true;
        }
      })();

      // Stock filtering
      const matchesStock = showInStockOnly ? (product.stock || 0) > 0 : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [products, searchTerm, selectedCategory, priceRange, showInStockOnly]);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    // Navigate to cart page after adding product
    navigate('/cart');
  };

  const toggleWishlist = (product: any) => {
    const isInWishlist = safeWishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return safeWishlist.some(item => item.id === productId);
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return [];

    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price-low':
          return (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0);
        case 'price-high':
          return (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container-max py-4 md:py-6">
        {/* Page Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Products</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover our comprehensive range of dental supplies and equipment
          </p>
        </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-56 text-sm"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                {/* Price Range Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1000">Under $1000</option>
                  <option value="1000-5000">$1000 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="over-10000">Over $10000</option>
                </select>
              </div>

              {/* Sort and Stock Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* In Stock Filter */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="in-stock"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-primary-600 rounded"
                  />
                  <label htmlFor="in-stock" className="text-sm font-medium text-gray-700">In Stock Only</label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 px-2">
            <p className="text-gray-600 text-sm">
              Showing {filteredProducts.length} of {products?.length || 0} products
            </p>
          </div>

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid - AliExpress Style */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {sortedProducts.length > 0 ? sortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105 group">
                  <div className="relative">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/200x200?text=No+Image'}
                      alt={product.name || 'Product Image'}
                      className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.salePrice && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                        Sale
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-1 right-1 bg-gray-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-1 right-1 p-1.5 rounded-full transition-all duration-200 ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white shadow-md'
                          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                      }`}
                    >
                      <FiHeart className={`w-3 h-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-2 md:p-3">
                    <div className="mb-1">
                      <span className="text-xs text-primary-600 font-medium">
                        {product.category || 'Uncategorized'}
                      </span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">
                      <Link
                        to={`/product/${product.id}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {product.name || 'Product Name Unavailable'}
                      </Link>
                    </h3>

                    {/* Rating */}
                    {product.rating && product.rating > 0 && (
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({product.reviewCount || 0})
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm md:text-base font-bold text-gray-900">
                          {formatPrice(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && (
                          <span className="text-xs text-gray-500 line-through">
                            {formatPrice(product.originalPrice || product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-2">
                      {product.stock && product.stock > 0 ? (
                        <span className="text-xs text-green-600 font-medium">
                          {product.stock} in stock
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-medium">
                          Out of stock
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-1.5 px-2 rounded-md font-medium transition-all duration-200 text-xs flex items-center justify-center space-x-1 ${
                        product.inStock
                          ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <FiShoppingCart className="w-3 h-3" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                      setShowInStockOnly(false);
                    }}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
  );
}