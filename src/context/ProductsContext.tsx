
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

// Initial mock products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Dental Chair Unit',
    category: 'Dental Chairs',
    price: 450000,
    salePrice: 425000,
    description: 'State-of-the-art dental chair with advanced features for professional dental practices.',
    images: ['https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 5,
    brand: 'DentalPro',
    features: ['Ergonomic design', 'LED lighting system', 'Memory foam cushioning'],
    specifications: { 'Weight Capacity': '150kg', 'Power': '220V', 'Warranty': '2 years' },
    rating: 4.8,
    reviewCount: 24,
    originalPrice: 450000,
    inStock: true
  },
  {
    id: '2',
    name: 'Digital X-Ray System',
    category: 'Equipment',
    price: 280000,
    description: 'Advanced digital X-ray system for precise dental imaging.',
    images: ['https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 3,
    brand: 'RadiTech',
    features: ['Digital imaging', 'Low radiation', 'High resolution'],
    specifications: { 'Resolution': '4K', 'Power': '220V', 'Warranty': '3 years' },
    rating: 4.9,
    reviewCount: 18,
    originalPrice: 300000,
    inStock: true
  },
  {
    id: '3',
    name: 'Complete Student Kit',
    category: 'Student Kits',
    price: 25000,
    description: 'Comprehensive dental student kit with all essential instruments.',
    images: ['https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 12,
    brand: 'StudyDent',
    features: ['Complete set', 'Professional grade', 'Carrying case included'],
    specifications: { 'Items': '25 pieces', 'Material': 'Stainless steel', 'Warranty': '1 year' },
    rating: 4.5,
    reviewCount: 45,
    originalPrice: 30000,
    inStock: true
  }
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      rating: 0,
      reviewCount: 0,
      inStock: productData.stock > 0,
      originalPrice: productData.price
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, inStock: (updates.stock ?? product.stock) > 0 }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
