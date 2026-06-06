import { FaGlobe, FaHeart, FaUtensils, FaUsers, FaWallet, FaMedkit, FaBriefcase, FaTools, FaLightbulb, FaBook } from 'react-icons/fa';

export const defaultCategories = [
  { id: 1, name: 'Lifestyle', icon: FaHeart, color: '#EC4899', count: 12 },
  { id: 2, name: 'Travel & Adventure', icon: FaGlobe, color: '#3B82F6', count: 15 },
  { id: 3, name: 'Food & Cooking', icon: FaUtensils, color: '#F59E0B', count: 8 },
  { id: 4, name: 'Relationships & Family', icon: FaUsers, color: '#10B981', count: 10 },
  { id: 5, name: 'Personal Finance', icon: FaWallet, color: '#8B5CF6', count: 7 },
  { id: 6, name: 'Health & Wellness', icon: FaMedkit, color: '#EF4444', count: 9 },
  { id: 7, name: 'Career & Business', icon: FaBriefcase, color: '#06B6D4', count: 11 },
  { id: 8, name: 'Hobbies & DIY', icon: FaTools, color: '#F97316', count: 6 },
  { id: 9, name: 'Self Improvement', icon: FaLightbulb, color: '#EAB308', count: 14 },
  { id: 10, name: 'Education & Learning', icon: FaBook, color: '#6366F1', count: 13 },
];

export const categoryNames = defaultCategories.map(c => c.name);
