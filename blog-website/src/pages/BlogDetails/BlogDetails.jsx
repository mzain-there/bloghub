import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiArrowLeft, FiEye } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';
import { formatDate, getInitials } from '../../utils/helpers';
import BlogCard from '../../components/blog/BlogCard';
import LikeButton from '../../components/common/LikeButton';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const BlogDetails = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { getBlogById, allBlogs, loading, incrementViews } = useBlog();
  const [blog, setBlog] = useState(null);
  const viewIncrementedRef = useRef(false);

  useEffect(() => {
    viewIncrementedRef.current = false;
  }, [id]);

  useEffect(() => {
    const found = getBlogById(id);
    setBlog(found || null);

    if (found && !viewIncrementedRef.current) {
      incrementViews(found.id);
      viewIncrementedRef.current = true;
    }
  }, [id, allBlogs, getBlogById, incrementViews]);

  if (loading && !blog) return (
    <div className="py-12 max-w-4xl mx-auto px-4"><SkeletonLoader type="detail" /></div>
  );

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Blog not found</h2>
        <Link to="/blogs" className="text-primary hover:underline">← Back to Blogs</Link>
      </div>
    </div>
  );

  const relatedBlogs = allBlogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 3);

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/blogs" className={`inline-flex items-center gap-2 mb-8 text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
          <FiArrowLeft /> Back to Blogs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden mb-8">
          <img src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/1200/500`} alt={blog.title} className="w-full h-[300px] md:h-[450px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {blog.category && (
            <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full">{blog.category}</span>
          )}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {blog.title}
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className={`flex flex-wrap items-center gap-6 mb-10 pb-8 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            {blog.author?.avatar ? (
              <img src={blog.author.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-white font-medium">{getInitials(blog.author?.name)}</div>
            )}
            <div>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{blog.author?.name || 'Anonymous'}</p>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Author</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}><FiCalendar size={14} />{formatDate(blog.createdAt)}</div>
          <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}><FiEye size={14} />{blog.views || 0} views</div>
          <LikeButton
            blogId={blog.id}
            initialLikes={blog.likes || 0}
            likedBy={blog.likedBy || []}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className={`prose prose-lg max-w-none mb-10 leading-relaxed text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          style={{ whiteSpace: 'pre-wrap' }}>
          {blog.content}
        </motion.div>

        {blog.tags?.length > 0 && (
          <div className={`flex flex-wrap items-center gap-2 mb-10 pb-8 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <FiTag className={isDark ? 'text-slate-500' : 'text-slate-400'} />
            {blog.tags.map((tag, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-dark-700 text-slate-300 border border-white/5' : 'bg-slate-100 text-slate-600'}`}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedBlogs.length > 0 && (
        <section className={`py-16 mt-8 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
