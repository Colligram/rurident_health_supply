import React from 'react';
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  PhoneIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: '24-hour delivery within Nairobi and nationwide shipping available.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Guaranteed',
    description: 'All products are genuine and come with manufacturer warranties.'
  },
  {
    icon: PhoneIcon,
    title: '24/7 Support',
    description: 'Expert technical support and customer service whenever you need it.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Prices',
    description: 'Competitive pricing with flexible payment options including M-Pesa.'
  },
  {
    icon: ClockIcon,
    title: '10+ Years Experience',
    description: 'Trusted by dental professionals across Kenya for over a decade.'
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Team',
    description: 'Knowledgeable staff to help you choose the right equipment for your needs.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Rurident?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best dental supplies and service in Kenya.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:bg-gray-50 p-6 rounded-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}