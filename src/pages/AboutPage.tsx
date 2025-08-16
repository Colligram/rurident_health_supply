import React from 'react';
import { HiUserGroup, HiStar, HiTruck, HiShieldCheck, HiAcademicCap, HiGlobe, HiCheckCircle, HiCurrencyDollar } from 'react-icons/hi';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* SEO Meta Information */}
      <div style={{ display: 'none' }}>
        <h1>Rurident Health Supplies - Kenya's Premier Dental Equipment Supplier</h1>
        <meta name="description" content="Leading dental equipment supplier in Kenya. Premium dental chairs, instruments, consumables, student kits, orthodontic supplies. Serving Nairobi, Mombasa, Kisumu nationwide delivery." />
        <meta name="keywords" content="dental equipment Kenya, dental supplies Nairobi, dental chairs Kenya, dental instruments East Africa, orthodontic supplies Kenya, dental student kits, medical equipment suppliers Kenya" />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container-max py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About Rurident Health Supplies
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-orange-100 max-w-4xl mx-auto mb-6">
              Kenya's Premier Dental Equipment & Medical Supplies Provider
            </p>
            <p className="text-lg text-orange-200 max-w-3xl mx-auto">
              Transforming dental healthcare across East Africa with premium equipment, expert support, and innovative solutions since our founding.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12 md:py-16">
        {/* Company Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Leading Dental Equipment Supplier in Kenya
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                <strong>Rurident Health Supplies</strong> stands as Kenya's most trusted dental equipment and medical supplies provider, 
                serving over 2,000 dental professionals, hospitals, clinics, and educational institutions across East Africa. 
                Established with a mission to revolutionize dental healthcare accessibility, we have become the go-to partner 
                for premium dental equipment in Kenya, Uganda, Tanzania, and Rwanda.
              </p>
              <p>
                Our flagship location at <strong>Mepalux Plaza, River Road, Nairobi</strong> serves as the hub for our nationwide 
                distribution network. From here, we coordinate deliveries to major cities including Mombasa, Kisumu, Nakuru, 
                Eldoret, and rural healthcare facilities across all 47 counties in Kenya. Our strategic location ensures 
                rapid response times and efficient logistics for urgent medical equipment needs.
              </p>
              <p>
                As an authorized distributor for leading international brands, Rurident Health Supplies offers the most 
                comprehensive catalog of dental equipment in Kenya. Our inventory includes state-of-the-art dental chairs, 
                digital X-ray systems, sterilization equipment, surgical instruments, orthodontic supplies, endodontic tools, 
                periodontal instruments, and complete dental student kits for universities and training institutions.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Rurident Health Supplies dental equipment showroom in Nairobi Kenya"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Nairobi Showroom</h3>
                <p className="text-gray-600">Visit our state-of-the-art showroom to experience the latest dental technology firsthand.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Founded:</strong> Serving Kenya since 2015</li>
                <li>• <strong>Clients:</strong> 2,000+ dental professionals</li>
                <li>• <strong>Coverage:</strong> All 47 counties in Kenya</li>
                <li>• <strong>Products:</strong> 5,000+ dental equipment items</li>
                <li>• <strong>Certifications:</strong> ISO 9001:2015 Quality Management</li>
                <li>• <strong>Partnerships:</strong> 50+ international manufacturers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Expertise Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Dental Solutions for Every Practice
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From startup dental clinics to established hospitals, we provide complete equipment solutions 
              tailored to your specific needs and budget requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiUserGroup className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Private Dental Clinics</h3>
              <p className="text-gray-600 text-center">
                Complete equipment packages for private practice setup, including dental chairs, 
                X-ray systems, sterilization equipment, and consumables.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiAcademicCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Educational Institutions</h3>
              <p className="text-gray-600 text-center">
                Specialized student dental kits, training equipment, and simulation systems for 
                dental schools and technical training institutes across Kenya.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiGlobe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Hospitals & Health Centers</h3>
              <p className="text-gray-600 text-center">
                Large-scale equipment solutions for public and private hospitals, 
                including bulk purchasing options and maintenance contracts.
              </p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 mb-12 md:mb-16 mx-4 md:mx-0">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Why Choose Rurident Health Supplies?</h2>
            <p className="text-sm md:text-base lg:text-xl text-orange-100 max-w-3xl mx-auto px-4">
              Proven track record of excellence in dental equipment supply across Kenya and East Africa
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
                <HiUserGroup className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">2000+</h3>
              <p className="text-xs md:text-sm lg:text-base text-orange-100">Satisfied Clients Across East Africa</p>
            </div>
            
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
                <HiCheckCircle className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">5000+</h3>
              <p className="text-xs md:text-sm lg:text-base text-orange-100">Premium Dental Equipment Products</p>
            </div>
            
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
                <HiTruck className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">2-4 Hours</h3>
              <p className="text-xs md:text-sm lg:text-base text-orange-100">Same-Day Delivery in Nairobi CBD</p>
            </div>
            
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
                <HiStar className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">9+ Years</h3>
              <p className="text-xs md:text-sm lg:text-base text-orange-100">Excellence in Dental Equipment Supply</p>
            </div>
          </div>
        </div>

        {/* Product Categories Section */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              Complete Range of Dental Equipment & Supplies
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              We stock the most comprehensive selection of dental equipment in Kenya, from basic instruments 
              to cutting-edge digital dentistry solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Dental Chairs & Units</h3>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                <li>• Electric dental chairs</li>
                <li>• Hydraulic dental units</li>
                <li>• Portable dental chairs</li>
                <li>• Chair accessories</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Imaging Equipment</h3>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                <li>• Digital X-ray systems</li>
                <li>• Intraoral cameras</li>
                <li>• CBCT scanners</li>
                <li>• Panoramic X-ray machines</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Surgical Instruments</h3>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                <li>• Extraction forceps</li>
                <li>• Surgical handpieces</li>
                <li>• Periodontal instruments</li>
                <li>• Endodontic tools</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Student Supplies</h3>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                <li>• Complete dental kits</li>
                <li>• Training mannequins</li>
                <li>• Simulation equipment</li>
                <li>• Educational materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16 px-4 md:px-0">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl shadow-md md:shadow-lg p-6 md:p-8 border border-blue-200 animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
              <HiCheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Our Mission</h3>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed text-center mb-4 md:mb-6">
              To revolutionize dental healthcare accessibility across Kenya and East Africa by providing 
              cutting-edge dental equipment, comprehensive support services, and innovative solutions 
              that empower dental professionals to deliver world-class patient care.
            </p>
            <ul className="text-gray-600 space-y-1 md:space-y-2 text-sm md:text-base">
              <li>✓ Provide premium quality dental equipment</li>
              <li>✓ Offer comprehensive technical support</li>
              <li>✓ Ensure nationwide accessibility</li>
              <li>✓ Support dental education initiatives</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg md:rounded-xl shadow-md md:shadow-lg p-6 md:p-8 border border-orange-200 animate-fadeInUp" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
              <HiGlobe className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Our Vision</h3>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed text-center mb-4 md:mb-6">
              To be East Africa's leading dental equipment supplier, recognized globally for innovation, 
              quality, and our transformative impact on dental healthcare standards across the region.
            </p>
            <ul className="text-gray-600 space-y-1 md:space-y-2 text-sm md:text-base">
              <li>✓ Market leadership in East Africa</li>
              <li>✓ Innovation in dental technology</li>
              <li>✓ Excellence in customer service</li>
              <li>✓ Contribution to public health improvement</li>
            </ul>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-6 md:p-8 lg:p-12 mb-12 md:mb-16 border border-gray-100 mx-4 md:mx-0">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              Our Commitment to Kenya's Dental Community
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Beyond supplying equipment, we're dedicated partners in advancing dental healthcare standards across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
                <HiAcademicCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Education & Training</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We provide comprehensive training programs, workshops, and educational resources to ensure 
                dental professionals maximize the potential of their equipment investments.
              </p>
            </div>

            <div className="text-center animate-fadeInUp" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
                <HiCurrencyDollar className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Flexible Financing</h3>
              <p className="text-gray-600">
                Understanding the financial challenges in healthcare, we offer flexible payment plans, 
                equipment leasing options, and bulk purchase discounts to make quality equipment accessible.
              </p>
            </div>

            <div className="text-center animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
                <HiShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Quality Assurance</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Every product undergoes rigorous quality checks, and we maintain strict standards for 
                authenticity, reliability, and performance to ensure patient safety and treatment efficacy.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 mx-4 md:mx-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 px-4">
            Ready to Partner with Kenya's Leading Dental Supplier?
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-orange-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Join over 2,000 dental professionals who trust Rurident Health Supplies for their equipment needs. 
            Experience the difference of working with Kenya's premier dental equipment specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <a 
              href="/contact" 
              className="bg-white text-orange-600 hover:bg-orange-50 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-colors"
            >
              Contact Our Team
            </a>
            <a 
              href="/products" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-colors"
            >
              Browse Our Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}