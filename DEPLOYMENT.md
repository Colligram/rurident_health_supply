# Deployment Guide

## Overview
This guide covers deploying the Rurident E-commerce application to different platforms.

## Replit Deployment

### 1. Automatic Setup
- Replit automatically detects the Node.js environment
- The application will use the `PORT` environment variable provided by Replit
- MongoDB will fall back to in-memory database if no external connection is configured

### 2. Environment Variables (Optional)
If you want to use external MongoDB, set these in Replit:
```
MONGODB_URI=your-mongodb-connection-string
VITE_ENCRYPTION_KEY=your-secure-key
```

### 3. Startup
- Use the "Run" button in Replit
- Or run: `./start-replit.sh`
- The server will automatically start on the correct port

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Start Backend Server (in another terminal)
```bash
npm run server
```

### 4. Or Start Both Together
```bash
npm run dev:full
```

## Environment Configuration

### Required Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string (optional, falls back to in-memory)

### Frontend Variables
- `VITE_ENCRYPTION_KEY`: Encryption key for security functions

## Troubleshooting

### Common Issues

1. **"process is not defined"**
   - ✅ Fixed: Added process polyfill and Vite configuration

2. **"ECONNREFUSED 127.0.0.1:5000"**
   - ✅ Fixed: Dynamic backend URL detection for different environments

3. **"Identifier 'now' has already been declared"**
   - ✅ Fixed: Removed duplicate variable declarations

4. **MongoDB Connection Issues**
   - ✅ Fixed: Automatic fallback to in-memory database

### Port Configuration
- **Local**: Uses port 5000 for backend, 3000 for frontend
- **Replit**: Uses `process.env.PORT` (automatically provided)
- **Other platforms**: Detected automatically via environment variables

## Platform-Specific Notes

### Replit
- ✅ Automatic port detection
- ✅ In-memory MongoDB fallback
- ✅ HTTPS proxy configuration
- ✅ Environment variable detection

### Vercel
- Set `VERCEL_URL` environment variable
- Frontend-only deployment (backend needs separate hosting)

### Netlify
- Set `NETLIFY_URL` environment variable
- Frontend-only deployment (backend needs separate hosting)

## Security Notes
- Encryption keys should be unique per deployment
- MongoDB connection strings should use authentication
- Environment variables are automatically handled by Vite