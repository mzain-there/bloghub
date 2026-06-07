import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatCard from '../../components/dashboard/StatCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import EmptyState from '../../components/common/EmptyState';
import { FiFileText, FiGrid, FiHeart, FiEye, FiEdit3 } from 'react-icons/fi';
import { formatNumber } from '../../utils/helpers';

const DashboardHome = () => {
  const { isDark } = useTheme();
  const { userStats, userBlogs } = useBlog();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const hasBlogs = userBlogs.length > 0;

  return (
    <div className="space-y-6">
      <WelcomeCard />

      {hasBlogs ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={FiFileText}
              label="My Blogs"
              value={userStats.totalBlogs}
              change={userStats.monthlyGrowth || undefined}
              color="primary"
              index={0}
            />
            <StatCard
              icon={FiEye}
              label="Total Views"
              value={formatNumber(userStats.totalViews)}
              color="success"
              index={1}
            />
            <StatCard
              icon={FiHeart}
              label="Total Likes"
              value={formatNumber(userStats.totalLikes)}
              color="highlight"
              index={2}
            />
            <StatCard
              icon={FiGrid}
              label="Categories Used"
              value={userStats.categoriesUsed}
              color="secondary"
              index={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalyticsChart title="Blog Growth Over Time" type="growth" />
            </div>
            <div className="lg:col-span-1">
              <AnalyticsChart title="Category Distribution" type="distribution" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart title="Monthly Writing Activity" type="monthly" />
            <AnalyticsChart title="Views & Likes Overview" type="engagement" />
          </div>
        </>
      ) : (
        <div className={`rounded-2xl ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
          <EmptyState
            icon={FiEdit3}
            title="No blogs yet"
            message="Your dashboard is empty because you haven't published any blogs. Create your first post to see stats, charts, and analytics here."
            action={() => navigate('/dashboard/blogs/add')}
            actionLabel="Write Your First Blog"
          />
        </div>
      )}

      <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Session Information</h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Your account session details.
        </p>
        <div className="space-y-3">
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
  );
};

export default DashboardHome;
