const mongoose = require('mongoose');
require('dotenv').config();

async function testCloudConnection() {
  console.log('🔍 Testing MongoDB Cloud Connection...');
  console.log('=================================');
  
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in .env file');
    console.log('\n💡 Please add your MongoDB Atlas URI to .env file:');
    console.log('MONGODB_URI=mongodb+srv://sravaninalluri7_db_user:<Sravani@21>@cluster0.9lcp5od.mongodb.net/?appName=Cluster0');
    return;
  }
  
  console.log('📡 Connection URI:', MONGODB_URI.replace(/:\/\/.*@/, '://***:***@')); // Hide credentials
  console.log('');
  
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };
  
  try {
    console.log('🔌 Attempting to connect...');
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ Connected successfully!');
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('📍 Host:', mongoose.connection.host);
    
    // Test database operations
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Write operation successful');
    
    const result = await testCollection.findOne({ test: true });
    console.log('✅ Read operation successful');
    
    await testCollection.deleteOne({ test: true });
    console.log('✅ Delete operation successful');
    
    console.log('\n🎉 All tests passed! Your cloud MongoDB is working perfectly.');
    
    await mongoose.disconnect();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Common issues with MongoDB Atlas:');
    console.log('   1. Network Access: Add your IP to the whitelist');
    console.log('      - Go to MongoDB Atlas → Network Access → Add IP Address');
    console.log('      - Add 0.0.0.0/0 for testing (or your specific IP)');
    console.log('');
    console.log('   2. Database User: Check username and password');
    console.log('      - Go to Database Access → Edit user → Reset password if needed');
    console.log('');
    console.log('   3. Connection String: Verify it\'s correct');
    console.log('      - Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>');
    console.log('');
    console.log('   4. Cluster: Make sure cluster is active and not paused');
    console.log('');
  }
}

testCloudConnection();