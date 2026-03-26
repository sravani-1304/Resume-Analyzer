const axios = require('axios');

async function testAnalysisFlow() {
  console.log('🔍 Testing Analysis Flow...');
  console.log('='.repeat(50));

  // Test 1: Python AI Service
  try {
    console.log('\n1. Testing Python AI Service...');
    const health = await axios.get('http://localhost:8000/health');
    console.log('✅ Python AI is running:', health.data);
  } catch (error) {
    console.log('❌ Python AI is NOT running. Start it with: cd python-ai && python run.py');
    return;
  }

  // Test 2: Python AI Analysis
  try {
    console.log('\n2. Testing Python AI Analysis...');
    const analysis = await axios.post('http://localhost:8000/analyze', {
      resume_text: "Experienced developer with React, Node.js, and MongoDB skills. Built multiple full-stack applications.",
      job_description: "Looking for a Full Stack Developer with React, Node.js, and database experience."
    });
    console.log('✅ Python AI Analysis successful:');
    console.log('   ATS Score:', analysis.data.ats_score);
    console.log('   Match %:', analysis.data.match_percentage);
    console.log('   Found Skills:', analysis.data.found_skills);
    console.log('   Missing Skills:', analysis.data.missing_skills);
  } catch (error) {
    console.log('❌ Python AI Analysis failed:', error.message);
  }

  // Test 3: Create a test user (if doesn't exist)
  console.log('\n3. Creating test user...');
  try {
    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    };
    
    const register = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ Test user created successfully');
    console.log('   Email:', register.data.email);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('⚠️ Test user already exists (this is fine)');
    } else {
      console.log('❌ Failed to create test user:', error.response?.data || error.message);
    }
  }

  // Test 4: Login with test user
  console.log('\n4. Testing Login...');
  let token;
  try {
    const login = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    token = login.data.token;
    console.log('✅ Login successful, got token');
    console.log('   User:', login.data.name);
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    return;
  }

  // Test 5: Upload resume (simulated)
  console.log('\n5. Testing Resume Upload (simulated)...');
  try {
    // In a real scenario, you'd upload a file
    // Here we'll just simulate having resume text
    console.log('✅ Ready to upload (simulated)');
  } catch (error) {
    console.log('❌ Upload preparation failed:', error.message);
  }

  // Test 6: Analyze through backend
  console.log('\n6. Testing Backend Analysis API...');
  try {
    const analysis = await axios.post('http://localhost:5000/api/resume/analyze', 
      {
        resumeText: "Experienced developer with React, Node.js, and MongoDB skills. Built multiple full-stack applications using the MERN stack. Proficient in JavaScript, HTML, CSS, and REST APIs.",
        jobDescription: "Looking for a Full Stack Developer with React, Node.js, and database experience. Must know JavaScript and REST APIs.",
        fileName: "test-resume.pdf"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    console.log('✅ Backend Analysis successful!');
    console.log('   ATS Score:', analysis.data.ats_score);
    console.log('   Match %:', analysis.data.match_percentage);
    console.log('   Found Skills:', analysis.data.found_skills);
    console.log('   Missing Skills:', analysis.data.missing_skills);
    console.log('   Suggestions:', analysis.data.suggestions);
    
  } catch (error) {
    console.log('❌ Backend Analysis failed:');
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Message:', error.response.data);
    } else {
      console.log('   Error:', error.message);
    }
  }
}

// Run the test
testAnalysisFlow();