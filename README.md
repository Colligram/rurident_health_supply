# Rurident Health Supplies

## Setup

1. **Create a `.env` file in the project root:**
   - Copy `.env.example` to `.env` and fill in your MongoDB URI.
   - For local MongoDB:
     ```
     MONGODB_URI=mongodb://localhost:27017/rurident_health_supplies
     ```
   - For MongoDB Atlas (replace with your credentials):
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rurident_health_supplies?retryWrites=true&w=majority
     ```

2. **If you see SSL/TLS errors:**
   - Make sure your Atlas cluster allows your IP and you use the correct URI.
   - Do NOT add unsupported options like `sslValidate=false`.
   - If using local MongoDB, use the `mongodb://localhost:27017/...` format.

3. **Start the server:**
   ```
   npm run server
   ```

If MongoDB is not available, the app will use in-memory storage (data will not persist).
