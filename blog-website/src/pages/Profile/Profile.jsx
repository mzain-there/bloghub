import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/common/Breadcrumb';
import { FiSave, FiUser, FiMail, FiFileText, FiImage } from 'react-icons/fi';

const Profile = () => {
  const { isDark } = useTheme();
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    profilePicture: currentUser?.profilePicture || '',
    bio: currentUser?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim()) {
      toast.warning('All fields except Bio and Profile Picture are required');
      return;
    }

    const res = updateProfile(formData);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Profile' }]} />
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Edit Profile</h1>
      </div>

      <div className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Avatar Preview Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
            <div className={`w-24 h-24 rounded-2xl border-2 border-primary overflow-hidden flex items-center justify-center bg-slate-100 ${isDark ? 'bg-dark-700' : ''}`}>
              {formData.profilePicture ? (
                <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FiUser size={36} className="text-slate-400" />
              )}
            </div>
            <div className="flex-1 w-full space-y-2">
              <label className={`block text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Profile Picture URL
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiImage className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className={`bg-transparent outline-none text-xs w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Full Name
              </label>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiUser className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Username
              </label>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiUser className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
              isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <FiMail className={isDark ? 'text-slate-500' : 'text-slate-400'} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Bio / Short Description
            </label>
            <div className={`flex items-start gap-2 px-4 py-3 rounded-xl border ${
              isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <FiFileText className={`mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself..."
                className={`bg-transparent outline-none text-sm w-full resize-none ${isDark ? 'text-white' : 'text-slate-800'}`}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2"
          >
            <FiSave size={16} /> Save Profile
          </button>
        </form>
      </div>

    </div>
  );
};

export default Profile;
