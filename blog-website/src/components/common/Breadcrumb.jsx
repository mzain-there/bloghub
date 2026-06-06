import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Breadcrumb = ({ items = [] }) => {
  const { isDark } = useTheme();

  return (
    <nav className="flex items-center gap-1 text-sm mb-6 flex-wrap" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <FiChevronRight className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />}
          {item.path ? (
            <Link to={item.path} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-primary' : 'text-slate-500 hover:text-primary'}`}>
              {item.label}
            </Link>
          ) : (
            <span className={isDark ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
