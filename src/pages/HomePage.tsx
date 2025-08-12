import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiGrid, FiList } from 'react-icons/fi';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils';
import { SearchBanner } from '../components/home/SearchBanner';
import { CategoryNavigation } from '../components/home/CategoryNavigation';
import { ProductGrid } from '../components/home/ProductGrid';

export function HomePage() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Dental Chairs', 'Equipment', 'Student Kits', 'Materials', 'Consumables'];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Search / Navigation */}
      <SearchBanner />
      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* View Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">{filteredProducts.length} results</span>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            isInWishlist={isInWishlist}
            navigate={navigate}
          />
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviewCount || 0} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && product.salePrice < product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => handleWishlistToggle(product, e)}
                          className={`p-2 rounded-lg transition-colors ${
                            isInWishlist(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <FiHeart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={e => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                          className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                            product.inStock
                              ? 'bg-orange-600 text-white hover:bg-orange-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
