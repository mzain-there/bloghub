import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ icon: Icon, label, value, change, color = 'primary', index = 0 }) => {
  const { isDark } = useTheme();

  const colors = {
    primary: { bg: 'from-primary/20 to-primary/5', icon: 'text-primary', shadow: 'shadow-primary/10' },
    secondary: { bg: 'from-secondary/20 to-secondary/5', icon: 'text-secondary', shadow: 'shadow-secondary/10' },
    highlight: { bg: 'from-highlight/20 to-highlight/5', icon: 'text-highlight', shadow: 'shadow-highlight/10' },
    success: { bg: 'from-success/20 to-success/5', icon: 'text-success', shadow: 'shadow-success/10' },
  };

  const c = colors[color] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-700/50 border border-white/5 hover:border-primary/20' : 'bg-white border border-slate-200 hover:border-primary/30'} hover:shadow-xl ${c.shadow}`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center mb-4`}>
        <Icon className={`text-xl ${c.icon}`} />
      </div>
      <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{value}</h3>
      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      {change && (
        <span className={`text-xs font-medium mt-2 inline-block ${change > 0 ? 'text-success' : 'text-danger'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
        </span>
      )}
    </motion.div>
  );
};

export default StatCard;
