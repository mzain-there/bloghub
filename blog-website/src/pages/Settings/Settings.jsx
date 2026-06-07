import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/common/Breadcrumb';
import ConfirmModal from '../../components/common/ConfirmModal';
import { FiUser, FiMail, FiLock, FiSun, FiMoon, FiTrash2, FiLogOut } from 'react-icons/fi';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, updateProfile, changePassword, deleteAccount, logout } = useAuth();
  const { deleteUserBlogs } = useBlog();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || ''
  });

  const [pwdData, setPwdData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!profileData.fullName.trim() || !profileData.email.trim()) {
      toast.warning('Name and Email are required');
      return;
    }
    const res = updateProfile(profileData);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!pwdData.currentPassword || !pwdData.newPassword) {
      toast.warning('All password fields are required');
      return;
    }
    if (pwdData.newPassword !== pwdData.confirmNewPassword) {
      toast.warning('New passwords do not match');
      return;
    }
    const res = changePassword(pwdData.currentPassword, pwdData.newPassword);
    if (res.success) {
      toast.success(res.message);
      setPwdData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteAccount = () => {
    if (currentUser) {
      deleteUserBlogs(currentUser.id);
    }
    deleteAccount();
    toast.success('Your account and all your blogs have been deleted permanently');
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Settings' }]} />
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Settings</h1>
      </div>

      {/* Account Settings */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Account Settings</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Full Name
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiUser className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  value={profileData.fullName}
                  onChange={e => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Email Address
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiMail className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="email" 
                  value={profileData.email}
                  onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
          </div>
          <button 
            type="submit"
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all text-xs"
          >
            Update Account Info
          </button>
        </form>
      </div>

      {/* Security settings: Password */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Current Password
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="password" 
                  value={pwdData.currentPassword}
                  onChange={e => setPwdData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="••••••••"
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                New Password
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="password" 
                  value={pwdData.newPassword}
                  onChange={e => setPwdData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="••••••••"
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Confirm New Password
              </label>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isDark ? 'bg-dark-700 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FiLock className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="password" 
                  value={pwdData.confirmNewPassword}
                  onChange={e => setPwdData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                  placeholder="••••••••"
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? 'text-white' : 'text-slate-800'}`}
                />
              </div>
            </div>
          </div>
          <button 
            type="submit"
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all text-xs"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Appearance Settings */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg flex items-center justify-between`}>
        <div>
          <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Appearance Mode</h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Switch between light and dark modes instantly.</p>
        </div>
        <button 
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
            isDark ? 'bg-dark-700 text-white border-white/10 hover:bg-dark-600' : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
          }`}
        >
          {isDark ? <><FiSun /> Light Mode</> : <><FiMoon /> Dark Mode</>}
        </button>
      </div>

      {/* Security & Danger Zone */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-danger/10' : 'bg-white border border-danger/20'} shadow-lg space-y-4`}>
        <h3 className="text-lg font-semibold text-danger">Danger Zone</h3>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Once you delete your account, there is no going back. All local blogs and dashboard data associated with this user will be removed.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            <FiLogOut /> Logout Session
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-danger hover:bg-danger-dark text-white font-semibold rounded-xl text-xs transition-colors"
          >
            <FiTrash2 /> Delete Account Permanently
          </button>
        </div>
      </div>

      {/* Delete Account confirmation modal */}
      <ConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Your Account"
        message="Are you sure you want to delete your account permanently? This action is irreversible and all your data will be cleared."
        confirmText="Confirm Delete"
        type="danger"
      />

    </div>
  );
};

export default Settings;
