import React from 'react';
import { HiShieldCheck, HiTruck, HiSupport, HiRefresh } from 'react-icons/hi';

export function WhyChooseUs() {
  const features = [
    {
      icon: HiShieldCheck,
      title: 'Quality Guaranteed',
      description: 'All products come with manufacturer warranty and quality certification.',
    },
    {
      icon: HiTruck,
      title: 'Fast Delivery',
      description: 'Same-day delivery in Nairobi, next-day delivery countrywide.',
    },
    {
      icon: HiSupport,
      title: '24/7 Support',
      description: 'Expert technical support and customer service around the clock.',
    },
    {
      icon: HiRefresh,
      title: 'Easy Returns',
      description: '30-day return policy with full refund or exchange guarantee.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-primary-25 to-accent-25">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Rurident?
          </h2>
          <p className="text-lg text-gray-600">
            Your trusted partner for dental equipment and supplies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}