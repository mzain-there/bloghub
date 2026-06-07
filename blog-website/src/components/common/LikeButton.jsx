import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';

const LikeButton = ({ blogId, initialLikes = 0, likedBy = [] }) => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  const { toggleLike, hasUserLiked } = useBlog();

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setLikeCount(initialLikes);
  }, [initialLikes]);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(hasUserLiked(blogId, currentUser.id));
    } else {
      setIsLiked(false);
    }
  }, [blogId, currentUser, likedBy, hasUserLiked]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast.info('Please log in to like posts');
      return;
    }

    const result = toggleLike(blogId, currentUser.id);
    if (result) {
      setIsLiked(result.liked);
      setLikeCount(result.likes);
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
        isLiked
          ? 'bg-red-500/20 text-red-500'
          : isDark
          ? 'text-slate-400 hover:text-red-500 hover:bg-red-500/10'
          : 'text-slate-500 hover:text-red-500 hover:bg-red-500/10'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isLiked ? [1, 1.3, 1] : 1,
          rotate: isLiked ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <FiHeart
          size={16}
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      </motion.div>
      <span className="text-sm font-medium">{likeCount}</span>
    </motion.button>
  );
};

export default LikeButton;
