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
  reviewCount?: number;
  is_new?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  seller?: string;
  soldCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title?: string;
  comment: string;
  photos?: string[];
  isVerifiedBuyer: boolean;
  orderId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  moderatedBy?: string;
  moderatedAt?: Date;
  moderationNotes?: string;
  adminResponse?: {
    content: string;
    respondedBy: string;
    respondedAt: Date;
  };
  helpfulVotes: number;
  notHelpfulVotes: number;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface ReviewPagination {
  currentPage: number;
  totalPages: number;
  totalReviews: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ReviewResponse {
  reviews: Review[];
  stats: ReviewStats;
  pagination: ReviewPagination;
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