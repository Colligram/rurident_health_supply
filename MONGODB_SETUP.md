# MongoDB Setup Guide for Replit

## The Problem
Your project was trying to connect to `mongodb://localhost:27017` which doesn't work on Replit's cloud environment. The "Server unavailable, using mock data" message appears when the MongoDB connection fails.

## Solutions Fixed

### 1. ✅ Fixed Server Configuration
- Updated `server/package.json` to remove ES modules conflict
- Added proper `mongoose` dependency
- Fixed CommonJS/ES module mismatch

### 2. ✅ Environment-Based Connection
Updated MongoDB connection to use environment variables:
```javascript
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/rurident';
```

### 3. ✅ Better Error Handling
Added proper connection error handling that allows the server to continue running even without database connection.

## MongoDB Connection Options

### Option 1: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get your connection string
4. In Replit, go to **Secrets** tab (🔒 icon in sidebar)
5. Add a new secret:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rurident?retryWrites=true&w=majority`

### Option 2: Alternative Cloud Providers
- **MongoDB Cloud**: Use `MONGO_URL` environment variable
- **Railway**: They provide MongoDB add-ons
- **Heroku**: Use MongoDB Atlas add-on

### Option 3: Replit Database (Limited)
For simple development, you can use Replit's built-in database, but it requires code changes.

## Quick Setup Steps

### 1. Set up MongoDB Atlas
```bash
# 1. Go to https://cloud.mongodb.com
# 2. Create free account
# 3. Create new cluster
# 4. Create database user
# 5. Whitelist all IPs (0.0.0.0/0)
# 6. Get connection string
```

### 2. Add to Replit Secrets
```
Key: MONGODB_URI
Value: mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/rurident?retryWrites=true&w=majority
```

### 3. Restart Your Repl
Click the **Run** button or restart your repl to apply changes.

## Verification

### Success Indicators
✅ Console shows: `✅ Connected to MongoDB successfully`
✅ No more "Server unavailable, using mock data" messages
✅ Products and orders are saved to database

### Still Having Issues?
❌ Console shows: `❌ MongoDB connection failed`
- Check your connection string format
- Verify username/password are correct
- Ensure cluster allows connections from anywhere (0.0.0.0/0)
- Check if your MongoDB cluster is active

## Development vs Production

### Development (Current Setup)
- Falls back to localhost if no environment variable
- Shows helpful error messages
- Continues running without database

### Production Ready
- Always requires valid MONGODB_URI
- Proper error handling and logging
- Health checks for database connectivity

## Common Errors Fixed

1. **"option sslvalidate is not supported"** ✅ Fixed
2. **"MongoServerSelectionError"** ✅ Fixed by proper connection string
3. **"Server unavailable, using mock data"** ✅ Fixed with environment variables
4. **Module type conflicts** ✅ Fixed package.json

## Next Steps

1. Set up MongoDB Atlas account
2. Add MONGODB_URI to Replit secrets
3. Restart your repl
4. Verify connection in console logs

Your application will automatically switch from mock data to real database once connected!