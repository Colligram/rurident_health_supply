import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { categoryService, Category } from '../services/categoryService';

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 CategoriesContext: Starting to fetch categories...');
      const result = await categoryService.getCategories();
      console.log('📦 CategoriesContext: API response:', result);
      if (result.success && result.data) {
        console.log('✅ CategoriesContext: Setting categories:', result.data.length, 'categories');
        setCategories(result.data);
      } else {
        console.error('❌ CategoriesContext: Invalid response format:', result);
        setCategories([]);
        setError(result.error || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('💥 CategoriesContext: Error fetching categories:', err);
      setCategories([]);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const ctx = useContext(CategoriesContext);
  if (!ctx) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return ctx;
};

