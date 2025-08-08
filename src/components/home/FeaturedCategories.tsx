import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const categories = [
  {
    id: 'dental-clinic-tools',
    name: 'Clinical Tools & Instruments',
    description: 'Diagnostic, operative, and surgical instruments',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 150,
    href: '/products/dental-clinic-tools'
  },
  {
    id: 'dental-laboratory',
    name: 'Laboratory Equipment',
    description: 'Professional lab tools and machines',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 85,
    href: '/products/dental-laboratory'
  },
  {
    id: 'dental-materials',
    name: 'Dental Materials',
    description: 'Restorative and impression materials',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 120,
    href: '/products/dental-materials'
  },
  {
    id: 'dental-machines',
    name: 'Machines & Digital Equipment',
    description: 'Dental chairs, handpieces, and digital systems',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 45,
    href: '/products/dental-machines'
  },
  {
    id: 'infection-control',
    name: 'Infection Control',
    description: 'Sterilization equipment and consumables',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 60,
    href: '/products/infection-control'
  },
  {
    id: 'student-kits',
    name: 'Student Kits',
    description: 'Complete kits for dental students',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 25,
    href: '/products/student-kits'
  }
];

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-gradient-to-r from-gray-100 to-orange-50 overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of dental supplies and equipment
          </p>
        </div>
        
        {/* Animated scrolling container */}
        <div className="relative">
          <div className="flex space-x-4 animate-scroll">
            {[...categories, ...categories].map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                to={category.href}
                className="flex-shrink-0 w-72 sm:w-80 bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:from-orange-50 hover:to-orange-100 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300">
                    <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
                  </div>
                  <div className="text-orange-600 group-hover:text-orange-700 group-hover:translate-x-1 transition-all duration-300">
                    <HiArrowRight className="h-5 w-5" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-600">
                    {category.productCount} products
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}