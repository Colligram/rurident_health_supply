import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Product } from '../services/database';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductSelection: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 ProductsContext: Starting to fetch products...');
      const result = await apiService.getProducts();
      console.log('📦 ProductsContext: API response:', result);
      if (result.success && result.data && Array.isArray(result.data)) {
        console.log('✅ ProductsContext: Setting products:', result.data.length, 'products');
        setProducts(result.data);
      } else {
        console.error('❌ ProductsContext: Invalid response format:', result);
        setProducts([]);
        setError(result.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('💥 ProductsContext: Error refreshing products:', err);
      setProducts([]);
      setError('Failed to refresh products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const result = await apiService.addProduct(product);
      if (result.success) {
        await refreshProducts();
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const success = await apiService.updateProduct(id, updates);
      if (success) {
        await refreshProducts();
      } else {
        throw new Error('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const success = await apiService.deleteProduct(id);
      if (success) {
        await refreshProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const toggleProductSelection = (id: string) => {
    // This function is used by the ProductsManagementPage for bulk operations
    // It doesn't need to modify the products state, just provide the interface
    console.log('Toggle product selection:', id);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const value: ProductsContextType = {
    products,
    loading,
    error,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductSelection,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};