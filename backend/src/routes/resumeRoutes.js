const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { upload, handleMulterError } = require('../middleware/uploadMiddleware');
const {
  uploadResume,
  analyzeResume,
  getHistory,
  getAnalysisById
} = require('../controllers/resumeController');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Upload resume - single file with field name 'resume'
router.post('/upload', upload.single('resume'), handleMulterError, uploadResume);

// Analyze resume
router.post('/analyze', analyzeResume);

// Get history
router.get('/history', getHistory);

// Get specific analysis
router.get('/:id', getAnalysisById);

module.exports = router;