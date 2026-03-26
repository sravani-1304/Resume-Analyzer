import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ClockIcon,
  RocketLaunchIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  const features = [
    {
      icon: CloudArrowUpIcon,
      title: "Resume Upload",
      description: "Upload your resume in PDF or DOCX format. The system extracts text for analysis.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Job Description",
      description: "Paste the job description you want to compare against your resume.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: ChartBarIcon,
      title: "ATS Score",
      description: "Get a score showing how well your resume matches the job requirements.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: AcademicCapIcon,
      title: "Skill Analysis",
      description: "See which skills match and which skills are missing from the job description.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: LightBulbIcon,
      title: "Suggestions",
      description: "Receive recommendations to improve your resume for better matching.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: ClockIcon,
      title: "History",
      description: "Save your analyses to track changes over time.",
      iconColor: "text-primary-600 dark:text-primary-400",
      bgLight: "bg-primary-50 dark:bg-primary-900/20"
    }
  ];

  const stats = [
    { value: "98%", label: "Accuracy Rate", icon: CheckCircleIcon },
    { value: "500+", label: "Skills Database", icon: AcademicCapIcon },
    { value: "24/7", label: "AI Analysis", icon: CpuChipIcon },
    { value: "Free", label: "Forever", icon: ShieldCheckIcon }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-in">
              <CpuChipIcon className="h-4 w-4 text-secondary-300" />
              <span className="text-sm text-white font-medium">AI-Powered Resume Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Land Your Dream Job
              <br />
              <span className="bg-gradient-to-r from-secondary-200 to-secondary-300 bg-clip-text text-transparent">
                with AI Insights
              </span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Upload your resume, paste a job description, and get instant analysis on ATS score, skill matching, and improvement suggestions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="group px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center gap-2">
                  Get Started Free
                  <RocketLaunchIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                  Sign In
                </button>
              </Link>
            </div>
            
            <p className="text-primary-200 text-sm mt-6 flex items-center justify-center gap-2">
              <ShieldCheckIcon className="h-4 w-4" />
              Free forever • No credit card • Instant analysis
            </p>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition">
                <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 dark:bg-gray-800 py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to optimize your resume and stand out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
                <div className={`${feature.bgLight} inline-flex p-3 rounded-xl mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get your resume analyzed in 4 simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Create Account", desc: "Sign up for free", icon: DocumentTextIcon },
            { step: "02", title: "Upload Resume", desc: "PDF or DOCX file", icon: CloudArrowUpIcon },
            { step: "03", title: "Paste Job Description", desc: "Copy from job posting", icon: MagnifyingGlassIcon },
            { step: "04", title: "Get Analysis", desc: "Instant AI insights", icon: SparklesIcon }
          ].map((step, index) => (
            <div key={index} className="relative">
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/3 left-full w-full h-0.5 bg-primary-200 dark:bg-primary-800">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
              )}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gray-50 dark:bg-gray-800 py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
            <InformationCircleIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About ResumeAI
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            ResumeAI is a powerful web application that helps job seekers analyze their resumes against job descriptions. 
            Using advanced AI algorithms, it extracts text from resumes, compares skills, calculates ATS scores, 
            and provides actionable suggestions to improve your chances of landing interviews.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📄 Smart Upload</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Supports PDF and DOCX files with automatic text extraction</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🤖 AI Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced skill detection and matching algorithm</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Track Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Save analyses and see your improvement over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-700 to-secondary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of successful job seekers who landed their dream jobs
          </p>
          <Link to="/register">
            <button className="px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-xl transition-all">
              Start Your Free Analysis
            </button>
          </Link>
          <p className="text-primary-200 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </div>
    </div>
  );
};

export default Home;