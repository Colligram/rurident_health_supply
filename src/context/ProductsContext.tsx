
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { databaseService } from '../services/database';

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
      await databaseService.connect();
      const dbProducts = await databaseService.getProducts();
      
      const formattedProducts = dbProducts.map(product => ({
        ...product,
        id: product._id.toString(),
        _id: undefined // Remove MongoDB _id field
      }));
      
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      // Fallback to empty array if database fails
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
    
    // Cleanup on unmount
    return () => {
      databaseService.disconnect();
    };
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      await databaseService.connect();
      
      const newProduct = {
        ...productData,
        id: Date.now().toString(), // Temporary ID
      };

      const result = await databaseService.addProduct(newProduct);
      
      if (result.acknowledged) {
        // Refresh products to get the latest data
        await refreshProducts();
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
      await databaseService.connect();
      
      const result = await databaseService.updateProduct(id, updates);
      
      if (result.acknowledged) {
        // Update local state
        setProducts(prev => 
          prev.map(product => 
            product.id === id 
              ? { ...product, ...updates, updatedAt: new Date() }
              : product
          )
        );
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
      await databaseService.connect();
      
      const result = await databaseService.deleteProduct(id);
      
      if (result.acknowledged) {
        // Update local state
        setProducts(prev => prev.filter(product => product.id !== id));
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
