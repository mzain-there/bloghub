import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateId, validateEmail } from '../utils/helpers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const USERS_KEY = 'bloghub_users';
const SESSION_KEY = 'bloghub_session';
const ACCOUNTS_KEY = 'bloghub_accounts';

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  });

  const [savedAccounts, setSavedAccounts] = useState(() => {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(SESSION_KEY);
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(savedAccounts));
  }, [savedAccounts]);

  const signup = useCallback((userData) => {
    const { fullName, username, email, password, profilePicture } = userData;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    if (!fullName?.trim() || !normalizedUsername || !normalizedEmail || !password) {
      return { success: false, message: 'All fields are required' };
    }
    if (!validateEmail(normalizedEmail)) {
      return { success: false, message: 'Invalid email address' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    if (users.find(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'An account with this email already exists' };
    }
    if (users.find(u => u.username.toLowerCase() === normalizedUsername.toLowerCase())) {
      return { success: false, message: 'Username already taken' };
    }

    const newUser = {
      id: generateId(),
      fullName: fullName.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      profilePicture: profilePicture || '',
      bio: '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    setUsers(prev => [...prev, newUser]);
    
    // Auto-login the new user
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    
    return { success: true, message: 'Account created successfully!' };
  }, [users]);

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { success: false, message: 'All fields are required' };
    }
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

    const { password: _, ...safeUser } = updatedUser;
    setCurrentUser(safeUser);

    if (!savedAccounts.find(a => a.id === user.id)) {
      setSavedAccounts(prev => [...prev, { id: user.id, fullName: user.fullName, email: user.email, profilePicture: user.profilePicture }]);
    }

    return { success: true, message: 'Login successful!' };
  }, [users, savedAccounts]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const switchAccount = useCallback((accountId) => {
    const user = users.find(u => u.id === accountId);
    if (user) {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      const { password: _, ...safeUser } = updatedUser;
      setCurrentUser(safeUser);
      return { success: true, message: `Switched to ${user.fullName}` };
    }
    return { success: false, message: 'Account not found' };
  }, [users]);

  const updateProfile = useCallback((updates) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    setSavedAccounts(prev => prev.map(a => a.id === currentUser.id ? { ...a, fullName: updatedUser.fullName, email: updatedUser.email, profilePicture: updatedUser.profilePicture } : a));

    return { success: true, message: 'Profile updated!' };
  }, [currentUser]);

  const changePassword = useCallback((currentPassword, newPassword) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    const user = users.find(u => u.id === currentUser.id);
    if (user.password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters' };
    }

    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, password: newPassword } : u));
    return { success: true, message: 'Password changed successfully!' };
  }, [currentUser, users]);

  const deleteAccount = useCallback(() => {
    if (!currentUser) return;
    setUsers(prev => prev.filter(u => u.id !== currentUser.id));
    setSavedAccounts(prev => prev.filter(a => a.id !== currentUser.id));
    setCurrentUser(null);
  }, [currentUser]);

  const removeAccount = useCallback((accountId) => {
    setSavedAccounts(prev => prev.filter(a => a.id !== accountId));
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser, isAuthenticated, users, savedAccounts,
      signup, login, logout, switchAccount,
      updateProfile, changePassword, deleteAccount, removeAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
