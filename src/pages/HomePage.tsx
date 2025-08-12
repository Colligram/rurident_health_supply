import React from 'react';
import { ProductHeroSection } from '../components/home/ProductHeroSection';
import { TrustBadges } from '../components/home/TrustBadges';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <ProductHeroSection />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}