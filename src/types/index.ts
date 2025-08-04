export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
  variations?: ProductVariation[];
  relatedProducts?: string[];
  videoUrl?: string;
  threeSixtyView?: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  attributes: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: Category[];
}

export interface CartItem {
  productId: string;
  variationId?: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  orderHistory: Order[];
  wishlist: string[];
  loyaltyPoints: number;
}

export interface Address {
  street: string;
  city: string;
  county: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  videoUrl?: string;
  createdAt: Date;
  helpful: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

export interface StockStatus {
  inStock: boolean;
  stockCount: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}