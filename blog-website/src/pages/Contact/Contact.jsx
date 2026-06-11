import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/helpers';
import {
  FiMail, FiMapPin, FiPhone, FiSend,
  FiClock, FiMessageSquare, FiHelpCircle, FiZap,
} from 'react-icons/fi';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Replace these with your actual EmailJS credentials:
//   Service ID  → EmailJS dashboard → Email Services
//   Template ID → EmailJS dashboard → Email Templates
//   Public Key  → EmailJS dashboard → Account → Public Key
const EMAILJS_SERVICE_ID  = 'service_lr4lkso';
const EMAILJS_TEMPLATE_ID = 'template_tm4fumj';
const EMAILJS_PUBLIC_KEY  = 'yEwbOeWR6v-JSfloG';
// ─────────────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: FiMail,
    gradient: 'from-primary to-secondary',
    title: 'Email Us',
    detail: 'mzainthere@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'https://mail.google.com/mail/?view=cm&to=mzainthere@gmail.com&su=BlogHub%20Inquiry',
  },
  {
    icon: FiPhone,
    gradient: 'from-secondary to-cyan-400',
    title: 'Call Us',
    detail: '+92 300 000 0000',
    sub: 'Mon – Fri, 9 AM – 6 PM PKT',
  },
  {
    icon: FiMapPin,
    gradient: 'from-highlight to-orange-400',
    title: 'Our Office',
    detail: 'Sector I-8, Islamabad',
    sub: 'Pakistan',
  },
  {
    icon: FiClock,
    gradient: 'from-green-400 to-emerald-500',
    title: 'Support Hours',
    detail: 'Mon – Sat',
    sub: '9:00 AM – 8:00 PM PKT',
  },
];

const faqs = [
  {
    q: 'How do I publish my first blog?',
    a: 'Create an account, go to your Dashboard → Blogs → Add Blog, fill in the details, and hit Publish. It goes live instantly.',
  },
  {
    q: 'Is BlogHub free to use?',
    a: 'Yes — creating an account and publishing blogs is completely free. There are no hidden fees or paywalls.',
  },
  {
    q: 'Can I edit or delete my published blogs?',
    a: 'Absolutely. Head to Dashboard → Blogs, find the post, and use the Edit or Delete actions from the table.',
  },
  {
    q: 'How do I report inappropriate content?',
    a: 'Use the contact form on this page with the subject "Content Report" and we will review it within 48 hours.',
  },
];

const MAX_CHARS = 500;

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ from_name: '', from_email: '', feedback_type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Enforce character limit on message
    if (name === 'message' && value.length > MAX_CHARS) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    const errorKey = name === 'from_name' ? 'name' : name === 'from_email' ? 'email' : name;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.from_name.trim()) newErrors.name = 'Name is required';
    if (!formData.from_email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.from_email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.feedback_type) newErrors.feedback_type = 'Please select a feedback type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     formData.from_name,
          from_email:    formData.from_email,
          feedback_type: formData.feedback_type,
          message:       formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({ from_name: '', from_email: '', feedback_type: '', message: '' });
    } catch (error) {
      console.error('EmailJS error status:', error?.status);
      console.error('EmailJS error text:', error?.text);
      console.error('EmailJS full error:', error);
      toast.error(`Send failed: ${error?.text || error?.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
      errors[field]
        ? 'border-danger'
        : isDark
          ? 'bg-dark-700 border-white/10 text-white focus:border-primary'
          : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
    }`;

  const cardBase = `rounded-2xl border shadow-md ${isDark ? 'bg-dark-800 border-white/5' : 'bg-white border-slate-200'}`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>

      {/* ── Hero ── */}
      <section className="py-20 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary mb-6"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            We'd Love to <span className="gradient-text">Hear From You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Whether you have a question, feedback, or just want to say hello — our team is ready to help.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">

        {/* ── Contact Info Cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`block p-6 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-bold mb-1 text-white">{item.title}</h4>
                  <p className="text-sm font-medium text-white">{item.detail}</p>
                  <p className="text-xs mt-1 text-white/70">{item.sub}</p>
                </a>
              ) : (
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-bold mb-1 text-white">{item.title}</h4>
                  <p className="text-sm font-medium text-white">{item.detail}</p>
                  <p className="text-xs mt-1 text-white/70">{item.sub}</p>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* ── Form + Why Contact ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Why contact */}
          <div className="space-y-6">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiZap size={18} />
                </div>
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Fast Response</h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Our support team monitors messages throughout the day. Most inquiries are answered within a few hours.
              </p>
            </div>
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiMessageSquare size={18} />
                </div>
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>What to Write About</h4>
              </div>
              <ul className={`text-sm space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {['General questions', 'Feature suggestions', 'Bug reports', 'Partnership inquiries', 'Content complaints'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-2 ${cardBase} p-8`}
          >
            {submitted ? (
              /* ── Success Screen ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-green-400/15 flex items-center justify-center">
                  <span className="text-4xl">✅</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    Thank you for your feedback!
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    We'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors
                    bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Your Name</label>
                      <input type="text" name="from_name" value={formData.from_name} onChange={handleChange} className={inputClass('name')} placeholder="Jane Doe" />
                      {errors.name && <span className="text-xs text-danger mt-1 block">{errors.name}</span>}
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Your Email</label>
                      <input type="email" name="from_email" value={formData.from_email} onChange={handleChange} className={inputClass('email')} placeholder="jane@example.com" />
                      {errors.email && <span className="text-xs text-danger mt-1 block">{errors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Feedback Type</label>
                    <select
                      name="feedback_type"
                      value={formData.feedback_type}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                        errors.feedback_type
                          ? 'border-danger'
                          : isDark
                            ? 'bg-dark-700 border-white/10 text-white focus:border-primary'
                            : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                      }`}
                    >
                      <option value="" disabled>Select a feedback type...</option>
                      <option value="Bug Report">🐛 Bug Report</option>
                      <option value="Feature Request">✨ Feature Request</option>
                      <option value="General Feedback">💬 General Feedback</option>
                      <option value="Question">❓ Question</option>
                      <option value="Suggestion">💡 Suggestion</option>
                    </select>
                    {errors.feedback_type && <span className="text-xs text-danger mt-1 block">{errors.feedback_type}</span>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={`block text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Your Feedback</label>
                      <span className={`text-xs font-medium tabular-nums ${
                        formData.message.length >= MAX_CHARS
                          ? 'text-danger'
                          : formData.message.length >= MAX_CHARS * 0.8
                            ? 'text-yellow-400'
                            : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {formData.message.length} / {MAX_CHARS}
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      maxLength={MAX_CHARS}
                      className={inputClass('message')}
                      placeholder="Tell us what's on your mind..."
                    />
                    {errors.message && <span className="text-xs text-danger mt-1 block">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm disabled:opacity-70 min-w-[160px] justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <><FiSend size={15} /> Send Message</>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FiHelpCircle className="text-primary" size={22} />
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Quick answers to the most common questions.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`${cardBase} overflow-hidden`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold transition-colors ${isDark ? 'text-white hover:text-primary' : 'text-slate-800 hover:text-primary'}`}
                >
                  <span>{faq.q}</span>
                  <span className={`text-lg transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''} text-primary`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-6 pb-5 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
