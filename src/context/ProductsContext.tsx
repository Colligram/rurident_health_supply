import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Product } from '../services/database';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProducts = await apiService.getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      // Fallback to empty array if API fails
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Safely fetch products with error handling
    const loadProducts = async () => {
      try {
        await refreshProducts();
      } catch (error) {
        console.error('Failed to load products:', error);
        // Set products to empty array on error to prevent undefined issues
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const result = await apiService.addProduct(productData);

      if (result.success) {
        // Refresh products to get the latest data
        await refreshProducts();
      } else {
        throw new Error('Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      setError(null);
      const success = await apiService.updateProduct(id, updates);

      if (success) {
        // Update local state
        setProducts(prev => 
          prev.map(product => 
            product.id === id 
              ? { ...product, ...updates, updatedAt: new Date() }
              : product
          )
        );
      } else {
        throw new Error('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      const success = await apiService.deleteProduct(id);

      if (success) {
        // Update local state
        setProducts(prev => prev.filter(product => product.id !== id));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
      throw err;
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const value: ProductsContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    isLoading,
    error,
    refreshProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}