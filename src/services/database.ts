
import { MongoClient, Db, Collection } from 'mongodb';

class DatabaseService {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    if (this.client) return;

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME || 'rurident_db';

    if (!uri) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);
    console.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }

  getCollection(name: string): Collection {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection(name);
  }

  // Products methods
  async getProducts() {
    const collection = this.getCollection('products');
    return await collection.find({}).toArray();
  }

  async addProduct(product: any) {
    const collection = this.getCollection('products');
    const result = await collection.insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  }

  async updateProduct(id: string, updates: any) {
    const collection = this.getCollection('products');
    const result = await collection.updateOne(
      { _id: id },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    );
    return result;
  }

  async deleteProduct(id: string) {
    const collection = this.getCollection('products');
    const result = await collection.deleteOne({ _id: id });
    return result;
  }
}

export const databaseService = new DatabaseService();
