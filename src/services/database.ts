// Backend API service to communicate with our server
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
  createdAt?: Date;
  updatedAt?: Date;
}

class APIService {
  private baseURL = '/api';

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        // If server is not available, return empty data
        if (response.status === 404 || response.status >= 500) {
          console.warn('Server unavailable, using empty data');
          return { success: true, data: [] };
        }
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return empty array instead of error to prevent app crashes
      return { success: true, data: [] };
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; id?: string }> {
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