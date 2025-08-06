
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  toggleProductSelection: (id: string) => void;
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
    category: 'Clinical Machines & Equipment',
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
    category: 'Clinical Machines & Equipment',
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
    category: 'Complete Student Kits',
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
  },
  {
    id: '4',
    name: 'Mouth Mirror Set (Plain & Magnifying)',
    category: 'Diagnostic Instruments',
    price: 2500,
    description: 'Professional mouth mirrors for dental examination.',
    images: ['https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 25,
    brand: 'DentScope',
    features: ['Anti-fog coating', 'Ergonomic handle', 'Autoclavable'],
    specifications: { 'Mirror Size': '22mm', 'Material': 'Stainless steel', 'Warranty': '1 year' },
    rating: 4.6,
    reviewCount: 12,
    originalPrice: 2500,
    inStock: true
  },
  {
    id: '5',
    name: 'Composite Resin Kit',
    category: 'Restorative Materials',
    price: 15000,
    description: 'High-quality nanohybrid composite resin for anterior and posterior restorations.',
    images: ['https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 18,
    brand: 'ResinTech',
    features: ['Universal shade', 'Low shrinkage', 'High polish retention'],
    specifications: { 'Shade': 'A2', 'Volume': '4g', 'Shelf Life': '3 years' },
    rating: 4.7,
    reviewCount: 28,
    originalPrice: 15000,
    inStock: true
  },
  {
    id: '6',
    name: 'Extraction Forceps Set',
    category: 'Surgical / Extraction Instruments',
    price: 8500,
    description: 'Complete set of extraction forceps for maxillary and mandibular teeth.',
    images: ['https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stock: 8,
    brand: 'SurgiDent',
    features: ['Non-slip grip', 'Precise alignment', 'Corrosion resistant'],
    specifications: { 'Material': 'Surgical steel', 'Set Size': '6 pieces', 'Warranty': '2 years' },
    rating: 4.8,
    reviewCount: 15,
    originalPrice: 8500,
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

  const toggleProductSelection = (id: string) => {
    // This function is used for UI selection state, not for the actual data
    // Implementation depends on your selection requirements
    console.log('Toggle selection for product:', id);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    toggleProductSelection
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
