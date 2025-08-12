import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiStar, FiZap, FiTrendingUp, FiGift } from 'react-icons/fi';

export function CategoryNavigation() {
  const categories = [
    { name: 'Dental Chairs', path: '/products/dental-chairs', icon: '🦷', color: 'hover:text-blue-400' },
    { name: 'Equipment', path: '/products/equipment', icon: '⚙️', color: 'hover:text-green-400' },
    { name: 'Consumables', path: '/products/consumables', icon: '📦', color: 'hover:text-purple-400' },
    { name: 'Student Kits', path: '/products/student-kits', icon: '🎓', color: 'hover:text-indigo-400' },
    { name: 'Orthodontics', path: '/products/orthodontics', icon: '🔧', color: 'hover:text-pink-400' },
    { name: 'Endodontics', path: '/products/endodontics', icon: '🔬', color: 'hover:text-teal-400' },
    { name: 'Periodontics', path: '/products/periodontics', icon: '🩺', color: 'hover:text-cyan-400' },
    { name: 'Radiology', path: '/products/radiology', icon: '📷', color: 'hover:text-yellow-400' }
  ];

  const specialLinks = [
    { name: "Today's Deals", path: '/deals', icon: FiGift, color: 'text-red-400' },
    { name: 'New Arrivals', path: '/new-arrivals', icon: FiZap, color: 'text-green-400' },
    { name: 'Best Sellers', path: '/bestsellers', icon: FiTrendingUp, color: 'text-orange-400' },
    { name: 'Top Rated', path: '/top-rated', icon: FiStar, color: 'text-yellow-400' }
  ];

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* All Categories Menu with improved styling */}
          <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg group">
            <FiMenu className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">All Categories</span>
          </div>

          {/* Category Links with enhanced design */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-gray-700 ${category.color} whitespace-nowrap group`}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>

          {/* Special Links with icons and improved styling */}
          <div className="flex items-center space-x-2">
            {specialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-gray-700 group"
                >
                  <IconComponent className={`w-4 h-4 ${link.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="font-medium hidden md:block group-hover:text-white">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Category Menu */}
        <div className="lg:hidden border-t border-gray-700 py-3">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-gray-700 whitespace-nowrap group bg-gray-700/50"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}