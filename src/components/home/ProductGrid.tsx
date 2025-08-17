import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTruck, FiShield, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';
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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={`product-grid-skeleton-${i}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="skeleton h-48 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-6 w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls - Mobile Optimized */}
      <div className="mb-4">
        {/* Mobile Filters - Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent whitespace-nowrap flex-shrink-0"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent whitespace-nowrap flex-shrink-0"
          >
            <option value="all">All Prices</option>
            <option value="10000">Under 10K</option>
            <option value="50000">10K - 50K</option>
            <option value="100000">50K - 100K</option>
            <option value="999999">Over 100K</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent whitespace-nowrap flex-shrink-0"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price ↑</option>
            <option value="price-high">Price ↓</option>
            <option value="name">Name A-Z</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* View Mode Toggle - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex justify-end">
          <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile Optimized 2-column layout */}
      <div className={`grid gap-3 md:gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
              viewMode === 'list' ? 'flex' : ''
            }`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image */}
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center'}
                alt={product.name}
                className={`w-full object-cover transition-transform duration-300 ${
                  hoveredProduct === product.id ? 'scale-105' : 'scale-100'
                } ${viewMode === 'list' ? 'h-48' : 'h-32 md:h-48'}`}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Dental+Product';
                }}
              />
              
              {/* Badges */}
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  NEW
                </div>
              )}
              {product.isFeatured && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  FEATURED
                </div>
              )}
              
              {/* Quick Actions - Always visible on mobile, hover on desktop */}
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                hoveredProduct === product.id ? 'opacity-100' : 'md:opacity-0 opacity-100'
              }`}>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <button
                    onClick={(e) => handleQuickView(product, e)}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    title="Quick View"
                  >
                    <FiEye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors duration-200 ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <FiHeart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product Info - Mobile Optimized */}
            <div className={`p-2 md:p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="mb-2 md:mb-3">
                <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-1 md:mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating - Simplified for mobile */}
                <div className="flex items-center space-x-1 mb-1 md:mb-2">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={`rating-${product.id}-${i}`}
                        className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                          i < (product.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
                </div>
                
                {/* Seller Info - Hidden on small screens */}
                {product.seller && (
                  <div className="hidden md:flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Star seller
                    </span>
                    <span className="text-xs text-gray-500">Brand: {product.brand || 'Rurident'}</span>
                  </div>
                )}
              </div>
              
              {/* Price - Mobile Optimized */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-sm md:text-lg font-bold text-orange-600">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-xs md:text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {product.soldCount && (
                  <span className="text-xs text-gray-500">{product.soldCount} sold</span>
                )}
              </div>
              
              {/* Action Button - Mobile Optimized */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 md:py-2 px-2 md:px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-sm"
              >
                <FiShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Message */}
      {filteredAndSortedProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFilter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setFilterCategory('all');
              setPriceRange('all');
              setSortBy('featured');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Product Detail Popup Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-1/2">
                  <img 
                    src={selectedProduct.images?.[0] || 'https://via.placeholder.com/400x400?text=Dental+Product'} 
                    alt={selectedProduct.name}
                    className="w-full h-64 md:h-96 object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                  />
                </div>
                
                {/* Product Details */}
                <div className="md:w-1/2 p-6">
                  <div className="mb-4">
                    <span className="text-xs text-orange-600 font-bold uppercase tracking-wide bg-orange-50 px-2 py-1 rounded">
                      {selectedProduct.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={`modal-rating-${selectedProduct.id}-${i}`}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating || 4.5)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({selectedProduct.reviewCount || Math.floor(Math.random() * 100) + 10} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(selectedProduct.salePrice || selectedProduct.price)}
                      </span>
                      {selectedProduct.originalPrice && selectedProduct.originalPrice > (selectedProduct.salePrice || selectedProduct.price) && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > (selectedProduct.salePrice || selectedProduct.price) && (
                      <div className="text-sm text-green-600 font-medium">
                        You save {formatPrice(selectedProduct.originalPrice - (selectedProduct.salePrice || selectedProduct.price))}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedProduct.description || `High-quality dental equipment from ${selectedProduct.brand || 'Rurident'}. This product meets international standards and comes with manufacturer warranty. Perfect for professional dental practices and students.`}
                  </p>
                  
                  {/* Trust Signals */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6 border-t border-b border-gray-100 py-4">
                    <div className="flex items-center">
                      <FiTruck className="w-4 h-4 mr-2" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <FiShield className="w-4 h-4 mr-2" />
                      <span>Warranty Included</span>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 mr-2" />
                      <span>Top Quality</span>
                    </div>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="mb-6">
                    {(selectedProduct.stock || 10) > 0 ? (
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600 font-medium">
                          {(selectedProduct.stock || 10) > 5 ? 'In Stock' : `Only ${selectedProduct.stock || Math.floor(Math.random() * 5) + 1} left`}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button 
                      onClick={(e) => handleAddToCart(selectedProduct, e)}
                      disabled={!(selectedProduct.stock || 10)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                        (selectedProduct.stock || 10) > 0
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span>{(selectedProduct.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                    <button 
                      onClick={(e) => handleWishlistToggle(selectedProduct, e)}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        isInWishlist(selectedProduct.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FiHeart className={`w-4 h-4 ${isInWishlist(selectedProduct.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  {/* View Full Details Link */}
                  <div className="mt-4 text-center">
                    <Link
                      to={`/product/${selectedProduct.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                      onClick={closeModal}
                    >
                      View Full Product Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}