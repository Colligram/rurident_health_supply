import React from 'react';
import { FiCheck, FiShoppingCart, FiShield, FiArrowRight } from 'react-icons/fi';

export function PromotionalBanners() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container-max">
        {/* Top Banner - Free Shipping & Minimum Order - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 py-3 md:py-4">
          <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FiCheck className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-green-800 text-xs md:text-sm">Free shipping</div>
              <div className="text-xs md:text-sm text-green-600">Incredible</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FiShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs md:text-sm text-blue-600">within 30 days</div>
              <div className="font-semibold text-blue-800 text-xs md:text-sm">Minimum Order Value</div>
            </div>
          </div>
        </div>
        
        {/* Green Banner - Why Choose Rurident - Mobile Optimized */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 md:p-4 rounded-lg mb-3 md:mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiShield className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <span className="font-semibold text-sm md:text-base">Why choose Rurident</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 hover:bg-white/20 px-2 md:px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer">
              <span className="text-xs md:text-sm">Safe payments</span>
              <FiArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}