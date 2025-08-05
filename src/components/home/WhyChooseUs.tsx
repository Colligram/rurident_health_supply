
import React from 'react';

export function WhyChooseUs() {
  const features = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Same day delivery in Nairobi, next day countrywide'
    },
    {
      icon: '✅',
      title: 'Quality Guaranteed',
      description: 'All products are genuine and come with warranty'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with bulk discounts available'
    },
    {
      icon: '🎯',
      title: 'Expert Support',
      description: '24/7 customer support from dental equipment specialists'
    }
  ];

  return (
    <section className="py-16 bg-white">
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
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
