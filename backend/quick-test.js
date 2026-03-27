const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sravaninalluri7_db_user:<Sravani@21>@cluster0.9lcp5od.mongodb.net/?appName=Cluster0';

async function quickTest() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('test');
    const collections = await db.listCollections().toArray();
    console.log('📁 Available databases:', collections);
    
    await client.close();
    console.log('🔌 Connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️ MongoDB is not running. Please start MongoDB first.');
  }
}

quickTest();