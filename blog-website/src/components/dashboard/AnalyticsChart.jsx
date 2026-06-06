import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AnalyticsChart = ({ title, type = 'bar', data }) => {
  const { isDark } = useTheme();
  const { allBlogs, categories } = useBlog();
  
  // Generate blog growth data based on actual blog creation dates in 2026
  const generateBlogGrowthData = () => {
    const monthlyCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    allBlogs.forEach(blog => {
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (year === 2026 && month >= 0 && month < 12) {
          monthlyCount[month]++;
        }
      }
    });
    
    // Convert to cumulative growth
    let cumulative = 0;
    return monthlyCount.map(count => {
      cumulative += count;
      return Math.max(cumulative, 1);
    });
  };

  // Get category distribution from actual blogs
  const getCategoryDistribution = () => {
    const distribution = categories.map(cat => {
      const count = allBlogs.filter(b => b.category === cat.name).length;
      return { name: cat.name, value: count || cat.count, color: cat.color };
    });
    const total = distribution.reduce((sum, cat) => sum + cat.value, 0) || 1;
    return distribution.map(cat => ({
      ...cat,
      value: Math.round((cat.value / total) * 100)
    }));
  };

  const barData = data || [35, 55, 40, 70, 50, 80, 65, 90, 75, 60, 85, 95];
  
  // Calculate actual monthly blog counts for 2026
  const getMonthlyBlogCounts = () => {
    const monthlyCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    allBlogs.forEach(blog => {
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (year === 2026 && month >= 0 && month < 12) {
          monthlyCount[month]++;
        }
      }
    });
    
    return monthlyCount.map(count => Math.max(count, 5)); // Min 5 for visibility
  };
  
  const monthlyBlogData = getMonthlyBlogCounts();
  const blogGrowthData = generateBlogGrowthData();
  const categoryData = getCategoryDistribution();
  
  const maxVal = Math.max(...monthlyBlogData);
  const maxGrowth = Math.max(...blogGrowthData);

  if (type === 'growth') {
    return (
      <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
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
                  <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity`}>{val}</span>
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
    return (
      <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
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
      <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
        <div className="grid grid-cols-12 gap-2 h-40">
          {monthlyBlogData.map((val, i) => (
            <div key={i} className="flex flex-col items-center justify-end gap-2 flex-1">
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: `${(val / maxVal) * 100}%` }} 
                transition={{ delay: i * 0.05, duration: 0.6 }} 
                className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-primary min-h-[4px] group relative cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                title={`${val} blogs`}
              >
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? 'bg-dark-600 text-white' : 'bg-slate-800 text-white'}`}>{val} blogs</div>
              </motion.div>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{monthLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
      <div className="flex items-end gap-2 h-48">
        {monthlyBlogData.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: `${(val / maxVal) * 100}%` }} 
              transition={{ delay: i * 0.05, duration: 0.6 }} 
              className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary min-h-[4px] group relative cursor-pointer"
            >
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-dark-600 text-white' : 'bg-slate-800 text-white'}`}>{val}</div>
            </motion.div>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{monthLabels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;
