import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/blog/BlogCard';
import CategoryPills from '../../components/blog/CategoryPills';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';

const Blogs = () => {
  const { isDark } = useTheme();
  const { paginatedBlogs, loading, searchQuery, setSearchQuery, sortBy, setSortBy, currentPage, setCurrentPage, totalPages, setSelectedCategory } = useBlog();

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>All <span className="gradient-text">Blogs</span></h1>
          <p className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Discover articles on technology, programming, and more</p>
        </motion.div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 flex-1 w-full px-4 py-3 rounded-xl ${isDark ? 'bg-dark-700 border border-white/5' : 'bg-white border border-slate-200'}`}>
            <FiSearch className={isDark ? 'text-slate-500' : 'text-slate-400'} />
            <input type="text" placeholder="Search blogs..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`} />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className={`px-4 py-3 rounded-xl text-sm outline-none cursor-pointer ${isDark ? 'bg-dark-700 text-white border border-white/5' : 'bg-white text-slate-800 border border-slate-200'}`}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <CategoryPills />
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader type="card" count={9} />
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <EmptyState title="No blogs found" message="Try adjusting your search or filters" action={() => { setSearchQuery(''); setSelectedCategory('All'); }} actionLabel="Clear Filters" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${isDark ? 'bg-dark-700 text-slate-300 hover:bg-dark-600' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/25' : isDark ? 'bg-dark-700 text-slate-400 hover:bg-dark-600' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${isDark ? 'bg-dark-700 text-slate-300 hover:bg-dark-600' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
