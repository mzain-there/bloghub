import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/helpers';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Have any questions or feedback? We'd love to hear from you. Drop us a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Info Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-md`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Email Us</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>mzainthere@gmail.com</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-md`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Call Us</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>+1 (555) 000-0000</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-md`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Our Office</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Sector I-8, Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                        errors.name 
                          ? 'border-danger focus:border-danger' 
                          : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs text-danger mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                        errors.email 
                          ? 'border-danger focus:border-danger' 
                          : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-danger mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                      errors.subject 
                        ? 'border-danger focus:border-danger' 
                        : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                    }`}
                    placeholder="Feedback regarding Blogs"
                  />
                  {errors.subject && <span className="text-xs text-danger mt-1 block">{errors.subject}</span>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Message
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors resize-none ${
                      errors.message 
                        ? 'border-danger focus:border-danger' 
                        : isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                    }`}
                    placeholder="Your message details here..."
                  />
                  {errors.message && <span className="text-xs text-danger mt-1 block">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend size={16} />
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
