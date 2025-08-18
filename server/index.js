const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with fallback to in-memory database
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/rurident';

console.log('Attempting to connect to MongoDB...');

async function connectToDatabase() {
  try {
    // Try to connect to the specified MongoDB URI first
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.log('❌ Failed to connect to MongoDB:', error.message);
    console.log('🔄 Starting in-memory MongoDB server for development...');
    
    try {
      // Start in-memory MongoDB server
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
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
          name: "Digital Thermometer",
          description: "Accurate digital thermometer for medical use",
          price: 25.99,
          images: ["/api/placeholder/300/200"],
          category: "Medical Devices",
          inStock: true,
          stock: 50
        },
        {
          name: "Blood Pressure Monitor",
          description: "Automatic blood pressure monitor with large display",
          price: 89.99,
          images: ["/api/placeholder/300/200"],
          category: "Medical Devices",
          inStock: true,
          stock: 30
        },
        {
          name: "First Aid Kit",
          description: "Complete first aid kit for home and office",
          price: 34.99,
          images: ["/api/placeholder/300/200"],
          category: "Medical Supplies",
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
          name: "Dr. Sarah Johnson",
          email: "sarah@dentalclinic.com",
          phone: "+254712345678",
          address: "Westlands, Nairobi",
          city: "Nairobi",
          country: "Kenya",
          totalOrders: 15,
          totalSpent: 2450000,
          lastOrderDate: new Date('2024-01-15T10:00:00Z'),
          status: "active",
          joinDate: new Date('2023-06-12T08:00:00Z'),
          tags: ["VIP", "Dentist", "Regular Customer"]
        },
        {
          name: "Dr. Michael Ochieng",
          email: "michael@smilecenter.com",
          phone: "+254723456789",
          address: "Kilifi, Mombasa",
          city: "Mombasa",
          country: "Kenya",
          totalOrders: 8,
          totalSpent: 890000,
          lastOrderDate: new Date('2024-01-10T14:30:00Z'),
          status: "active",
          joinDate: new Date('2023-09-20T10:15:00Z'),
          tags: ["Premium", "Dentist"]
        },
        {
          name: "Jane Wambui",
          email: "jane.student@uon.ac.ke",
          phone: "+254734567890",
          address: "Karen, Nairobi",
          city: "Nairobi",
          country: "Kenya",
          totalOrders: 3,
          totalSpent: 75000,
          lastOrderDate: new Date('2023-12-20T09:45:00Z'),
          status: "active",
          joinDate: new Date('2023-11-05T14:22:00Z'),
          tags: ["Student", "New Customer"]
        },
        {
          name: "Dr. Peter Mwangi",
          email: "peter@healthcenter.co.ke",
          phone: "+254745678901",
          address: "Thika, Kiambu",
          city: "Thika",
          country: "Kenya",
          totalOrders: 22,
          totalSpent: 3200000,
          lastOrderDate: new Date('2024-01-12T16:20:00Z'),
          status: "active",
          joinDate: new Date('2023-03-15T11:30:00Z'),
          tags: ["VIP", "Dentist", "High Value"]
        },
        {
          name: "Dr. Grace Kiprotich",
          email: "grace@ruraldental.org",
          phone: "+254756789012",
          address: "Eldoret, Uasin Gishu",
          city: "Eldoret",
          country: "Kenya",
          totalOrders: 1,
          totalSpent: 45000,
          lastOrderDate: new Date('2023-11-30T13:15:00Z'),
          status: "inactive",
          joinDate: new Date('2023-11-25T09:00:00Z'),
          tags: ["Rural", "Inactive"]
        }
      ];
      
      await Customer.insertMany(sampleCustomers);
      console.log('✅ Sample customers added to database');
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

// Product Schema - aligned with frontend requirements
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  originalPrice: { type: Number },
  images: { type: [String], default: [] },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  features: { type: [String], default: [] },
  brand: { type: String },
  seller: { type: String },
  soldCount: { type: Number, default: 0 },
  isBestSeller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  // Do NOT add `isNew` here. It's a reserved Mongoose property on documents.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Order Schema - Updated with new fields
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
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    totalPrice: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['mpesa', 'card'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
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

// Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const payload = req.body || {};
    // Prevent use of reserved pathnames like isNew
    if (Object.prototype.hasOwnProperty.call(payload, 'isNew')) {
      delete payload.isNew;
    }

    // Default images array
    if (!payload.images && payload.image) {
      payload.images = [payload.image];
      delete payload.image;
    }

    // Ensure stock and derived fields
    if (typeof payload.stock === 'number') {
      payload.inStock = payload.stock > 0;
    }

    const product = new Product(payload);
    const saved = await product.save();
    res.status(201).json({ id: saved._id, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    if (Object.prototype.hasOwnProperty.call(updates, 'isNew')) {
      delete updates.isNew;
    }
    if (typeof updates.stock === 'number') {
      updates.inStock = updates.stock > 0;
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, id: updated._id });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
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

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate required fields
    const requiredFields = ['orderId', 'orderNumber', 'orderDate', 'customerInfo', 'items', 'subtotal', 'shipping', 'tax', 'total', 'paymentMethod'];
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
      
      // Update contact info if provided
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
    
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    );
    
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

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${order.orderNumber}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc
      .fontSize(24)
      .text('RURIDENT HEALTH SUPPLIES', { align: 'center' })
      .moveDown()
      .fontSize(18)
      .text('RECEIPT', { align: 'center' })
      .moveDown(2);

    // Order details
    doc
      .fontSize(12)
      .text(`Order Number: ${order.orderNumber}`)
      .text(`Date: ${order.orderDate}`)
      .moveDown();

    // Customer information
    doc
      .fontSize(14)
      .text('CUSTOMER INFORMATION', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`${order.customerInfo.firstName} ${order.customerInfo.lastName}`)
      .text(`Email: ${order.customerInfo.email}`)
      .text(`Phone: ${order.customerInfo.phone}`)
      .text(`Address: ${order.customerInfo.address}`)
      .text(`${order.customerInfo.city}, ${order.customerInfo.county}`)
      .moveDown();

    // Items table
    doc
      .fontSize(14)
      .text('ITEMS', { underline: true })
      .moveDown();

    // Table headers
    const tableTop = doc.y;
    const itemCol = 50;
    const qtyCol = 200;
    const priceCol = 300;
    const totalCol = 400;

    doc
      .fontSize(10)
      .text('Item', itemCol, tableTop)
      .text('Qty', qtyCol, tableTop)
      .text('Price', priceCol, tableTop)
      .text('Total', totalCol, tableTop)
      .moveDown();

    // Table rows
    let currentY = doc.y;
    order.items.forEach((item, index) => {
      if (currentY > 700) { // Check if we need a new page
        doc.addPage();
        currentY = 50;
      }

      doc
        .fontSize(10)
        .text(item.name, itemCol, currentY)
        .text(item.quantity.toString(), qtyCol, currentY)
        .text(`$${item.price.toFixed(2)}`, priceCol, currentY)
        .text(`$${item.totalPrice.toFixed(2)}`, totalCol, currentY);

      currentY += 20;
    });

    doc.moveDown(2);

    // Summary
    doc
      .fontSize(14)
      .text('SUMMARY', { underline: true })
      .moveDown()
      .fontSize(12);

    const summaryY = doc.y;
    doc
      .text('Subtotal:', 300, summaryY)
      .text(`$${order.subtotal.toFixed(2)}`, 400, summaryY)
      .text('Shipping:', 300, summaryY + 20)
      .text(`$${order.shipping.toFixed(2)}`, 400, summaryY + 20)
      .text('Tax (16% VAT):', 300, summaryY + 40)
      .text(`$${order.tax.toFixed(2)}`, 400, summaryY + 40)
      .moveDown()
      .fontSize(14)
      .text('TOTAL:', 300, doc.y)
      .text(`$${order.total.toFixed(2)}`, 400, doc.y)
      .moveDown(2);

    // Payment and status info
    doc
      .fontSize(10)
      .text(`Payment Method: ${order.paymentMethod.toUpperCase()}`)
      .text(`Payment Status: ${order.paymentStatus}`)
      .text(`Order Status: ${order.status}`)
      .moveDown()
      .text('Thank you for your purchase!', { align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ message: 'Error generating receipt', error: error.message });
  }
});

// Customer Routes

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
    
    const customer = await Customer.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    );
    
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
    
    // Calculate customer segments based on spending
    const customers = await Customer.find();
    const vip = customers.filter(c => c.totalSpent >= 2000000).length;
    const premium = customers.filter(c => c.totalSpent >= 500000 && c.totalSpent < 2000000).length;
    const regular = customers.filter(c => c.totalSpent >= 100000 && c.totalSpent < 500000).length;
    const newCustomers = customers.filter(c => c.totalSpent < 100000).length;
    
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

// Analytics Routes

// Get comprehensive analytics
app.get('/api/analytics', async (req, res) => {
  try {
    // Get orders data
    const orders = await Order.find();
    const customers = await Customer.find();
    const products = await Product.find();

    // Calculate revenue metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0), 0);
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed');
    const monthlyRevenue = completedOrders
      .filter(o => {
        const orderDate = new Date(o.createdAt);
        const now = new Date();
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, order) => sum + order.total, 0);

    // Calculate growth (mock calculation for now)
    const revenueGrowth = 12.5; // This would be calculated based on previous month data

    // Order statistics
    const orderStats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      completed: orders.filter(o => o.status === 'delivered' || o.paymentStatus === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    // Customer statistics
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const newCustomers = customers.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length;

    const customerStats = {
      total: customers.length,
      new: newCustomers,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length
    };

    // Product statistics
    const productStats = {
      total: products.length,
      inStock: products.filter(p => p.inStock && p.stock > 5).length,
      lowStock: products.filter(p => p.inStock && p.stock <= 5 && p.stock > 0).length,
      outOfStock: products.filter(p => !p.inStock || p.stock === 0).length
    };

    // Top products (mock data for now - would need order items analysis)
    const topProducts = [
      { id: 'PROD-001', name: 'Professional Dental Handpiece Set', sales: 156, revenue: 7020000 },
      { id: 'PROD-002', name: 'Digital X-Ray Sensor Kit', sales: 89, revenue: 11125000 },
      { id: 'PROD-003', name: 'Orthodontic Bracket Kit', sales: 234, revenue: 1989000 }
    ];

    // Top categories (mock data for now)
    const topCategories = [
      { name: 'Clinical Machines & Equipment', sales: 45, revenue: 8900000 },
      { name: 'Sterilization Equipment', sales: 123, revenue: 4560000 },
      { name: 'Consumables', sales: 567, revenue: 2340000 }
    ];

    // Monthly data (simplified - last 12 months)
    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en', { month: 'short' });
      
      const monthOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear();
      });
      
      const monthCustomers = customers.filter(c => {
        const customerDate = new Date(c.createdAt);
        return customerDate.getMonth() === date.getMonth() && 
               customerDate.getFullYear() === date.getFullYear();
      });

      monthlyData.push({
        month: monthName,
        revenue: monthOrders.reduce((sum, o) => sum + (o.paymentStatus === 'completed' ? o.total : 0), 0),
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
    const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0), 0);
    
    const now = new Date();
    const monthlyRevenue = orders
      .filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, order) => sum + (order.paymentStatus === 'completed' ? order.total : 0), 0);

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
      pending: orders.filter(o => o.status === 'pending').length,
      completed: orders.filter(o => o.status === 'delivered' || o.paymentStatus === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
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
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const stats = {
      total: customers.length,
      new: customers.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length
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
      inStock: products.filter(p => p.inStock && p.stock > 5).length,
      lowStock: products.filter(p => p.inStock && p.stock <= 5 && p.stock > 0).length,
      outOfStock: products.filter(p => !p.inStock || p.stock === 0).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product analytics', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
