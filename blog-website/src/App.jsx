import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// Admin / Dashboard Pages
import DashboardHome from './pages/admin/DashboardHome';
import BlogManage from './pages/admin/BlogManage';
import BlogForm from './pages/admin/BlogForm';
import CategoryManage from './pages/admin/CategoryManage';
import Settings from './pages/Settings/Settings';

// Error Boundary
import ErrorBoundary from './components/common/ErrorBoundary';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public pages - require authentication */}
      <Route path="/" element={isAuthenticated ? <PublicLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth Routes - always accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Routes - publicly accessible */}
      <Route 
        path="/dashboard" 
        element={<DashboardLayout />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="blogs" element={<BlogManage />} />
        <Route path="blogs/add" element={<BlogForm />} />
        <Route path="blogs/edit/:id" element={<BlogForm />} />
        <Route path="categories" element={<CategoryManage />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BlogProvider>
            <BrowserRouter>
              <AppRoutes />
              {/* Notification System */}
              <ToastContainer 
              position="top-right" 
              autoClose={3000} 
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            </BrowserRouter>
          </BlogProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
