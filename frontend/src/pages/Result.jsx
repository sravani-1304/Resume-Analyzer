import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysisById } from '../services/resume';
import { 
  ArrowLeftIcon, 
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ShareIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const Result = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  const loadAnalysis = async () => {
    try {
      const data = await getAnalysisById(id);
      setAnalysis(data);
    } catch (error) {
      console.error('Failed to load analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is well-optimized.';
    if (score >= 60) return 'Good, but there\'s room for improvement.';
    if (score >= 40) return 'Needs improvement.';
    return 'Needs significant improvement.';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center max-w-md">
          <DocumentTextIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analysis Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The analysis you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Analysis Result
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's how you stack up against the role
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <PrinterIcon className="h-4 w-4" />
                Print
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <ShareIcon className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* ATS Score Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ATS Score</h3>
              <ChartBarIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Resume Optimization</span>
                <span className={`text-3xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                  {analysis.atsScore}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(analysis.atsScore)}`}
                  style={{ width: `${analysis.atsScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{getScoreMessage(analysis.atsScore)}</p>
            </div>
          </div>

          {/* Skills Match Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Match</h3>
              <CheckCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Alignment with Job Requirements</span>
                <span className={`text-3xl font-bold ${getScoreColor(analysis.matchPercentage)}`}>
                  {analysis.matchPercentage}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full rounded-full bg-primary-500 transition-all duration-1000"
                  style={{ width: `${analysis.matchPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {analysis.matchPercentage >= 70 ? 'Strong match!' : 'Consider adding more relevant skills.'}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section - Found and Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Found Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skills Found ({analysis.foundSkills?.length || 0})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto">
              {analysis.foundSkills && analysis.foundSkills.length > 0 ? (
                analysis.foundSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center w-full py-8">No matching skills found</p>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircleIcon className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Missing Skills ({analysis.missingSkills?.length || 0})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto">
              {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-green-600 dark:text-green-400 text-center w-full py-8">Great job! No missing skills!</p>
              )}
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <LightBulbIcon className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Improvement Suggestions ({analysis.suggestions?.length || 0})
            </h3>
          </div>
          
          {analysis.suggestions && analysis.suggestions.length > 0 ? (
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800"
                >
                  <div className="flex-shrink-0 w-7 h-7 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No suggestions - Your resume looks great!
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Found Skills</p>
            <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">{analysis.foundSkills?.length || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Missing Skills</p>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400">{analysis.missingSkills?.length || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Suggestions</p>
            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{analysis.suggestions?.length || 0}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link to="/analyze">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5" />
              New Analysis
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;