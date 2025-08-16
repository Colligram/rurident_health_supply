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
  private serverAvailable = true;
  private lastCheck = 0;
  private readonly CHECK_INTERVAL = 60000; // Check server availability every minute

  private async checkServerAvailability(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastCheck < this.CHECK_INTERVAL) {
      return this.serverAvailable;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Quick check with 5s timeout
      
      // Try to fetch products with a very short timeout to check if server is responsive
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.serverAvailable = response.ok || response.status === 404; // 404 means server is up but endpoint not found
      this.lastCheck = now;
      return this.serverAvailable;
    } catch (error) {
      this.serverAvailable = false;
      this.lastCheck = now;
      return false;
    }
  }

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    // Check if server is available before making the request
    if (!(await this.checkServerAvailability())) {
      console.warn('Server not available, using mock data');
      this.useMockData = true;
      return { success: true, data: mockProducts };
    }

    try {
      // Create a more reasonable timeout approach
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds
      
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Only fall back to mock data for server errors, not client errors
        if (response.status >= 500) {
          console.warn('Server error, using mock data as fallback');
          this.useMockData = true;
          return { success: true, data: mockProducts };
        }
        throw new Error(`HTTP ${response.status}: Failed to fetch products`);
      }

      const data = await response.json();
      
      // Only use mock data if server explicitly returns empty data
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('Server returned empty data, using mock data as fallback');
        this.useMockData = true;
        return { success: true, data: mockProducts };
      }
      
      this.useMockData = false;
      return { success: true, data };
    } catch (error) {
      // Only fall back to mock data for network/connection issues, not other errors
      if (error.name === 'AbortError') {
        console.warn('Request timeout (30s), using mock data as fallback');
        this.useMockData = true;
        return { success: true, data: mockProducts };
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.warn('Network error (server may be down), using mock data as fallback');
        this.useMockData = true;
        return { success: true, data: mockProducts };
      } else {
        console.error('Error fetching products:', error);
        throw error; // Re-throw other errors instead of falling back to mock data
      }
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; id?: string }> {
    // If using mock data, simulate success but don't actually add
    if (this.useMockData) {
      console.warn('Using mock data - product add simulated');
      return { success: true, id: 'mock-' + Date.now() };
    }

    // Check if server is available before making the request
    if (!(await this.checkServerAvailability())) {
      console.warn('Server not available, using mock data for product add');
      this.useMockData = true;
      return { success: true, id: 'mock-' + Date.now() };
    }

    try {
      // Add timeout for add product as well
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to add product`);
      }

      const result = await response.json();
      return { success: true, id: result.id };
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Request timeout (30s) when adding product');
        return { success: false, error: 'Request timeout' };
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.warn('Network error when adding product');
        return { success: false, error: 'Network error' };
      } else {
        console.error('Error adding product:', error);
        return { success: false, error: error.message };
      }
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

  // Method to manually check server availability and reset mock data state
  async checkServerStatus(): Promise<{ available: boolean; usingMockData: boolean }> {
    const available = await this.checkServerAvailability();
    if (available && this.useMockData) {
      this.useMockData = false;
      console.log('Server is now available, switching back to live data');
    }
    return { available, usingMockData: this.useMockData };
  }

  // Method to force refresh server availability check
  async refreshServerStatus(): Promise<boolean> {
    this.lastCheck = 0; // Reset the last check time to force a new check
    return await this.checkServerAvailability();
  }
}

export const apiService = new APIService();