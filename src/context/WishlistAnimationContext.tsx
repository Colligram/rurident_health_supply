import React, { createContext, useContext } from 'react';

interface WishlistAnimationContextType {
  triggerWishlistAnimation: (element: HTMLElement) => void;
}

const WishlistAnimationContext = createContext<WishlistAnimationContextType | null>(null);

export function WishlistAnimationProvider({ children }: { children: React.ReactNode }) {
  const triggerWishlistAnimation = (element: HTMLElement) => {
    // Create red heart animation
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: fixed;
      pointer-events: none;
      font-size: 24px;
      z-index: 9999;
      animation: wishlistPulse 0.8s ease-out forwards;
      transform-origin: center;
    `;

    // Add keyframes if not already added
    if (!document.querySelector('#wishlist-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'wishlist-animation-styles';
      style.textContent = `
        @keyframes wishlistPulse {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
        
        @keyframes wishlistBounce {
          0%, 20%, 53%, 80%, 100% {
            transform: scale(1);
          }
          40%, 43% {
            transform: scale(1.3);
          }
        }
        
        .wishlist-bounce {
          animation: wishlistBounce 0.6s ease-in-out;
        }
        
        .wishlist-glow {
          animation: wishlistGlow 0.4s ease-out;
        }
        
        @keyframes wishlistGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Position the heart
    const rect = element.getBoundingClientRect();
    heart.style.left = `${rect.left + rect.width / 2 - 12}px`;
    heart.style.top = `${rect.top + rect.height / 2 - 12}px`;

    document.body.appendChild(heart);

    // Add bounce animation to the button
    element.classList.add('wishlist-bounce');
    element.classList.add('wishlist-glow');

    // Remove animations after completion
    setTimeout(() => {
      heart.remove();
      element.classList.remove('wishlist-bounce');
      element.classList.remove('wishlist-glow');
    }, 800);
  };

  return (
    <WishlistAnimationContext.Provider value={{ triggerWishlistAnimation }}>
      {children}
    </WishlistAnimationContext.Provider>
  );
}

export function useWishlistAnimation() {
  const context = useContext(WishlistAnimationContext);
  if (!context) {
    throw new Error('useWishlistAnimation must be used within a WishlistAnimationProvider');
  }
  return context;
}