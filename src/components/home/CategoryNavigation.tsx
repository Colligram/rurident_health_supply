import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiChevronRight } from 'react-icons/fi';

export function CategoryNavigation() {
  const categories = [
    { name: 'Dental Chairs', path: '/products/dental-chairs', icon: '🦷' },
    { name: 'Equipment', path: '/products/equipment', icon: '⚙️' },
    { name: 'Consumables', path: '/products/consumables', icon: '📦' },
    { name: 'Student Kits', path: '/products/student-kits', icon: '🎓' },
    { name: 'Orthodontics', path: '/products/orthodontics', icon: '🔧' },
    { name: 'Endodontics', path: '/products/endodontics', icon: '🔬' },
    { name: 'Periodontics', path: '/products/periodontics', icon: '🩺' },
    { name: 'Radiology', path: '/products/radiology', icon: '📷' }
  ];

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-6">
          {/* All Categories Menu */}
          <div className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded cursor-pointer transition-colors">
            <FiMenu className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">All Categories</span>
          </div>

          {/* Category Links */}
          <div className="hidden lg:flex items-center space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex items-center space-x-1 text-sm hover:text-orange-300 transition-colors whitespace-nowrap py-2"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>

          {/* Today's Deals */}
          <div className="ml-auto flex items-center space-x-4 text-sm">
            <Link to="/deals" className="hover:text-orange-300 transition-colors">
              Today's Deals
            </Link>
            <Link to="/new-arrivals" className="hover:text-orange-300 transition-colors">
              New Arrivals
            </Link>
            <Link to="/bestsellers" className="hover:text-orange-300 transition-colors">
              Best Sellers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}