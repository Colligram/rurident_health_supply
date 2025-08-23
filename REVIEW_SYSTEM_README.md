# Product Reviews System

A comprehensive product review system for the Rurident e-commerce platform, featuring customer review submission, admin moderation, and advanced display features.

## 🚀 Features

### Customer Features
- **Review Submission**: Customers can submit reviews with star ratings (1-5), text comments, and photo uploads
- **Verified Buyer Badge**: Automatic verification for customers who purchased the product
- **Review Form**: Interactive form with photo upload, rating selection, and validation
- **Helpful Voting**: Customers can vote on review helpfulness
- **Review Display**: Beautiful review cards with photos, admin responses, and engagement metrics

### Admin Features
- **Review Moderation**: Approve, reject, or hide reviews before public display
- **Admin Responses**: Public responses to customer reviews (like Amazon/TripAdvisor)
- **Review Management Dashboard**: Comprehensive admin interface for managing all reviews
- **Advanced Filtering**: Filter by status, product, search terms, and sort options
- **Review Pinning**: Pin important reviews to the top
- **Bulk Actions**: Moderate multiple reviews efficiently

### Display Features
- **Review Statistics**: Average rating, total reviews, and rating distribution breakdown
- **AI-Generated Summaries**: Intelligent review summaries based on sentiment analysis
- **Sorting Options**: Sort by newest, highest rated, most helpful, etc.
- **Pagination**: Efficient pagination for large numbers of reviews
- **Responsive Design**: Mobile-friendly review display

## 📁 File Structure

```
src/
├── components/reviews/
│   ├── index.ts                 # Component exports
│   ├── ProductReviews.tsx       # Main reviews component
│   ├── ReviewCard.tsx           # Individual review display
│   ├── ReviewForm.tsx           # Review submission form
│   ├── ReviewStats.tsx          # Rating statistics display
│   ├── ReviewSummary.tsx        # AI-generated summary
│   └── StarRating.tsx           # Reusable star rating component
├── pages/admin/
│   └── ReviewManagementPage.tsx # Admin review management
├── services/
│   └── reviewService.ts         # API service functions
├── types/
│   └── index.ts                 # TypeScript interfaces
└── server/
    └── index.js                 # Backend API endpoints
```

## 🗄️ Database Schema

### Review Collection
```javascript
{
  productId: ObjectId,           // Reference to product
  userId: String,                // Customer ID or email
  userName: String,              // Customer name
  userEmail: String,             // Customer email
  rating: Number,                // 1-5 star rating
  title: String,                 // Optional review title
  comment: String,               // Review text (required)
  photos: [String],              // Array of photo URLs/base64
  isVerifiedBuyer: Boolean,      // Purchase verification
  orderId: String,               // Reference to order
  status: String,                // pending/approved/rejected/hidden
  moderatedBy: String,           // Admin who moderated
  moderatedAt: Date,             // Moderation timestamp
  moderationNotes: String,       // Admin notes
  adminResponse: {               // Admin response object
    content: String,
    respondedBy: String,
    respondedAt: Date
  },
  helpfulVotes: Number,          // Helpful vote count
  notHelpfulVotes: Number,       // Not helpful vote count
  isPinned: Boolean,             // Pinned review flag
  createdAt: Date,               // Review creation date
  updatedAt: Date                // Last update date
}
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/reviews/:productId` - Get reviews for a product
- `POST /api/reviews` - Submit a new review
- `POST /api/reviews/:reviewId/vote` - Vote on review helpfulness

### Admin Endpoints
- `GET /api/admin/reviews` - Get all reviews with filtering
- `PUT /api/admin/reviews/:reviewId/moderate` - Moderate a review
- `POST /api/admin/reviews/:reviewId/respond` - Add admin response
- `PUT /api/admin/reviews/:reviewId/pin` - Pin/unpin a review
- `DELETE /api/admin/reviews/:reviewId` - Delete a review

## 🎯 Usage Examples

### Adding Reviews to Product Page
```tsx
import { ProductReviews } from '../components/reviews';

function ProductDetailPage() {
  const userInfo = {
    userId: 'user123',
    userName: 'John Doe',
    userEmail: 'john@example.com'
  };

  return (
    <div>
      <ProductReviews 
        product={product}
        userInfo={userInfo}
        orderId="order123" // Optional: for verified buyer badge
      />
    </div>
  );
}
```

### Using Star Rating Component
```tsx
import { StarRating } from '../components/reviews';

function MyComponent() {
  const [rating, setRating] = useState(0);

  return (
    <StarRating
      rating={rating}
      interactive={true}
      onRatingChange={setRating}
      size="lg"
      showValue={true}
    />
  );
}
```

### Admin Review Management
```tsx
import { ReviewManagementPage } from '../pages/admin/ReviewManagementPage';

// Add to admin routes
<Route path="/sys/reviews" element={<ReviewManagementPage />} />
```

## 🔧 Configuration

### Review Settings
- **Photo Upload**: Maximum 5 photos, 5MB each
- **Review Length**: Up to 2000 characters for comments
- **Title Length**: Up to 100 characters (optional)
- **Moderation**: All reviews require admin approval by default

### Admin Permissions
- **Staff**: Can view and moderate reviews
- **Admin**: Full access including deletion and pinning

## 🎨 Customization

### Styling
All components use Tailwind CSS classes and can be customized by:
- Modifying the className props
- Overriding Tailwind classes
- Using CSS custom properties

### Themes
The review system supports different themes through:
- Color scheme variables
- Icon customization
- Layout adjustments

## 🚀 Deployment

### Prerequisites
- MongoDB database
- Node.js server
- React frontend

### Installation
1. Ensure all dependencies are installed
2. Start the MongoDB server
3. Run the backend server: `npm run server`
4. Start the frontend: `npm run dev`

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/rurident
PORT=5000
```

## 🔒 Security Features

- **Input Validation**: All review data is validated on both frontend and backend
- **XSS Protection**: HTML content is sanitized
- **Rate Limiting**: Review submission is rate-limited
- **Admin Authentication**: All admin endpoints require authentication
- **Purchase Verification**: Verified buyer badges require order verification

## 📊 Analytics

The review system provides:
- Review statistics and trends
- Rating distribution analysis
- Customer sentiment insights
- Moderation activity tracking

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Include proper error handling
4. Test thoroughly before submitting

## 📝 License

This review system is part of the Rurident e-commerce platform.

---

For support or questions, please contact the development team.