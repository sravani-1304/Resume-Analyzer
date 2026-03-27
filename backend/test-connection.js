const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Atlas Connection');
console.log('='.repeat(50));

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

// Show URI with hidden password
const hiddenUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log('📡 Connecting to:', hiddenUri);
console.log('');

// Test the connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected successfully!');
  console.log('📊 Database:', mongoose.connection.name);
  console.log('📍 Host:', mongoose.connection.host);
  console.log('');
  console.log('🎉 Your MongoDB Atlas is working!');
  mongoose.disconnect();
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection failed:', err.message);
  console.log('');
  console.log('💡 Troubleshooting:');
  console.log('   1. Make sure password is URL encoded: Sravani%4021');
  console.log('   2. Check if IP is whitelisted in MongoDB Atlas');
  console.log('   3. Verify username is correct: sravaninalluri7_db_user');
  console.log('');
  console.log('🔧 Quick fix: Add your IP to whitelist');
  console.log('   Go to MongoDB Atlas → Network Access → Add IP Address → 0.0.0.0/0');
  process.exit(1);
});