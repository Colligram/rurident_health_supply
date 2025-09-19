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
  is_new?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  seller?: string;
  soldCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

import { mockProducts } from '../data/mockProducts';

class APIService {
  private baseURL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
    : '/api';
  // Enforce live API usage in production so UI can show empty-state gracefully
  private alwaysUseLiveApi = true;

  private sanitizeImageUrls(candidateImages: any, fallbackText: string): string[] {
    const placeholder = `https://via.placeholder.com/400x400?text=${encodeURIComponent(fallbackText)}`;
    const imagesArray: string[] = Array.isArray(candidateImages)
      ? candidateImages
      : (candidateImages ? [candidateImages] : []);

    const validImages = imagesArray
      .map((url) => (typeof url === 'string' ? url.trim() : ''))
      .filter(Boolean)
      .map((url) => {
        // Discard obvious invalids like bare dimensions or filenames without host
        if (/^(\d+x\d+)$/.test(url) || /^photo-/.test(url)) {
          return placeholder;
        }
        // If it's a known unsplash path missing params, keep as is; otherwise ensure it has a protocol
        if (/^https?:\/\//i.test(url)) {
          return url;
        }
        // Attempt to fix protocol-relative urls or bare domains
        if (/^\/\//.test(url)) {
          return `https:${url}`;
        }
        // As a last resort, use placeholder
        return placeholder;
      })
      .filter(Boolean);

    return validImages.length > 0 ? validImages : [placeholder];
  }

  async getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      console.log('🔄 DatabaseService: Starting to fetch products from:', `${this.baseURL}/products`);
      
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

      console.log('📡 DatabaseService: Response status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch products`);
      }

      const data = await response.json();
      console.log('📦 DatabaseService: Raw API response:', data);

      if (!Array.isArray(data)) {
        console.warn('⚠️ DatabaseService: Non-array payload received. Treating as empty.');
        return { success: true, data: [] };
      }

      // Map API data to frontend Product shape
      const mapped: Product[] = data.map((p: any) => ({
        id: p._id || p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice,
        originalPrice: p.originalPrice,
        images: this.sanitizeImageUrls(Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []), p.name || 'Product'),
        category: p.category,
        inStock: typeof p.inStock === 'boolean' ? p.inStock : (typeof p.stock === 'number' ? p.stock > 0 : true),
        stock: typeof p.stock === 'number' ? p.stock : (p.inStock ? 1 : 0),
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
        specifications: p.specifications,
        features: p.features,
        brand: p.brand,
        is_new: p.is_new,
        isBestSeller: p.isBestSeller,
        isFeatured: p.isFeatured,
        seller: p.seller,
        soldCount: p.soldCount,
        createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
        updatedAt: p.updatedAt ? new Date(p.updatedAt) : undefined,
      }));

      // Fallback to mock data if API returns empty or invalid data and we allow fallback
      if ((!mapped || mapped.length === 0) && !this.alwaysUseLiveApi) {
        console.warn('⚠️ DatabaseService: API returned no products. Falling back to mock products.');
        const mocked = mockProducts.map((p) => ({
          ...p,
          images: this.sanitizeImageUrls(p.images, p.name || 'Product')
        }));
        console.log('✅ DatabaseService: Using mock products:', mocked.length);
        return { success: true, data: mocked };
      }

      console.log('✅ DatabaseService: Mapped products:', mapped.length, 'products');
      return { success: true, data: mapped };
    } catch (error) {
      console.error('💥 DatabaseService: Error fetching products:', error);
      // Surface an empty list rather than hard error to avoid UI crashes
      return { success: true, data: [] };
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