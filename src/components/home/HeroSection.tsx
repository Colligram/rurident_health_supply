import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiPlay } from 'react-icons/hi';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-transparent"></div>
      
      <div className="relative container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Kenya's Leading
                <span className="block text-primary-200">Dental Supplier</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
                Premium dental equipment, chairs, consumables and student kits for 
                hospitals, clinics and dental professionals nationwide.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center group"
              >
                Shop Now
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link
                to="/contact"
                className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center"
              >
                Visit Our Store
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-primary-200 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-primary-200 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24hr</div>
                <div className="text-primary-200 text-sm">Delivery</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern dental clinic"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              
              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white text-primary-600 rounded-full p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                  <HiPlay className="h-6 w-6" />
                </button>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="text-sm font-medium">Free Delivery</div>
                <div className="text-xs text-gray-600">Within Nairobi</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-primary-500 text-white p-4 rounded-lg shadow-lg">
                <div className="text-sm font-medium">24/7 Support</div>
                <div className="text-xs">Expert Assistance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400 rounded-full opacity-10 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-300 rounded-full opacity-10 translate-y-24 -translate-x-24"></div>
    </section>
  );
}