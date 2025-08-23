import React from 'react';
import { CategorySidebar } from './CategorySidebar';
import { SearchBanner } from './SearchBanner';
import { ProductGrid } from './ProductGrid';
import { PromotionalBanners } from './PromotionalBanners';
import { HorizontalCategoryNav } from './HorizontalCategoryNav';
import { LightningDeals } from './LightningDeals';
import { PartnershipBanner } from './PartnershipBanner';
import { SecondaryFilters } from './SecondaryFilters';
import { SwipingFeatures } from './SwipingFeatures';
import ScrollOverlaySection from '../common/ScrollOverlaySection';

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50 scroll-overlay-container">
      {/* First Section - Hero and Navigation */}
      <ScrollOverlaySection
        bgColor="bg-gray-50"
        zIndex={10}
        id="hero-section"
        className="pb-8"
      >
        <SearchBanner />
        
        {/* Horizontal Category Navigation */}
        <HorizontalCategoryNav />
        
        {/* Promotional Banners */}
        <PromotionalBanners />
      </ScrollOverlaySection>

      {/* Second Section - Deals and Partnership */}
      <ScrollOverlaySection
        bgColor="bg-gradient-to-br from-blue-50 via-white to-purple-50"
        zIndex={9}
        id="deals-section"
        className="pt-8 pb-8"
      >
        {/* Lightning Deals Section */}
        <LightningDeals />
        
        {/* Partnership Banner */}
        <PartnershipBanner />
        
        {/* Secondary Filters */}
        <SecondaryFilters />
      </ScrollOverlaySection>

      {/* Third Section - Products */}
      <ScrollOverlaySection
        bgColor="bg-white"
        zIndex={8}
        id="products-section"
        className="pt-8 pb-8"
      >
        {/* Main Content with Sidebar */}
        <div className="container-max py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <CategorySidebar />
            </div>
            
            {/* Right Content - Products */}
            <div className="lg:col-span-3">
              <div className="featured-products-section bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                {/* Animated gradient background */}
                <div className="featured-products-gradient"></div>
                
                <div className="relative z-10 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Products</h2>
                  <p className="text-gray-600">Discover our latest and most popular dental supplies</p>
                </div>
                <div className="relative z-10">
                  <ProductGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollOverlaySection>

      {/* Fourth Section - Features */}
      <ScrollOverlaySection
        bgColor="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"
        zIndex={7}
        id="features-section"
      >
        {/* Swiping Features Section */}
        <SwipingFeatures />
      </ScrollOverlaySection>
    </div>
  );
}