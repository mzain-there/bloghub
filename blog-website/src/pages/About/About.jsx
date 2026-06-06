import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { teamMembers, technologies } from '../../data/teamMembers';
import { FiX } from 'react-icons/fi';

const About = () => {
  const { isDark } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            About <span className="gradient-text">BlogHub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            BlogHub is a state-of-the-art blog platform built for creators, engineers, and thinkers. Our mission is to democratize online publishing with a smooth, professional, and customizable writing ecosystem.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Our Mission</h3>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              To empower voices globally by offering an intuitive, high-performance platform for writing, reading, and engaging with content. We remove backend friction so writers can focus on what they do best: creating.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'} shadow-lg`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Our Vision</h3>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              To become the ultimate workspace for writers and publishers—blending premium aesthetics, speed, security, and collaborative tools.
            </p>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <h3 className={`text-3xl font-bold text-center mb-10 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Technologies We Used
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm ${
                  isDark ? 'bg-dark-800 text-primary border border-white/5' : 'bg-white text-primary border border-slate-200'
                } shadow-sm`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Meet Our Creative Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMember(member)}
                className={`p-6 rounded-2xl text-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ${
                  isDark ? 'bg-dark-800 border border-white/5 hover:border-primary/30' : 'bg-white border border-slate-200 hover:border-primary/30'
                } shadow-md hover:shadow-xl`}
              >
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
                />
                <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{member.name}</h4>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Team Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-md p-8 overflow-hidden rounded-2xl shadow-2xl text-center ${
                isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'
              }`}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <FiX size={18} />
              </button>
              
              <img 
                src={selectedMember.avatar} 
                alt={selectedMember.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
              />
              
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedMember.name}</h3>
              <p className="text-primary text-sm font-semibold mb-4">{selectedMember.role}</p>
              
              <div className={`text-left p-4 rounded-xl text-sm leading-relaxed ${
                isDark ? 'bg-dark-900/50 text-slate-300' : 'bg-slate-50 text-slate-600'
              }`}>
                <p className="font-semibold mb-2 text-xs uppercase tracking-wider text-primary">About {selectedMember.name.split(' ')[0]}</p>
                <p>{selectedMember.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
