import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSend, FiTrendingUp, FiStar } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/blog/BlogCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { toast } from 'react-toastify';

const Home = () => {
  const { isDark } = useTheme();
  const { allBlogs, categories, loading } = useBlog();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const featuredBlogs = allBlogs.slice(0, 6);
  const trendingBlogs = [...allBlogs].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) { toast.success('Subscribed successfully!'); setEmail(''); }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-900 to-highlight/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-highlight/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${isDark ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
              <FiStar size={14} /> Welcome to BlogHub
            </span>
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Where Ideas Come <br />
              <span className="gradient-text">To Life</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Discover, create, and share compelling stories. Join a community of passionate writers and curious readers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/blogs')} className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl text-base font-medium hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Explore Blogs <FiArrowRight />
              </button>
              <button onClick={() => navigate('/dashboard')} className={`px-8 py-4 rounded-2xl text-base font-medium transition-all flex items-center gap-2 ${isDark ? 'bg-dark-700 text-white border border-white/10 hover:bg-dark-600' : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50'}`}>
                Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className={`py-20 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured <span className="gradient-text">Blogs</span></h2>
            <p className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Explore our latest and most popular articles</p>
          </motion.div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonLoader type="card" count={6} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors">
              View All Blogs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Explore <span className="gradient-text">Categories</span></h2>
            <p className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Find content that matches your interests</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((cat, i) => (
              <motion.button key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                onClick={() => { navigate('/blogs'); }}
                className={`group p-5 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-700/50 border border-white/5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5' : 'bg-white border border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10'}`}
              >
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ backgroundColor: cat.color + '20' }}>
                  {cat.icon && <cat.icon size={22} style={{ color: cat.color }} />}
                </div>
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{cat.name}</h4>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{cat.count} articles</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className={`py-20 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-12">
            <FiTrendingUp className="text-primary text-2xl" />
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending <span className="gradient-text">Now</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingBlogs.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-highlight to-secondary p-8 md:p-14 text-center"
          >
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-white/10 rounded-full" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8">Get the latest articles and resources delivered straight to your inbox every week.</p>
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 w-full px-5 py-3.5 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-white/40 backdrop-blur-sm" required />
                <button type="submit" className="w-full sm:w-auto px-6 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  <FiSend size={16} /> Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
