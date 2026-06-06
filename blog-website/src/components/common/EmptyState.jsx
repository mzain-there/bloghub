import { FiInbox } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const EmptyState = ({ icon: Icon = FiInbox, title = 'No data found', message = 'There is nothing to display here yet.', action, actionLabel }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-dark-700' : 'bg-slate-100'}`}>
        <Icon className={`text-3xl ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{title}</h3>
      <p className={`text-sm max-w-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{message}</p>
      {action && (
        <button onClick={action} className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
          {actionLabel || 'Get Started'}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
