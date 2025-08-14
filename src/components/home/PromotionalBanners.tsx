import React from 'react';
import { FiCheck, FiShoppingCart, FiShield, FiArrowRight } from 'react-icons/fi';

export function PromotionalBanners() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container-max">
        {/* Top Banner - Free Shipping & Minimum Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FiCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-green-800">Free shipping</div>
              <div className="text-sm text-green-600">Incredible</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-blue-600">within 30 days</div>
              <div className="font-semibold text-blue-800">Minimum Order Value</div>
            </div>
          </div>
        </div>
        
        {/* Green Banner - Why Choose Rurident */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <FiShield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Why choose Rurident</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer">
              <span>Safe payments</span>
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}