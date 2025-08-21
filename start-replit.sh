#!/bin/bash

# Replit Startup Script
# This script ensures proper environment setup for Replit deployment

echo "🚀 Starting Rurident E-commerce Application on Replit..."

# Check if we're in Replit
if [ -n "$REPL_ID" ] || [ -n "$REPL_SLUG" ]; then
    echo "✅ Detected Replit environment"
    echo "🔧 REPL_ID: $REPL_ID"
    echo "🔧 REPL_SLUG: $REPL_SLUG"
    echo "🔧 REPL_OWNER: $REPL_OWNER"
    
    # Set default port if not provided
    if [ -z "$PORT" ]; then
        export PORT=5000
        echo "🔧 Set default PORT to $PORT"
    fi
    
    # Set MongoDB URI if not provided (use in-memory for Replit)
    if [ -z "$MONGODB_URI" ] && [ -z "$MONGO_URL" ]; then
        echo "🔧 Using in-memory MongoDB (no external connection configured)"
    fi
else
    echo "ℹ️  Local development environment detected"
fi

echo "🔧 Starting server on port $PORT..."

# Start the server
node server/index.js