import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, HeartIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ResumeAI - AI-Powered Resume Analyzer
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <a href="#features" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              Features
            </a>
            <a href="#about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              About
            </a>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 text-red-500" />
            <span>for job seekers</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;