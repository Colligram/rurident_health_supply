import React, { useState } from 'react';
import { HiCalendar, HiUser, HiTag, HiArrowRight, HiSearch } from 'react-icons/hi';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'dental-tips', name: 'Dental Tips', count: 4 },
    { id: 'industry-news', name: 'Industry News', count: 3 },
    { id: 'product-guides', name: 'Product Guides', count: 3 },
    { id: 'company-updates', name: 'Company Updates', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Dental Equipment for New Clinics: A Complete Guide',
      excerpt: 'Starting a new dental clinic? Discover the essential equipment you need to get started, from basic instruments to advanced technology that will set your practice apart.',
      category: 'product-guides',
      author: 'Dr. Sarah Kimani',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      tags: ['Equipment', 'New Clinics', 'Setup Guide']
    },
    {
      id: 2,
      title: 'The Future of Digital Dentistry: Trends to Watch in 2024',
      excerpt: 'Explore the latest innovations in digital dentistry, including AI-powered diagnostics, 3D printing, and advanced imaging technologies that are revolutionizing the field.',
      category: 'industry-news',
      author: 'Dr. Michael Ochieng',
      date: '2024-01-12',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['Digital Dentistry', 'Innovation', 'Technology']
    },
    {
      id: 3,
      title: 'Maintaining Your Dental Chair: Best Practices for Longevity',
      excerpt: 'Learn the essential maintenance routines that will keep your dental chair in top condition for years to come, saving you money and ensuring patient comfort.',
      category: 'dental-tips',
      author: 'Technical Team',
      date: '2024-01-10',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['Maintenance', 'Dental Chairs', 'Best Practices']
    },
    {
      id: 4,
      title: 'Choosing the Right Consumables: Quality vs. Cost Considerations',
      excerpt: 'Navigate the balance between quality and cost when selecting dental consumables. Our expert guide helps you make informed decisions for your practice.',
      category: 'product-guides',
      author: 'Dr. Grace Wanjiku',
      date: '2024-01-08',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['Consumables', 'Quality', 'Cost Analysis']
    },
    {
      id: 5,
      title: 'Student Kit Essentials: What Every Dental Student Needs',
      excerpt: 'Are you a dental student? Discover the essential tools and equipment that should be in your student kit for successful learning and practice.',
      category: 'dental-tips',
      author: 'Dr. James Mwangi',
      date: '2024-01-05',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      tags: ['Student Kits', 'Dental Education', 'Essentials']
    },
    {
      id: 6,
      title: 'Rurident\'s Commitment to Quality: Our Quality Assurance Process',
      excerpt: 'Learn about our rigorous quality assurance process and how we ensure every product meets the highest standards before reaching your practice.',
      category: 'company-updates',
      author: 'Quality Team',
      date: '2024-01-03',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['Quality', 'Company', 'Standards']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dental Industry Blog</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and news from the dental industry. 
              Expert advice from professionals and updates from Rurident Health Supplies.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Post Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <HiSearch className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Blog Image</p>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <HiCalendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Author and Read Time */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <HiUser className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  {/* Read More Button */}
                  <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>Read Article</span>
                    <HiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HiSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest dental industry insights, 
            product updates, and exclusive offers directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
            />
            <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}