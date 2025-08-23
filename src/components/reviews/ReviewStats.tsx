import React from 'react';
import { FaStar } from 'react-icons/fa';
import { ReviewStats as ReviewStatsType } from '../../types';
import StarRating from './StarRating';

interface ReviewStatsProps {
  stats: ReviewStatsType;
  className?: string;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ stats, className = '' }) => {
  const getRatingPercentage = (rating: number) => {
    if (stats.totalReviews === 0) return 0;
    return Math.round((stats.distribution[rating as keyof typeof stats.distribution] / stats.totalReviews) * 100);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Rating Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {stats.averageRating.toFixed(1)}
            </span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 w-6 h-6" />
            </div>
          </div>
          <div className="mb-3">
            <StarRating rating={stats.averageRating} size="md" />
          </div>
          <p className="text-sm text-gray-600">
            Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = getRatingPercentage(rating);
              const count = stats.distribution[rating as keyof typeof stats.distribution];
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <FaStar className="text-yellow-400 w-3 h-3" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-8 text-right">
                    <span className="text-xs text-gray-500">({count})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overall Rating Summary */}
      {stats.totalReviews > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {stats.averageRating >= 4.5 ? 'Excellent' :
               stats.averageRating >= 4.0 ? 'Very Good' :
               stats.averageRating >= 3.5 ? 'Good' :
               stats.averageRating >= 3.0 ? 'Fair' :
               'Poor'} overall rating
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.distribution[5]} customers gave 5 stars • {stats.distribution[4]} customers gave 4 stars
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStats;