import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaCheckCircle, FaImage, FaReply } from 'react-icons/fa';
import StarRating from './StarRating';
import { Review } from '../../types';
import { reviewService } from '../../services/reviewService';

interface ReviewCardProps {
  review: Review;
  onVoteChange?: () => void;
  showAdminActions?: boolean;
  onModerate?: (reviewId: string, status: string) => void;
  onAddResponse?: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onVoteChange,
  showAdminActions = false,
  onModerate,
  onAddResponse
}) => {
  const [isVoting, setIsVoting] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const handleVote = async (vote: 'helpful' | 'notHelpful') => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      await reviewService.voteReview(review.id, vote);
      onVoteChange?.();
    } catch (error) {
      console.error('Error voting on review:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <div className={`bg-white border rounded-lg p-6 ${review.isPinned ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
      {/* Pinned Badge */}
      {review.isPinned && (
        <div className="flex items-center gap-2 mb-3">
          <FaStar className="text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Pinned Review</span>
        </div>
      )}

      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm text-gray-600">
              {getRatingText(review.rating)}
            </span>
          </div>
          {review.isVerifiedBuyer && (
            <div className="flex items-center gap-1 text-green-600">
              <FaCheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Verified Buyer</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">{review.userName}</div>
          <div className="text-xs text-gray-500">{formatDate(review.createdAt)}</div>
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      )}

      {/* Review Content */}
      <div className="text-gray-700 mb-4 leading-relaxed">
        {review.comment}
      </div>

      {/* Review Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaImage className="text-gray-400" />
            <span className="text-sm text-gray-600">Photos ({review.photos.length})</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {review.photos.slice(0, showAllPhotos ? review.photos.length : 3).map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  className="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                />
              </div>
            ))}
            {review.photos.length > 3 && !showAllPhotos && (
              <button
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-20 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                +{review.photos.length - 3} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin Response */}
      {review.adminResponse && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaReply className="text-blue-500" />
            <span className="text-sm font-medium text-blue-800">Store Response</span>
          </div>
          <p className="text-blue-900 text-sm leading-relaxed">
            {review.adminResponse.content}
          </p>
          <div className="text-xs text-blue-600 mt-2">
            {review.adminResponse.respondedBy} • {formatDate(review.adminResponse.respondedAt)}
          </div>
        </div>
      )}

      {/* Helpful Voting */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('helpful')}
            disabled={isVoting}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50"
          >
            <FaThumbsUp className="w-4 h-4" />
            <span>Helpful ({review.helpfulVotes})</span>
          </button>
          <button
            onClick={() => handleVote('notHelpful')}
            disabled={isVoting}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <FaThumbsDown className="w-4 h-4" />
            <span>Not Helpful ({review.notHelpfulVotes})</span>
          </button>
        </div>

        {/* Admin Actions */}
        {showAdminActions && (
          <div className="flex items-center gap-2">
            <select
              value={review.status}
              onChange={(e) => onModerate?.(review.id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="hidden">Hidden</option>
            </select>
            <button
              onClick={() => onAddResponse?.(review.id)}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Respond
            </button>
          </div>
        )}
      </div>

      {/* Status Badge for Admin View */}
      {showAdminActions && review.status !== 'approved' && (
        <div className="mt-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            review.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;