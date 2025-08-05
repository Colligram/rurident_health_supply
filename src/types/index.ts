export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  brand?: string;
  stock: number;
  features?: string[];
  specifications?: Record<string, string>;
  rating?: number;
  reviews?: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: Date;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}