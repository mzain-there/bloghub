import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary'
        : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
    }`;

  // Custom Logo: A Book overlayed with connection nodes representing BlogHub
  const BlogHubLogo = () => (
    <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md transform group-hover:scale-105 transition-transform duration-200">
      <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'glass' : 'glass-light'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <BlogHubLogo />
            <span className="text-xl font-bold gradient-text">BlogHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-700 text-slate-300' : 'hover:bg-slate-200 text-slate-600'}`}>
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/dashboard/settings')}
                  className="shrink-0"
                  title="Edit profile"
                >
                  {currentUser?.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt=""
                      className="w-9 h-9 rounded-xl object-cover border-2 border-transparent hover:border-primary transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-sm text-white font-medium border-2 border-transparent hover:border-primary transition-colors">
                      {getInitials(currentUser?.fullName)}
                    </div>
                  )}
                </button>
                <button onClick={() => { logout(); navigate('/'); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white hover:bg-dark-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white hover:bg-dark-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}>
                  Login
                </button>
                <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDark ? 'border-white/10 bg-dark-900/95' : 'border-slate-200 bg-white/95'} backdrop-blur-xl`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : isDark ? 'text-slate-300 hover:bg-dark-700' : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/10 space-y-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => { navigate('/dashboard/settings'); setMobileOpen(false); }}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 ${isDark ? 'text-slate-300 hover:bg-dark-700' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {currentUser?.profilePicture ? (
                        <img src={currentUser.profilePicture} alt="" className="w-9 h-9 rounded-xl object-cover border-2 border-primary" />
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-sm text-white font-medium">
                          {getInitials(currentUser?.fullName)}
                        </div>
                      )}
                      <span>Profile</span>
                    </button>
                    <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className={`w-full px-4 py-3 rounded-lg text-sm font-medium ${isDark ? 'text-slate-300 hover:bg-dark-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                      Login
                    </button>
                    <button onClick={() => { navigate('/signup'); setMobileOpen(false); }} className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium">
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
