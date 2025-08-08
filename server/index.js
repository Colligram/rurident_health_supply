import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let db = null;
let dbConnected = false;
let usingInMemory = false;

// In-memory store fallback if DB is unavailable
let inMemoryProducts = [
  {
    id: "6751234567890123456789ab",
    name: "Professional Dental Chair",
    description: "State-of-the-art fully motorized dental chair with advanced patient positioning and comfort features. Perfect for modern dental practices.",
    price: 4500,
    salePrice: 3999,
    originalPrice: 4500,
    images: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=400&fit=crop", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop"],
    category: "Dental Equipment",
    stock: 8,
    inStock: true,
    rating: 4.8,
    reviewCount: 24,
    isFeatured: true,
    isNew: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ac",
    name: "Ultrasonic Scaler Tips Set",
    description: "Complete set of high-quality ultrasonic scaler tips for effective plaque and tartar removal. Compatible with most dental units.",
    price: 125,
    salePrice: 99,
    originalPrice: 125,
    images: ["https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&h=400&fit=crop"],
    category: "Dental Instruments",
    stock: 45,
    inStock: true,
    rating: 4.6,
    reviewCount: 18,
    isFeatured: true,
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ad",
    name: "LED Dental Curing Light",
    description: "High-intensity LED curing light with multiple curing modes and wireless operation. Essential for composite restorations.",
    price: 299,
    images: ["https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop"],
    category: "Dental Equipment",
    stock: 15,
    inStock: true,
    rating: 4.7,
    reviewCount: 12,
    isFeatured: false,
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ae",
    name: "Dental Impression Material",
    description: "Premium silicone impression material for accurate dental impressions. Fast setting with excellent detail reproduction.",
    price: 89,
    salePrice: 75,
    originalPrice: 89,
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=400&fit=crop"],
    category: "Dental Materials",
    stock: 32,
    inStock: true,
    rating: 4.4,
    reviewCount: 8,
    isFeatured: false,
    isNew: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789af",
    name: "Surgical Extraction Kit",
    description: "Complete surgical extraction kit with elevators, forceps, and surgical instruments for oral surgery procedures.",
    price: 459,
    images: ["https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=400&fit=crop"],
    category: "Surgical Instruments",
    stock: 12,
    inStock: true,
    rating: 4.9,
    reviewCount: 15,
    isFeatured: true,
    isNew: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ag",
    name: "Digital X-Ray Sensor",
    description: "High-resolution digital x-ray sensor with USB connectivity. Delivers crisp images with reduced radiation exposure.",
    price: 2199,
    salePrice: 1899,
    originalPrice: 2199,
    images: ["https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=400&fit=crop"],
    category: "Imaging Equipment",
    stock: 5,
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
    isFeatured: true,
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ah",
    name: "Dental Handpiece Set",
    description: "Professional dental handpiece set including high-speed and low-speed handpieces with LED illumination.",
    price: 899,
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop"],
    category: "Dental Equipment",
    stock: 20,
    inStock: true,
    rating: 4.5,
    reviewCount: 31,
    isFeatured: false,
    isNew: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6751234567890123456789ai",
    name: "Disposable Dental Masks",
    description: "High-quality 3-ply disposable dental masks with excellent filtration. Box of 50 masks for infection control.",
    price: 24,
    salePrice: 19,
    originalPrice: 24,
    images: ["https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&h=400&fit=crop"],
    category: "Safety & Protection",
    stock: 150,
    inStock: true,
    rating: 4.3,
    reviewCount: 67,
    isFeatured: false,
    isNew: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

app.use(cors());
app.use(express.json());

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
    if (!usingInMemory) {
      console.warn("⚠️  MONGODB_URI not set. Using in-memory product store.");
      usingInMemory = true;
    }
    return;
  }
  try {
    await client.connect();
    db = client.db(); // auto-selects DB from URI
    dbConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    if (!usingInMemory) {
      console.error("❌ MongoDB connection failed:", err.message);
      console.warn("⚠️  Falling back to in-memory product store.");
      usingInMemory = true;
    }
    db = null; // fallback to null
    dbConnected = false;
  }
}

connectToMongo();

// --- Health ---
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    dbConnected: dbConnected,
    usingInMemory: usingInMemory,
    status: dbConnected ? 'database' : 'in-memory' 
  });
});

// --- Get Products ---
app.get("/api/products", async (req, res) => {
  if (!db) {
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

// Initialize database connection
connectToMongo();

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Mode: ${usingInMemory ? 'In-Memory Store' : 'Database Connected'}`);
});
