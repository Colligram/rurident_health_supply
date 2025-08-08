
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+254|0)[17]\d{8}$/;
  return phoneRegex.test(phone);
}

export function getStockStatus(stockCount: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
  if (stockCount === 0) return 'out-of-stock';
  if (stockCount <= 5) return 'low-stock';
  return 'in-stock';
}

export function getStockStatusColor(status: string): string {
  switch (status) {
    case 'in-stock':
      return 'text-green-600 bg-green-100';
    case 'low-stock':
      return 'text-yellow-600 bg-yellow-100';
    case 'out-of-stock':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function calculateDeliveryEstimate(address: string): string {
  const nairobiAreas = ['nairobi', 'westlands', 'karen', 'kileleshwa', 'lavington'];
  const isNairobi = nairobiAreas.some(area => 
    address.toLowerCase().includes(area)
  );
  
  return isNairobi ? '2-4 hours' : '24 hours';
}

export function getImagePlaceholder(width: number, height: number): string {
  return `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=80`;
}
