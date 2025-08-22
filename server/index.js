// index.js
// Express + MongoDB API server that ALSO serves the built React frontend from ../dist
// Changes made:
// 1) Serve React build (static + catch-all).
// 2) Added /api/products POST/PUT/DELETE to match frontend calls.
// 3) Moved Mongoose model definitions ABOVE seeding/connection so seeding works.
// 4) Added /api/placeholder/:w/:h for seeded image URLs.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit to handle base64 image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Security headers
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// MongoDB connection with fallback to in-memory database
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URL ||
  'mongodb://localhost:27017/rurident';

console.log('Attempting to connect to MongoDB...');

/* =========================
   MONGOOSE SCHEMAS/MODELS
   (defined BEFORE seeding/connection)
   ========================= */

// Product Schema (extended to align with frontend interface)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  // pricing
  price: { type: Number, required: true },
  salePrice: { type: Number },
  originalPrice: { type: Number },

  // images (support both single "image" and array "images")
  image: { type: String }, // optional (fallback to images[0] if provided)
  images: { type: [String], default: [] },

  category: { type: String, required: true },

  // inventory
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },

  // ratings & misc (optional)
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  specifications: { type: Object },
  features: { type: [String], default: [] },
  brand: { type: String },
  is_new: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  seller: { type: String },
  soldCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.image && this.images && this.images.length > 0) {
    this.image = this.images[0];
  }
  if (typeof this.inStock === 'undefined' && typeof this.stock === 'number') {
    this.inStock = this.stock > 0;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true, unique: true },
  orderDate: { type: String, required: true },
  customerInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    postalCode: { type: String, required: true },
    nairobiArea: { type: String }
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
      totalPrice: { type: Number, required: true }
    }
  ],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['mpesa', 'card'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  mpesaTransactionId: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastOrderDate: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  joinDate: { type: Date, default: Date.now },
  city: { type: String },
  country: { type: String, default: 'Kenya' },
  postalCode: { type: String },
  notes: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Customer = mongoose.model('Customer', customerSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: '📦' },
  subcategories: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String, default: '📦' }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);

/* =========================
   DB CONNECTION + SEEDING
   ========================= */

async function connectToDatabase() {
  try {
    // Try to connect to the specified MongoDB URI first
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.log('❌ Failed to connect to MongoDB:', error.message);
    console.log('🔄 Starting in-memory MongoDB server for development...');

    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();

      await mongoose.connect(uri, {});
      console.log('✅ Connected to in-memory MongoDB successfully');
      console.log('📝 Note: Using in-memory database - data will not persist between restarts');
      console.log('📝 To use persistent database, set MONGODB_URI environment variable');

      // Seed some initial data for development
      await seedInitialData();
    } catch (memoryError) {
      console.error('❌ Failed to start in-memory MongoDB:', memoryError.message);
      console.log('🔄 Server will continue without database connection...');
    }
  }
}

// Seed initial data for development
async function seedInitialData() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const sampleProducts = [
        {
          name: 'Digital Thermometer',
          description: 'Accurate digital thermometer for medical use',
          price: 25.99,
          image: '/api/placeholder/300/200',
          category: 'Medical Devices',
          inStock: true,
          stock: 50
        },
        {
          name: 'Blood Pressure Monitor',
          description: 'Automatic blood pressure monitor with large display',
          price: 89.99,
          image: '/api/placeholder/300/200',
          category: 'Medical Devices',
          inStock: true,
          stock: 25
        },
        {
          name: 'First Aid Kit',
          description: 'Complete first aid kit for home and office',
          price: 34.99,
          image: '/api/placeholder/300/200',
          category: 'Medical Supplies',
          inStock: true,
          stock: 100
        }
      ];

      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products added to database');
    }

    const customerCount = await Customer.countDocuments();
    if (customerCount === 0) {
      const sampleCustomers = [
        {
          name: 'Dr. Sarah Johnson',
          email: 'sarah@dentalclinic.com',
          phone: '+254712345678',
          address: 'Westlands, Nairobi',
          city: 'Nairobi',
          country: 'Kenya',
          totalOrders: 15,
          totalSpent: 2450000,
          lastOrderDate: new Date('2024-01-15T10:00:00Z'),
          status: 'active',
          joinDate: new Date('2023-06-12T08:00:00Z'),
          tags: ['VIP', 'Dentist', 'Regular Customer']
        },
        {
          name: 'Dr. Michael Ochieng',
          email: 'michael@smilecenter.com',
          phone: '+254723456789',
          address: 'Kilifi, Mombasa',
          city: 'Mombasa',
          country: 'Kenya',
          totalOrders: 8,
          totalSpent: 890000,
          lastOrderDate: new Date('2024-01-10T14:30:00Z'),
          status: 'active',
          joinDate: new Date('2023-09-20T10:15:00Z'),
          tags: ['Premium', 'Dentist']
        },
        {
          name: 'Jane Wambui',
          email: 'jane.student@uon.ac.ke',
          phone: '+254734567890',
          address: 'Karen, Nairobi',
          city: 'Nairobi',
          country: 'Kenya',
          totalOrders: 3,
          totalSpent: 75000,
          lastOrderDate: new Date('2023-12-20T09:45:00Z'),
          status: 'active',
          joinDate: new Date('2023-11-05T14:22:00Z'),
          tags: ['Student', 'New Customer']
        },
        {
          name: 'Dr. Peter Mwangi',
          email: 'peter@healthcenter.co.ke',
          phone: '+254745678901',
          address: 'Thika, Kiambu',
          city: 'Thika',
          country: 'Kenya',
          totalOrders: 22,
          totalSpent: 3200000,
          lastOrderDate: new Date('2024-01-12T16:20:00Z'),
          status: 'active',
          joinDate: new Date('2023-03-15T11:30:00Z'),
          tags: ['VIP', 'Dentist', 'High Value']
        },
        {
          name: 'Dr. Grace Kiprotich',
          email: 'grace@ruraldental.org',
          phone: '+254756789012',
          address: 'Eldoret, Uasin Gishu',
          city: 'Eldoret',
          country: 'Kenya',
          totalOrders: 1,
          totalSpent: 45000,
          lastOrderDate: new Date('2023-11-30T13:15:00Z'),
          status: 'inactive',
          joinDate: new Date('2023-11-25T09:00:00Z'),
          tags: ['Rural', 'Inactive']
        }
      ];

      await Customer.insertMany(sampleCustomers);
      console.log('✅ Sample customers added to database');
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const sampleCategories = [
        {
          name: 'Dental Laboratory',
          description: 'Laboratory equipment and tools for dental technicians',
          icon: '🔬',
          subcategories: [
            { id: 'dl1', name: 'Crown and Bridge', path: '/products?category=crown-and-bridge', icon: '👑' },
            { id: 'dl2', name: 'Dental Lab Orthodontics', path: '/products?category=dental-lab-orthodontics', icon: '🦷' },
            { id: 'dl3', name: 'Complete Dentures', path: '/products?category=complete-dentures', icon: '🦴' },
            { id: 'dl4', name: 'Partial Dentures (Cobalt Chrome)', path: '/products?category=partial-dentures-cobalt-chrome', icon: '⚙️' }
          ]
        },
        {
          name: 'Dental Chairs',
          description: 'Professional dental chairs and units',
          icon: '🪑',
          subcategories: [
            { id: 'dc1', name: 'Electric Chairs', path: '/products?category=electric-chairs', icon: '⚡' },
            { id: 'dc2', name: 'Hydraulic Chairs', path: '/products?category=hydraulic-chairs', icon: '💧' },
            { id: 'dc3', name: 'Portable Units', path: '/products?category=portable-units', icon: '📦' }
          ]
        },
        {
          name: 'Clinical Machines & Equipment',
          description: 'Medical and dental equipment',
          icon: '⚙️',
          subcategories: [
            { id: 'eq1', name: 'Handpieces', path: '/products?category=handpieces', icon: '🔧' },
            { id: 'eq2', name: 'Scalers', path: '/products?category=scalers', icon: '🔪' },
            { id: 'eq3', name: 'Surgical Tools', path: '/products?category=surgical-tools', icon: '🩺' },
            { id: 'eq4', name: 'Clinical Orthodontics', path: '/products?category=clinical-orthodontics', icon: '🦷' }
          ]
        },
        {
          name: 'Consumables',
          description: 'Daily use consumables and disposables',
          icon: '📦',
          subcategories: [
            { id: 'cs1', name: 'Gloves', path: '/products?category=gloves', icon: '🧤' },
            { id: 'cs2', name: 'Masks', path: '/products?category=masks', icon: '😷' },
            { id: 'cs3', name: 'Dental Materials', path: '/products?category=dental-materials', icon: '🧪' }
          ]
        },
        {
          name: 'Student Kits',
          description: 'Complete student dental kits',
          icon: '🎓',
          subcategories: [
            { id: 'sk1', name: 'Basic Kits', path: '/products?category=basic-kits', icon: '📚' },
            { id: 'sk2', name: 'Advanced Kits', path: '/products?category=advanced-kits', icon: '🔬' },
            { id: 'sk3', name: 'Specialty Kits', path: '/products?category=specialty-kits', icon: '⭐' }
          ]
        }
      ];

      await Category.insertMany(sampleCategories);
      console.log('✅ Sample categories added to database');
    }
  } catch (error) {
    console.log('Warning: Could not seed initial data:', error.message);
  }
}

// Initialize database connection
connectToDatabase();

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
db.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

/* =========================
   ROUTES
   ========================= */

// Simple placeholder image route used by seeded products
app.get('/api/placeholder/:w/:h', (req, res) => {
  const { w, h } = req.params;
  const width = parseInt(w, 10) || 300;
  const height = parseInt(h, 10) || 200;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b7280">
        ${width}×${height}
      </text>
    </svg>
  `;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// PRODUCTS

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Create product (ADDED)
app.post('/api/products', async (req, res) => {
  try {
    const data = { ...req.body };

    // Normalize images/image
    if (!data.image && Array.isArray(data.images) && data.images.length > 0) {
      data.image = data.images[0];
    }
    if (!Array.isArray(data.images) && data.image) {
      data.images = [data.image];
    }

    // Derive inStock from stock if provided
    if (typeof data.stock === 'number') {
      data.inStock = data.stock > 0;
    }

    const product = new Product(data);
    const saved = await product.save();
    res.status(201).json({ id: saved._id, success: true, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Update product (ADDED)
app.put('/api/products/:id', async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };

    if (!updates.image && Array.isArray(updates.images) && updates.images.length > 0) {
      updates.image = updates.images[0];
    }
    if (typeof updates.stock === 'number') {
      updates.inStock = updates.stock > 0;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product (ADDED)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// ORDERS

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;

    // Validate required fields
    const requiredFields = [
      'orderId',
      'orderNumber',
      'orderDate',
      'customerInfo',
      'items',
      'subtotal',
      'shipping',
      'tax',
      'total',
      'paymentMethod'
    ];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Create or update customer record
    const customerInfo = orderData.customerInfo;
    const customerName = `${customerInfo.firstName} ${customerInfo.lastName}`;

    let customer = await Customer.findOne({ email: customerInfo.email });

    if (customer) {
      // Update existing customer
      customer.totalOrders += 1;
      customer.totalSpent += orderData.total;
      customer.lastOrderDate = new Date();
      customer.status = 'active';
      customer.updatedAt = new Date();

      if (customerInfo.phone) customer.phone = customerInfo.phone;
      if (customerInfo.address) customer.address = customerInfo.address;
      if (customerInfo.city) customer.city = customerInfo.city;

      await customer.save();
    } else {
      // Create new customer
      customer = new Customer({
        name: customerName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        country: 'Kenya',
        postalCode: customerInfo.postalCode,
        totalOrders: 1,
        totalSpent: orderData.total,
        lastOrderDate: new Date(),
        status: 'active',
        tags: ['Customer']
      });

      await customer.save();
    }

    const order = new Order(orderData);
    const savedOrder = await order.save();

    res.status(201).json({
      id: savedOrder._id,
      success: true,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updates = { updatedAt: new Date() };

    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
});

// Generate PDF receipt
app.get('/api/orders/:id/receipt', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if payment is confirmed
    if (order.paymentStatus !== 'completed') {
      return res.status(400).json({ message: 'Receipt only available after payment confirmation' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${order.orderNumber}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(24).text('RURIDENT HEALTH SUPPLIES', { align: 'center' }).moveDown().fontSize(18).text('RECEIPT', { align: 'center' }).moveDown(2);

    // Order details
    doc.fontSize(12).text(`Order Number: ${order.orderNumber}`).text(`Date: ${order.orderDate}`).moveDown();

    // Customer information
    doc.fontSize(14).text('CUSTOMER INFORMATION', { underline: true }).moveDown().fontSize(12).text(`${order.customerInfo.firstName} ${order.customerInfo.lastName}`).text(`Email: ${order.customerInfo.email}`).text(`Phone: ${order.customerInfo.phone}`).text(`Address: ${order.customerInfo.address}`).text(`${order.customerInfo.city}, ${order.customerInfo.county}`).moveDown();

    // Items table
    doc.fontSize(14).text('ITEMS', { underline: true }).moveDown();

    // Table headers
    const tableTop = doc.y;
    const itemCol = 50;
    const qtyCol = 200;
    const priceCol = 300;
    const totalCol = 400;

    doc.fontSize(10).text('Item', itemCol, tableTop).text('Qty', qtyCol, tableTop).text('Price', priceCol, tableTop).text('Total', totalCol, tableTop).moveDown();

    // Table rows
    let currentY = doc.y;
    order.items.forEach((item) => {
      if (currentY > 700) {
        doc.addPage();
        currentY = 50;
      }

      doc.fontSize(10).text(item.name, itemCol, currentY).text(item.quantity.toString(), qtyCol, currentY).text(`$${item.price.toFixed(2)}`, priceCol, currentY).text(`$${item.totalPrice.toFixed(2)}`, totalCol, currentY);

      currentY += 20;
    });

    doc.moveDown(2);

    // Summary
    doc.fontSize(14).text('SUMMARY', { underline: true }).moveDown().fontSize(12);

    const summaryY = doc.y;
    doc.text('Subtotal:', 300, summaryY).text(`$${order.subtotal.toFixed(2)}`, 400, summaryY).text('Shipping:', 300, summaryY + 20).text(`$${order.shipping.toFixed(2)}`, 400, summaryY + 20).text('Tax (16% VAT):', 300, summaryY + 40).text(`$${order.tax.toFixed(2)}`, 400, summaryY + 40).moveDown().fontSize(14).text('TOTAL:', 300, doc.y).text(`$${order.total.toFixed(2)}`, 400, doc.y).moveDown(2);

    // Payment and status info
    doc.fontSize(10).text(`Payment Method: ${order.paymentMethod.toUpperCase()}`).text(`Payment Status: ${order.paymentStatus}`).text(`Order Status: ${order.status}`).moveDown().text('Thank you for your purchase!', { align: 'center' });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ message: 'Error generating receipt', error: error.message });
  }
});

// CUSTOMERS

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

// Get single customer
app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
});

// Create customer
app.post('/api/customers', async (req, res) => {
  try {
    const customerData = req.body;

    // Check if customer with same email already exists
    const existingCustomer = await Customer.findOne({ email: customerData.email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    const customer = new Customer(customerData);
    const savedCustomer = await customer.save();

    res.status(201).json({
      id: savedCustomer._id,
      success: true,
      message: 'Customer created successfully'
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
});

// Update customer
app.put('/api/customers/:id', async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };

    const customer = await Customer.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
});

// Delete customer
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
});

// Search customers
app.get('/api/customers/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(q, 'i');
    const customers = await Customer.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { address: searchRegex },
        { city: searchRegex }
      ]
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error searching customers', error: error.message });
  }
});

// Get customer statistics
app.get('/api/customers/stats', async (req, res) => {
  try {
    const total = await Customer.countDocuments();
    const active = await Customer.countDocuments({ status: 'active' });
    const inactive = await Customer.countDocuments({ status: 'inactive' });

    const customers = await Customer.find();
    const vip = customers.filter((c) => c.totalSpent >= 2000000).length;
    const premium = customers.filter((c) => c.totalSpent >= 500000 && c.totalSpent < 2000000).length;
    const regular = customers.filter((c) => c.totalSpent >= 100000 && c.totalSpent < 500000).length;
    const newCustomers = customers.filter((c) => c.totalSpent < 100000).length;

    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const stats = {
      total,
      active,
      inactive,
      vip,
      premium,
      regular,
      new: newCustomers,
      totalRevenue,
      averageOrderValue
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer stats', error: error.message });
  }
});

// CATEGORIES

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Get single category
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// Create category
app.post('/api/categories', async (req, res) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    const savedCategory = await category.save();
    res.status(201).json({ id: savedCategory._id, success: true, message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// Update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    const category = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ success: true, category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// Delete category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

// ANALYTICS

// Get comprehensive analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    // Calculate date ranges
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        previousStartDate.setDate(now.getDate() - 14);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        previousStartDate.setDate(now.getDate() - 60);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        previousStartDate.setDate(now.getDate() - 180);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        previousStartDate.setFullYear(now.getFullYear() - 2);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
        previousStartDate.setDate(now.getDate() - 60);
    }

    const orders = await Order.find({ createdAt: { $gte: startDate } });
    const previousOrders = await Order.find({ 
      createdAt: { $gte: previousStartDate, $lt: startDate } 
    });
    const customers = await Customer.find();
    const products = await Product.find();

    // Calculate revenue metrics
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0),
      0
    );
    
    const previousRevenue = previousOrders.reduce(
      (sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0),
      0
    );
    
    const revenueGrowth = previousRevenue > 0 ? 
      ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    
    const completedOrders = orders.filter((o) => o.paymentStatus === 'completed');
    const monthlyRevenue = completedOrders
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, order) => sum + order.total, 0);

    // Order statistics
    const orderStats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      completed: orders.filter((o) => o.status === 'delivered' || o.paymentStatus === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length
    };

    // Customer statistics
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const newCustomers = customers.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo).length;

    const customerStats = {
      total: customers.length,
      new: newCustomers,
      active: customers.filter((c) => c.status === 'active').length,
      inactive: customers.filter((c) => c.status === 'inactive').length
    };

    // Product statistics
    const productStats = {
      total: products.length,
      inStock: products.filter((p) => p.inStock && p.stock > 5).length,
      lowStock: products.filter((p) => p.inStock && p.stock <= 5 && p.stock > 0).length,
      outOfStock: products.filter((p) => !p.inStock || p.stock === 0).length
    };

    // Top products (computed from completed orders within the selected range)
    const productStatsMap = new Map();
    for (const order of completedOrders) {
      for (const item of order.items) {
        const key = item.id || item._id || item.name;
        if (!productStatsMap.has(key)) {
          productStatsMap.set(key, {
            id: key,
            name: item.name,
            sales: 0,
            revenue: 0
          });
        }
        const stats = productStatsMap.get(key);
        stats.sales += Number(item.quantity) || 0;
        stats.revenue += Number(item.totalPrice) || 0;
      }
    }
    const topProducts = Array.from(productStatsMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Top categories by revenue (aggregate all completed order items)
    const productIdToCategory = new Map(products.map((p) => [String(p._id), p.category || 'Uncategorized']));
    const categoryStatsMap = new Map();
    for (const order of completedOrders) {
      for (const item of order.items) {
        const productId = String(item.id || item._id || '');
        const categoryName = productIdToCategory.get(productId) || 'Uncategorized';
        if (!categoryStatsMap.has(categoryName)) {
          categoryStatsMap.set(categoryName, { name: categoryName, sales: 0, revenue: 0 });
        }
        const catStats = categoryStatsMap.get(categoryName);
        catStats.sales += Number(item.quantity) || 0;
        catStats.revenue += Number(item.totalPrice) || 0;
      }
    }
    const topCategories = Array.from(categoryStatsMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Monthly data (simplified - last 12 months)
    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en', { month: 'short' });

      const monthOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
      });

      const monthCustomers = customers.filter((c) => {
        const customerDate = new Date(c.createdAt);
        return customerDate.getMonth() === date.getMonth() && customerDate.getFullYear() === date.getFullYear();
      });

      monthlyData.push({
        month: monthName,
        revenue: monthOrders.reduce(
          (sum, o) => sum + (o.paymentStatus === 'completed' ? o.total : 0),
          0
        ),
        orders: monthOrders.length,
        customers: monthCustomers.length
      });
    }

    const analyticsData = {
      revenue: {
        total: totalRevenue,
        monthly: monthlyRevenue,
        growth: revenueGrowth
      },
      orders: orderStats,
      customers: customerStats,
      products: productStats,
      topProducts,
      topCategories,
      monthlyData
    };

    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Individual analytics endpoints
app.get('/api/analytics/revenue', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0),
      0
    );

    const now = new Date();
    const monthlyRevenue = orders
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      })
      .reduce(
        (sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0),
        0
      );

    res.json({
      total: totalRevenue,
      monthly: monthlyRevenue,
      growth: 12.5 // Mock growth rate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue analytics', error: error.message });
  }
});

app.get('/api/analytics/orders', async (req, res) => {
  try {
    const orders = await Order.find();

    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      completed: orders.filter((o) => o.status === 'delivered' || o.paymentStatus === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order analytics', error: error.message });
  }
});

app.get('/api/analytics/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const stats = {
      total: customers.length,
      new: customers.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo).length,
      active: customers.filter((c) => c.status === 'active').length,
      inactive: customers.filter((c) => c.status === 'inactive').length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer analytics', error: error.message });
  }
});

app.get('/api/analytics/products', async (req, res) => {
  try {
    const products = await Product.find();

    const stats = {
      total: products.length,
      inStock: products.filter((p) => p.inStock && p.stock > 5).length,
      lowStock: products.filter((p) => p.inStock && p.stock <= 5 && p.stock > 0).length,
      outOfStock: products.filter((p) => !p.inStock || p.stock === 0).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product analytics', error: error.message });
  }
});

// Add live top products endpoint
app.get('/api/analytics/top-products', async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    const now = new Date();
    let startDate = new Date();
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    const orders = await Order.find({ createdAt: { $gte: startDate } });
    const completedOrders = orders.filter((o) => o.paymentStatus === 'completed' || o.status === 'delivered');

    const productStatsMap = new Map();
    for (const order of completedOrders) {
      for (const item of order.items) {
        const key = item.id || item._id || item.name;
        if (!productStatsMap.has(key)) {
          productStatsMap.set(key, { id: key, name: item.name, sales: 0, revenue: 0 });
        }
        const stats = productStatsMap.get(key);
        stats.sales += Number(item.quantity) || 0;
        stats.revenue += Number(item.totalPrice) || 0;
      }
    }

    const topProducts = Array.from(productStatsMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top products', error: error.message });
  }
});

// Add live top categories endpoint
app.get('/api/analytics/top-categories', async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    const now = new Date();
    let startDate = new Date();
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    const [orders, products] = await Promise.all([
      Order.find({ createdAt: { $gte: startDate } }),
      Product.find()
    ]);

    const completedOrders = orders.filter((o) => o.paymentStatus === 'completed' || o.status === 'delivered');

    const productIdToCategory = new Map(products.map((p) => [String(p._id), p.category || 'Uncategorized']));

    const categoryStatsMap = new Map();
    for (const order of completedOrders) {
      for (const item of order.items) {
        const productId = String(item.id || item._id || '');
        const categoryName = productIdToCategory.get(productId) || 'Uncategorized';
        if (!categoryStatsMap.has(categoryName)) {
          categoryStatsMap.set(categoryName, { name: categoryName, sales: 0, revenue: 0 });
        }
        const cat = categoryStatsMap.get(categoryName);
        cat.sales += Number(item.quantity) || 0;
        cat.revenue += Number(item.totalPrice) || 0;
      }
    }

    const topCategories = Array.from(categoryStatsMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    res.json(topCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top categories', error: error.message });
  }
});

// Add live monthly analytics endpoint
app.get('/api/analytics/monthly', async (req, res) => {
  try {
    const orders = await Order.find();
    const customers = await Customer.find();

    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en', { month: 'short' });

      const monthOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
      });

      const monthCustomers = customers.filter((c) => {
        const customerDate = new Date(c.createdAt);
        return customerDate.getMonth() === date.getMonth() && customerDate.getFullYear() === date.getFullYear();
      });

      monthlyData.push({
        month: monthName,
        revenue: monthOrders.reduce((sum, o) => sum + (o.paymentStatus === 'completed' ? o.total : 0), 0),
        orders: monthOrders.length,
        customers: monthCustomers.length
      });
    }

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly analytics', error: error.message });
  }
});

// ADMIN MANAGEMENT

// Admin Schema for storing admin credentials
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

// Simple hash function for passwords (in production, use bcrypt)
function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Get admin profile
app.get('/api/admin/profile', async (req, res) => {
  try {
    // In a real app, you'd get the admin ID from the authenticated session
    // For now, we'll return the first admin
    const admin = await Admin.findOne({ role: 'admin' }).select('-passwordHash');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin profile', error: error.message });
  }
});

// Update admin credentials
app.put('/api/admin/credentials', async (req, res) => {
  try {
    const { currentPassword, newPassword, email, name } = req.body;
    
    // Find the admin (in a real app, use the authenticated admin's ID)
    const admin = await Admin.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Verify current password
    const currentPasswordHash = hashPassword(currentPassword);
    if (admin.passwordHash !== currentPasswordHash) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update admin credentials
    const updates = {
      updatedAt: new Date()
    };
    
    if (newPassword) {
      updates.passwordHash = hashPassword(newPassword);
    }
    
    if (email) {
      updates.email = email;
    }
    
    if (name) {
      updates.name = name;
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, updates, {
      new: true,
      runValidators: true
    }).select('-passwordHash');
    
    res.json({ success: true, admin: updatedAdmin, message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    res.status(500).json({ message: 'Error updating credentials', error: error.message });
  }
});

// Initialize default admin if none exists
async function initializeDefaultAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        email: 'admin@rurident.com',
        passwordHash: hashPassword('secure123'),
        name: 'Admin User',
        role: 'admin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin user created');
    }
  } catch (error) {
    console.error('Error initializing default admin:', error);
  }
}

// Initialize default admin on server start
initializeDefaultAdmin();

// Settings Schema for storing application settings
const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model('Settings', settingsSchema);

// Get all settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    
    // Return default settings if none exist
    const defaultSettings = {
      storeName: 'Rurident Health Supplies',
      storeDescription: 'Professional dental equipment and supplies',
      contactEmail: 'info@rurident.com',
      contactPhone: '+254-700-000-000',
      address: 'Nairobi, Kenya',
      currency: 'KES',
      timezone: 'Africa/Nairobi',
      emailNotifications: true,
      smsNotifications: false,
      orderNotifications: true,
      lowStockAlerts: true,
      mpesaEnabled: true,
      mpesaShortcode: '174379',
      mpesaPasskey: '',
      cardPaymentsEnabled: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    };
    
    res.json({ ...defaultSettings, ...settingsObj });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// Update settings
app.put('/api/settings', async (req, res) => {
  try {
    const updates = req.body;
    const updatePromises = [];
    
    for (const [key, value] of Object.entries(updates)) {
      updatePromises.push(
        Settings.findOneAndUpdate(
          { key },
          { key, value, updatedAt: new Date() },
          { upsert: true, new: true }
        )
      );
    }
    
    await Promise.all(updatePromises);
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

/* =========================
   SERVE REACT FRONTEND
   ========================= */

// IMPORTANT: Ensure your React build outputs to ../dist relative to this file.
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Catch-all so React Router handles client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
