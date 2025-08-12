import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export function SearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-6">
            <div className="text-xl font-bold">
              DentalStore
            </div>
            
            {/* Location */}
            <div className="hidden md:flex items-center text-sm">
              <FiMapPin className="w-4 h-4 mr-1" />
              <span>Deliver to Kenya</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <select className="bg-gray-100 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm focus:outline-none">
                  <option>All Categories</option>
                  <option>Dental Chairs</option>
                  <option>Equipment</option>
                  <option>Consumables</option>
                  <option>Student Kits</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dental equipment, chairs, consumables..."
                  className="flex-1 px-4 py-2 text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right side info */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-xs">Customer Service</div>
              <div className="font-medium">24/7 Support</div>
            </div>
            <div className="text-center">
              <div className="text-xs">Free Delivery</div>
              <div className="font-medium">Within Nairobi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}