import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

const TopNavbar = ({ onMenuClick, onProfileClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/blogs?search=${searchQuery}`);
    }
  };

  return (
    <header className={`sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 border-b ${isDark ? 'bg-dark-900/80 border-white/5 backdrop-blur-xl' : 'bg-white/80 border-slate-200 backdrop-blur-xl'}`}>
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className={`lg:hidden p-2 rounded-lg ${isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
          <FiMenu size={20} />
        </button>
        <Link to="/" className={`hidden sm:block text-lg font-bold group hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-slate-900'}`}>
          BlogHub
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-dark-700 border border-white/5' : 'bg-slate-100 border border-slate-200'}`}>
            <FiSearch className={isDark ? 'text-slate-500' : 'text-slate-400'} size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-sm w-48 ${isDark ? 'text-slate-200 placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`}
            />
          </div>
        </form>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className={`p-2 rounded-xl transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
        <button onClick={() => navigate('/dashboard/settings')} className={`p-2 rounded-xl transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
          <FiSettings size={18} />
        </button>

        {/* Avatar */}
        <button onClick={onProfileClick} className="ml-1">
          {currentUser?.profilePicture ? (
            <img src={currentUser.profilePicture} alt="" className="w-9 h-9 rounded-xl object-cover border-2 border-transparent hover:border-primary transition-colors" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-sm text-white font-medium">
              {getInitials(currentUser?.fullName)}
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
