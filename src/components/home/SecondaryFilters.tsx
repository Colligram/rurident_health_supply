import React, { useState } from 'react';
import { FiStar, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const filters = [
  { id: 'all', name: 'All', icon: FiAward, isDefault: true },
  { id: '5star', name: '5-Star Rated', icon: FiStar, count: '2.1K+' },
  { id: 'bestselling', name: 'Best-Selling Items', icon: FiTrendingUp, count: '1.8K+' },
  { id: 'new', name: 'New In', icon: FiClock, count: '156' },
  { id: 'premium', name: 'Premium Quality', icon: FiAward, count: '89' },
  { id: 'local', name: 'Local Stock', icon: FiAward, count: '234' }
];

export function SecondaryFilters() {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    
    // Navigate to products page with appropriate filter
    const filterParams = new URLSearchParams();
    
    switch (filterId) {
      case '5star':
        filterParams.set('minRating', '5');
        break;
      case 'bestselling':
        filterParams.set('sortBy', 'bestselling');
        break;
      case 'new':
        filterParams.set('sortBy', 'newest');
        break;
      case 'premium':
        filterParams.set('quality', 'premium');
        break;
      case 'local':
        filterParams.set('stock', 'local');
        break;
      case 'all':
      default:
        // No specific filters for 'all'
        break;
    }
    
    const queryString = filterParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-4 hidden md:block">
      <div className="container-max">
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeFilter === filter.id
                  ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="font-medium">{filter.name}</span>
              {filter.count && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}