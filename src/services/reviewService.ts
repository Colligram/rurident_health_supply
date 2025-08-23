import { Review, ReviewResponse } from '../types';

const API_BASE_URL = '/api';

export interface SubmitReviewData {
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title?: string;
  comment: string;
  photos?: string[];
  orderId?: string;
}

export interface ReviewFilters {
  status?: string;
  productId?: string;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const reviewService = {
  // Get reviews for a product
  async getProductReviews(
    productId: string, 
    sort: string = 'newest', 
    page: number = 1, 
    limit: number = 10
  ): Promise<ReviewResponse> {
    const response = await fetch(
      `${API_BASE_URL}/reviews/${productId}?sort=${sort}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    return response.json();
  },

  // Submit a new review
  async submitReview(reviewData: SubmitReviewData): Promise<{ success: boolean; message: string; reviewId: string }> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit review');
    }

    return response.json();
  },

  // Vote on review helpfulness
  async voteReview(reviewId: string, vote: 'helpful' | 'notHelpful'): Promise<{ success: boolean; helpfulVotes: number; notHelpfulVotes: number }> {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote }),
    });

    if (!response.ok) {
      throw new Error('Failed to vote on review');
    }

    return response.json();
  },

  // Admin: Get all reviews with filters
  async getAdminReviews(filters: ReviewFilters = {}): Promise<{ reviews: Review[]; pagination: any }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/admin/reviews?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch admin reviews');
    }
    
    return response.json();
  },

  // Admin: Moderate a review
  async moderateReview(
    reviewId: string, 
    status: 'pending' | 'approved' | 'rejected' | 'hidden',
    moderationNotes?: string,
    moderatedBy?: string
  ): Promise<{ success: boolean; message: string; review: Review }> {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}/moderate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, moderationNotes, moderatedBy }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to moderate review');
    }

    return response.json();
  },

  // Admin: Add response to a review
  async addAdminResponse(
    reviewId: string, 
    content: string, 
    respondedBy: string
  ): Promise<{ success: boolean; message: string; adminResponse: any }> {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, respondedBy }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add admin response');
    }

    return response.json();
  },

  // Admin: Pin/unpin a review
  async pinReview(reviewId: string, isPinned: boolean): Promise<{ success: boolean; message: string; isPinned: boolean }> {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}/pin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPinned }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to pin review');
    }

    return response.json();
  },

  // Admin: Delete a review
  async deleteReview(reviewId: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete review');
    }

    return response.json();
  },
};