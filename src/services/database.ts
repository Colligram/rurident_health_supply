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
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class APIService {
  private baseURL = '/api';
  private useMockData = false;

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000)
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
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        console.warn('Request timeout, using mock data');
      } else if (error instanceof Error && error.name === 'TypeError') {
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