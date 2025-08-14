import React from 'react';
import { FiStar, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

const filters = [
  { name: 'All', icon: FiAward, isDefault: true },
  { name: '5-Star Rated', icon: FiStar, count: '2.1K+' },
  { name: 'Best-Selling Items', icon: FiTrendingUp, count: '1.8K+' },
  { name: 'New In', icon: FiClock, count: '156' },
  { name: 'Premium Quality', icon: FiAward, count: '89' },
  { name: 'Local Stock', icon: FiAward, count: '234' }
];

export function SecondaryFilters() {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="container-max">
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                filter.isDefault
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