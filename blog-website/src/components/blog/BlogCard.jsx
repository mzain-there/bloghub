import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { truncateText, formatDate, getInitials } from '../../utils/helpers';
import LikeButton from '../common/LikeButton';

const BlogCard = ({ blog, index = 0, onLikeChange }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/blogs/${blog.id}`} className="group block h-full">
        <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${isDark ? 'bg-dark-700/50 border border-white/5 group-hover:border-primary/30 group-hover:shadow-primary/5' : 'bg-white border border-slate-200 group-hover:border-primary/30 group-hover:shadow-primary/10'}`}>
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/600/300`}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {blog.category && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                {blog.category}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className={`text-lg font-semibold mb-2 transition-colors line-clamp-2 ${isDark ? 'text-white group-hover:text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
              {blog.title}
            </h3>
            <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {truncateText(blog.shortDescription || blog.content, 120)}
            </p>

            {/* Meta */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {blog.author?.avatar ? (
                    <img src={blog.author.avatar} alt={blog.author.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-xs text-white font-medium">
                      {getInitials(blog.author?.name)}
                    </div>
                  )}
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {blog.author?.name || 'Anonymous'}
                  </span>
                </div>
                <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <FiClock size={12} />{formatDate(blog.createdAt)}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t" onClick={(e) => e.preventDefault()}>
                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <FiEye size={12} /><span>{blog.views || 0}</span>
                </div>
                <LikeButton 
                  blogId={blog.id}
                  initialLikes={blog.likes || 0}
                  onLikeChange={onLikeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
