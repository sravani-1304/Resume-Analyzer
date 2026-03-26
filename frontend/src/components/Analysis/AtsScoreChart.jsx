import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const AtsScoreChart = ({ score, title = 'ATS Score', subtitle = 'Overall Resume Optimization' }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    if (score >= 40) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is well-optimized.';
    if (score >= 60) return 'Good, but there\'s room for improvement.';
    if (score >= 40) return 'Needs improvement.';
    return 'Needs significant improvement.';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ChartBarIcon className="h-6 w-6 text-gray-400" />
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              {subtitle}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-gray-200">
          <div
            style={{ width: `${score}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500 ${getProgressColor(score)}`}
          />
        </div>
        
        {/* Score interpretation */}
        <p className="text-sm text-gray-600 mt-2">{getScoreMessage(score)}</p>
        
        {/* Score breakdown (optional) */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
            <span>Skills Match (40%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
            <span>Keywords (25%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-600 mr-2"></div>
            <span>Length (15%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
            <span>Sections (20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsScoreChart;