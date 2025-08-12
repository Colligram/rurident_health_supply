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
            Rurident Health Supplies
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
            Your trusted dental partner
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading supplier of dental equipment, chairs, consumables and student kits in Kenya. 
            Serving hospitals, clinics, technicians and dental students nationwide with quality products and reliable service.
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

      {/* Products Grid - Mobile-First Design */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4"
        : "space-y-6"
      }>
        {filteredAndSortedProducts.map((product) => (
          viewMode === 'list' ? (
            // List View (Detailed)
            <div 
              key={product.id} 
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex p-4"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <div className="relative overflow-hidden bg-gray-50 rounded-lg h-full flex items-center justify-center">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200 text-sm mb-1">
                  {product.name}
                </h3>
                
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

                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="font-bold text-gray-900 text-base">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                  <div className="text-xs text-green-600 font-medium mb-2">
                    Save {formatPrice(product.originalPrice - (product.salePrice || product.price))}
                  </div>
                )}

                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <FiTruck className="w-3 h-3 mr-1" />
                  <span className="mr-3">Fast Delivery</span>
                  <FiShield className="w-3 h-3 mr-1" />
                  <span>Warranty</span>
                </div>

                {(product.stock || 10) > 0 ? (
                  <div className="flex items-center text-xs mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 font-medium">
                      {(product.stock || 10) > 5 ? 'In Stock' : `Only ${product.stock || Math.floor(Math.random() * 5) + 1} left`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={(e) => handleQuickView(product, e)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  View
                </button>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!(product.stock || 10)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    (product.stock || 10) > 0
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {(product.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ) : (
            // Grid View (Minimal - Name & Photo Only)
            <div 
              key={product.id} 
              className="group relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Hover Actions */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button
                    onClick={(e) => handleQuickView(product, e)}
                    className="bg-white hover:bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <div className="p-2">
                <h3 className="font-medium text-gray-900 text-xs leading-tight line-clamp-2 hover:text-orange-600 transition-colors duration-200">
                  {product.name}
                </h3>
              </div>
            </div>
          )
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No products found</div>
          <div className="text-gray-400">Try adjusting your filters or search terms</div>
        </div>
      )}

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <span className="text-sm text-orange-600 font-medium uppercase tracking-wide">
                      {selectedProduct.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating || 4.5)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({selectedProduct.reviewCount || Math.floor(Math.random() * 100) + 10}) reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
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
                        Save {formatPrice(selectedProduct.originalPrice - (selectedProduct.salePrice || selectedProduct.price))}
                      </div>
                    )}
                  </div>

                  {/* Trust Signals */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiTruck className="w-4 h-4 mr-1" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <FiShield className="w-4 h-4 mr-1" />
                      <span>Warranty</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center">
                    {(selectedProduct.stock || 10) > 0 ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600 font-medium">
                          {(selectedProduct.stock || 10) > 5 ? 'In Stock' : `Only ${selectedProduct.stock || Math.floor(Math.random() * 5) + 1} left`}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={(e) => {
                        handleAddToCart(selectedProduct, e);
                        closeModal();
                      }}
                      disabled={!(selectedProduct.stock || 10)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        (selectedProduct.stock || 10) > 0
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {(selectedProduct.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    
                    <Link
                      to={`/product/${selectedProduct.id}`}
                      onClick={closeModal}
                      className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded-lg font-medium transition-colors"
                    >
                      View Full Details
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