import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiLocationMarker, HiPhone, HiSearch, HiHeart, HiShoppingCart, HiUser, HiMenu, HiChevronDown } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchBar } from '../common/SearchBar';
import { MobileMenu } from './MobileMenu';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Products', 
    href: '/products',
    dropdown: [
      { name: 'Clinical Tools', href: '/products/dental-clinic-tools' },
      { name: 'Laboratory', href: '/products/dental-laboratory' },
      { name: 'Materials', href: '/products/dental-materials' },
      { name: 'Machines & Equipment', href: '/products/dental-machines' },
      { name: 'Infection Control', href: '/products/infection-control' },
      { name: 'Student Kits', href: '/products/student-kits' },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Contact & Location', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2">
        <div className="container-max">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <HiLocationMarker className="h-3 w-3 sm:h-4 sm:w-4 text-white flex-shrink-0" />
              <span className="text-white truncate">Mepalux Plaza, River Road</span>
              <span className="hidden lg:inline text-white">, 3rd Floor, Suite 304</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <a href="tel:0703416433" className="flex items-center hover:text-orange-200 text-white">
                <HiPhone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-white" />
                <span className="hidden sm:inline">0703 416 433</span>
                <span className="sm:hidden">Call</span>
              </a>
              <span className="hidden md:inline text-white">|</span>
              <span className="hidden md:inline text-white">Free Delivery in Nairobi</span>
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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl">
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
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-300 ease-in-out py-1 px-3 rounded-lg inline-flex items-center ${
                    location.pathname === item.href || (item.dropdown && item.dropdown.some(subItem => location.pathname === subItem.href))
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-700 shadow-glow-orange'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <HiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                          location.pathname === subItem.href
                            ? 'text-orange-600 bg-orange-50 border-r-3 border-orange-600'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 ease-in-out shadow-md hover:shadow-glow-orange rounded-full"
            >
              <HiSearch className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 ease-in-out relative shadow-md hover:shadow-glow-orange rounded-full"
            >
              <HiHeart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 ease-in-out relative shadow-md hover:shadow-glow-orange rounded-full"
            >
              <HiShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 ease-in-out shadow-md hover:shadow-glow-orange rounded-full"
            >
              <HiUser className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 ease-in-out shadow-md hover:shadow-glow-orange rounded-full"
            >
              <HiMenu className="h-5 w-5" />
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