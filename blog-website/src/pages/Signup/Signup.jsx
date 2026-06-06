import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiImage } from 'react-icons/fi';

const Signup = () => {
  const { isDark } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  });
  const [errors, setErrors] = useState({});

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
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length > 0 && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = signup(formData);
    if (res.success) {
      toast.success(res.message);
      navigate('/');
    } else {
      toast.error(res.message);
      setErrors({ form: res.message });
    }
  };

  const BlogHubLogo = () => (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <BlogHubLogo />
            <span className="text-2xl font-bold gradient-text">BlogHub</span>
          </Link>
          <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-primary-light">
              Sign in
            </Link>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-xl`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Profile Picture Preview/Input */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className={`relative w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-slate-100 ${isDark ? 'bg-dark-700' : ''}`}>
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <FiImage size={24} className="text-slate-400" />
                )}
              </div>
              <input 
                type="file"
                id="signup-profile-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label 
                htmlFor="signup-profile-upload"
                className={`cursor-pointer text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  isDark ? 'bg-dark-700 border-white/10 text-white hover:bg-dark-600' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                Upload Profile Picture
              </label>
              {formData.profilePicture && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
                  className="text-xs text-danger hover:underline mt-0.5"
                >
                  Remove Picture
                </button>
              )}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Full Name
              </label>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                errors.fullName ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiUser className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <span className="text-xs text-danger mt-1 block">{errors.fullName}</span>}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Username
              </label>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                errors.username ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiUser className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                  placeholder="johndoe12"
                />
              </div>
              {errors.username && <span className="text-xs text-danger mt-1 block">{errors.username}</span>}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Email Address
              </label>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                errors.email ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiMail className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <span className="text-xs text-danger mt-1 block">{errors.email}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Password
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.password ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <span className="text-xs text-danger mt-1 block">{errors.password}</span>}
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Confirm
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.confirmPassword ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <span className="text-xs text-danger mt-1 block">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
