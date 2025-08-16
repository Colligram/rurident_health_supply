import React, { useState } from 'react';
import { FiStar, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

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

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    // TODO: Implement filter functionality
    console.log('Filter applied:', filterId);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-4">
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