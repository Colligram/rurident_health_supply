// Standalone MongoDB seeder for categories and products
// Usage:
//   MONGO_URI="mongodb+srv://..." node seed.js
// or with npm script:
//   npm run seed

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  process.env.MONGO_URL ||
  'mongodb://localhost:27017/rurident';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  originalPrice: { type: Number },
  image: { type: String },
  images: { type: [String], default: [] },
  category: { type: String, required: true },
  subcategory: { type: String },
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
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
  updatedAt: { type: Date, default: Date.now },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: '📦' },
  subcategories: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      path: { type: String, required: true },
      icon: { type: String, default: '📦' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

async function run() {
  console.log('Connecting to MongoDB at', MONGODB_URI.replace(/:[^:@/]+@/, ':***@'));
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ Connected');

  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    console.log('Seeding categories...');
    await Category.insertMany([
      {
        name: 'Dental Laboratory',
        description: 'Laboratory equipment and tools for dental technicians',
        icon: '🔬',
        subcategories: [
          { id: 'dl1', name: 'Crown and Bridge', path: '/products?category=crown-and-bridge', icon: '👑' },
          { id: 'dl2', name: 'Dental Lab Orthodontics', path: '/products?category=dental-lab-orthodontics', icon: '🦷' },
          { id: 'dl3', name: 'Complete Dentures', path: '/products?category=complete-dentures', icon: '🦴' },
          { id: 'dl4', name: 'Partial Dentures (Cobalt Chrome)', path: '/products?category=partial-dentures-cobalt-chrome', icon: '⚙️' },
        ],
      },
      {
        name: 'Clinical Machines & Equipment',
        description: 'Medical and dental equipment',
        icon: '⚙️',
        subcategories: [
          { id: 'eq1', name: 'Handpieces', path: '/products?category=handpieces', icon: '🔧' },
          { id: 'eq2', name: 'Scalers', path: '/products?category=scalers', icon: '🔪' },
          { id: 'eq3', name: 'Surgical Tools', path: '/products?category=surgical-tools', icon: '🩺' },
          { id: 'eq4', name: 'Clinical Orthodontics', path: '/products?category=clinical-orthodontics', icon: '🦷' },
        ],
      },
      {
        name: 'Consumables',
        description: 'Daily use consumables and disposables',
        icon: '📦',
        subcategories: [
          { id: 'cs1', name: 'Gloves', path: '/products?category=gloves', icon: '🧤' },
          { id: 'cs2', name: 'Masks', path: '/products?category=masks', icon: '😷' },
          { id: 'cs3', name: 'Dental Materials', path: '/products?category=dental-materials', icon: '🧪' },
        ],
      },
    ]);
    console.log('✅ Categories seeded');
  } else {
    console.log('Categories already present:', categoryCount);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log('Seeding products...');
    await Product.insertMany([
      {
        name: 'Digital Thermometer',
        description: 'Accurate digital thermometer for medical use',
        price: 25.99,
        image: '/api/placeholder/300/200',
        images: ['/api/placeholder/300/200'],
        category: 'Clinical Machines & Equipment',
        inStock: true,
        stock: 50,
      },
      {
        name: 'Blood Pressure Monitor',
        description: 'Automatic blood pressure monitor with large display',
        price: 89.99,
        image: '/api/placeholder/300/200',
        images: ['/api/placeholder/300/200'],
        category: 'Clinical Machines & Equipment',
        inStock: true,
        stock: 25,
      },
      {
        name: 'First Aid Kit',
        description: 'Complete first aid kit for home and office',
        price: 34.99,
        image: '/api/placeholder/300/200',
        images: ['/api/placeholder/300/200'],
        category: 'Consumables',
        inStock: true,
        stock: 100,
      },
    ]);
    console.log('✅ Products seeded');
  } else {
    console.log('Products already present:', productCount);
  }

  await mongoose.connection.close();
  console.log('✅ Seeding complete. Connection closed.');
}

run().catch((err) => {
  console.error('❌ Seeder error:', err);
  process.exit(1);
});

