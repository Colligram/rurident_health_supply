import React, { useState, useEffect } from 'react';
import { FaStar, FaSort, FaPlus, FaFilter } from 'react-icons/fa';
import { Review, ReviewStats, Product } from '../../types';
import { reviewService } from '../../services/reviewService';
import ReviewStatsComponent from './ReviewStats';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import ReviewSummary from './ReviewSummary';
import StarRating from './StarRating';

interface ProductReviewsProps {
  product: Product;
  userInfo?: {
    userId: string;
    userName: string;
    userEmail: string;
  };
  orderId?: string;
  showAdminActions?: boolean;
  onModerate?: (reviewId: string, status: string) => void;
  onAddResponse?: (reviewId: string) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  product,
  userInfo,
  orderId,
  showAdminActions = false,
  onModerate,
  onAddResponse
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const fetchReviews = async (page: number = 1, sort: string = sortBy) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await reviewService.getProductReviews(product.id, sort, page, 10);
      
      setReviews(response.reviews);
      setStats(response.stats);
      setPagination(response.pagination);
      
      // Check if user has already reviewed
      if (userInfo) {
        const userReview = response.reviews.find(review => review.userId === userInfo.userId);
        setHasUserReviewed(!!userReview);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    fetchReviews(1, newSort);
  };

  const handlePageChange = (page: number) => {
    fetchReviews(page, sortBy);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchReviews(1, sortBy); // Refresh reviews
  };

  const handleVoteChange = () => {
    fetchReviews(pagination.currentPage, sortBy); // Refresh current page
  };

  const canReview = userInfo && !hasUserReviewed && !showAdminActions;

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {stats.totalReviews > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={stats.averageRating} size="sm" showValue={true} />
              <span className="text-sm text-gray-600">
                ({stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
        
        {canReview && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          productId={product.id}
          productName={product.name}
          userInfo={userInfo}
          orderId={orderId}
          onReviewSubmitted={handleReviewSubmitted}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {/* Review Statistics */}
      {stats.totalReviews > 0 && (
        <div className="space-y-6">
          <ReviewStatsComponent stats={stats} />
          <ReviewSummary stats={stats} />
        </div>
      )}

      {/* Reviews Section */}
      {stats.totalReviews > 0 ? (
        <div className="space-y-4">
          {/* Sort and Filter Controls */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <span className="text-sm text-gray-600">
                Showing {reviews.length} of {stats.totalReviews} reviews
              </span>
            </div>
          </div>

          {/* Reviews List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onVoteChange={handleVoteChange}
                  showAdminActions={showAdminActions}
                  onModerate={onModerate}
                  onAddResponse={onAddResponse}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        /* No Reviews State */
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaStar className="text-gray-300 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your experience with this product!
          </p>
          {canReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Write the First Review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;