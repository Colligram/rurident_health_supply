import React from 'react';
import { ProductGrid } from '../components/home/ProductGrid';
import { SearchBanner } from '../components/home/SearchBanner';
import { CategorySections } from '../components/home/CategorySections';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBanner />
      <CategorySections />
      <ProductGrid />
    </div>
  );
}