export interface ProductMapping {
  _id?: string;
  productName: string;
  subcategory: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductMappingRequest {
  productName: string;
  subcategory: string;
  category?: string;
}

class ProductMappingService {
  private baseUrl = '/api/product-mappings';

  async getAllMappings(): Promise<ProductMapping[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product mappings:', error);
      throw error;
    }
  }

  async searchMappings(query: string): Promise<ProductMapping[]> {
    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching product mappings:', error);
      throw error;
    }
  }

  async createMapping(mapping: CreateProductMappingRequest): Promise<{ success: boolean; mapping: ProductMapping; message: string }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapping),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error creating product mapping:', error);
      throw error;
    }
  }

  async updateMapping(id: string, mapping: Partial<CreateProductMappingRequest>): Promise<{ success: boolean; mapping: ProductMapping }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapping),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error updating product mapping:', error);
      throw error;
    }
  }

  async deleteMapping(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error deleting product mapping:', error);
      throw error;
    }
  }
}

export const productMappingService = new ProductMappingService();