import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartAnimationContextType {
  triggerAnimation: (buttonElement: HTMLElement) => void;
  isAnimating: boolean;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function useCartAnimation() {
  const context = useContext(CartAnimationContext);
  if (context === undefined) {
    throw new Error('useCartAnimation must be used within a CartAnimationProvider');
  }
  return context;
}

export function CartAnimationProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = (buttonElement: HTMLElement) => {
    if (isAnimating) return; // Prevent multiple animations
    
    setIsAnimating(true);
    
    // Get button position
    const buttonRect = buttonElement.getBoundingClientRect();
    
    // Get cart icon position (top right of navbar)
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (!cartIcon) {
      setIsAnimating(false);
      return;
    }
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create animated element
    const animatedIcon = document.createElement('div');
    animatedIcon.innerHTML = `
      <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
      </svg>
    `;
    
    // Style the animated element
    animatedIcon.style.position = 'fixed';
    animatedIcon.style.left = `${buttonRect.left + buttonRect.width / 2 - 12}px`;
    animatedIcon.style.top = `${buttonRect.top + buttonRect.height / 2 - 12}px`;
    animatedIcon.style.width = '24px';
    animatedIcon.style.height = '24px';
    animatedIcon.style.zIndex = '9999';
    animatedIcon.style.pointerEvents = 'none';
    animatedIcon.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    document.body.appendChild(animatedIcon);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      animatedIcon.style.left = `${cartRect.left + cartRect.width / 2 - 12}px`;
      animatedIcon.style.top = `${cartRect.top + cartRect.height / 2 - 12}px`;
      animatedIcon.style.transform = 'scale(0.5)';
      animatedIcon.style.opacity = '0.7';
    }, 50);
    
    // Remove element and reset state after animation
    setTimeout(() => {
      document.body.removeChild(animatedIcon);
      setIsAnimating(false);
      
      // Add a subtle pulse to the cart icon
      if (cartIcon) {
        cartIcon.classList.add('animate-pulse');
        setTimeout(() => {
          cartIcon.classList.remove('animate-pulse');
        }, 600);
      }
    }, 850);
  };

  return (
    <CartAnimationContext.Provider value={{ triggerAnimation, isAnimating }}>
      {children}
    </CartAnimationContext.Provider>
  );
}