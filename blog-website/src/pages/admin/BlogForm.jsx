import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/common/Breadcrumb';
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { addBlog, updateBlog, getBlogById, categories } = useBlog();
  const { currentUser } = useAuth();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    coverImage: '',
    tags: '',
    shortDescription: '',
    content: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const blog = getBlogById(id);
      if (!blog || blog.isApi || blog.userId !== currentUser?.id) {
        toast.error('You can only edit your own blogs');
        navigate('/dashboard/blogs');
        return;
      }
      setFormData({
        title: blog.title || '',
        category: blog.category || '',
        coverImage: blog.coverImage || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        shortDescription: blog.shortDescription || '',
        content: blog.content || ''
      });
    } else {
      // Default category if categories exist
      if (categories.length > 0) {
        setFormData(prev => ({ ...prev, category: categories[0].name }));
      }
    }
  }, [id, isEditMode, getBlogById, categories, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning('Cover image must be smaller than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
        toast.success('Cover image loaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short Description is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const processedTags = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const blogPayload = {
      title: formData.title,
      category: formData.category,
      coverImage: formData.coverImage || 'https://picsum.photos/seed/default/800/400',
      tags: processedTags,
      shortDescription: formData.shortDescription,
      content: formData.content,
      author: {
        name: currentUser?.fullName || 'Admin User',
        avatar: currentUser?.profilePicture || ''
      }
    };

    if (isEditMode) {
      updateBlog(id, blogPayload);
      toast.success('Blog updated successfully!');
    } else {
      addBlog(blogPayload);
      toast.success('Blog created successfully!');
    }
    navigate('/dashboard/blogs');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard/blogs')}
          className={`p-2 rounded-xl border transition-colors ${
            isDark ? 'bg-dark-800 border-white/5 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <FiArrowLeft size={18} />
        </button>
        <div>
          <Breadcrumb 
            items={[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Blogs', path: '/dashboard/blogs' },
              { label: isEditMode ? 'Edit Blog' : 'Add Blog' }
            ]} 
          />
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg space-y-4`}>
            
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Title
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Knowledge is Power: Lessons That Changed My Life"
                className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                  errors.title 
                    ? 'border-danger' 
                    : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                }`}
              />
              {errors.title && <span className="text-xs text-danger mt-1 block">{errors.title}</span>}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Short Description
              </label>
              <textarea 
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows="3"
                placeholder="A brief summary of the blog post (shown on cards and previews)..."
                className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors resize-none ${
                  errors.shortDescription 
                    ? 'border-danger' 
                    : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                }`}
              />
              {errors.shortDescription && <span className="text-xs text-danger mt-1 block">{errors.shortDescription}</span>}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Content (Markdown/Plaintext Supported)
              </label>
              <textarea 
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                placeholder="Start writing your thoughts here..."
                className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors resize-none ${
                  errors.content 
                    ? 'border-danger' 
                    : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                }`}
              />
              {errors.content && <span className="text-xs text-danger mt-1 block">{errors.content}</span>}
            </div>

          </div>
        </div>

        {/* Side Panel Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg space-y-4`}>
            
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Category
              </label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                  isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tags (Comma separated)
              </label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. lifestyle, travel, career"
                className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                  isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Cover Image (Media Upload)
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="file" 
                  id="cover-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="cover-upload"
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors w-full ${
                    isDark ? 'bg-dark-700 border-white/10 text-white hover:bg-dark-600' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <FiImage /> Choose Image
                </label>
                {formData.coverImage && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                    className="text-xs text-danger hover:underline whitespace-nowrap"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Image Preview */}
            <div className={`aspect-video w-full rounded-xl border flex flex-col items-center justify-center overflow-hidden bg-slate-100 ${isDark ? 'bg-dark-700 border-white/10' : 'border-slate-200'}`}>
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <FiImage size={24} className="text-slate-400 mb-1" />
                  <span className="text-xs text-slate-400">Cover Preview</span>
                </>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <FiSave size={16} /> {isEditMode ? 'Update Post' : 'Publish Post'}
            </button>

          </div>
        </div>

      </form>

    </div>
  );
};

export default BlogForm;
