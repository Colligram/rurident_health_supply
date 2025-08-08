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
    <section className="py-16 bg-gradient-to-r from-gray-50 to-orange-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Rurident?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best dental supplies and service in Kenya
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <badge.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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