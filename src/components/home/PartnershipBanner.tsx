import React from 'react';
import { FiArrowRight, FiTruck, FiShield } from 'react-icons/fi';

export function PartnershipBanner() {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="container-max">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <FiTruck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">RURIDENT x KENYA MEDICAL SUPPLIES AUTHORITY</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer">
              <span>Together for better healthcare delivery</span>
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}