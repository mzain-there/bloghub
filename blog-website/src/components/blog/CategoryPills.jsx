import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';

const CategoryPills = ({ onSelect }) => {
  const { isDark } = useTheme();
  const { categories, selectedCategory, setSelectedCategory, setCurrentPage } = useBlog();

  const handleSelect = (name) => {
    setSelectedCategory(name);
    setCurrentPage(1);
    onSelect?.(name);
  };

  const allCategories = [{ id: 'all', name: 'All' }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat, i) => {
        const isActive = selectedCategory === cat.name;
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => handleSelect(cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                : isDark
                  ? 'bg-dark-700 text-slate-300 hover:bg-dark-600 hover:text-white border border-white/5'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryPills;
