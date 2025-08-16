#!/bin/bash

echo "🚀 Starting RURIDENT E-Commerce Application..."
echo "=========================================="

# Check if MongoDB password is set
if grep -q "YOUR_ACTUAL_PASSWORD_HERE" .env 2>/dev/null || grep -q "YOUR_ACTUAL_PASSWORD_HERE" server/.env 2>/dev/null; then
    echo "⚠️  WARNING: Please update your MongoDB password in the .env files!"
    echo "    Replace 'YOUR_ACTUAL_PASSWORD_HERE' with your actual MongoDB password"
    echo "    Files to update: .env and server/.env"
    echo ""
fi

# Kill any existing processes on port 5000 and 3000
echo "🔧 Cleaning up existing processes..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || echo "Port 5000 is free"
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 is free"

echo "📦 Installing dependencies..."
npm install
cd server && npm install && cd ..

echo "🌐 Starting backend server on port 5000..."
cd server && node index.js &
SERVER_PID=$!
cd ..

echo "⏳ Waiting for server to start..."
sleep 3

echo "🎨 Starting frontend on port 3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started successfully!"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:5000"
echo ""
echo "To stop the application, press Ctrl+C"

# Wait for user to interrupt
wait $FRONTEND_PID