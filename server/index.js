const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let db = null;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = uri
  ? new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
  : null;

// In-memory store fallback if DB is unavailable
let inMemoryProducts = [];

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
    return res.json(inMemoryProducts.map(p => ({ ...p, id: p.id, _id: undefined })));
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
  const product = req.body || {};
  if (!db) {
    const newProduct = { ...product, id: new ObjectId().toString() };
    inMemoryProducts.push(newProduct);
    return res.status(201).json({ id: newProduct.id });
  }
  try {
    const result = await db.collection("products").insertOne(product);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("❌ Failed to add product:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Update Product ---
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  if (!db) {
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    inMemoryProducts[idx] = { ...inMemoryProducts[idx], ...updates };
    return res.json({ success: true });
  }
  try {
    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Delete Product ---
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!db) {
    const before = inMemoryProducts.length;
    inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
    if (inMemoryProducts.length === before) return res.status(404).json({ error: "Not found" });
    return res.json({ success: true });
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
      inStock: true,
      stock: 5,
      rating: 4.5,
      reviewCount: 10,
    },
    {
      name: "Scaler Tip",
      description: "High quality scaler tip",
      price: 10,
      images: [],
      category: "Instruments",
      inStock: true,
      stock: 50,
      rating: 4.8,
      reviewCount: 22,
    },
  ];

  if (!db) {
    inMemoryProducts.push(
      ...sampleProducts.map(p => ({ ...p, id: new ObjectId().toString() }))
    );
    return res.json({ success: true, count: sampleProducts.length, inMemory: true });
  }

  try {
    await db.collection("products").insertMany(sampleProducts);
    res.json({ success: true, count: sampleProducts.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start Server ---
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
