import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  if (!isOpen) return null;

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
          <ul className="space-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block py-2 text-gray-900 hover:text-primary-600 font-medium"
                >
                  {item.name}
                </Link>
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