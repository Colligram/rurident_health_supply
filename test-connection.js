const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB URI from environment or use placeholder
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

console.log('🔍 Testing MongoDB Connection...');
console.log('Connection string:', MONGODB_URI ? MONGODB_URI.replace(/:[^:@]*@/, ':***@') : 'Not found');

if (!MONGODB_URI) {
    console.log('❌ No MongoDB URI found in environment variables');
    console.log('Please make sure .env file exists with MONGODB_URI');
    process.exit(1);
}

if (MONGODB_URI.includes('YOUR_ACTUAL_PASSWORD_HERE')) {
    console.log('❌ Please replace YOUR_ACTUAL_PASSWORD_HERE with your actual MongoDB password');
    console.log('Update the .env and server/.env files');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    console.log('🎉 Your database connection is working properly');
    process.exit(0);
})
.catch((error) => {
    console.log('❌ Failed to connect to MongoDB:');
    console.log('Error:', error.message);
    console.log('');
    console.log('💡 Possible solutions:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your MongoDB password is correct');
    console.log('3. Make sure your MongoDB cluster is running');
    console.log('4. Check if your IP is whitelisted in MongoDB Atlas');
    process.exit(1);
});