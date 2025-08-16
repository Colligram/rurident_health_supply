import React from 'react';
import { HiShieldCheck, HiTruck, HiSupport, HiStar, HiCash, HiRefresh } from 'react-icons/hi';

const badges = [
  {
    icon: HiShieldCheck,
    title: 'Trusted by Professionals',
    description: 'Over 1000+ dental professionals trust our products'
  },
  {
    icon: HiTruck,
    title: 'Fast Delivery',
    description: '24-hour delivery within Nairobi, nationwide shipping'
  },
  {
    icon: HiSupport,
    title: '24/7 Expert Support',
    description: 'Professional assistance whenever you need it'
  },
  {
    icon: HiStar,
    title: 'Premium Quality',
    description: 'Only the highest quality dental supplies and equipment'
  },
  {
    icon: HiCash,
    title: 'Best Prices',
    description: 'Competitive pricing with flexible payment options'
  },
  {
    icon: HiRefresh,
    title: 'Easy Returns',
    description: 'Hassle-free returns and exchanges policy'
  }
];

export function TrustBadges() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-gray-50 to-orange-50">
      <div className="container-max">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Choose Rurident?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            We're committed to providing the best dental supplies and service in Kenya
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-500 transform animate-fadeInUp"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center animate-pulse">
                    <badge.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}