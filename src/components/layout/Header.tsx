import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchBar } from '../common/SearchBar';
import { MobileMenu } from './MobileMenu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dental Chairs', href: '/products/dental-chairs' },
  { name: 'Equipment', href: '/products/equipment' },
  { name: 'Materials', href: '/products/materials' },
  { name: 'X-Ray & Consumables', href: '/products/xray-consumables' },
  { name: 'Student Kits', href: '/products/student-kits' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-max">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📍 Mepalux Plaza, River Road, 3rd Floor, Suite 304</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:0703416433" className="flex items-center hover:text-primary-200">
                <span className="mr-1">📞</span>
                0703 416 433
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Free Delivery in Nairobi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rurident</h1>
                <p className="text-xs text-gray-500">Health Supplies</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.href
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <span className="text-xl">🔍</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <span className="text-xl">♥</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <span className="text-xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <span className="text-xl">👤</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}