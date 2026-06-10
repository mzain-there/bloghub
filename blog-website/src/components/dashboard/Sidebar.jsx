import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiFileText, FiPlusCircle, FiGrid, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiX } from 'react-icons/fi';
import { SiReact } from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard', end: true },
  { name: 'Blogs', icon: FiFileText, path: '/dashboard/blogs', end: true },
  { name: 'Add Blog', icon: FiPlusCircle, path: '/dashboard/blogs/add', end: true },
  { name: 'Categories', icon: FiGrid, path: '/dashboard/categories', end: true },
  { name: 'Settings', icon: FiSettings, path: '/dashboard/settings', end: true },
];

const Sidebar = ({ isOpen, onClose, collapsed, setCollapsed }) => {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary border-l-2 border-primary'
        : isDark
          ? 'text-slate-400 hover:text-white hover:bg-dark-600/50'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const BlogHubLogo = () => (
    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <circle cx="10" cy="8" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <circle cx="11" cy="16" r="1.5" fill="currentColor" />
        <line x1="10.5" y1="8.5" x2="14.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14.5" y1="12.5" x2="11.5" y2="15.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center justify-between h-16 px-4 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <BlogHubLogo />
          {!collapsed && <span className="text-lg font-bold gradient-text">BlogHub</span>}
        </Link>
        <button onClick={onClose} className={`lg:hidden p-1 rounded-lg ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
          <FiX size={20} />
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className={`hidden lg:block p-1 rounded-lg ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
          <FiChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={linkClass}
            onClick={onClose}
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className={`p-3 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-danger hover:bg-danger/5' : 'text-slate-500 hover:text-danger hover:bg-danger/5'}`}>
          <FiLogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'} ${isDark ? 'bg-dark-800 border-r border-white/5' : 'bg-white border-r border-slate-200'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`lg:hidden fixed top-0 left-0 h-screen w-64 z-50 ${isDark ? 'bg-dark-800' : 'bg-white'}`}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
