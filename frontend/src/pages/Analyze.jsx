import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { uploadResume, analyzeResume } from '../services/resume';
import { 
  DocumentArrowUpIcon, 
  DocumentTextIcon, 
  XMarkIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Analyze = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    
    try {
      setLoading(true);
      const response = await uploadResume(selectedFile);
      setResumeText(response.resumeText);
      setStep(2);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024
  });

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please provide both resume and job description');
      return;
    }

    try {
      setLoading(true);
      const result = await analyzeResume({
        resumeText,
        jobDescription,
        fileName
      });
      navigate(`/result/${result.analysisId}`);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResumeText('');
    setFileName('');
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-3">
            Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume and paste a job description to get AI-powered insights
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                  step >= 1 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  1
                </div>
                <span className={`text-sm mt-2 ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  Upload Resume
                </span>
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                  step >= 2 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  2
                </div>
                <span className={`text-sm mt-2 ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  Job Description
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {step === 1 && (
            <div className="p-8">
              {!file ? (
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                    ${isDragActive 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4">
                    <DocumentArrowUpIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    Drag & drop or click to select
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Supported formats: PDF, DOCX (Max 10MB)
                  </p>
                  <button className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                    Choose File
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl">
                        <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{fileName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {loading ? 'Processing...' : 'Ready for analysis'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors"
                      disabled={loading}
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardDocumentIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Paste Job Description
                  </h3>
                </div>
                <textarea
                  rows="12"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                             outline-none transition-all 
                             bg-white dark:bg-gray-800 
                             text-gray-900 dark:text-white
                             placeholder:text-gray-400 dark:placeholder:text-gray-500
                             font-mono text-sm resize-y"
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !jobDescription.trim()}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
              <DocumentTextIcon className="h-5 w-5" />
              <span className="font-medium">Resume Tips</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use a clean, well-formatted resume. PDF format works best.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
              <ClipboardDocumentIcon className="h-5 w-5" />
              <span className="font-medium">Job Description</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paste the complete job description for accurate analysis.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
              <SparklesIcon className="h-5 w-5" />
              <span className="font-medium">AI Analysis</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our AI analyzes skills, ATS compatibility, and provides suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;