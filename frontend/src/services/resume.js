import api from './api';

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('✅ Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};

export const analyzeResume = async (data) => {
  try {
    console.log('📤 Sending for analysis:', data);
    const response = await api.post('/resume/analyze', data);
    console.log('✅ Analysis response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Analysis error:', error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/resume/history');
    return response.data;
  } catch (error) {
    console.error('❌ History error:', error);
    throw error;
  }
};

export const getAnalysisById = async (id) => {
  try {
    const response = await api.get(`/resume/${id}`);
    console.log('✅ Got analysis:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get analysis error:', error);
    throw error;
  }
};