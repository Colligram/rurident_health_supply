import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rurident_health_supplies';
let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db();
}

// Create new order
router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    
    const orderData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await ordersCollection.insertOne(orderData);
    
    res.status(201).json({
      success: true,
      orderId: result.insertedId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    
    const { status, limit = 50, skip = 0 } = req.query;
    
    let query = {};
    if (status) {
      query.orderStatus = status;
    }
    
    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .toArray();
    
    const totalOrders = await ordersCollection.countDocuments(query);
    
    res.json({
      success: true,
      orders,
      totalOrders,
      hasMore: (parseInt(skip) + orders.length) < totalOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    
    const order = await ordersCollection.findOne({ 
      $or: [
        { _id: new ObjectId(req.params.id) },
        { orderId: req.params.id }
      ]
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    
    const { orderStatus, paymentStatus } = req.body;
    
    const updateData = {
      updatedAt: new Date()
    };
    
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    
    const result = await ordersCollection.updateOne(
      { 
        $or: [
          { _id: new ObjectId(req.params.id) },
          { orderId: req.params.id }
        ]
      },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    
    const result = await ordersCollection.deleteOne({ 
      $or: [
        { _id: new ObjectId(req.params.id) },
        { orderId: req.params.id }
      ]
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order'
    });
  }
});

export default router;