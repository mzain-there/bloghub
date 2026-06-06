import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import BlogTable from '../../components/dashboard/BlogTable';
import ConfirmModal from '../../components/common/ConfirmModal';
import Breadcrumb from '../../components/common/Breadcrumb';
import EmptyState from '../../components/common/EmptyState';
import { FiPlus, FiSearch } from 'react-icons/fi';

const BlogManage = () => {
  const { isDark } = useTheme();
  const { allBlogs, deleteBlog } = useBlog();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filteredBlogs = allBlogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteBlog(deleteId);
      toast.success('Blog deleted successfully!');
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Blogs' }]} />
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Manage Blogs</h1>
        </div>
        <button
          onClick={() => navigate('/dashboard/blogs/add')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl text-sm hover:shadow-lg hover:shadow-primary/25 transition-all w-fit"
        >
          <FiPlus /> Add New Blog
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-dark-700/50 border border-white/5' : 'bg-white border border-slate-200'}`}>
        <FiSearch className={isDark ? 'text-slate-500' : 'text-slate-400'} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search managed blogs by title or category..."
          className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`}
        />
      </div>

      {/* Blogs Data Table */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-dark-700/30 border-white/5' : 'bg-white border-slate-200'}`}>
        {filteredBlogs.length === 0 ? (
          <EmptyState 
            title="No blogs matching search query"
            message="Try typing another keyword or create a new blog post."
            action={() => navigate('/dashboard/blogs/add')}
            actionLabel="Add Blog"
          />
        ) : (
          <BlogTable blogs={filteredBlogs} onDelete={setDeleteId} />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message="Are you sure you want to permanently delete this blog post? This action cannot be undone."
        confirmText="Yes, Delete"
        type="danger"
      />

    </div>
  );
};

export default BlogManage;
