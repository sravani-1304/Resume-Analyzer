import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  LightBulbIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const RealTimeAnalysis = ({ analysis, loading }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (analysis?.ats_score) {
      const duration = 1000;
      const steps = 60;
      const increment = analysis.ats_score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= analysis.ats_score) {
          setAnimatedScore(analysis.ats_score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [analysis]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">AI</span>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-600">Analyzing your resume...</p>
        <p className="text-sm text-gray-400">This may take a few seconds</p>
      </div>
    );
  }

  if (!analysis) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent match!';
    if (score >= 60) return 'Good match';
    if (score >= 40) return 'Fair match';
    return 'Needs improvement';
  };

  return (
    <div className="space-y-8">
      {/* Header with job category */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm">Detected Job Category</p>
            <h2 className="text-3xl font-bold capitalize">{analysis.category}</h2>
            <p className="text-indigo-100 mt-1">
              Confidence: {analysis.category_confidence}%
            </p>
          </div>
          <BriefcaseIcon className="h-16 w-16 text-white opacity-50" />
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ATS Score */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
            <ChartBarIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={animatedScore}
                text={`${animatedScore}%`}
                styles={buildStyles({
                  textSize: '20px',
                  pathColor: getScoreColor(animatedScore),
                  textColor: getScoreColor(animatedScore),
                })}
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="text-2xl font-bold" style={{ color: getScoreColor(animatedScore) }}>
                {getScoreMessage(animatedScore)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Based on skill match, format, and readability
              </p>
            </div>
          </div>
        </div>

        {/* Skills Match */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills Match</h3>
            <AcademicCapIcon className="h-6 w-6 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={analysis.match_percentage}
                text={`${analysis.match_percentage}%`}
                styles={buildStyles({
                  textSize: '20px',
                  pathColor: '#10b981',
                  textColor: '#10b981',
                })}
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="text-2xl font-bold text-green-600">
                {analysis.found_skills.length} / {analysis.found_skills.length + analysis.missing_skills.length} skills
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {analysis.found_skills.length} matching skills found
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Analysis Time</h3>
            <ClockIcon className="h-6 w-6 text-purple-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-purple-600">
              {analysis.analysis_time_ms}ms
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Real-time</p>
              {analysis.cached && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Cached
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            Found Skills ({analysis.found_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2">
            {analysis.found_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            Missing Skills ({analysis.missing_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2">
            {analysis.missing_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section Completeness */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Structure</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analysis.section_completeness).map(([section, present]) => (
            <div
              key={section}
              className={`p-3 rounded-lg border ${
                present
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize text-sm">{section.replace('_', ' ')}</span>
                {present ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
          Smart Suggestions
        </h3>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => {
            const priority = index < 2 ? 'high' : index < 4 ? 'medium' : 'low';
            const priorityColors = {
              high: 'border-l-4 border-red-500 bg-red-50',
              medium: 'border-l-4 border-yellow-500 bg-yellow-50',
              low: 'border-l-4 border-blue-500 bg-blue-50',
            };
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg ${priorityColors[priority]}`}
              >
                <p className="text-gray-800">{suggestion}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Format & Readability Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Format Score</h3>
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: `${analysis.format_score}%` }}
              ></div>
            </div>
            <span className="ml-3 text-lg font-semibold text-indigo-600">
              {analysis.format_score}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Readability Score</h3>
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-purple-600 rounded-full"
                style={{ width: `${analysis.readability_score}%` }}
              ></div>
            </div>
            <span className="ml-3 text-lg font-semibold text-purple-600">
              {analysis.readability_score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalysis;