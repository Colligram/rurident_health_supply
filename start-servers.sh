#!/bin/bash

echo "🚀 Starting RURIDENT E-Commerce Application..."
echo "=========================================="

# Function to check if a port is in use
check_port() {
    netstat -tuln 2>/dev/null | grep ":$1 " > /dev/null
    return $?
}

# Function to wait for server to start
wait_for_server() {
    local port=$1
    local service=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service to start on port $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if check_port $port; then
            echo "✅ $service is running on port $port"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service failed to start on port $port after $max_attempts seconds"
    return 1
}

# Check if MongoDB password is set
if grep -q "YOUR_ACTUAL_PASSWORD_HERE" .env 2>/dev/null || grep -q "YOUR_ACTUAL_PASSWORD_HERE" server/.env 2>/dev/null; then
    echo "⚠️  WARNING: MongoDB password not set!"
    echo "    Replace 'YOUR_ACTUAL_PASSWORD_HERE' with your actual MongoDB password"
    echo "    Files to update: .env and server/.env"
    echo "    The app will use mock data until MongoDB is connected."
    echo ""
fi

# Kill existing processes
echo "🔧 Stopping existing servers..."
pkill -f "node.*index.js" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Wait a bit for processes to stop
sleep 2

echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo "🌐 Starting backend server..."
cd server
node index.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
if wait_for_server 5000 "Backend"; then
    echo "🎨 Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    if wait_for_server 3000 "Frontend"; then
        echo ""
        echo "🎉 Both servers started successfully!"
        echo "   📱 Frontend: http://localhost:3000"
        echo "   🔌 Backend:  http://localhost:5000"
        echo ""
        echo "💡 If you see 'Server unavailable', update your MongoDB password in .env files"
        echo "   Then run: node test-connection.mjs"
        echo ""
        echo "Press Ctrl+C to stop both servers"
        
        # Keep the script running
        wait $FRONTEND_PID
    else
        echo "❌ Frontend failed to start"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "❌ Backend failed to start"
    exit 1
fi