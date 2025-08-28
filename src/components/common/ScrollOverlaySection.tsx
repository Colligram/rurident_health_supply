import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollOverlaySectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  zIndex?: number;
  minHeight?: string;
  id?: string;
  enableParallax?: boolean;
  offsetY?: number;
}

export const ScrollOverlaySection: React.FC<ScrollOverlaySectionProps> = ({
  children,
  className = '',
  bgColor = 'bg-white',
  zIndex = 1,
  minHeight = 'min-h-[100dvh]',
  id,
  enableParallax = false,
  offsetY = 0
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const speed = 0.5; // Parallax speed factor
        setScrollY(rect.top * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax]);

  const parallaxStyle = enableParallax 
    ? { transform: `translateY(${scrollY + offsetY}px)` }
    : {};

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`sticky top-0 ${bgColor} ${minHeight} ${className} overflow-hidden scroll-overlay-section`}
      style={{ 
        zIndex,
        borderTopLeftRadius: zIndex < 10 ? '2rem' : '0',
        borderTopRightRadius: zIndex < 10 ? '2rem' : '0',
        boxShadow: zIndex < 10 ? '0 -10px 20px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <div 
        className="relative w-full h-full"
        style={parallaxStyle}
      >
        {children}
      </div>
      
      {/* Scroll indicator */}
      {zIndex >= 9 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScrollOverlaySection;