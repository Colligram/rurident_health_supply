const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let db = null;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongo() {
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

// --- Get Products ---
app.get("/api/products", async (req, res) => {
  if (!db) {
    console.log("⚠️  Database not connected, returning empty products array");
    return res.json([]);
  }

  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    console.error("❌ Failed to fetch products:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- TEMPORARY: Fill sample products ---
app.post("/api/products/fill", async (req, res) => {
  if (!db) return res.status(500).json({ error: "No DB connection" });

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

  try {
    await db.collection("products").insertMany(sampleProducts);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
