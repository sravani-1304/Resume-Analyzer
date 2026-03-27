const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('🔍 Testing with new user');
console.log('='.repeat(50));
console.log('URI:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'NOT SET');
console.log('');

if (!uri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connection successful!');
    console.log('Database:', mongoose.connection.name);
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    console.log('\n💡 Check:');
    console.log('   1. IP whitelist in Network Access');
    console.log('   2. Username and password in .env');
    console.log('   3. Cluster name');
    process.exit(1);
  });