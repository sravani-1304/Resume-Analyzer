const Resume = require('../models/Resume');
const { extractText, extractTextFromBuffer, isSupportedFile } = require('../utils/textExtractor');
const { analyzeWithAI } = require('../services/aiService');
const fs = require('fs').promises;

// @desc    Upload resume file and extract text
// @route   POST /api/resume/upload
const uploadResume = async (req, res) => {
  try {
    console.log('📁 Upload request received');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log(`📄 File received: ${req.file.originalname}`);
    console.log(`📏 File size: ${req.file.size} bytes`);
    console.log(`🔍 File type: ${req.file.mimetype}`);

    // Check if file format is supported
    if (!isSupportedFile(req.file.originalname)) {
      console.log('❌ Unsupported file format');
      await fs.unlink(req.file.path).catch(err => console.error('Error deleting file:', err));
      return res.status(400).json({ 
        message: 'Unsupported file format. Please upload PDF or DOCX files only.' 
      });
    }

    // Extract text from the uploaded file
    console.log('🔍 Extracting text from file...');
    const resumeText = await extractText(req.file.path);
    
    if (!resumeText || resumeText.trim().length === 0) {
      console.log('❌ No text could be extracted from the file');
      return res.status(400).json({ 
        message: 'No text could be extracted from the file. Please ensure the file contains readable text.' 
      });
    }

    console.log(`✅ Text extracted successfully: ${resumeText.length} characters`);
    console.log('📝 Preview:', resumeText.substring(0, 200).replace(/\n/g, ' '));

    // Send preview back to client
    res.json({ 
      message: 'File uploaded and text extracted successfully',
      fileName: req.file.originalname,
      resumeText: resumeText, // Send full text for analysis
      preview: resumeText.substring(0, 500) // Send preview for display
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      await fs.unlink(req.file.path).catch(err => console.error('Error deleting file:', err));
    }
    
    res.status(500).json({ 
      message: error.message || 'Failed to process resume upload' 
    });
  }
};

// @desc    Analyze resume against job description
// @route   POST /api/resume/analyze
const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription, fileName } = req.body;

    console.log('🔍 Analysis request received');
    console.log(`📄 Resume text length: ${resumeText?.length || 0} chars`);
    console.log(`📋 Job description length: ${jobDescription?.length || 0} chars`);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ 
        message: 'Resume text is required' 
      });
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ 
        message: 'Job description is required' 
      });
    }

    // Call AI service
    console.log('🤖 Calling AI service...');
    const analysisResult = await analyzeWithAI(resumeText, jobDescription);
    
    console.log('✅ AI analysis complete');
    console.log(`📊 ATS Score: ${analysisResult.ats_score}`);
    console.log(`📊 Match %: ${analysisResult.match_percentage}`);
    console.log(`🔍 Found skills: ${analysisResult.found_skills?.length || 0}`);
    console.log(`❌ Missing skills: ${analysisResult.missing_skills?.length || 0}`);

    // Save to database
    const resume = await Resume.create({
      userId: req.user._id,
      fileName: fileName || 'Resume.pdf',
      originalName: fileName,
      resumeText: resumeText.substring(0, 10000), // Store truncated version
      jobDescription: jobDescription.substring(0, 5000),
      atsScore: analysisResult.ats_score || 0,
      matchPercentage: analysisResult.match_percentage || 0,
      foundSkills: analysisResult.found_skills || [],
      missingSkills: analysisResult.missing_skills || [],
      suggestions: analysisResult.suggestions || []
    });

    console.log(`💾 Analysis saved to database with ID: ${resume._id}`);

    res.json({
      ...analysisResult,
      analysisId: resume._id
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to analyze resume' 
    });
  }
};

// @desc    Get user's analysis history
// @route   GET /api/resume/history
const getHistory = async (req, res) => {
  try {
    const history = await Resume.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('fileName atsScore matchPercentage createdAt');
    
    res.json(history);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

// @desc    Get specific analysis by ID
// @route   GET /api/resume/:id
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json(analysis);
  } catch (error) {
    console.error('Analysis fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch analysis' });
  }
};

module.exports = {
  uploadResume,
  analyzeResume,
  getHistory,
  getAnalysisById
};