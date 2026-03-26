const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testEndpoints() {
  try {
    // Test if server is running
    const testResponse = await axios.get('http://localhost:5000/api/test');
    console.log('✅ Server test:', testResponse.data);

    // Test forgot password endpoint
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email: 'test@example.com'
    });
    console.log('✅ Forgot password endpoint:', response.data);
    
  } catch (error) {
    console.error('❌ Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
  }
}

testEndpoints();