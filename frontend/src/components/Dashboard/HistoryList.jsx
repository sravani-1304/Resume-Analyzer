import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const HistoryList = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">No analysis history found</p>
        <p className="text-gray-400 mb-6">Start your first analysis to see results here</p>
        <Link to="/analyze" className="btn-primary inline-flex">
          Start your first analysis
        </Link>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <Link
          key={item._id}
          to={`/result/${item._id}`}
          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <DocumentTextIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {item.fileName || `Analysis #${history.length - index}`}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xs text-gray-500">ATS Score</p>
                <p className={`text-lg font-semibold ${getScoreColor(item.atsScore)}`}>
                  {item.atsScore}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Match</p>
                <p className="text-lg font-semibold text-indigo-600">{item.matchPercentage}%</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HistoryList;