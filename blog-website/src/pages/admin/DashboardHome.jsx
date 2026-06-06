import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatCard from '../../components/dashboard/StatCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import { FiFileText, FiGrid, FiUsers, FiEye } from 'react-icons/fi';
import { formatNumber } from '../../utils/helpers';

const DashboardHome = () => {
  const { isDark } = useTheme();
  const { stats } = useBlog();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Welcome Card */}
      <WelcomeCard />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FiFileText}
          label="Total Blogs"
          value={stats.totalBlogs}
          change={12}
          color="primary"
          index={0}
        />
        <StatCard 
          icon={FiGrid}
          label="Total Categories"
          value={stats.totalCategories}
          change={5}
          color="secondary"
          index={1}
        />
        <StatCard 
          icon={FiUsers}
          label="Total Authors"
          value={stats.totalAuthors}
          change={8}
          color="highlight"
          index={2}
        />
        <StatCard 
          icon={FiEye}
          label="Total Views"
          value={formatNumber(stats.totalViews)}
          change={24}
          color="success"
          index={3}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart title="Blog Growth Over Time" type="growth" />
        </div>
        <div className="lg:col-span-1">
          <AnalyticsChart title="Category Distribution" type="distribution" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart title="Monthly Blog Writing Activity" type="monthly" />
        
        {/* User Quick Info */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'} flex flex-col justify-between`}>
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Session Information</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Monitor your session details and security events.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Last Login:</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>
                {currentUser?.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : 'First Session'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Session Status:</span>
              <span className="font-semibold text-success">Active & Secure</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Account Created:</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>
                {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;
