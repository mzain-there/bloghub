import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUsers, FiUserMinus } from 'react-icons/fi';

const Login = () => {
  const { isDark } = useTheme();
  const { login, savedAccounts, switchAccount, removeAccount, checkEmailExists, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAccountList, setShowAccountList] = useState(false);

  // Forgot Password flow states
  const [mode, setMode] = useState('login'); // 'login' | 'forgot_email' | 'forgot_reset'
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = login(email.trim().toLowerCase(), password);
    if (res.success) {
      toast.success(res.message);
      navigate('/dashboard');
    } else {
      toast.error(res.message);
      setErrors({ form: res.message });
    }
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    const res = checkEmailExists(forgotEmail);
    if (res.success) {
      toast.success('Email verified. Enter your new password below.');
      setErrors({});
      setMode('forgot_reset');
    } else {
      toast.error(res.message);
      setErrors({ forgotEmail: res.message });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!newPassword) newErrors.newPassword = 'New password is required';
    else if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your new password';
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = resetPassword(forgotEmail, newPassword);
    if (res.success) {
      toast.success(res.message);
      // Reset form states
      setForgotEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      setMode('login');
    } else {
      toast.error(res.message);
      setErrors({ reset: res.message });
    }
  };

  const handleSavedAccountClick = (id) => {
    const res = switchAccount(id);
    if (res.success) {
      toast.success(res.message);
      navigate('/dashboard');
    } else {
      toast.error(res.message);
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
    <div className={`min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <BlogHubLogo />
            <span className="text-2xl font-bold gradient-text">BlogHub</span>
          </Link>
          <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'forgot_email' && 'Reset your password'}
            {mode === 'forgot_reset' && 'Choose a new password'}
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {mode === 'login' ? (
              <>
                Or{' '}
                <Link to="/signup" className="font-semibold text-primary hover:text-primary-light">
                  create a new account
                </Link>
              </>
            ) : mode === 'forgot_email' ? (
              'Enter your registered email address below'
            ) : (
              'Create a secure password for your account'
            )}
          </p>
        </div>

        {/* Toggle Saved Accounts */}
        {mode === 'login' && savedAccounts.length > 0 && (
          <div className="flex justify-center">
            <button 
              onClick={() => setShowAccountList(!showAccountList)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                isDark ? 'bg-dark-800 text-slate-300 border-white/5 hover:bg-dark-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FiUsers /> {showAccountList ? 'Use Email / Password' : `Saved Accounts (${savedAccounts.length})`}
            </button>
          </div>
        )}

        <motion.div 
          layout
          className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-xl`}
        >
          {mode === 'login' && showAccountList && savedAccounts.length > 0 ? (
            /* Saved Accounts List */
            <div className="space-y-4">
              <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Switch Account
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {savedAccounts.map(account => (
                  <div 
                    key={account.id}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                      isDark ? 'bg-dark-700 border-white/5 hover:border-primary/30' : 'bg-slate-50 border-slate-200 hover:border-primary/30'
                    }`}
                  >
                    <div 
                      onClick={() => handleSavedAccountClick(account.id)}
                      className="flex items-center gap-3 flex-1"
                    >
                      {account.profilePicture ? (
                        <img 
                          src={account.profilePicture} 
                          alt="" 
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-xs font-bold text-white">
                          {account.fullName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {account.fullName}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {account.email}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeAccount(account.id)}
                      className="text-slate-400 hover:text-danger p-1"
                      title="Remove saved account info"
                    >
                      <FiUserMinus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : mode === 'forgot_email' ? (
            /* Forgot Password: Enter Email */
            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Email Address
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.forgotEmail ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiMail className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type="email" 
                    value={forgotEmail}
                    onChange={e => { setForgotEmail(e.target.value); if (errors.forgotEmail) setErrors(prev => ({ ...prev, forgotEmail: '' })); }}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.forgotEmail && <span className="text-xs text-danger mt-1 block">{errors.forgotEmail}</span>}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm"
                >
                  Verify Email
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setMode('login');
                    setErrors({});
                  }}
                  className={`w-full py-3 text-center text-sm font-semibold rounded-xl border transition-all ${
                    isDark ? 'bg-dark-700 text-slate-300 border-white/5 hover:bg-dark-600 hover:text-white' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : mode === 'forgot_reset' ? (
            /* Forgot Password: Enter New Password */
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  New Password
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.newPassword ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value); if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' })); }}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}
                  >
                    {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.newPassword && <span className="text-xs text-danger mt-1 block">{errors.newPassword}</span>}
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Confirm New Password
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.confirmPassword ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' })); }}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}
                  >
                    {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-xs text-danger mt-1 block">{errors.confirmPassword}</span>}
              </div>

              {errors.reset && <span className="text-xs text-danger block">{errors.reset}</span>}

              <div className="flex flex-col gap-3">
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm"
                >
                  Reset Password
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setMode('forgot_email');
                    setErrors({});
                  }}
                  className={`w-full py-3 text-center text-sm font-semibold rounded-xl border transition-all ${
                    isDark ? 'bg-dark-700 text-slate-300 border-white/5 hover:bg-dark-600 hover:text-white' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            /* Email & Password Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && <span className="text-xs text-danger mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Password
                </label>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  errors.password ? 'border-danger' : isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                    className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="text-xs text-danger mt-1 block">{errors.password}</span>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Remember me
                  </span>
                </label>
                <button 
                  type="button" 
                  onClick={() => {
                    setMode('forgot_email');
                    setErrors({});
                  }}
                  className="text-xs font-semibold text-primary hover:text-primary-light"
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm"
              >
                Sign In
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
