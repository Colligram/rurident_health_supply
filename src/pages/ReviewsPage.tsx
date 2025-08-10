import React, { useState } from 'react';
import { HiStar, HiThumbUp, HiThumbDown, HiCheckCircle, HiUser, HiCalendar } from 'react-icons/hi';

export function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');

  const ratingFilters = [
    { rating: 5, label: '5 Stars', count: 156 },
    { rating: 4, label: '4 Stars', count: 89 },
    { rating: 3, label: '3 Stars', count: 23 },
    { rating: 2, label: '2 Stars', count: 8 },
    { rating: 1, label: '1 Star', count: 3 }
  ];

  const reviews = [
    {
      id: 1,
      customerName: 'Dr. Sarah Kimani',
      customerType: 'Dental Clinic Owner',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent Quality and Service',
      content: 'I\'ve been purchasing from Rurident for over 3 years now, and I couldn\'t be happier. Their dental chairs are top-notch quality, and the customer service is exceptional. They helped me set up my entire clinic with the best equipment available. The installation team was professional and thorough. Highly recommended!',
      verified: true,
      helpful: 24,
      notHelpful: 1,
      images: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
      tags: ['Quality', 'Service', 'Installation', 'Dental Chairs']
    },
    {
      id: 2,
      customerName: 'Dr. Michael Ochieng',
      customerType: 'Hospital Dentist',
      rating: 5,
      date: '2024-01-12',
      title: 'Reliable Supplier for Medical Equipment',
      content: 'Rurident has been our go-to supplier for all dental equipment needs. Their products meet international standards, and they always deliver on time. The technical support team is knowledgeable and responsive. We\'ve never had any issues with their equipment or service.',
      verified: true,
      helpful: 18,
      notHelpful: 0,
      images: [],
      tags: ['Reliability', 'Standards', 'Technical Support']
    },
    {
      id: 3,
      customerName: 'Grace Wanjiku',
      customerType: 'Dental Student',
      rating: 5,
      date: '2024-01-10',
      title: 'Perfect Student Kit',
      content: 'As a dental student, I needed a comprehensive kit that wouldn\'t break the bank. Rurident\'s student kit exceeded my expectations. All the instruments are high quality, and the case is durable. The staff was very helpful in explaining what each tool is for. Great value for money!',
      verified: true,
      helpful: 15,
      notHelpful: 0,
      images: ['/api/placeholder/200/150'],
      tags: ['Student Kit', 'Value', 'Quality', 'Helpful Staff']
    },
    {
      id: 4,
      customerName: 'Dr. James Mwangi',
      customerType: 'Private Practice',
      rating: 4,
      date: '2024-01-08',
      title: 'Good Products, Great Support',
      content: 'I purchased a dental unit from Rurident and overall I\'m satisfied. The equipment quality is good, though I had a minor issue initially. Their support team was quick to respond and resolved the problem efficiently. Delivery was prompt and installation was smooth.',
      verified: true,
      helpful: 12,
      notHelpful: 2,
      images: [],
      tags: ['Support', 'Delivery', 'Installation']
    },
    {
      id: 5,
      customerName: 'Dr. Amina Hassan',
      customerType: 'Clinic Manager',
      rating: 5,
      date: '2024-01-05',
      title: 'Outstanding Bulk Order Experience',
      content: 'We needed to equip an entire new wing of our dental clinic. Rurident handled our large order professionally, providing excellent bulk pricing and coordinating delivery perfectly. Their team worked around our schedule and ensured minimal disruption to our operations. The quality of all equipment is excellent.',
      verified: true,
      helpful: 20,
      notHelpful: 0,
      images: ['/api/placeholder/200/150'],
      tags: ['Bulk Orders', 'Professional Service', 'Quality', 'Coordination']
    },
    {
      id: 6,
      customerName: 'Dr. Peter Njoroge',
      customerType: 'Rural Clinic Owner',
      rating: 5,
      date: '2024-01-03',
      title: 'Excellent Rural Delivery Service',
      content: 'Being located in a rural area, I was concerned about delivery and support. Rurident exceeded my expectations with their rural delivery service. They delivered my dental chair on time and provided remote support for setup. Their commitment to serving all areas of Kenya is commendable.',
      verified: true,
      helpful: 16,
      notHelpful: 0,
      images: [],
      tags: ['Rural Delivery', 'Remote Support', 'Commitment']
    },
    {
      id: 7,
      customerName: 'Dr. Lucy Akinyi',
      customerType: 'Specialist Practice',
      rating: 4,
      date: '2023-12-28',
      title: 'Specialized Equipment Delivered',
      content: 'I needed specialized orthodontic equipment for my practice. Rurident sourced exactly what I needed and provided training for my staff. The equipment quality is excellent, though it took a bit longer than expected to arrive due to import requirements. Overall, very satisfied.',
      verified: true,
      helpful: 14,
      notHelpful: 1,
      images: ['/api/placeholder/200/150'],
      tags: ['Specialized Equipment', 'Training', 'Import', 'Quality']
    },
    {
      id: 8,
      customerName: 'Dr. David Kiprop',
      customerType: 'New Practice Owner',
      rating: 5,
      date: '2023-12-25',
      title: 'Complete Practice Setup',
      content: 'Starting a new practice was overwhelming, but Rurident made it simple. They helped me plan the entire setup, recommended the right equipment for my budget, and provided comprehensive training. Their after-sales support has been exceptional. I couldn\'t have asked for a better partner.',
      verified: true,
      helpful: 22,
      notHelpful: 0,
      images: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
      tags: ['Practice Setup', 'Planning', 'Training', 'Support']
    }
  ];

  const filteredReviews = reviews.filter(review => 
    selectedRating === null || review.rating === selectedRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const totalHelpful = reviews.reduce((sum, review) => sum + review.helpful, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              See what our customers are saying about Rurident Health Supplies. 
              Real experiences from dental professionals across Kenya.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Overall Rating Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Rating Overview */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {ratingFilters.map((filter) => (
                <div key={filter.rating} className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {renderStars(filter.rating)}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(filter.count / totalReviews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {filter.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="text-center space-y-4">
              <div>
                <div className="text-2xl font-bold text-primary-600">{totalReviews}</div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">{totalHelpful}</div>
                <div className="text-gray-600">Helpful Votes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Rating Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRating(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedRating === null
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Ratings
              </button>
              {ratingFilters.map((filter) => (
                <button
                  key={filter.rating}
                  onClick={() => setSelectedRating(filter.rating)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRating === filter.rating
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'rating' | 'helpful')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <HiUser className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                      {review.verified && (
                        <HiCheckCircle className="h-5 w-5 text-green-500" title="Verified Customer" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review.customerType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div className="flex space-x-3 mb-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 text-center text-xs">
                        <HiUser className="h-6 w-6 mx-auto mb-1" />
                        <p>Image</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Tags */}
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <HiThumbUp className="h-4 w-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <HiThumbDown className="h-4 w-4" />
                    <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                  </button>
                </div>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                  Report Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Have you purchased from Rurident Health Supplies? We'd love to hear about your experience. 
            Your review helps other dental professionals make informed decisions.
          </p>
          <button className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}