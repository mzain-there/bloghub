import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiUser, FiMail, FiFileText, FiImage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { getInitials } from '../../utils/helpers';

const ProfileModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    profilePicture: '',
    bio: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        profilePicture: currentUser.profilePicture || '',
        bio: currentUser.bio || ''
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warning('Profile picture must be smaller than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
        toast.success('Profile picture loaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim()) {
      toast.warning('All fields except Bio are required');
      return;
    }

    const res = updateProfile(formData);
    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl ${
              isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-white/5 bg-dark-900/50' : 'border-slate-100 bg-slate-50'
            }`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Edit Profile
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {/* Profile Picture Upload Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
                <div className={`relative w-24 h-24 rounded-2xl border-2 border-primary overflow-hidden flex items-center justify-center bg-slate-100 ${isDark ? 'bg-dark-700' : ''}`}>
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-white text-3xl font-bold">
                      {getInitials(formData.fullName || currentUser?.fullName)}
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className={`block text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Profile Picture (Media Upload)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-upload"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        isDark ? 'bg-dark-700 border-white/10 text-white hover:bg-dark-600' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <FiImage /> Choose Image
                    </label>
                    {formData.profilePicture && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
                        className="text-xs text-danger hover:underline"
                      >
                        Remove
                      </button>
                    )}
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

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    isDark ? 'text-slate-300 hover:bg-dark-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center gap-2"
                >
                  <FiSave size={16} /> Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
