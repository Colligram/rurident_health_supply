# 🚀 RURIDENT E-Commerce Setup Instructions

## ✅ **GOOD NEWS: Your Application is Now Running!**

Both your frontend and backend servers are now running properly:
- **Frontend**: http://localhost:3000 ✅
- **Backend**: http://localhost:5000 ✅  
- **Proxy Error**: FIXED ✅

## ⚠️ **One Last Step: Set Your MongoDB Password**

Your servers are working, but you'll see "Server unavailable, using mock data" until you connect to MongoDB.

### Step 1: Update MongoDB Password
1. Open the file `.env` (in the main folder)
2. Find this line: `MONGODB_URI=mongodb+srv://RURIDENT:YOUR_ACTUAL_PASSWORD_HERE@rurident01...`
3. Replace `YOUR_ACTUAL_PASSWORD_HERE` with your actual MongoDB password
4. Do the same in `server/.env` file

### Step 2: Get Your MongoDB Password
If you don't know your MongoDB password:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in to your account
3. Go to "Database Access" in the left menu
4. Find the user "RURIDENT" and click "Edit"
5. Either view your password or create a new one
6. Copy the password and paste it in the .env files

### Step 3: Test Your Connection
```bash
node test-connection.mjs
```

### Step 4: Restart Servers (Optional)
If you want to restart both servers:
```bash
./start-servers.sh
```

## 🎯 **Current Status**
- ✅ Frontend running on http://localhost:3000
- ✅ Backend running on http://localhost:5000  
- ✅ Proxy connection working (no more ECONNREFUSED error)
- ⏳ MongoDB connection pending (needs password)

## 🌐 **Access Your Website**
**Your website is live at: http://localhost:3000**

## 🔧 **Available Scripts**

### Quick Start Options:
```bash
# Option 1: Improved startup script (recommended)
./start-servers.sh

# Option 2: Original simple script
./start.sh

# Option 3: Manual start
cd server && node index.js &    # Backend
npm run dev                     # Frontend
```

### Testing:
```bash
# Test MongoDB connection
node test-connection.mjs

# Test backend API
curl http://localhost:5000/api/products

# Test frontend
curl http://localhost:3000
```

## ✅ **Success Indicators**
- ✅ No more "http proxy error" or "ECONNREFUSED" 
- ✅ Website loads at http://localhost:3000
- ⏳ "✅ Connected to MongoDB successfully" (after password update)
- ⏳ Products load from database instead of mock data

## 🆘 **If You Still Have Issues**
1. Both servers should be running - check http://localhost:3000
2. If you need to restart: `./start-servers.sh`
3. For MongoDB issues: update password then run `node test-connection.mjs`

**Your application is working! Just add the MongoDB password to get live data! 🎉**