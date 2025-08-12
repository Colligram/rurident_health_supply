import React from 'react';
import { CategorySidebar } from './CategorySidebar';
import { SearchBanner } from './SearchBanner';
import { ProductGrid } from './ProductGrid';

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBanner />
      
      {/* Main Content with Sidebar */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <CategorySidebar />
          </div>
          
          {/* Right Content - Products */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Discover our latest and most popular dental supplies</p>
              </div>
              <ProductGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}