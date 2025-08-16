# 🚀 RURIDENT E-Commerce Setup Instructions

## ⚠️ IMPORTANT: Set Your MongoDB Password First!

Before running the application, you need to set your MongoDB password:

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
6. Copy the password and paste it in the .env files (replace `YOUR_ACTUAL_PASSWORD_HERE`)

## 🎯 Quick Start

### Option 1: Simple Start (Recommended)
Run this single command:
```bash
./start.sh
```

### Option 2: Manual Start
If the script doesn't work, run these commands one by one:
```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Start backend (in one terminal)
cd server && node index.js

# Start frontend (in another terminal)
npm run dev
```

## 🌐 Access Your Website
- **Frontend (Your Website)**: http://localhost:3000
- **Backend (API)**: http://localhost:5000

## 🔧 Troubleshooting

### If you see "Server unavailable, using mock data":
1. Make sure you've updated the MongoDB password in both .env files
2. Check that your internet connection is working
3. Verify your MongoDB Atlas cluster is running

### If ports are busy:
- The start script will automatically kill existing processes
- Or manually run: `lsof -ti:5000 | xargs kill -9` and `lsof -ti:3000 | xargs kill -9`

### If you get permission errors:
```bash
chmod +x start.sh
```

## 📁 File Structure
```
/workspace/
├── .env                 (Main environment file - UPDATE PASSWORD HERE)
├── start.sh            (Start script)
├── package.json        (Frontend dependencies)
├── server/
│   ├── .env           (Server environment file - UPDATE PASSWORD HERE)
│   ├── index.js       (Backend server)
│   └── package.json   (Backend dependencies)
└── src/               (Frontend code)
```

## ✅ Success Indicators
When everything is working, you should see:
- "✅ Connected to MongoDB successfully" in the terminal
- Your website loads at http://localhost:3000
- No "Server unavailable" messages on the website

Need help? The application will show clear error messages if something is wrong!