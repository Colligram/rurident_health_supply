import React, { useState, useEffect } from 'react';
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
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white'
    }`}>
      {/* Top bar - Mobile Optimized */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-1.5 md:py-2">
        <div className="container-max">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <HiLocationMarker className="h-3 w-3 text-white flex-shrink-0" />
              <span className="text-white truncate">Mepalux Plaza, River Road</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <a href="tel:0703416433" className="flex items-center hover:text-orange-200 text-white transition-colors duration-200">
                <HiPhone className="h-3 w-3 mr-1 text-white" />
                <span className="hidden sm:inline">0703 416 433</span>
                <span className="sm:hidden">Call</span>
              </a>
              <span className="hidden md:inline text-white">|</span>
              <span className="hidden md:inline text-white text-xs">Free Delivery in Nairobi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - Mobile Optimized */}
      <div className="container-max">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - More compact for mobile */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg md:text-xl">R</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Rurident</h1>
                <p className="text-xs text-gray-500">Health Supplies</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 ease-in-out py-2 px-3 rounded-lg inline-flex items-center ${
                    location.pathname === item.href || (item.dropdown && item.dropdown.some(subItem => location.pathname === subItem.href))
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md'
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
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-orange-100 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-4 py-2 text-sm transition-all duration-200 mx-2 rounded-lg ${
                          location.pathname === subItem.href
                            ? 'text-orange-600 bg-orange-50'
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

          {/* Mobile Search and Actions - Compact */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-50 rounded-lg"
            >
              <HiSearch className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 ease-in-out relative hover:bg-orange-50 rounded-lg"
            >
              <HiHeart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 ease-in-out relative hover:bg-orange-50 rounded-lg"
            >
              <HiShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account - Hidden on small screens */}
            <Link
              to="/account"
              className="hidden sm:block p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-50 rounded-lg"
            >
              <HiUser className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-50 rounded-lg"
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