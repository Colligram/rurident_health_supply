import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showValue = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (interactive) {
      // Add hover effect if needed
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          const isHalfFilled = !isFilled && starValue - rating < 1 && starValue - rating > 0;
          
          return (
            <FaStar
              key={index}
              className={`${sizeClasses[size]} ${
                isFilled 
                  ? 'text-yellow-400' 
                  : isHalfFilled 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
              } ${
                interactive 
                  ? 'cursor-pointer hover:text-yellow-400 transition-colors' 
                  : ''
              }`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;