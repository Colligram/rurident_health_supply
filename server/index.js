
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import { existsSync } from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not set');
    }
    
    // Create a MongoClient with environment-based configuration
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1
    });
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    db = client.db('ruridentdb');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('Continuing in development mode without database...');
    // Set db to null so we know it's not connected
    db = null;
  }
};

// Products API Routes
app.get('/api/products', async (req, res) => {
  try {
    if (!db) {
      // Return empty array when database is not connected
      console.log('Database not connected, returning empty products array');
      return res.json([]);
    }
    
    const products = await db.collection('products').find({}).toArray();
    const formattedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.json([]); // Return empty array instead of error
  }
});

app.post('/api/products', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
    
    const product = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').insertOne(product);
    res.json({ success: true, id: result.insertedId.toString() });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
    
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
    
    const { id } = req.params;
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Serve static files from the dist directory (if it exists)
const distExists = existsSync('dist');
if (distExists) {
  app.use(express.static('dist'));
  console.log('Frontend build found - serving static files');
} else {
  console.log('Frontend build not found - API only mode');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    frontendBuild: distExists ? 'available' : 'not_built',
    database: db ? 'connected' : 'disconnected'
  });
});

// Serve React app for all non-API routes (if dist exists)
app.get(/^\/(?!api).*/, (req, res) => {
  const distPath = path.join(process.cwd(), 'dist', 'index.html');
  if (existsSync(distPath)) {
    return res.sendFile(distPath);
  }
  return res.status(200).json({ 
    message: 'Frontend not built. This is normal in development mode.',
    suggestion: 'Use the frontend dev server on port 3000 for development, or run "npm run build" for production.'
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://0.0.0.0:${PORT}`);
  });
};

startServer();
