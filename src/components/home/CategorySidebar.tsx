import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiGrid, FiSearch } from 'react-icons/fi';
import { useCategories } from '../../context/CategoriesContext';

interface Subcategory { id: string; name: string; path: string; icon: string; }

export function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { categories } = useCategories();

  const sidebarCategories = useMemo(() => {
    if (!categories) return [] as { id: string; name: string; subcategories: Subcategory[] }[];
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      subcategories: (c.subcategories || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        path: s.path,
        icon: s.icon || '📦'
      }))
    }));
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: string) => expandedCategories.includes(categoryId);

  return (
    <>
      {/* Mobile Menu Button - Enhanced with animations */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg border border-orange-200 px-6 py-4 flex items-center justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none group"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FiGrid className="w-7 h-7 text-white transform group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute -inset-1 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            </div>
            <span className="font-bold text-white text-lg group-hover:text-orange-100 transition-colors duration-300">Browse Categories</span>
            <div className="hidden sm:flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <span className="text-xs text-white font-medium animate-bounce">New!</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            {isMobileMenuOpen ? (
              <FiChevronDown className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <FiChevronRight className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </button>
        
        {/* Floating action hint */}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500 animate-bounce">👆 Tap to explore all categories</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-3">
            <FiGrid className="w-6 h-6" />
            <span>All Categories</span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Categories List */}
        <div className="max-h-96 overflow-y-auto">
          {sidebarCategories.map((category) => (
            <div key={category.id} className="border-b border-gray-100 last:border-b-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-primary-600`}>
                    <FiGrid className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </span>
                </div>
                {isExpanded(category.id) ? (
                  <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                )}
              </button>

              {/* Subcategories Dropdown */}
              {isExpanded(category.id) && (
                <div className="bg-gray-50 border-t border-gray-100">
                  <div className="px-6 py-3 space-y-2">
                    {category.subcategories.map((subcategory, index) => (
                      <Link
                        key={`${category.id}-${subcategory.id}-${index}`}
                        to={subcategory.path}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group/sub"
                      >
                        <span className="text-lg">{subcategory.icon}</span>
                        <span className="text-sm text-gray-700 group-hover/sub:text-primary-600 transition-colors">
                          {subcategory.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recently Viewed */}
        <div className="px-6 py-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recently Viewed</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Dental Chairs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Orthodontic Wires</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Sterilization Equipment</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Quick Access</span>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-4">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-3">
              <FiGrid className="w-5 h-5" />
              <span>All Categories</span>
            </h2>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Mobile Categories List */}
          <div className="max-h-96 overflow-y-auto">
            {sidebarCategories.map((category) => (
              <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-primary-600`}>
                      <FiGrid className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </span>
                  </div>
                  {isExpanded(category.id) ? (
                    <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  ) : (
                    <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  )}
                </button>

                {/* Subcategories Dropdown */}
                {isExpanded(category.id) && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    <div className="px-6 py-3 space-y-2">
                      {category.subcategories.map((subcategory, index) => (
                        <Link
                          key={`${category.id}-${subcategory.id}-${index}`}
                          to={subcategory.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group/sub"
                        >
                          <span className="text-lg">{subcategory.icon}</span>
                          <span className="text-sm text-gray-700 group-hover/sub:text-primary-600 transition-colors">
                            {subcategory.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Recently Viewed */}
          <div className="px-6 py-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recently Viewed</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Dental Chairs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Orthodontic Wires</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Sterilization Equipment</span>
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Quick Access</span>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}