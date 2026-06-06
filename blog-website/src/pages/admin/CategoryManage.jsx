import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/common/Breadcrumb';
import ConfirmModal from '../../components/common/ConfirmModal';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const CategoryManage = () => {
  const { isDark } = useTheme();
  const { categories, addCategory, updateCategory, deleteCategory } = useBlog();

  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      toast.warning('Category name cannot be empty');
      return;
    }
    if (categories.find(c => c.name.toLowerCase() === newCatName.trim().toLowerCase())) {
      toast.warning('Category already exists');
      return;
    }
    addCategory(newCatName.trim());
    toast.success('Category added successfully!');
    setNewCatName('');
  };

  const handleSaveEdit = (id) => {
    if (!editingName.trim()) {
      toast.warning('Category name cannot be empty');
      return;
    }
    updateCategory(id, editingName.trim());
    toast.success('Category updated successfully!');
    setEditingId(null);
    setEditingName('');
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      toast.success('Category deleted successfully!');
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div>
        <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Categories' }]} />
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Manage Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Add Form */}
        <div className="md:col-span-1">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Add Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Category Name
                </label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="e.g. Serverless"
                  className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                    isDark ? 'bg-dark-700 border-white/10 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'
                  }`}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <FiPlus /> Add Category
              </button>
            </form>
          </div>
        </div>

        {/* List Categories */}
        <div className="md:col-span-2">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Category Listing</h3>
            
            <div className="space-y-3">
              {categories.map(cat => (
                <div 
                  key={cat.id} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark ? 'bg-dark-700/50 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2 flex-1 mr-4">
                      <input 
                        type="text" 
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        className={`w-full px-3 py-1.5 rounded-lg border outline-none text-sm ${
                          isDark ? 'bg-dark-600 border-white/10 text-white focus:border-primary' : 'bg-white border-slate-200 text-slate-800 focus:border-primary'
                        }`}
                      />
                      <button 
                        onClick={() => handleSaveEdit(cat.id)}
                        className="p-2 bg-success text-white rounded-lg hover:bg-success-dark transition-colors"
                      >
                        <FiSave size={16} />
                      </button>
                      <button 
                        onClick={() => { setEditingId(null); setEditingName(''); }}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-dark-600 text-slate-300' : 'bg-slate-200 text-slate-600'}`}
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color || '#3B82F6' }} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {cat.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                          className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-dark-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={() => setDeleteId(cat.id)}
                          className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-danger hover:bg-danger/10' : 'text-slate-500 hover:text-danger hover:bg-danger/10'}`}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Delete Modal */}
      <ConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to permanently delete this category? This will delete the category structure."
        confirmText="Yes, Delete"
        type="danger"
      />

    </div>
  );
};

export default CategoryManage;
