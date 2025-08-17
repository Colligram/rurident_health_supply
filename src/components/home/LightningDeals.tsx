import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiTruck, FiEye, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const lightningDeals = [
  {
    id: 1,
    name: 'Professional Dental Handpiece Set',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    price: 'KES 45,000',
    originalPrice: 'KES 65,000',
    sold: '156 sold',
    badge: 'Local',
    rating: 4.8,
    reviews: 89,
    isNew: false,
    description: 'High-quality dental handpiece set with multiple attachments for various dental procedures. Includes maintenance kit and warranty.'
  },
  {
    id: 2,
    name: 'Digital X-Ray Sensor Kit',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
    price: 'KES 125,000',
    originalPrice: 'KES 180,000',
    sold: '2.1K+ sold',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 234,
    isNew: false,
    description: 'Advanced digital X-ray sensor kit with high resolution imaging and easy integration with existing dental systems.'
  },
  {
    id: 3,
    name: 'Orthodontic Bracket Kit',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center',
    price: 'KES 8,500',
    originalPrice: 'KES 12,000',
    sold: '3.2K+ sold',
    badge: 'Hot',
    rating: 4.7,
    reviews: 567,
    isNew: false,
    description: 'Complete orthodontic bracket kit with various sizes and colors. Perfect for orthodontic procedures and treatments.'
  },
  {
    id: 4,
    name: 'Dental Chair Unit Complete',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    price: 'KES 450,000',
    originalPrice: 'KES 680,000',
    sold: '23 sold',
    badge: 'Premium',
    rating: 4.9,
    reviews: 45,
    isNew: true,
    description: 'Complete dental chair unit with advanced features including hydraulic positioning, LED lighting, and integrated suction system.'
  },
  {
    id: 5,
    name: 'Infection Control Kit',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
    price: 'KES 15,000',
    originalPrice: 'KES 22,000',
    sold: '1.8K+ sold',
    badge: 'Essential',
    rating: 4.6,
    reviews: 312,
    isNew: false,
    description: 'Comprehensive infection control kit with sterilization equipment, protective gear, and cleaning solutions for dental practices.'
  }
];

export function LightningDeals() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const startAutoScroll = () => {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex(prev => {
            const nextIndex = (prev + 1) % lightningDeals.length;
            if (scrollContainerRef.current) {
              const cardWidth = 180; // Approximate card width on mobile
              const gap = 12; // Gap between cards
              const scrollPosition = nextIndex * (cardWidth + gap);
              
              scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
              });
            }
            return nextIndex;
          });
        }, 3000); // 3 seconds interval
      };

      // Start auto-scroll after a short delay
      const timer = setTimeout(startAutoScroll, 1000);

      return () => {
        clearTimeout(timer);
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [isMobile]);

  // Pause auto-scroll on user interaction
  const handleUserInteraction = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      // Restart after 5 seconds of no interaction
      setTimeout(() => {
        if (isMobile && scrollContainerRef.current) {
          autoScrollRef.current = setInterval(() => {
            setCurrentIndex(prev => {
              const nextIndex = (prev + 1) % lightningDeals.length;
              if (scrollContainerRef.current) {
                const cardWidth = 180;
                const gap = 12;
                const scrollPosition = nextIndex * (cardWidth + gap);
                
                scrollContainerRef.current.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth'
                });
              }
              return nextIndex;
            });
          }, 3000);
        }
      }, 5000);
    }
  };

  const handleAddToCart = (deal: any) => {
    // Convert deal to Product format
    const product = {
      id: deal.id.toString(),
      name: deal.name,
      price: parseInt(deal.price.replace(/[^0-9]/g, '')),
      salePrice: parseInt(deal.price.replace(/[^0-9]/g, '')),
      images: [deal.image],
      category: 'dental-equipment'
    };
    addToCart(product, 1);
  };

  const handleWishlist = (deal: any) => {
    const product = {
      id: deal.id.toString(),
      name: deal.name,
      price: parseInt(deal.price.replace(/[^0-9]/g, '')),
      salePrice: parseInt(deal.price.replace(/[^0-9]/g, '')),
      images: [deal.image],
      category: 'dental-equipment'
    };
    
    const isInWishlist = wishlistItems.some(item => item.id === deal.id.toString());
    if (isInWishlist) {
      removeFromWishlist(deal.id.toString());
    } else {
      addToWishlist(product);
    }
  };

  const handleViewProduct = (deal: any) => {
    setSelectedProduct(deal);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-100 py-4 md:py-6">
        <div className="container-max">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Lightning deals</h2>
            <Link to="/products" className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1 text-sm">
              <span>View all</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className={`flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4 ${
              isMobile ? 'scroll-smooth' : ''
            }`}
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
          >
            {lightningDeals.map((deal, index) => {
              const isInWishlist = wishlistItems.some(item => item.id === deal.id.toString());
              return (
                <div 
                  key={deal.id} 
                  className={`flex-shrink-0 w-44 md:w-56 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                    isMobile && index === currentIndex ? 'ring-2 ring-orange-300 shadow-orange-200' : ''
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-32 md:h-40 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Dental+Product';
                      }}
                    />
                    {deal.badge && (
                      <div className={`absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium ${
                        isMobile ? 'animate-pulse' : ''
                      }`}>
                        {deal.badge}
                      </div>
                    )}
                    {deal.isNew && (
                      <div className={`absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium ${
                        isMobile ? 'animate-bounce' : ''
                      }`}>
                        NEW
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button 
                        onClick={() => handleViewProduct(deal)}
                        className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                        title="View Details"
                      >
                        <FiEye className="w-3 h-3 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleWishlist(deal)}
                        className={`w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                          isInWishlist 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <FiHeart className={`w-3 h-3 ${isInWishlist ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-2 line-clamp-2">
                      {deal.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{deal.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({deal.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base font-bold text-orange-600">{deal.price}</span>
                        <span className="text-xs text-gray-400 line-through">{deal.originalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{deal.sold}</span>
                      <button 
                        onClick={() => handleAddToCart(deal)}
                        className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-200 hover:scale-110 shadow-md"
                        title="Add to Cart"
                      >
                        <FiShoppingCart className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile scroll indicator */}
          {isMobile && (
            <div className="flex justify-center space-x-1 mt-2">
              {lightningDeals.map((_, index) => (
                <div
                  key={`scroll-indicator-${index}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Popup */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
              
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-orange-600">{selectedProduct.price}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">{selectedProduct.originalPrice}</span>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    onClick={() => handleWishlist(selectedProduct)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      wishlistItems.some(item => item.id === selectedProduct.id.toString())
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FiHeart className={`w-4 h-4 ${wishlistItems.some(item => item.id === selectedProduct.id.toString()) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}