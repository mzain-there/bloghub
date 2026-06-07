import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPosts } from '../services/api';
import { generateId } from '../utils/helpers';
import { defaultCategories } from '../data/categories';
import { useAuth } from './AuthContext';
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
const ENGAGEMENT_KEY = 'bloghub_engagement';

const normalizeBlogEngagement = (blog) => {
  const likedBy = blog.likedBy || [];
  return {
    ...blog,
    likedBy,
    likes: likedBy.length,
  };
};

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [apiBlogs, setApiBlogs] = useState([]);
  const [localBlogs, setLocalBlogs] = useState(() => {
    const saved = localStorage.getItem(LOCAL_BLOGS_KEY);
    const blogs = saved ? JSON.parse(saved) : [];
    return blogs.map(b => normalizeBlogEngagement(b));
  });
  const [engagement, setEngagement] = useState(() => {
    const saved = localStorage.getItem(ENGAGEMENT_KEY);
    return saved ? JSON.parse(saved) : {};
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

  // Persist engagement (views/likes for API blogs)
  useEffect(() => {
    localStorage.setItem(ENGAGEMENT_KEY, JSON.stringify(engagement));
  }, [engagement]);

  const enrichBlog = useCallback((blog) => {
    if (!blog.isApi) return normalizeBlogEngagement(blog);

    const eng = engagement[blog.id] || { views: 0, likedBy: [] };
    const likedBy = eng.likedBy || [];
    return {
      ...blog,
      views: eng.views ?? blog.views ?? 0,
      likedBy,
      likes: likedBy.length,
    };
  }, [engagement]);

  // All blogs combined (public site: local + API)
  const allBlogs = useMemo(
    () => [...localBlogs, ...apiBlogs].map(enrichBlog),
    [localBlogs, apiBlogs, enrichBlog]
  );

  // Current user's blogs only (dashboard)
  const userBlogs = useMemo(() => {
    if (!currentUser) return [];
    return localBlogs.filter(b => b.userId === currentUser.id);
  }, [localBlogs, currentUser]);

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
    if (!currentUser) return null;
    const newBlog = {
      ...blogData,
      id: generateId(),
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      likedBy: [],
      isApi: false,
    };
    setLocalBlogs(prev => [newBlog, ...prev]);
    return newBlog;
  }, [currentUser]);

  const updateBlog = useCallback((id, updates) => {
    setLocalBlogs(prev => prev.map(b =>
      b.id === id && b.userId === currentUser?.id
        ? { ...b, ...updates, updatedAt: new Date().toISOString() }
        : b
    ));
  }, [currentUser]);

  const deleteBlog = useCallback((id) => {
    setLocalBlogs(prev => prev.filter(b => !(b.id === id && b.userId === currentUser?.id)));
  }, [currentUser]);

  const deleteUserBlogs = useCallback((userId) => {
    setLocalBlogs(prev => prev
      .filter(b => b.userId !== userId)
      .map(b => {
        const newLikedBy = (b.likedBy || []).filter(id => id !== userId);
        return { ...b, likedBy: newLikedBy, likes: newLikedBy.length };
      })
    );
    setEngagement(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(blogId => {
        const newLikedBy = (updated[blogId].likedBy || []).filter(id => id !== userId);
        updated[blogId] = { ...updated[blogId], likedBy: newLikedBy };
      });
      return updated;
    });
  }, []);

  const incrementViews = useCallback((blogId) => {
    const isLocal = localBlogs.some(b => b.id === blogId);
    if (isLocal) {
      setLocalBlogs(prev => prev.map(b =>
        b.id === blogId ? { ...b, views: (b.views || 0) + 1 } : b
      ));
      return;
    }

    setEngagement(prev => {
      const current = prev[blogId] || { views: 0, likedBy: [] };
      return {
        ...prev,
        [blogId]: { ...current, views: (current.views || 0) + 1 },
      };
    });
  }, [localBlogs]);

  const toggleLike = useCallback((blogId, userId) => {
    if (!userId) return null;

    const isLocal = localBlogs.some(b => b.id === blogId);
    if (isLocal) {
      let result = null;
      setLocalBlogs(prev => prev.map(b => {
        if (b.id !== blogId) return b;
        const likedBy = b.likedBy || [];
        const alreadyLiked = likedBy.includes(userId);
        const newLikedBy = alreadyLiked
          ? likedBy.filter(id => id !== userId)
          : [...likedBy, userId];
        result = { liked: !alreadyLiked, likes: newLikedBy.length };
        return { ...b, likedBy: newLikedBy, likes: newLikedBy.length };
      }));
      return result;
    }

    let result = null;
    setEngagement(prev => {
      const current = prev[blogId] || { views: 0, likedBy: [] };
      const likedBy = current.likedBy || [];
      const alreadyLiked = likedBy.includes(userId);
      const newLikedBy = alreadyLiked
        ? likedBy.filter(id => id !== userId)
        : [...likedBy, userId];
      result = { liked: !alreadyLiked, likes: newLikedBy.length };
      return {
        ...prev,
        [blogId]: { ...current, likedBy: newLikedBy },
      };
    });
    return result;
  }, [localBlogs]);

  const hasUserLiked = useCallback((blogId, userId) => {
    if (!userId) return false;
    const blog = allBlogs.find(b => b.id === blogId);
    return (blog?.likedBy || []).includes(userId);
  }, [allBlogs]);

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

  // Global stats (public site)
  const stats = {
    totalBlogs: allBlogs.length,
    totalCategories: categories.length,
    totalAuthors: new Set(allBlogs.map(b => b.author?.name)).size,
    totalViews: allBlogs.reduce((sum, b) => sum + (b.views || 0), 0),
  };

  // Per-user dashboard stats (updates in real time as blogs are added/edited/deleted)
  const userStats = useMemo(() => {
    const totalViews = userBlogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const totalLikes = userBlogs.reduce((sum, b) => sum + (b.likes || 0), 0);
    const categoriesUsed = new Set(userBlogs.map(b => b.category).filter(Boolean)).size;

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const blogsThisMonth = userBlogs.filter(b => {
      const d = new Date(b.createdAt);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).length;
    const blogsLastMonth = userBlogs.filter(b => {
      const d = new Date(b.createdAt);
      return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear();
    }).length;
    const monthlyGrowth = blogsLastMonth === 0
      ? (blogsThisMonth > 0 ? 100 : 0)
      : Math.round(((blogsThisMonth - blogsLastMonth) / blogsLastMonth) * 100);

    return {
      totalBlogs: userBlogs.length,
      totalViews,
      totalLikes,
      categoriesUsed,
      monthlyGrowth,
    };
  }, [userBlogs]);

  return (
    <BlogContext.Provider value={{
      allBlogs, filteredBlogs, paginatedBlogs, localBlogs, apiBlogs, userBlogs,
      categories, loading, error, stats, userStats,
      searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
      sortBy, setSortBy, currentPage, setCurrentPage, totalPages, postsPerPage,
      addBlog, updateBlog, deleteBlog, deleteUserBlogs, getBlogById,
      incrementViews, toggleLike, hasUserLiked,
      addCategory, updateCategory, deleteCategory,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
