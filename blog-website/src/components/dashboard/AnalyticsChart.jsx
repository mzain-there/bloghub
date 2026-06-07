import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentYear = new Date().getFullYear();

const ChartEmpty = ({ message }) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FiBarChart2 className={`text-3xl mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{message}</p>
    </div>
  );
};

const AnalyticsChart = ({ title, type = 'bar' }) => {
  const { isDark } = useTheme();
  const { userBlogs, categories } = useBlog();

  const generateBlogGrowthData = () => {
    const monthlyCount = Array(12).fill(0);

    userBlogs.forEach(blog => {
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        if (date.getFullYear() === currentYear) {
          monthlyCount[date.getMonth()]++;
        }
      }
    });

    let cumulative = 0;
    return monthlyCount.map(count => {
      cumulative += count;
      return cumulative;
    });
  };

  const getCategoryDistribution = () => {
    const usedCategories = categories
      .map(cat => {
        const count = userBlogs.filter(b => b.category === cat.name).length;
        return { name: cat.name, value: count, color: cat.color };
      })
      .filter(cat => cat.value > 0);

    const total = usedCategories.reduce((sum, cat) => sum + cat.value, 0) || 1;
    return usedCategories.map(cat => ({
      ...cat,
      value: Math.round((cat.value / total) * 100),
    }));
  };

  const getMonthlyBlogCounts = () => {
    const monthlyCount = Array(12).fill(0);

    userBlogs.forEach(blog => {
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        if (date.getFullYear() === currentYear) {
          monthlyCount[date.getMonth()]++;
        }
      }
    });

    return monthlyCount;
  };

  const getEngagementData = () => {
    return userBlogs.slice(0, 6).map(blog => ({
      title: blog.title.length > 20 ? `${blog.title.slice(0, 20)}…` : blog.title,
      views: blog.views || 0,
      likes: blog.likes || 0,
    }));
  };

  const monthlyBlogData = getMonthlyBlogCounts();
  const blogGrowthData = generateBlogGrowthData();
  const categoryData = getCategoryDistribution();
  const engagementData = getEngagementData();

  const maxVal = Math.max(...monthlyBlogData, 1);
  const maxGrowth = Math.max(...blogGrowthData, 1);
  const maxEngagement = Math.max(...engagementData.flatMap(d => [d.views, d.likes]), 1);

  const wrapperClass = `rounded-2xl p-6 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`;
  const titleClass = `text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`;

  if (userBlogs.length === 0) {
    return (
      <div className={wrapperClass}>
        <h3 className={titleClass}>{title}</h3>
        <ChartEmpty message="Publish a blog to see this chart." />
      </div>
    );
  }

  if (type === 'growth') {
    return (
      <div className={wrapperClass}>
        <h3 className={titleClass}>{title}</h3>
        <div className="space-y-4">
          {blogGrowthData.map((val, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`text-xs font-medium w-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{monthLabels[i]}</span>
              <div className={`flex-1 h-8 rounded-lg overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-slate-100'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(val / maxGrowth) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.8 }}
                  className="h-full rounded-lg bg-gradient-to-r from-primary to-secondary relative group"
                >
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                </motion.div>
              </div>
              <span className={`text-sm font-semibold w-12 text-right ${isDark ? 'text-white' : 'text-slate-800'}`}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'distribution') {
    if (categoryData.length === 0) {
      return (
        <div className={wrapperClass}>
          <h3 className={titleClass}>{title}</h3>
          <ChartEmpty message="Add blogs with categories to see distribution." />
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        <h3 className={titleClass}>{title}</h3>
        <div className="space-y-4">
          {categoryData.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.name}</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.value}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-slate-100'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'monthly') {
    return (
      <div className={wrapperClass}>
        <h3 className={titleClass}>{title}</h3>
        <div className="grid grid-cols-12 gap-2 h-40">
          {monthlyBlogData.map((val, i) => (
            <div key={i} className="flex flex-col items-center justify-end gap-2 flex-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: val > 0 ? `${(val / maxVal) * 100}%` : '4px' }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={`w-full rounded-t-lg bg-gradient-to-t from-secondary to-primary group relative cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-shadow ${val === 0 ? 'opacity-30' : ''}`}
                title={`${val} blog${val !== 1 ? 's' : ''}`}
              >
                {val > 0 && (
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? 'bg-dark-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {val} blog{val !== 1 ? 's' : ''}
                  </div>
                )}
              </motion.div>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{monthLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'engagement') {
    if (engagementData.length === 0) {
      return (
        <div className={wrapperClass}>
          <h3 className={titleClass}>{title}</h3>
          <ChartEmpty message="Publish blogs to track views and likes." />
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        <h3 className={titleClass}>{title}</h3>
        <div className="space-y-4">
          {engagementData.map((item, i) => (
            <div key={i} className="space-y-2">
              <p className={`text-sm font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.title}</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Views</span>
                    <span className={isDark ? 'text-white' : 'text-slate-800'}>{item.views}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-slate-100'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.views / maxEngagement) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Likes</span>
                    <span className={isDark ? 'text-white' : 'text-slate-800'}>{item.likes}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-slate-100'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.likes / maxEngagement) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-highlight to-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default AnalyticsChart;
