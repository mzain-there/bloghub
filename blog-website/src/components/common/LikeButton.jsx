import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const LikeButton = ({ blogId, initialLikes = 0, onLikeChange }) => {
  const { isDark } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  // Load liked status from localStorage
  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
    if (likedBlogs[blogId]) {
      setIsLiked(true);
    }
  }, [blogId]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
    let newCount = likeCount;

    if (isLiked) {
      // Unlike
      delete likedBlogs[blogId];
      newCount = likeCount - 1;
    } else {
      // Like
      likedBlogs[blogId] = true;
      newCount = likeCount + 1;
    }

    localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
    setIsLiked(!isLiked);
    setLikeCount(newCount);
    
    if (onLikeChange) {
      onLikeChange(newCount, !isLiked);
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
          stroke={isLiked ? 'currentColor' : 'currentColor'}
        />
      </motion.div>
      <span className="text-sm font-medium">{likeCount}</span>
    </motion.button>
  );
};

export default LikeButton;
