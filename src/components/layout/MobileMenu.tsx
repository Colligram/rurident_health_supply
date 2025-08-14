import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiChevronDown, HiX } from 'react-icons/hi';

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: Array<{ name: string; href: string }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  if (!isOpen) return null;

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">R</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Rurident</h2>
              <p className="text-xs text-orange-100">Health Supplies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-orange-700 rounded-lg transition-colors"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className="flex items-center justify-between w-full py-3 px-3 text-gray-900 hover:text-orange-600 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                    >
                      {item.name}
                      <HiChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedItems.includes(item.name) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {expandedItems.includes(item.name) && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              onClick={onClose}
                              className="block py-2 px-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="block py-3 px-3 text-gray-900 hover:text-orange-600 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Additional Menu Items */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center py-2 px-3 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center py-2 px-3 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center py-2 px-3 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H19" />
                </svg>
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0703 416 433
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Mepalux Plaza, River Road
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}