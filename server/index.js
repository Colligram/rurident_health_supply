const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rurident', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
