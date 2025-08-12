import React from 'react';
import { ProductHeroSection } from '../components/home/ProductHeroSection';
import { TrustBadges } from '../components/home/TrustBadges';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { ProductGrid } from '../components/home/ProductGrid';
import { SearchBanner } from '../components/home/SearchBanner';
import { CategoryNavigation } from '../components/home/CategoryNavigation';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBanner />
      <CategoryNavigation />
      <ProductHeroSection />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <TestimonialsSection />
      <WhyChooseUs />
      <NewsletterSection />
      <ProductGrid />
    </div>
  );
}