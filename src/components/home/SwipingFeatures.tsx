import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiStar, FiTruck, FiShield, FiAward, FiHeart, FiZap } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: 'Premium Quality',
    description: 'All our products meet international standards',
    icon: FiStar,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Countrywide delivery within 24-48 hours',
    icon: FiTruck,
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    title: 'Genuine Products',
    description: '100% authentic dental equipment',
    icon: FiShield,
    gradient: 'from-green-500 to-blue-500'
  },
  {
    id: 4,
    title: 'Expert Support',
    description: 'Professional technical assistance',
    icon: FiAward,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Best Prices',
    description: 'Competitive pricing guaranteed',
    icon: FiHeart,
    gradient: 'from-pink-500 to-red-500'
  },
  {
    id: 6,
    title: 'Lightning Deals',
    description: 'Exclusive offers and discounts',
    icon: FiZap,
    gradient: 'from-yellow-500 to-orange-500'
  }
];

export function SwipingFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (isMobile) {
      const startAutoScroll = () => {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex(prev => {
            const nextIndex = (prev + 1) % features.length;
            if (scrollContainerRef.current) {
              const cardWidth = isMobile ? 256 : 320; // Mobile: 256px (w-64), Desktop: 320px (w-80)
              const gap = 24; // 6 * 4 = 24px gap
              scrollContainerRef.current.scrollTo({
                left: nextIndex * (cardWidth + gap),
                behavior: 'smooth'
              });
            }
            return nextIndex;
          });
        }, 2000); // 2 seconds interval
      };

      startAutoScroll();

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [isMobile]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = isMobile ? 256 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = isMobile ? 256 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
    setCurrentIndex(prev => Math.min(features.length - 1, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = isMobile ? 256 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={sectionRef} className="bg-gradient-to-r from-purple-900 via-pink-900 to-black py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transform rotate-12 scale-150"></div>
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Rurident</span>
          </h2>
          <p className="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto">
            Experience excellence in dental healthcare with our premium products and exceptional service
          </p>
        </div>

        {/* Navigation Buttons - Hidden on Mobile */}
        {!isMobile && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                currentIndex === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollRight}
              disabled={currentIndex === features.length - 1}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                currentIndex === features.length - 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Mobile Dots Indicator - Smaller and Better Positioned */}
        {isMobile && (
          <div className="flex justify-center space-x-1.5 mb-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-110'
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Features Container */}
        <div 
          ref={scrollContainerRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 ${
            isMobile ? 'snap-x snap-mandatory' : ''
          }`}
          style={{ scrollSnapType: isMobile ? 'x mandatory' : 'none' }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex-shrink-0 ${isMobile ? 'w-64' : 'w-80'} bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? 'p-4' : 'p-6 md:p-8'} border border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/20 ${
                index === currentIndex ? 'scale-105 bg-white/20' : ''
              } ${isMobile ? 'snap-start' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                scrollSnapAlign: isMobile ? 'start' : 'none',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`${isMobile ? 'w-12 h-12 mb-4' : 'w-16 h-16 mb-6'} bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12`}>
                <feature.icon className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
              </div>
              
              <h3 className={`${isMobile ? 'text-lg mb-2' : 'text-xl md:text-2xl mb-4'} font-bold text-white text-center`}>
                {feature.title}
              </h3>
              
              <p className={`text-purple-200 text-center leading-relaxed ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
                {feature.description}
              </p>

              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}