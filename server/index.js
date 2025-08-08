import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let db = null;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/rurident_health_supplies";
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
    // Convert MongoDB _id to id for frontend compatibility
    const formattedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
    res.json(formattedProducts);
  } catch (err) {
    console.error("❌ Failed to fetch products:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Add Product ---
app.post("/api/products", async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "No DB connection" });
  }

  try {
    const productData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: req.body.rating || 0,
      reviewCount: req.body.reviewCount || 0,
      inStock: req.body.stock > 0
    };

    const result = await db.collection("products").insertOne(productData);
    res.json({ success: true, id: result.insertedId.toString() });
  } catch (err) {
    console.error("❌ Failed to add product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Update Product ---
app.put("/api/products/:id", async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "No DB connection" });
  }

  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedAt: new Date(),
      inStock: req.body.stock > 0
    };

    // Remove the id field from updates if it exists
    delete updates.id;

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Delete Product ---
app.delete("/api/products/:id", async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "No DB connection" });
  }

  try {
    const { id } = req.params;
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete product:", err.message);
    res.status(500).json({ error: err.message });
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
