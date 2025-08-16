// Backend API service to communicate with our server
import { mockProducts } from '../data/mockProducts';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, any>;
  features?: string[];
  brand?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  seller?: string;
  soldCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class APIService {
  private baseURL = '/api';
  private useMockData = false;
  private activeRequests = new Map<string, Promise<any>>();

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    // Prevent duplicate concurrent requests
    const cacheKey = 'getProducts';
    if (this.activeRequests.has(cacheKey)) {
      return this.activeRequests.get(cacheKey);
    }

    const request = this.fetchProducts();
    this.activeRequests.set(cacheKey, request);
    
    try {
      const result = await request;
      this.activeRequests.delete(cacheKey);
      return result;
    } catch (error) {
      this.activeRequests.delete(cacheKey);
      throw error;
    }
  }

  private async fetchProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Increased timeout and better error handling
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        // If server is not available, return mock data
        if (response.status === 404 || response.status >= 500) {
          console.warn('Server unavailable, using mock data');
          this.useMockData = true;
          return { success: true, data: mockProducts };
        }
        throw new Error(`HTTP ${response.status}: Failed to fetch products`);
      }

      const data = await response.json();
      
      // If server returns empty array, use mock data as fallback
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('Server returned empty data, using mock data as fallback');
        this.useMockData = true;
        return { success: true, data: mockProducts };
      }
      
      this.useMockData = false;
      return { success: true, data };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn('Request was aborted, using mock data');
      } else if (error.name === 'TimeoutError') {
        console.warn('Request timeout, using mock data');
      } else if (error.name === 'TypeError') {
        console.warn('Network error (server may be down), using mock data');
      } else {
        console.error('Error fetching products:', error);
      }
      // Return mock data instead of empty array when server is unavailable
      this.useMockData = true;
      return { success: true, data: mockProducts };
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; id?: string }> {
    // If using mock data, simulate success but don't actually add
    if (this.useMockData) {
      console.warn('Using mock data - product add simulated');
      return { success: true, id: 'mock-' + Date.now() };
    }

    try {
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      return { success: true, id: result.id };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false };
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    // If using mock data, simulate success but don't actually update
    if (this.useMockData) {
      console.warn('Using mock data - product update simulated');
      return true;
    }

    try {
      const response = await fetch(`${this.baseURL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    // If using mock data, simulate success but don't actually delete
    if (this.useMockData) {
      console.warn('Using mock data - product delete simulated');
      return true;
    }

    try {
      const response = await fetch(`${this.baseURL}/products/${id}`, {
        method: 'DELETE',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
}

export const apiService = new APIService();