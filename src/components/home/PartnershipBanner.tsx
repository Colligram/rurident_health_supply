import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGrid, FiActivity, FiScissors, FiTool, FiCamera, FiPackage, FiDroplet, FiShield, FiUsers } from 'react-icons/fi';

const featuredCategories = [
  {
    id: 'dental-laboratory',
    name: 'Dental Laboratory',
    icon: FiGrid,
    color: 'from-blue-500 to-blue-600',
    description: 'Professional lab equipment & materials',
    productCount: '150+ Products'
  },
  {
    id: 'dental-chairs',
    name: 'Dental Chairs',
    icon: FiActivity,
    color: 'from-green-500 to-green-600',
    description: 'Electric & hydraulic chair units',
    productCount: '25+ Products'
  },
  {
    id: 'surgical-equipment',
    name: 'Surgical Equipment',
    icon: FiScissors,
    color: 'from-red-500 to-red-600',
    description: 'Surgical tools & implant kits',
    productCount: '200+ Products'
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics',
    icon: FiTool,
    color: 'from-purple-500 to-purple-600',
    description: 'Brackets, wires & appliances',
    productCount: '180+ Products'
  },
  {
    id: 'imaging-equipment',
    name: 'Imaging & Diagnostics',
    icon: FiCamera,
    color: 'from-indigo-500 to-indigo-600',
    description: 'X-ray & intraoral cameras',
    productCount: '75+ Products'
  },
  {
    id: 'consumables',
    name: 'Consumables',
    icon: FiPackage,
    color: 'from-orange-500 to-orange-600',
    description: 'Gloves, PPE & daily supplies',
    productCount: '300+ Products'
  }
];

export function FeaturedCategories() {
  return (
    <div className="bg-white border-b border-gray-100 py-8">
      <div className="container-max">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Categories</h2>
          <p className="text-gray-600">Explore our comprehensive range of dental supplies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 font-medium">{category.productCount}</span>
                    <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <span>View All Categories</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}