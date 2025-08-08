import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';

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
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className="flex items-center justify-between w-full py-3 text-gray-900 hover:text-primary-600 font-medium"
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
                              className="block py-2 text-gray-700 hover:text-primary-600"
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
                    className="block py-3 text-gray-900 hover:text-primary-600 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-8 border-t">
            <div className="space-y-4">
              <Link
                to="/account"
                onClick={onClose}
                className="block py-2 text-gray-900 hover:text-primary-600"
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="block py-2 text-gray-900 hover:text-primary-600"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="block py-2 text-gray-900 hover:text-primary-600"
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}