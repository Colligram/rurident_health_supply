
import React from 'react';
import {
  HiLocationMarker,
  HiPhone,
  HiClock,
  HiSearch,
  HiHeart,
  HiShoppingCart,
  HiUser,
  HiMenu,
  HiX,
  HiArrowRight,
  HiPlay,
  HiStar,
  HiCheck,
  HiShieldCheck,
  HiTruck,
  HiSupport,
  HiRefresh,
  HiMail,
  HiEye,
  HiPlus,
  HiMinus,
  HiFilter,
  HiSortAscending,
  HiChevronDown,
  HiChevronUp,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

export const Icons = {
  // Navigation & UI
  search: HiSearch,
  heart: HiHeart,
  shoppingCart: HiShoppingCart,
  user: HiUser,
  menu: HiMenu,
  close: HiX,
  arrowRight: HiArrowRight,
  play: HiPlay,
  eye: HiEye,
  plus: HiPlus,
  minus: HiMinus,
  filter: HiFilter,
  sort: HiSortAscending,
  chevronDown: HiChevronDown,
  chevronUp: HiChevronUp,
  chevronLeft: HiChevronLeft,
  chevronRight: HiChevronRight,

  // Contact & Location
  location: HiLocationMarker,
  phone: HiPhone,
  clock: HiClock,
  mail: HiMail,

  // Rating & Status
  star: HiStar,
  check: HiCheck,
  shield: HiShieldCheck,

  // Services
  truck: HiTruck,
  support: HiSupport,
  refresh: HiRefresh,
};

// Icon component with consistent styling
interface IconProps {
  icon: keyof typeof Icons;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Icon({ icon, className = '', size = 'md' }: IconProps) {
  const IconComponent = Icons[icon];
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
}
