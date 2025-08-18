export interface Subcategory {
  id: string;
  name: string;
  path: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
}

class CategoryService {
  private baseURL = '/api';

  async getCategories(): Promise<{ success: boolean; data?: Category[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch categories`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      // Map database format to frontend format
      const mappedData = data.map(category => ({
        id: category._id || category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        subcategories: category.subcategories || [],
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }));
      
      return { success: true, data: mappedData };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, error: 'Failed to fetch categories' };
    }
  }

  async getCategoryById(id: string): Promise<{ success: boolean; data?: Category; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/categories/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const data = await response.json();
      
      const mappedData = {
        id: data._id || data.id,
        name: data.name,
        description: data.description,
        icon: data.icon,
        subcategories: data.subcategories || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      
      return { success: true, data: mappedData };
    } catch (error) {
      console.error('Error fetching category:', error);
      return { success: false, error: 'Failed to fetch category' };
    }
  }

  async addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const result = await response.json();
      return { success: true, id: result.id };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: 'Failed to add category' };
    }
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating category:', error);
      return { success: false, error: 'Failed to update category' };
    }
  }

  async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: 'Failed to delete category' };
    }
  }
}

export const categoryService = new CategoryService();