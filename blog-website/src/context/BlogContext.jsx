import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPosts, searchPosts as searchPostsApi } from '../services/api';
import { generateId } from '../utils/helpers';
import { defaultCategories } from '../data/categories';
import { FaGlobe, FaHeart, FaUtensils, FaUsers, FaWallet, FaMedkit, FaBriefcase, FaTools, FaLightbulb, FaBook } from 'react-icons/fa';

const iconMap = {
  'Lifestyle': FaHeart,
  'Travel & Adventure': FaGlobe,
  'Food & Cooking': FaUtensils,
  'Relationships & Family': FaUsers,
  'Personal Finance': FaWallet,
  'Health & Wellness': FaMedkit,
  'Career & Business': FaBriefcase,
  'Hobbies & DIY': FaTools,
  'Self Improvement': FaLightbulb,
  'Education & Learning': FaBook,
};

const attachIconsToCategories = (categories) => {
  return categories.map(cat => ({
    ...cat,
    icon: iconMap[cat.name] || null,
  }));
};

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};

const LOCAL_BLOGS_KEY = 'bloghub_blogs';
const LOCAL_CATEGORIES_KEY = 'bloghub_categories';

export const BlogProvider = ({ children }) => {
  const [apiBlogs, setApiBlogs] = useState([]);
  const [localBlogs, setLocalBlogs] = useState(() => {
    const saved = localStorage.getItem(LOCAL_BLOGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(c => c.name === 'Technology' || c.name === 'Programming')) {
          const withIcons = attachIconsToCategories(defaultCategories);
          localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(withIcons));
          return withIcons;
        }
        return attachIconsToCategories(parsed);
      } catch (e) {
        return attachIconsToCategories(defaultCategories);
      }
    }
    return attachIconsToCategories(defaultCategories);
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Fetch API posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(30, 0);
        setApiBlogs(data.posts);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Persist local blogs
  useEffect(() => {
    localStorage.setItem(LOCAL_BLOGS_KEY, JSON.stringify(localBlogs));
  }, [localBlogs]);

  // Persist categories
  useEffect(() => {
    localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // All blogs combined
  const allBlogs = [...localBlogs, ...apiBlogs];

  // Filtered & sorted blogs
  const getFilteredBlogs = useCallback(() => {
    let filtered = [...allBlogs];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.content?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return filtered;
  }, [allBlogs, searchQuery, selectedCategory, sortBy]);

  const filteredBlogs = getFilteredBlogs();
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  // CRUD Operations
  const addBlog = useCallback((blogData) => {
    const newBlog = {
      ...blogData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      isApi: false,
    };
    setLocalBlogs(prev => [newBlog, ...prev]);
    return newBlog;
  }, []);

  const updateBlog = useCallback((id, updates) => {
    setLocalBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b));
  }, []);

  const deleteBlog = useCallback((id) => {
    setLocalBlogs(prev => prev.filter(b => b.id !== id));
  }, []);

  const getBlogById = useCallback((id) => {
    return allBlogs.find(b => b.id === id || b.id === `api-${id}`);
  }, [allBlogs]);

  // Category CRUD
  const addCategory = useCallback((name) => {
    const newCat = { id: generateId(), name, color: '#3B82F6', count: 0 };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  }, []);

  const updateCategory = useCallback((id, name) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name } : c));
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // Stats
  const stats = {
    totalBlogs: allBlogs.length,
    totalCategories: categories.length,
    totalAuthors: new Set(allBlogs.map(b => b.author?.name)).size,
    totalViews: allBlogs.reduce((sum, b) => sum + (b.views || 0), 0),
    userBlogs: localBlogs.length,
  };

  return (
    <BlogContext.Provider value={{
      allBlogs, filteredBlogs, paginatedBlogs, localBlogs, apiBlogs,
      categories, loading, error, stats,
      searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
      sortBy, setSortBy, currentPage, setCurrentPage, totalPages, postsPerPage,
      addBlog, updateBlog, deleteBlog, getBlogById,
      addCategory, updateCategory, deleteCategory,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
