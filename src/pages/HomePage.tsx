import React from 'react';
import { ProductGrid } from '../components/home/ProductGrid';
import { SearchBanner } from '../components/home/SearchBanner';
import { CategoryNavigation } from '../components/home/CategoryNavigation';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBanner />
      <CategoryNavigation />
      <ProductGrid />
    </div>
  );
}