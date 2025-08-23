import React from 'react';
import { FaLightbulb, FaSmile, FaFrown, FaNeutral } from 'react-icons/fa';
import { ReviewStats } from '../../types';

interface ReviewSummaryProps {
  stats: ReviewStats;
  className?: string;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ stats, className = '' }) => {
  const generateSummary = () => {
    if (stats.totalReviews === 0) {
      return {
        sentiment: 'neutral',
        summary: 'No reviews yet. Be the first to share your experience!',
        icon: FaNeutral,
        color: 'text-gray-500'
      };
    }

    const { averageRating, distribution } = stats;
    const positiveReviews = distribution[4] + distribution[5];
    const negativeReviews = distribution[1] + distribution[2];
    const neutralReviews = distribution[3];
    
    const positivePercentage = (positiveReviews / stats.totalReviews) * 100;
    const negativePercentage = (negativeReviews / stats.totalReviews) * 100;

    if (averageRating >= 4.5) {
      return {
        sentiment: 'excellent',
        summary: `Excellent product! ${positivePercentage.toFixed(0)}% of customers gave 4-5 star ratings. Most customers are highly satisfied with their purchase.`,
        icon: FaSmile,
        color: 'text-green-600'
      };
    } else if (averageRating >= 4.0) {
      return {
        sentiment: 'good',
        summary: `Great product with ${positivePercentage.toFixed(0)}% positive reviews. Customers generally have a good experience with this item.`,
        icon: FaSmile,
        color: 'text-green-500'
      };
    } else if (averageRating >= 3.5) {
      return {
        sentiment: 'mixed',
        summary: `Mixed reviews with ${positivePercentage.toFixed(0)}% positive and ${negativePercentage.toFixed(0)}% negative feedback. Consider reading individual reviews for more details.`,
        icon: FaNeutral,
        color: 'text-yellow-600'
      };
    } else if (averageRating >= 3.0) {
      return {
        sentiment: 'below_average',
        summary: `Below average rating with ${negativePercentage.toFixed(0)}% negative reviews. Some customers have concerns about this product.`,
        icon: FaFrown,
        color: 'text-orange-600'
      };
    } else {
      return {
        sentiment: 'poor',
        summary: `Poor rating with ${negativePercentage.toFixed(0)}% negative reviews. Many customers are dissatisfied with this product.`,
        icon: FaFrown,
        color: 'text-red-600'
      };
    }
  };

  const generateKeyInsights = () => {
    const insights = [];
    const { distribution } = stats;

    // Most common rating
    const ratings = Object.entries(distribution);
    const mostCommonRating = ratings.reduce((a, b) => distribution[a[0] as keyof typeof distribution] > distribution[b[0] as keyof typeof distribution] ? a : b);
    
    if (distribution[5] > 0) {
      insights.push(`${distribution[5]} customers gave 5-star ratings`);
    }
    if (distribution[4] > 0) {
      insights.push(`${distribution[4]} customers gave 4-star ratings`);
    }
    if (distribution[1] > 0) {
      insights.push(`${distribution[1]} customers gave 1-star ratings`);
    }

    return insights.slice(0, 3); // Limit to 3 insights
  };

  const summary = generateSummary();
  const insights = generateKeyInsights();
  const Icon = summary.icon;

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`${summary.color} p-3 rounded-lg bg-white shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">AI Review Summary</h3>
          </div>
          <p className="text-gray-700 mb-3 leading-relaxed">
            {summary.summary}
          </p>
          
          {insights.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900">Key Insights:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-500">
            * This summary is generated based on review statistics and may not reflect individual experiences.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;