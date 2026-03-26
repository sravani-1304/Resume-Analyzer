import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../services/resume';
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  TrophyIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    avgAts: 0,
    highestMatch: 0,
    improvement: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
      
      if (data.length > 0) {
        const avg = data.reduce((acc, curr) => acc + curr.atsScore, 0) / data.length;
        const highest = Math.max(...data.map(item => item.matchPercentage));
        const latest = data[0]?.atsScore || 0;
        const first = data[data.length - 1]?.atsScore || 0;
        const improvement = latest - first;
        
        setStats({
          total: data.length,
          avgAts: Math.round(avg),
          highestMatch: highest,
          improvement: improvement
        });
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Analyses",
      value: stats.total,
      icon: DocumentTextIcon,
      bgLight: "bg-primary-50 dark:bg-primary-900/20",
      textColor: "text-primary-600 dark:text-primary-400"
    },
    {
      title: "Average ATS Score",
      value: `${stats.avgAts}%`,
      icon: ChartBarIcon,
      bgLight: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Best Match",
      value: `${stats.highestMatch}%`,
      icon: TrophyIcon,
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Improvement",
      value: `${stats.improvement > 0 ? '+' : ''}${stats.improvement}%`,
      icon: ArrowTrendingUpIcon,
      bgLight: stats.improvement >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20",
      textColor: stats.improvement >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-100">
              Track your progress and optimize your resume for success
            </p>
          </div>
          <SparklesIcon className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgLight} p-3 rounded-xl`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <span className={`text-sm font-medium ${stat.textColor}`}>
                {stat.title}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Action Card */}
      <div className="mb-8">
        <Link to="/analyze">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-xl p-8 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-all cursor-pointer group">
            <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition">
              <SparklesIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to analyze your resume?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get instant AI-powered feedback on your resume against any job description
            </p>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition inline-flex items-center gap-2">
              Start New Analysis
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
        </Link>
      </div>

      {/* Recent Analyses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Analyses</h2>
            </div>
            {history.length > 0 && (
              <button 
                onClick={loadHistory}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1"
              >
                <ArrowPathIcon className="h-4 w-4" />
                Refresh
              </button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No analyses yet</p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">Start your first analysis to see results here</p>
            <Link to="/analyze">
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                Start Your First Analysis
              </button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((item, index) => (
              <Link key={item._id} to={`/result/${item._id}`}>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? 'bg-primary-100 dark:bg-primary-900/50' : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <DocumentTextIcon className={`h-5 w-5 ${
                          index === 0 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.fileName || 'Resume Analysis'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <CalendarIcon className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ATS Score</p>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.atsScore >= 70 ? 'bg-green-500' : 
                                item.atsScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.atsScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${
                            item.atsScore >= 70 ? 'text-green-600 dark:text-green-400' : 
                            item.atsScore >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {item.atsScore}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Match</p>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-primary-500"
                              style={{ width: `${item.matchPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {item.matchPercentage}%
                          </span>
                        </div>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;