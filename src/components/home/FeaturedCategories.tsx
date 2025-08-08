import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'dental-clinic-tools',
    name: 'Clinical Tools & Instruments',
    description: 'Diagnostic, operative, and surgical instruments',
    productCount: 150,
    href: '/products/dental-clinic-tools',
    icon: '🔧'
  },
  {
    id: 'dental-laboratory',
    name: 'Laboratory Equipment',
    description: 'Professional lab tools and machines',
    productCount: 85,
    href: '/products/dental-laboratory',
    icon: '⚗️'
  },
  {
    id: 'dental-materials',
    name: 'Dental Materials',
    description: 'Restorative and impression materials',
    productCount: 120,
    href: '/products/dental-materials',
    icon: '🦷'
  },
  {
    id: 'dental-machines',
    name: 'Machines & Digital Equipment',
    description: 'Dental chairs, handpieces, and digital systems',
    productCount: 45,
    href: '/products/dental-machines',
    icon: '⚙️'
  },
  {
    id: 'infection-control',
    name: 'Infection Control',
    description: 'Sterilization equipment and consumables',
    productCount: 60,
    href: '/products/infection-control',
    icon: '🛡️'
  },
  {
    id: 'student-kits',
    name: 'Student Kits',
    description: 'Complete kits for dental students',
    productCount: 25,
    href: '/products/student-kits',
    icon: '🎓'
  }
];

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of dental supplies, equipment and materials 
            trusted by professionals across Kenya.
          </p>
        </div>
        
        {/* Animated Category Blocks Container */}
        <div className="relative">
          {/* Animated scrolling container */}
          <div className="flex animate-scroll-horizontal space-x-6 pb-4">
            {/* Duplicate categories for seamless loop */}
            {[...categories, ...categories].map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                to={category.href}
                className="group flex-shrink-0 w-80 md:w-96"
              >
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 
                              hover:shadow-2xl hover:border-orange-200 transition-all duration-300 
                              transform hover:-translate-y-2 hover:scale-105 
                              bg-gradient-to-br from-white to-orange-50/30
                              min-h-[180px] flex flex-col justify-between">
                  
                  {/* Category Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      {category.productCount} items
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Action indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <span className="text-sm font-medium text-orange-600 group-hover:text-orange-700">
                      Explore Products
                    </span>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center 
                                  group-hover:bg-orange-600 transition-colors duration-300
                                  transform group-hover:translate-x-1">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>
                  
                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 
                                rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none z-10"></div>
        </div>
        
        {/* Mobile-friendly grid for smaller screens */}
        <div className="md:hidden mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 
                              hover:shadow-lg hover:border-orange-200 transition-all duration-300 
                              transform hover:-translate-y-1
                              bg-gradient-to-br from-white to-orange-50/30">
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="text-xs text-orange-600 font-medium">
                        {category.productCount} items
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600 group-hover:text-orange-700">
                      Explore
                    </span>
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center 
                                  group-hover:bg-orange-600 transition-colors duration-300">
                      <span className="text-white text-sm">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}