import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils';

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Dental Chair Unit',
    price: 450000,
    originalPrice: 520000,
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    inStock: true,
    stockCount: 5,
    category: 'Dental Chairs'
  },
  {
    id: '2',
    name: 'Digital X-Ray System',
    price: 280000,
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 18,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    category: 'Equipment'
  },
  {
    id: '3',
    name: 'Complete Student Kit',
    price: 25000,
    originalPrice: 30000,
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    stockCount: 12,
    category: 'Student Kits'
  },
  {
    id: '4',
    name: 'Composite Filling Kit',
    price: 8500,
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 32,
    inStock: true,
    stockCount: 25,
    category: 'Materials'
  }
];

export function FeaturedProducts() {
  const { isInWishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      productId: product.id,
      quantity: 1,
      price: product.price
    });
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated dental equipment and supplies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card group relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleItem(product.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              >
                <span className="text-red-500">♥</span>
              </button>

              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-primary-600 font-medium">
                    {product.category}
                  </span>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stockCount > 10 
                      ? 'bg-green-100 text-green-800'
                      : product.stockCount > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stockCount > 10 
                      ? 'In Stock'
                      : product.stockCount > 0
                      ? `Only ${product.stockCount} left`
                      : 'Out of Stock'
                    }
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stockCount === 0}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center py-2 px-4 rounded-md shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-200"
                >
                  <span className="mr-2">🛒</span>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="btn-secondary inline-flex items-center py-2 px-6 rounded-md shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-200"
          >
            View All Products
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}