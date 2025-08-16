# Rurident Health Supplies - E-commerce Platform

A modern, responsive e-commerce platform for dental and medical supplies, inspired by the Temu website design.

## 🎨 New Design Features

### Temu-Inspired Layout
- **Prominent Search Bar**: Centered, large search bar with category dropdown
- **Horizontal Category Navigation**: Easy-to-use horizontal scrolling category menu
- **Promotional Banners**: Free shipping, safety features, and trust signals
- **Lightning Deals Section**: Featured products in horizontal scrollable cards
- **Partnership Banner**: Collaboration with Kenya Medical Supplies Authority
- **Secondary Filters**: 5-star rated, best-selling, new items, and more
- **Modern Product Grid**: Clean, card-based product layout with hover effects

### Preserved Features
- **Left Sidebar Categories**: Detailed category navigation maintained as requested
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Product Management**: Full CRUD operations for products and categories
- **Shopping Cart**: Persistent cart with local storage
- **Wishlist**: Save products for later
- **Admin Panel**: Complete backend management system

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd rurident-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server (in another terminal)
npm run server

# Or run both simultaneously
npm run dev:full
```

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Run both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Components**: Modular, reusable UI components
- **Context**: Global state management for cart, wishlist, and products
- **Routing**: React Router for navigation
- **Styling**: Tailwind CSS with custom utilities

### Backend (Node.js + Express)
- **REST API**: RESTful endpoints for products, categories, orders
- **File Upload**: Image handling for products
- **Authentication**: JWT-based admin authentication
- **Database**: JSON-based data storage (easily replaceable with SQL/NoSQL)

## 📱 Components Structure

```
src/
├── components/
│   ├── home/
│   │   ├── HomeLayout.tsx          # Main home page layout
│   │   ├── SearchBanner.tsx        # Prominent search section
│   │   ├── HorizontalCategoryNav.tsx # Horizontal category navigation
│   │   ├── PromotionalBanners.tsx  # Trust signals and offers
│   │   ├── LightningDeals.tsx      # Featured products section
│   │   ├── PartnershipBanner.tsx   # Partnership information
│   │   ├── SecondaryFilters.tsx    # Additional filtering options
│   │   ├── CategorySidebar.tsx     # Left sidebar categories
│   │   └── ProductGrid.tsx         # Main product display
│   ├── layout/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Site footer
│   │   └── MobileMenu.tsx          # Mobile navigation
│   └── common/                     # Reusable components
├── pages/                          # Page components
├── context/                        # React Context providers
├── services/                       # API service functions
└── utils/                          # Utility functions
```

## 🎯 Key Features

### User Experience
- **Fast Navigation**: Horizontal category browsing
- **Visual Hierarchy**: Clear product information and pricing
- **Trust Signals**: Free shipping, safety badges, ratings
- **Responsive Design**: Works on all device sizes

### Product Management
- **Category Organization**: Hierarchical category structure
- **Product Search**: Full-text search with filters
- **Image Management**: Multiple product images
- **Inventory Tracking**: Stock management

### Shopping Features
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save products for later
- **Order Management**: Complete order workflow
- **Payment Integration**: M-Pesa and card payment support

## 🔧 Customization

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Orange-based brand color scheme
- **Responsive Breakpoints**: Mobile-first responsive design
- **Custom Utilities**: Additional CSS utilities for components

### Configuration
- **Environment Variables**: Configurable API endpoints
- **Theme Customization**: Easy color and style modifications
- **Component Props**: Flexible component configuration

## 📊 Performance

- **Lazy Loading**: Images and components loaded on demand
- **Optimized Images**: Responsive image handling
- **Code Splitting**: Route-based code splitting
- **Caching**: Local storage for cart and user preferences

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
npm run build
# Deploy to Node.js hosting (Heroku, Vercel, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@rurident.com
- Phone: +254 700 000 000
- Address: Mepalux Plaza, River Road, 3rd Floor, Suite 304

---

**Rurident Health Supplies** - Your trusted partner in dental healthcare delivery across Kenya.
# Updated on Sat Aug 16 12:01:03 PM UTC 2025
