import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', type = 'danger' }) => {
  const { isDark } = useTheme();
  const colors = {
    danger: { bg: 'bg-danger/10', text: 'text-danger', btn: 'bg-danger hover:bg-danger-dark' },
    warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', btn: 'bg-yellow-500 hover:bg-yellow-600' },
    info: { bg: 'bg-primary/10', text: 'text-primary', btn: 'bg-primary hover:bg-primary-dark' },
  };
  const c = colors[type] || colors.danger;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-dark-800 border border-white/10' : 'bg-white border border-slate-200'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                <FiAlertTriangle className={`text-xl ${c.text}`} />
              </div>
              <button onClick={onClose} className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                <FiX size={20} />
              </button>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{message}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={onClose} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDark ? 'bg-dark-700 text-slate-300 hover:bg-dark-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                Cancel
              </button>
              <button onClick={onConfirm} className={`px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all ${c.btn}`}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
