const axios = require('axios');

async function testRegister() {
  try {
    console.log('📝 Testing Registration...');
    
    // Test registration
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'password123'
    });
    
    console.log('✅ Registration Success!');
    console.log('Response:', registerResponse.data);
    
    // Test login with same credentials
    console.log('\n🔑 Testing Login...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: registerResponse.data.email,
      password: 'password123'
    });
    
    console.log('✅ Login Success!');
    console.log('Response:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️ Backend server is not running on port 5000');
    }
  }
}

testRegister();