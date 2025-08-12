import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTruck, FiShield, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils';

export function ProductGrid() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      const price = Number(priceRange);
      if (price === 10000) {
        filtered = filtered.filter(p => (p.salePrice || p.price) < 10000);
      } else if (price === 50000) {
        filtered = filtered.filter(p => (p.salePrice || p.price) >= 10000 && (p.salePrice || p.price) < 50000);
      } else if (price === 100000) {
        filtered = filtered.filter(p => (p.salePrice || p.price) >= 50000 && (p.salePrice || p.price) < 100000);
      } else if (price === 999999) {
        filtered = filtered.filter(p => (p.salePrice || p.price) >= 100000);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // featured
        // Featured products first, then by name
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.localeCompare(b.name);
        });
    }

    return filtered;
  }, [products, filterCategory, priceRange, sortBy]);

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Filter Bar Loading */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          
          {/* Products Grid Loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-8 border border-orange-200">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Premium Dental Equipment & Supplies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our extensive collection of professional dental equipment, chairs, consumables, and student kits. 
            All products are genuine and come with manufacturer warranties.
          </p>
        </div>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Prices</option>
              <option value="10000">Under KES 10,000</option>
              <option value="50000">KES 10,000 - 50,000</option>
              <option value="100000">KES 50,000 - 100,000</option>
              <option value="999999">Over KES 100,000</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Results Count */}
            <span className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} products
            </span>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        : "space-y-6"
      }>
        {filteredAndSortedProducts.map((product) => (
                      <div 
              key={product.id} 
              className={`group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-500 ${
                viewMode === 'list' ? 'flex p-6' : 'hover:-translate-y-2 hover:scale-105'
              }`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Badge Container */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  NEW
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  FEATURED
                </span>
              )}
              {product.originalPrice && product.price < product.originalPrice && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => handleWishlistToggle(product, e)}
              className="absolute top-2 right-2 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-white"
            >
              <FiHeart className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
            </button>

            {/* Product Image */}
            <Link to={`/product/${product.id}`} className={`block relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full'}`}>
              <div className={`relative overflow-hidden bg-gray-50 flex items-center justify-center ${viewMode === 'list' ? 'h-full rounded-md' : 'aspect-square h-48'}`}>
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Quick Actions - Grid Mode Only */}
                {viewMode === 'grid' && (
                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 transition-all duration-300 ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                      onClick={(e) => handleQuickView(product, e)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <FiEye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="p-2 bg-orange-500 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-orange-600"
                    >
                      <FiShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </Link>

            {/* Product Information */}
            <div className={`${viewMode === 'list' ? 'flex-1 ml-4' : 'p-4'}`}>
              {/* Category */}
              <div className="mb-1">
                <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <Link to={`/product/${product.id}`}>
                <h3 className={`font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200 line-clamp-2 ${viewMode === 'list' ? 'text-lg mb-2' : 'text-sm mb-2'}`}>
                  {product.name}
                </h3>
              </Link>

              {/* Rating & Reviews */}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  ({product.reviewCount || Math.floor(Math.random() * 100) + 10})
                </span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-baseline space-x-1">
                  <span className={`font-bold text-gray-900 ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                  <div className="text-xs text-green-600 font-medium">
                    Save {formatPrice(product.originalPrice - (product.salePrice || product.price))}
                  </div>
                )}
              </div>

              {/* Trust Signals */}
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <div className="flex items-center">
                  <FiTruck className="w-3 h-3 mr-1" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <FiShield className="w-3 h-3 mr-1" />
                  <span>Warranty</span>
                </div>
              </div>

              {/* Stock Status & Add to Cart */}
              <div className="space-y-2">
                {(product.stock || 10) > 0 ? (
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 font-medium">
                      {(product.stock || 10) > 5 ? 'In Stock' : `Only ${product.stock || Math.floor(Math.random() * 5) + 1} left`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!(product.stock || 10)}
                  className={`w-full py-2 px-3 rounded-md font-medium transition-all duration-200 ${
                    (product.stock || 10) > 0
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  } ${viewMode === 'list' ? 'text-sm' : 'text-xs'}`}
                >
                  {(product.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No products found</div>
          <div className="text-gray-400">Try adjusting your filters or search terms</div>
        </div>
      )}
    </div>
  );
}