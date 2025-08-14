import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiTruck } from 'react-icons/fi';

const lightningDeals = [
  {
    id: 1,
    name: 'Professional Dental Handpiece Set',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    price: 'KES 45,000',
    originalPrice: 'KES 65,000',
    sold: '156 sold',
    badge: 'Local',
    rating: 4.8,
    reviews: 89,
    isNew: false
  },
  {
    id: 2,
    name: 'Digital X-Ray Sensor Kit',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
    price: 'KES 125,000',
    originalPrice: 'KES 180,000',
    sold: '2.1K+ sold',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 234,
    isNew: false
  },
  {
    id: 3,
    name: 'Orthodontic Bracket Kit',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
    price: 'KES 8,500',
    originalPrice: 'KES 12,000',
    sold: '3.2K+ sold',
    badge: 'Hot',
    rating: 4.7,
    reviews: 567,
    isNew: false
  },
  {
    id: 4,
    name: 'Dental Chair Unit Complete',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    price: 'KES 450,000',
    originalPrice: 'KES 680,000',
    sold: '23 sold',
    badge: 'Premium',
    rating: 4.9,
    reviews: 45,
    isNew: true
  },
  {
    id: 5,
    name: 'Infection Control Kit',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
    price: 'KES 15,000',
    originalPrice: 'KES 22,000',
    sold: '1.8K+ sold',
    badge: 'Essential',
    rating: 4.6,
    reviews: 312,
    isNew: false
  }
];

export function LightningDeals() {
  return (
    <div className="bg-white border-b border-gray-100 py-4 md:py-6">
      <div className="container-max">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Lightning deals</h2>
          <Link to="/products" className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1 text-sm">
            <span>View all</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4">
          {lightningDeals.map((deal) => (
            <div key={deal.id} className="flex-shrink-0 w-44 md:w-56 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-32 md:h-40 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Dental+Product';
                  }}
                />
                {deal.badge && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {deal.badge}
                  </div>
                )}
                {deal.isNew && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NEW
                  </div>
                )}
                <button className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                  <FiHeart className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{deal.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({deal.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-bold text-orange-600">{deal.price}</span>
                    <span className="text-xs text-gray-400 line-through">{deal.originalPrice}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{deal.sold}</span>
                  <button className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200">
                    <FiShoppingCart className="w-3 h-3 text-white" />
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