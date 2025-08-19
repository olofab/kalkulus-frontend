// Simple test of API functionality
const axios = require('axios');

const API_URL = 'http://localhost:8081';

async function testApiConnection() {
  console.log('Testing API connection to:', API_URL);

  try {
    // Test /api/offers endpoint (should return 401 without auth)
    const response = await axios.get(`${API_URL}/api/offers`, {
      timeout: 10000,
      validateStatus: function (status) {
        return status < 500; // Accept all status codes under 500
      }
    });

    console.log('✅ API connection successful!');
    console.log('Status:', response.status);
    console.log('Response headers:', response.headers);

    if (response.status === 401) {
      console.log('✅ Expected 401 response (authentication required)');
      return true;
    } else {
      console.log('Response data:', response.data);
      return true;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Connection refused - backend might be down');
    } else if (error.message.includes('CORS')) {
      console.log('❌ CORS error detected');
    } else {
      console.log('❌ API connection failed:', error.message);
    }
    return false;
  }
}

testApiConnection().then(success => {
  console.log('Test completed:', success ? 'SUCCESS' : 'FAILED');
}).catch(error => {
  console.error('Test error:', error);
});
