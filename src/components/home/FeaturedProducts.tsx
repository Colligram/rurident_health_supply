import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTruck, FiShield, FiZap } from 'react-icons/fi';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils';

export function FeaturedProducts() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    // Show a quick feedback
    const button = event.currentTarget;
    button.classList.add('animate-pulse');
    setTimeout(() => {
      button.classList.remove('animate-pulse');
    }, 300);
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

  // Show more products for better product discovery
  const featuredProducts = products.slice(0, 12);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-white via-orange-50/30 to-white">
        <div className="container-max">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-animated"></div>
      </div>
      
      <div className="container-max relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiZap className="w-4 h-4 mr-2" />
            Complete Product Catalog
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse our complete collection of dental equipment, supplies, and consumables. Find everything you need for your dental practice.
          </p>
        </div>

        {/* Amazon-style Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Badge Container */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    FEATURED
                  </span>
                )}
                {product.originalPrice && product.price < product.originalPrice && (
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistToggle(product, e)}
                className="absolute top-3 right-3 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white group-hover:scale-110"
              >
                <FiHeart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
              </button>

              {/* Product Image Container */}
              <Link to={`/product/${product.id}`} className="block relative">
                <div className="relative overflow-hidden bg-gray-50 aspect-square w-full h-64 flex items-center justify-center">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Quick Action Buttons */}
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 transition-all duration-300 ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                      onClick={(e) => handleQuickView(product, e)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white"
                    >
                      <FiEye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="p-2 bg-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-orange-600"
                    >
                      <FiShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </Link>

              {/* Product Information */}
              <div className="p-5">
                {/* Category */}
                <div className="mb-2">
                  <span className="text-xs text-orange-600 font-bold uppercase tracking-wide bg-orange-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Product Name */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors duration-200 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating & Reviews */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 4.5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviewCount || Math.floor(Math.random() * 100) + 10})
                  </span>
                </div>

                {/* Price Container */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.salePrice || product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                    <div className="text-sm text-green-600 font-medium">
                      You save {formatPrice(product.originalPrice - (product.salePrice || product.price))}
                    </div>
                  )}
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FiTruck className="w-3 h-3 mr-1" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <FiShield className="w-3 h-3 mr-1" />
                    <span>Warranty</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  {(product.stock || 10) > 0 ? (
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">
                        {(product.stock || 10) > 5 ? 'In Stock' : `Only ${product.stock || Math.floor(Math.random() * 5) + 1} left`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!(product.stock || 10)}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
                    (product.stock || 10) > 0
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FiShoppingCart className="w-4 h-4" />
                    <span>{(product.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Products Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              🔥 Trending Now
            </h3>
            <p className="text-lg text-gray-600">
              Most popular products this week
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4).map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                <div className="text-center mb-3">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    TRENDING
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-center mb-2">
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
                  <div className="text-lg font-bold text-orange-600 mb-2">
                    {formatPrice(product.salePrice || product.price)}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="mr-2">View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}