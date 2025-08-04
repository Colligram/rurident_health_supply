import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    id: 'dental-chairs',
    name: 'Dental Chairs',
    description: 'Premium dental chairs and units',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 45,
    href: '/products/dental-chairs'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    description: 'Professional dental equipment',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 120,
    href: '/products/equipment'
  },
  {
    id: 'materials',
    name: 'Materials',
    description: 'Quality dental materials',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 200,
    href: '/products/materials'
  },
  {
    id: 'xray-consumables',
    name: 'X-Ray & Consumables',
    description: 'X-Ray equipment and consumables',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 85,
    href: '/products/xray-consumables'
  },
  {
    id: 'student-kits',
    name: 'Student Kits',
    description: 'Complete kits for dental students',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 25,
    href: '/products/student-kits'
  }
];

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-white">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group card p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">
                    {category.productCount} products
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}