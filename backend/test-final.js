const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Connection');
console.log('='.repeat(60));

if (!uri) {
  console.error('❌ MONGODB_URI not found');
  process.exit(1);
}

// Show URI with hidden credentials
const hiddenUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//username:****@');
console.log('📡 URI:', hiddenUri);
console.log('');

// Extract username for debugging
const userMatch = uri.match(/\/\/([^:]+):/);
if (userMatch) {
  console.log('👤 Username being used:', userMatch[1]);
}
console.log('');

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
});

async function test() {
  try {
    console.log('🔄 Connecting...');
    await client.connect();
    console.log('✅ Connection successful!');
    
    const db = client.db('resume-analyzer');
    console.log('📊 Database:', db.databaseName);
    
    // Test a simple operation
    await db.command({ ping: 1 });
    console.log('✅ Ping successful');
    
    await client.close();
    console.log('\n🎉 Your connection is working!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Solutions:');
    console.log('   1. Check username in MongoDB Atlas → Database Access');
    console.log('   2. Reset password for the user');
    console.log('   3. Use the exact username from Database Access');
    console.log('   4. Make sure IP is whitelisted in Network Access');
  }
}

test();