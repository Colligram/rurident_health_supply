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
  // When true, the service will not attempt to use mock data; it will surface real errors instead
  private alwaysUseLiveApi = true;

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      // Create a more compatible timeout approach
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${this.baseURL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch products`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      // Map API data to frontend Product shape
      const mapped: Product[] = data.map((p: any) => ({
        id: p._id || p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice,
        originalPrice: p.originalPrice,
        images: Array.isArray(p.images)
          ? p.images
          : (p.image ? [p.image] : []),
        category: p.category,
        inStock: typeof p.inStock === 'boolean' ? p.inStock : (typeof p.stock === 'number' ? p.stock > 0 : true),
        stock: typeof p.stock === 'number' ? p.stock : (p.inStock ? 1 : 0),
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
        specifications: p.specifications,
        features: p.features,
        brand: p.brand,
        isNew: p.isNew,
        isBestSeller: p.isBestSeller,
        isFeatured: p.isFeatured,
        seller: p.seller,
        soldCount: p.soldCount,
        createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
        updatedAt: p.updatedAt ? new Date(p.updatedAt) : undefined,
      }));

      return { success: true, data: mapped };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, error: 'Failed to fetch products' };
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      console.log('Sending product data:', product);
      
      const response = await fetch(`${this.baseURL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: Failed to add product`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use the default error message
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return { success: true, id: result.id };
    } catch (error: any) {
      console.error('Error adding product:', error, error?.message, error?.stack);
      return { success: false, error: error.message || 'Failed to add product' };
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