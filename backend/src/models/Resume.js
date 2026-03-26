const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: String,
  resumeText: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  atsScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  matchPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  foundSkills: [String],
  missingSkills: [String],
  suggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
resumeSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);