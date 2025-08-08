import React from 'react';
import { HiUserGroup, HiStar, HiTruck, HiShieldCheck } from 'react-icons/hi';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              About Rurident Health Supplies
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
              Kenya's leading dental supplier, committed to providing premium dental equipment and supplies nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 mobile-friendly">
              <p>
                Founded with a vision to revolutionize dental care in Kenya, Rurident Health Supplies 
                has been serving dental professionals nationwide for years. We understand the critical 
                importance of quality dental equipment and supplies in providing excellent patient care.
              </p>
              <p>
                Located in the heart of Nairobi at Mepalux Plaza, River Road, we have built a reputation 
                for reliability, quality, and exceptional customer service. Our extensive product range 
                covers everything from basic dental instruments to advanced digital equipment.
              </p>
              <p>
                We are committed to supporting dental professionals with the best products, competitive 
                pricing, and expert guidance to help them deliver outstanding dental care to their patients.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our dental supply store"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">1000+ Clients</h3>
            <p className="text-gray-600 text-sm sm:text-base">Trusted by dental professionals across Kenya</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiStar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm sm:text-base">Only the highest quality products</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiTruck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm sm:text-base">24-hour delivery within Nairobi</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-600 text-sm sm:text-base">Professional assistance when you need it</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mobile-friendly">
              To empower dental professionals across Kenya with access to premium quality dental 
              equipment, supplies, and expert support, enabling them to deliver exceptional patient 
              care and advance oral health standards nationwide.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 mobile-friendly">
              To be Kenya's most trusted and innovative dental supply partner, recognized for our 
              commitment to quality, service excellence, and our contribution to advancing dental 
              healthcare throughout East Africa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}