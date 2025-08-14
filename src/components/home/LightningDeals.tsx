import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiTruck } from 'react-icons/fi';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export function LightningDeals() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Get featured products for lightning deals (can be updated by admins)
  const lightningDeals = products
    .filter(product => product.isFeatured || product.isNew || product.isBestSeller)
    .slice(0, 5);

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    showToast({
      type: 'success',
      title: 'Added to Cart!',
      message: `${product.name} has been added to your cart.`
    });
  };

  const handleWishlistToggle = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${product.name} has been removed from your wishlist.`
      });
    } else {
      addToWishlist(product);
      showToast({
        type: 'success',
        title: 'Added to Wishlist!',
        message: `${product.name} has been added to your wishlist.`
      });
    }
  };

  // If no featured products, show some default ones
  const defaultDeals = [
    {
      id: 'default-1',
      name: 'Professional Dental Handpiece Set',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
      price: 45000,
      salePrice: 45000,
      originalPrice: 65000,
      sold: '156 sold',
      badge: 'Local',
      rating: 4.8,
      reviews: 89,
      isNew: false
    },
    {
      id: 'default-2',
      name: 'Digital X-Ray Sensor Kit',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
      price: 125000,
      salePrice: 125000,
      originalPrice: 180000,
      sold: '2.1K+ sold',
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 234,
      isNew: false
    }
  ];

  const displayDeals = lightningDeals.length > 0 ? lightningDeals : defaultDeals;

  return (
    <div className="bg-white border-b border-gray-100 py-6">
      <div className="container-max">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Lightning deals</h2>
          <Link to="/products" className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
            <span>View all</span>
            <FiTruck className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {displayDeals.map((deal) => (
            <div key={deal.id} className="flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={(deal as any).images?.[0] || (deal as any).image || 'https://via.placeholder.com/400x400?text=Dental+Product'} 
                  alt={deal.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Dental+Product';
                  }}
                />
                {(deal as any).badge && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {(deal as any).badge}
                  </div>
                )}
                {deal.isNew && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NEW
                  </div>
                )}
                <button 
                  onClick={(e) => handleWishlistToggle(deal, e)}
                  className={`absolute bottom-2 right-2 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors duration-200 ${
                    isInWishlist(deal.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{deal.rating || 4.5}</span>
                  </div>
                  <span className="text-xs text-gray-400">({(deal as any).reviewCount || (deal as any).reviews || 0})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-orange-600">
                      KES {deal.salePrice ? deal.salePrice.toLocaleString() : deal.price.toLocaleString()}
                    </span>
                    {(deal as any).originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        KES {(deal as any).originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{(deal as any).sold || '0 sold'}</span>
                  <button 
                    onClick={(e) => handleAddToCart(deal, e)}
                    className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                  >
                    <FiShoppingCart className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}