import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTruck, FiShield, FiZap, FiArrowRight, FiSearch } from 'react-icons/fi';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useWishlistAnimation } from '../../context/WishlistAnimationContext';
import { formatPrice } from '../../utils';

export function ProductHeroSection() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { triggerWishlistAnimation } = useWishlistAnimation();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
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
      triggerWishlistAnimation(event.currentTarget as HTMLElement);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get featured products for the hero section
  const featuredProducts = products.slice(0, 6);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container-max">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={`hero-skeleton-${i}`} className="bg-white rounded-2xl p-6 shadow-sm">
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
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container-max">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <FiZap className="w-5 h-5 mr-2" />
            Kenya's Premier Dental Supplier
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Quality
            <span className="block text-orange-600">Dental Equipment</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Premium dental supplies, equipment, and consumables for professionals nationwide. 
            Fast delivery, expert support, and unbeatable prices.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for dental equipment, supplies, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-32 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 shadow-lg"
                />
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-500">
              Popular searches: Dental Chair, Handpiece, Autoclave, Curing Light
            </div>
            
            {/* Quick Category Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/products?category=Clinical Machines & Equipment"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Dental Chairs</span>
              </Link>
              <Link
                to="/products?category=Clinical Machines & Equipment"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Handpieces</span>
              </Link>
              <Link
                to="/products?category=Sterilization Equipment"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Autoclaves</span>
              </Link>
              <Link
                to="/products?category=Clinical Machines & Equipment"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Curing Lights</span>
              </Link>
              <Link
                to="/products?category=Consumables"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Consumables</span>
              </Link>
            </div>
          </div>

          {/* Shop by Category Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🏷️ Shop by Category
              </h2>
              <p className="text-lg text-gray-600">
                Find exactly what you need in our organized categories
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link
                to="/products?category=Clinical Machines & Equipment"
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-200">
                  <span className="text-2xl">🦷</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Clinical Equipment</h3>
                <p className="text-sm text-gray-600">Dental chairs, handpieces, curing lights</p>
              </Link>
              
              <Link
                to="/products?category=Sterilization Equipment"
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                  <span className="text-2xl">🧪</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Sterilization</h3>
                <p className="text-sm text-gray-600">Autoclaves, sterilizers, disinfectants</p>
              </Link>
              
              <Link
                to="/products?category=Consumables"
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Consumables</h3>
                <p className="text-sm text-gray-600">Gloves, masks, syringes, materials</p>
              </Link>
              
              <Link
                to="/products?category=Prosthodontic Instruments"
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-200">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instruments</h3>
                <p className="text-sm text-gray-600">Surgical tools, impression trays</p>
              </Link>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600 text-sm">Products</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">24hr</div>
              <div className="text-gray-600 text-sm">Delivery</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">5★</div>
              <div className="text-gray-600 text-sm">Rated</div>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 rounded-3xl animate-gradient-shift bg-gradient-to-br from-purple-500 via-pink-500 via-black to-blue-600 opacity-20 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10 p-8 rounded-3xl">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
              {/* Product Badges */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                {product.is_new && (
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

              {/* Product Image */}
              <Link to={`/p/item/${product.id}`} className="block relative">
                <div className="relative overflow-hidden bg-gray-50 aspect-square w-full h-64 flex items-center justify-center">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Quick Actions */}
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 transition-all duration-300 ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white">
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

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="text-xs text-orange-600 font-bold uppercase tracking-wide bg-orange-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Product Name */}
                <Link to={`/p/item/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-200 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={`hero-product-rating-${product.id}-${i}`}
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

                {/* Price */}
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
                      Save {formatPrice(product.originalPrice - (product.salePrice || product.price))}
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
                    {product.inStock && (product.stock > 0 || product.stock === undefined) ? (
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600 font-medium">In Stock</span>
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
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FiShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Deals of the Day Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎯 Deals of the Day
            </h2>
            <p className="text-lg text-gray-600">
              Limited time offers on premium dental equipment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.originalPrice && p.price < p.originalPrice).slice(0, 3).map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-4">
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    SAVE {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice!)}
                    </span>
                  </div>
                  <Link
                    to={`/p/item/${product.id}`}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🆕 New Arrivals
            </h2>
            <p className="text-lg text-gray-600">
              Latest products added to our collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="text-center mb-3">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {formatPrice(product.salePrice || product.price)}
                  </div>
                  <Link
                    to={`/p/item/${product.id}`}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⭐ What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from dental professionals across Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={`testimonial-1-rating-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Excellent quality dental equipment. The dental chair we purchased exceeded our expectations. Fast delivery and great customer service!"
              </p>
              <div className="text-sm text-gray-600">
                <strong>Dr. Sarah Kimani</strong><br />
                Nairobi Dental Clinic
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={`testimonial-2-rating-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Best prices in Kenya for dental supplies. Their autoclave sterilizer is top-notch and the warranty gives us peace of mind."
              </p>
              <div className="text-sm text-gray-600">
                <strong>Dr. James Mwangi</strong><br />
                Mombasa Dental Center
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={`testimonial-3-rating-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Professional service and reliable equipment. The handpiece kit is excellent quality and the after-sales support is outstanding."
              </p>
                              <div className="text-sm text-gray-600">
                  <strong>Dr. Mary Wanjiku</strong><br />
                  Kisumu Dental Hospital
                </div>
            </div>
          </div>
        </div>

        {/* Featured Brands Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏢 Trusted Brands
            </h2>
            <p className="text-lg text-gray-600">
              We partner with world-renowned manufacturers for quality assurance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">DENT</span>
              </div>
              <h3 className="font-bold text-gray-900">DentalPro</h3>
              <p className="text-sm text-gray-600">Premium Equipment</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">MED</span>
              </div>
              <h3 className="font-bold text-gray-900">MedTech</h3>
              <p className="text-sm text-gray-600">Innovative Solutions</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">CARE</span>
              </div>
              <h3 className="font-bold text-gray-900">CareDental</h3>
              <p className="text-sm text-gray-600">Patient Comfort</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">SAFE</span>
              </div>
              <h3 className="font-bold text-gray-900">SafeSteril</h3>
              <p className="text-sm text-gray-600">Sterilization Experts</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
          >
            <span className="mr-2">View All Products</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}