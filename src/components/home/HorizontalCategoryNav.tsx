import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid } from 'react-icons/fi';
import { useCategories } from '../../context/CategoriesContext';

export function HorizontalCategoryNav() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');
  const { categories } = useCategories();

  const navItems = useMemo(() => {
    const items = [{ name: 'All', href: '/', isDefault: true } as { name: string; href: string; isDefault?: boolean }];
    if (categories && categories.length > 0) {
      for (const cat of categories) {
        items.push({ name: cat.name, href: `/products?category=${encodeURIComponent(cat.name)}` });
      }
    }
    return items;
  }, [categories]);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 md:top-16 z-40">
      <div className="container-max">
        <div className="flex items-center overflow-x-auto scrollbar-hide py-3 gap-2 md:gap-4">
          {navItems.map((category, index) => {
            const isActive = category.isDefault ? !currentCategory : currentCategory === decodeURIComponent(category.href.split('=')[1] || '');
            
            return (
              <Link
                key={category.name}
                to={category.href}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-500 ease-out whitespace-nowrap flex-shrink-0 text-sm animate-slideInRight ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50 border border-gray-200 hover:border-orange-200'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <FiGrid className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="font-medium text-xs md:text-sm">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}