import React from 'react';
import { HiShieldCheck, HiTruck, HiSupport, HiRefresh, HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi';

export function AboutUsPage() {
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
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Rurident Health Supplies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted dental partner in Kenya, serving hospitals, clinics, technicians, and dental students nationwide with quality products and reliable service.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Leading Supplier of Dental Equipment
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Rurident Health Supplies has been at the forefront of dental equipment supply in Kenya, 
                providing cutting-edge technology and reliable consumables to dental professionals across the country.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We specialize in dental chairs, equipment, consumables, and comprehensive student kits, 
                ensuring that every dental facility has access to the tools they need to provide excellent patient care.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to quality, reliability, and customer satisfaction has made us the preferred 
                choice for dental professionals throughout Kenya.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-3xl">R</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Rurident Health Supplies
                </h3>
                <p className="text-gray-600 mb-6">
                  Your trusted dental partner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
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
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
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

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiLocationMarker className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
              <div className="text-gray-600">
                <p>Mepalux Plaza Nairobi</p>
                <p>River Road, 3rd Floor</p>
                <p>Opp. Bata Mini Price, Suite 304</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiPhone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Numbers</h3>
              <div className="text-gray-600 space-y-1">
                <a href="tel:0703416433" className="block hover:text-primary-600 transition-colors">
                  0703 416 433
                </a>
                <a href="tel:0795202687" className="block hover:text-primary-600 transition-colors">
                  0795 202 687
                </a>
                <a href="tel:0746280715" className="block hover:text-primary-600 transition-colors">
                  0746 280 715
                </a>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HiClock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
              <div className="text-gray-600">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide high-quality dental equipment and supplies that enable dental professionals 
              to deliver exceptional patient care, while maintaining the highest standards of service 
              and reliability in the industry.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading dental equipment supplier in East Africa, recognized for our 
              commitment to quality, innovation, and customer satisfaction, contributing to 
              improved dental healthcare across the region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}