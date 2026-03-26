import React from 'react';
import { LightBulbIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Suggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <LightBulbIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No suggestions - Your resume looks great!</p>
      </div>
    );
  }

  // Categorize suggestions
  const categorizedSuggestions = {
    critical: [],
    skills: [],
    format: [],
    general: []
  };

  suggestions.forEach(suggestion => {
    const lower = suggestion.toLowerCase();
    if (lower.includes('missing') || lower.includes('add these key')) {
      categorizedSuggestions.critical.push(suggestion);
    } else if (lower.includes('skill') || lower.includes('technolog')) {
      categorizedSuggestions.skills.push(suggestion);
    } else if (lower.includes('section') || lower.includes('length') || lower.includes('word')) {
      categorizedSuggestions.format.push(suggestion);
    } else {
      categorizedSuggestions.general.push(suggestion);
    }
  });

  const getPriorityColor = (type) => {
    switch(type) {
      case 'critical': return 'border-l-4 border-red-500 bg-red-50';
      case 'skills': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'format': return 'border-l-4 border-blue-500 bg-blue-50';
      default: return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const getPriorityIcon = (type) => {
    switch(type) {
      case 'critical': return '🔴';
      case 'skills': return '🟡';
      case 'format': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Improvement Suggestions ({suggestions.length})
          </h3>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh suggestions"
        >
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Critical suggestions */}
        {categorizedSuggestions.critical.map((suggestion, index) => (
          <div 
            key={`critical-${index}`}
            className={`p-4 rounded-lg ${getPriorityColor('critical')} animate-pulse`}
          >
            <div className="flex items-start">
              <span className="text-lg mr-3">{getPriorityIcon('critical')}</span>
              <div>
                <p className="font-semibold text-red-800 mb-1">High Priority</p>
                <p className="text-red-700">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Skills suggestions */}
        {categorizedSuggestions.skills.map((suggestion, index) => (
          <div 
            key={`skills-${index}`}
            className={`p-4 rounded-lg ${getPriorityColor('skills')}`}
          >
            <div className="flex items-start">
              <span className="text-lg mr-3">{getPriorityIcon('skills')}</span>
              <div>
                <p className="font-semibold text-yellow-800 mb-1">Skills Improvement</p>
                <p className="text-yellow-700">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Format suggestions */}
        {categorizedSuggestions.format.map((suggestion, index) => (
          <div 
            key={`format-${index}`}
            className={`p-4 rounded-lg ${getPriorityColor('format')}`}
          >
            <div className="flex items-start">
              <span className="text-lg mr-3">{getPriorityIcon('format')}</span>
              <div>
                <p className="font-semibold text-blue-800 mb-1">Format Improvement</p>
                <p className="text-blue-700">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}

        {/* General suggestions */}
        {categorizedSuggestions.general.map((suggestion, index) => (
          <div 
            key={`general-${index}`}
            className={`p-4 rounded-lg ${getPriorityColor('general')}`}
          >
            <div className="flex items-start">
              <span className="text-lg mr-3">{getPriorityIcon('general')}</span>
              <p className="text-gray-700">{suggestion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action items summary */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold text-indigo-900 mb-2">Quick Actions:</h4>
        <ul className="space-y-2 text-sm text-indigo-800">
          {categorizedSuggestions.critical.length > 0 && (
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Address {categorizedSuggestions.critical.length} high-priority items
            </li>
          )}
          {categorizedSuggestions.skills.length > 0 && (
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Add {categorizedSuggestions.skills.length} missing skills
            </li>
          )}
          {categorizedSuggestions.format.length > 0 && (
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Improve {categorizedSuggestions.format.length} formatting issues
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;