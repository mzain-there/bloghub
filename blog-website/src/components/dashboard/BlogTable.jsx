import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { formatDate, truncateText } from '../../utils/helpers';

const BlogTable = ({ blogs, onDelete }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className={`text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <th className="px-4 py-3">Blog</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Author</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
          {blogs.map(blog => (
            <tr key={blog.id} className={`transition-colors ${isDark ? 'hover:bg-dark-600/30' : 'hover:bg-slate-50'}`}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/100/60`} alt="" className="w-14 h-10 rounded-lg object-cover" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{truncateText(blog.title, 40)}</span>
                </div>
              </td>
              <td className="px-4 py-3"><span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{blog.category}</span></td>
              <td className={`px-4 py-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{blog.author?.name}</td>
              <td className={`px-4 py-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{formatDate(blog.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => navigate(`/blogs/${blog.id}`)} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-primary hover:bg-primary/10' : 'text-slate-400 hover:text-primary hover:bg-primary/10'}`}><FiEye size={16} /></button>
                  {!blog.isApi && (
                    <>
                      <button onClick={() => navigate(`/dashboard/blogs/edit/${blog.id}`)} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-secondary hover:bg-secondary/10' : 'text-slate-400 hover:text-secondary hover:bg-secondary/10'}`}><FiEdit2 size={16} /></button>
                      <button onClick={() => onDelete(blog.id)} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-danger hover:bg-danger/10' : 'text-slate-400 hover:text-danger hover:bg-danger/10'}`}><FiTrash2 size={16} /></button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
