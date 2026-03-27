const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sravaninalluri7_db_user:<Sravani@21>@cluster0.9lcp5od.mongodb.net/?appName=Cluster0';

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  console.log('📡 Connection URI:', MONGODB_URI);
  
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database name:', mongoose.connection.name);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Make sure MongoDB is installed');
    console.log('   2. Start MongoDB: mongod');
    console.log('   3. Check if port 27017 is available');
    console.log('   4. Verify the connection string in .env file');
  }
}

testConnection();