import React from 'react';
import { FiArrowRight, FiHeart, FiShield } from 'react-icons/fi';

export function PartnershipBanner() {
  return (
    <div className="bg-white border-b border-gray-100 py-2 md:py-4">
      <div className="container-max">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 md:p-4 rounded-lg shadow-lg overflow-hidden relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-2 -right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
          </div>
          
          <div className="relative z-10">
            {/* Mobile Layout */}
            <div className="md:hidden text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <FiHeart className="w-3 h-3 text-white" />
                </div>
                <div className="text-xs font-semibold opacity-90">RURIDENT</div>
              </div>
              <div className="text-xs leading-relaxed px-2 animate-fadeInUp">
                <div className="font-medium mb-1">
                  "Patients don't remember the steel in your hands."
                </div>
                <div className="opacity-90">
                  They remember the comfort, the self esteem you restored, the courage you gave.
                </div>
                <div className="font-medium mt-1 text-yellow-200">
                  The tools you choose should honor that.
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <FiHeart className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-lg">RURIDENT</div>
                  <div className="text-sm opacity-90">Professional Dental Solutions</div>
                </div>
              </div>
              <div className="text-center max-w-2xl animate-slideInRight">
                <div className="text-sm font-medium mb-1">
                  "Patients don't remember the steel in your hands."
                </div>
                <div className="text-xs opacity-90">
                  They remember the comfort, the self esteem you restored, the courage you gave.
                </div>
                <div className="text-sm font-medium mt-1 text-yellow-200">
                  The tools you choose should honor that.
                </div>
              </div>
              <div className="flex items-center space-x-2 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group">
                <span className="text-sm font-medium">Explore Tools</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1.2s ease-out;
        }
      `}</style>
    </div>
  );
}