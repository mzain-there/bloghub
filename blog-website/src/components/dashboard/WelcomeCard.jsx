import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import { getInitials } from '../../utils/helpers';

const WelcomeCard = () => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  const { stats } = useBlog();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-dark to-highlight p-6 md:p-8 text-white"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-4 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {currentUser?.profilePicture ? (
            <img src={currentUser.profilePicture} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
              {getInitials(currentUser?.fullName)}
            </div>
          )}
          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              Welcome back, {currentUser?.fullName?.split(' ')[0] || 'User'} 👋
            </h2>
            <p className="text-white/70 text-sm mt-1">
              You have published {stats.userBlogs} blog{stats.userBlogs !== 1 ? 's' : ''}. Keep writing!
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard/blogs/add')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm"
        >
          <FiEdit3 size={16} />
          Write New Blog
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
