# Rurident Health Supplies E-Commerce System

A modern e-commerce platform for health supplies with M-Pesa integration, built with React, Node.js, and MongoDB.

## Features

### 🛒 **Order Management**
- Auto-generated order numbers and dates
- Automatic calculation of totals (subtotal, shipping, tax)
- Complete order details stored in database
- PDF receipt generation after payment confirmation

### 🎨 **AliExpress-Style Design**
- Compact product grid layout
- 2-column mobile view for optimal phone experience
- Responsive design for all screen sizes
- Modern, clean UI with hover effects

### 🧭 **Fixed Navigation Header**
- Sticky header that remains visible when scrolling
- Smooth rounded corners with visible borders
- Glowing effects and smooth transitions
- Professional appearance with backdrop blur

### 💳 **Payment Integration**
- M-Pesa mobile money integration
- Secure payment processing
- Real-time payment status updates
- Order confirmation and receipt generation

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Context API** for state management

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **PDFKit** for receipt generation
- **CORS** enabled for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rurident-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running on `mongodb://localhost:27017`
   - The system will automatically create a `rurident` database

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start them separately:
   npm run dev          # Frontend (Vite)
   npm run server       # Backend (Express)
   ```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/:id/receipt` - Generate PDF receipt

## Database Schema

### Product
```typescript
{
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  inStock: boolean,
  createdAt: Date
}
```

### Order
```typescript
{
  orderId: string,
  orderNumber: string,
  orderDate: string,
  customerInfo: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    county: string,
    postalCode: string,
    nairobiArea?: string
  },
  items: Array<{
    id: string,
    name: string,
    price: number,
    quantity: number,
    image?: string,
    totalPrice: number
  }>,
  subtotal: number,
  shipping: number,
  tax: number,
  total: number,
  paymentMethod: 'mpesa' | 'card',
  paymentStatus: 'pending' | 'completed' | 'failed',
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  mpesaTransactionId?: string,
  notes?: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Configuration

### Frontend Configuration
- API base URL: `http://localhost:5000/api`
- Vite dev server: `http://localhost:5173`

### Backend Configuration
- Server port: `5000`
- MongoDB URI: `mongodb://localhost:27017/rurident`

## Features in Detail

### 1. Order Management
The system automatically generates:
- **Order Number**: Format `RUR-{timestamp}-{random}`
- **Order Date**: Current date in readable format
- **Total Amount**: Calculated from subtotal + shipping + tax (16% VAT)

### 2. Product Display
- **Grid Layout**: Responsive grid with 2 columns on mobile, 3-5 on larger screens
- **Compact Cards**: Products take minimal screen space
- **Hover Effects**: Smooth animations and scaling on interaction

### 3. Navigation Header
- **Fixed Position**: Stays visible when scrolling
- **Smooth Transitions**: Animated background and shadow changes
- **Glowing Effects**: Subtle shadows and border highlights
- **Rounded Design**: Modern, smooth corners throughout

### 4. Receipt Generation
- **PDF Format**: Professional receipts generated on the backend
- **Payment Confirmation**: Only available after successful payment
- **Complete Details**: Includes all order information and customer details

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/            # UI components (buttons, forms, etc.)
├── contexts/           # React Context providers
├── pages/              # Page components
├── services/           # API service functions
└── types/              # TypeScript type definitions

server/
├── index.js            # Express server entry point
└── models/             # Database models (if separated)
```

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Create services in `src/services/`
4. Update backend API in `server/index.js`
5. Add types in `src/types/`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `server/index.js`

2. **Port Already in Use**
   - Change port in `server/index.js` or kill existing process
   - Use `lsof -i :5000` to find process using port 5000

3. **Frontend Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript configuration

4. **PDF Generation Fails**
   - Ensure backend is running
   - Check order ID exists in database
   - Verify payment status is 'completed'

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
