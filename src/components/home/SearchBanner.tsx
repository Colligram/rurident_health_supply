import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';

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
    <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white">
      {/* Top Info Bar */}
      <div className="bg-black/20 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <FiTruck className="w-4 h-4" />
                <span>Free delivery over KSH 50,000</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiShield className="w-4 h-4" />
                <span>100% Genuine Products</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <FiHeadphones className="w-4 h-4" />
              <span>24/7 Customer Support: +254 700 000 000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Section */}
      <div className="py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-2xl font-bold">
                  <span className="text-white">Rurident</span>
                  <span className="text-orange-200">Health Supplies</span>
                </div>
                <div className="text-sm text-orange-100 mt-1">
                  Your trusted dental partner
                </div>
              </div>
              
              {/* Location */}
              <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                <FiMapPin className="w-4 h-4 mr-2" />
                <div>
                  <div className="text-xs text-orange-200">Deliver to</div>
                  <div className="font-medium">Kenya - All Counties</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-3xl mx-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex rounded-lg overflow-hidden shadow-lg">
                  <select className="bg-gray-100 text-gray-900 px-4 py-3 border-r border-gray-300 text-sm focus:outline-none hover:bg-gray-50 transition-colors">
                    <option>All Categories</option>
                    <option>Dental Chairs</option>
                    <option>Equipment</option>
                    <option>Consumables</option>
                    <option>Student Kits</option>
                    <option>Orthodontics</option>
                    <option>Endodontics</option>
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for dental equipment, chairs, consumables..."
                    className="flex-1 px-4 py-3 text-gray-900 focus:outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 px-6 py-3 transition-colors group"
                  >
                    <FiSearch className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right side info */}
            <div className="hidden xl:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-xs text-orange-200">Customer Service</div>
                <div className="font-medium">24/7 Support</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-orange-200">Fast Delivery</div>
                <div className="font-medium">2-4 Hours Nairobi</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-orange-200">Secure Payment</div>
                <div className="font-medium">M-Pesa & Cards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}