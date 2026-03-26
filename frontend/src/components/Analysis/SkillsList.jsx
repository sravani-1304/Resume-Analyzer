import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const SkillsList = ({ skills, type = 'found' }) => {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        {type === 'found' ? 'No matching skills found' : 'No missing skills - Great job!'}
      </p>
    );
  }

  const getSkillColor = (skill) => {
    // You can add logic to categorize skills by type
    const frontendSkills = ['React', 'React.js', 'ReactJS', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'Tailwind'];
    const backendSkills = ['Node.js', 'Node', 'NodeJS', 'Express', 'Python', 'Django', 'MongoDB'];
    const cloudSkills = ['AWS', 'Azure', 'GCP', 'Cloud'];
    
    if (frontendSkills.includes(skill)) return 'bg-blue-100 text-blue-800';
    if (backendSkills.includes(skill)) return 'bg-green-100 text-green-800';
    if (cloudSkills.includes(skill)) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="group relative"
        >
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getSkillColor(skill)}`}
          >
            {type === 'found' ? (
              <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <XCircleIcon className="h-4 w-4 mr-1 text-red-500" />
            )}
            {skill}
          </span>
          
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {type === 'found' ? '✓ You have this skill' : '✗ Add this skill'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsList;