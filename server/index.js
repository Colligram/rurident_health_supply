import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let db = null;

// In-memory store fallback if DB is unavailable
let inMemoryProducts = [];

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', ordersRouter);

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/rurident_health_supplies";
const client = uri
  ? new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
  : null;

async function connectToMongo() {
  if (!client) {
    console.warn("⚠️  MONGODB_URI not set. Using in-memory product store.");
    return;
  }
  try {
    await client.connect();
    db = client.db(); // auto-selects DB from URI
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    db = null; // fallback to null
  }
}

connectToMongo();

// --- Health ---
app.get("/api/health", (req, res) => {
  res.json({ ok: true, dbConnected: Boolean(db) });
});

// --- Get Products ---
app.get("/api/products", async (req, res) => {
  if (!db) {
    console.log("⚠️  Database not connected, returning in-memory products");
    return res.json(inMemoryProducts);
  }

  try {
    const products = await db.collection("products").find().toArray();
    const normalized = products.map(doc => {
      const id = doc._id?.toString();
      const { _id, ...rest } = doc;
      return { id, ...rest };
    });
    res.json(normalized);
  } catch (err) {
    console.error("❌ Failed to fetch products:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Add Product ---
app.post("/api/products", async (req, res) => {
  const product = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: req.body.rating || 0,
    reviewCount: req.body.reviewCount || 0,
    inStock: req.body.stock > 0
  };

  if (!db) {
    const newProduct = { ...product, id: new ObjectId().toString() };
    inMemoryProducts.push(newProduct);
    return res.status(201).json({ id: newProduct.id, inMemory: true });
  }

  try {
    const result = await db.collection("products").insertOne(product);
    res.status(201).json({ id: result.insertedId.toString() });
  } catch (err) {
    console.error("❌ Failed to add product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Update Product ---
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = {
    ...req.body,
    updatedAt: new Date(),
    inStock: req.body.stock > 0
  };
  delete updates.id;

  if (!db) {
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    inMemoryProducts[idx] = { ...inMemoryProducts[idx], ...updates };
    return res.json({ success: true, inMemory: true });
  }

  try {
    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Delete Product ---
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!db) {
    const before = inMemoryProducts.length;
    inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
    if (inMemoryProducts.length === before) return res.status(404).json({ error: "Not found" });
    return res.json({ success: true, inMemory: true });
  }

  try {
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete product:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- TEMPORARY: Fill sample products ---
app.post("/api/products/fill", async (req, res) => {
  const sampleProducts = [
    {
      name: "Dental Chair",
      description: "Fully motorized dental chair",
      price: 1200,
      images: [],
      category: "Dental Equipment",
      stock: 5,
      inStock: true,
      rating: 4.2,
      reviewCount: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Scaler Tip",
      description: "High quality scaler tip",
      price: 10,
      images: [],
      category: "Instruments",
      stock: 50,
      inStock: true,
      rating: 4.2,
      reviewCount: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Seed the database with sample products
  try {
    if (db) {
      await db.collection("products").insertMany(sampleProducts);
      res.json({ success: true, message: "Sample products added", count: sampleProducts.length });
    } else {
      // Add to in-memory store if DB is not available
      inMemoryProducts.push(...sampleProducts);
      res.json({ success: true, message: "Sample products added to memory", count: sampleProducts.length });
    }
  } catch (error) {
    console.error("Error adding sample products:", error);
    res.status(500).json({ error: "Failed to add sample products" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToMongo();
});
