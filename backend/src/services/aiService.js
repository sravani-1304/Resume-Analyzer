const axios = require('axios');

const analyzeWithAI = async (resumeText, jobDescription) => {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/analyze`, {
      resume_text: resumeText,
      job_description: jobDescription
    }, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('AI Service Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('AI service is not running. Please start the Python service on port 8000');
    }
    
    throw new Error(`Failed to analyze resume with AI service: ${error.message}`);
  }
};

module.exports = { analyzeWithAI };