import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiTool, FiActivity, FiScissors, FiCamera, FiPackage, FiDroplet, FiHeart, FiShield, FiTruck, FiCreditCard, FiGift, FiAward, FiUsers, FiSettings } from 'react-icons/fi';

const categories = [
  { name: 'All', href: '/', icon: FiGrid, isDefault: true },
  { name: 'Laboratory', href: '/products?category=dental-laboratory', icon: FiGrid },
  { name: 'Chairs', href: '/products?category=dental-chairs', icon: FiActivity },
  { name: 'Surgical', href: '/products?category=surgical-equipment', icon: FiScissors },
  { name: 'Orthodontics', href: '/products?category=orthodontics', icon: FiTool },
  { name: 'Imaging', href: '/products?category=imaging-equipment', icon: FiCamera },
  { name: 'Consumables', href: '/products?category=consumables', icon: FiPackage },
  { name: 'Materials', href: '/products?category=dental-materials', icon: FiDroplet },
  { name: 'Infection Control', href: '/products?category=infection-control', icon: FiShield },
  { name: 'Student Kits', href: '/products?category=student-kits', icon: FiUsers },
];

export function HorizontalCategoryNav() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container-max">
        <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide py-4">
          {categories.map((category) => {
            const isActive = category.isDefault 
              ? !currentCategory 
              : currentCategory === category.href.split('=')[1];
            
            return (
              <Link
                key={category.name}
                to={category.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}