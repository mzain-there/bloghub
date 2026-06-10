import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { teamMembers } from '../../data/teamMembers';
import { FiX, FiTwitter, FiGithub, FiLinkedin, FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const stats = [
  { label: 'Articles Published', value: '10,000+', icon: FiAward },
  { label: 'Active Readers', value: '250K+', icon: FiUsers },
  { label: 'Monthly Growth', value: '38%', icon: FiTrendingUp },
  { label: 'Categories Covered', value: '10+', icon: FiHeart },
];

const values = [
  {
    icon: FiTarget,
    title: 'Clarity First',
    description: 'We believe great writing starts with clear thinking. Every piece on BlogHub is crafted to inform, not overwhelm.',
  },
  {
    icon: FiHeart,
    title: 'Community Driven',
    description: 'Our readers and writers are at the center of everything. We build features shaped by real feedback, not assumptions.',
  },
  {
    icon: FiEye,
    title: 'Radical Transparency',
    description: 'No paywalls. No hidden agendas. Just honest, well-researched content published for everyone to access freely.',
  },
  {
    icon: FiTrendingUp,
    title: 'Continuous Growth',
    description: 'We push the boundaries of what a blog platform can be — constantly shipping improvements and new capabilities.',
  },
];

const About = () => {
  const { isDark } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  const cardBase = `rounded-2xl border shadow-md ${isDark ? 'bg-dark-800 border-white/5' : 'bg-white border-slate-200'}`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>

      {/* ── Hero ── */}
      <section className="py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Built for <span className="gradient-text">Writers.</span>
            <br />Loved by <span className="gradient-text">Readers.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            BlogHub was founded on a simple belief — every perspective deserves a platform. We set out to build a publishing experience that removes every obstacle between a writer's thoughts and their audience.
          </motion.p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className={`border-y ${isDark ? 'border-white/5 bg-dark-800/50' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200/20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
              >
                <stat.icon size={22} className="text-primary mb-1" />
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</span>
                <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Mission & Vision ── */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${cardBase} p-8`}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
              <FiTarget size={22} />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>Our Mission</h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              To empower voices globally by providing an intuitive, high-performance platform for writing, reading, and engaging with ideas. We eliminate backend complexity so creators can do what they do best.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${cardBase} p-8`}
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-5">
              <FiEye size={22} />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>Our Vision</h3>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              To become the world's most trusted independent publishing ecosystem — where premium aesthetics, fast performance, and thoughtful collaboration tools meet in one seamless workspace.
            </p>
          </motion.div>
        </section>

        {/* ── Core Values ── */}
        <section className="pb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>What We Stand For</h2>
            <p className={`mt-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>The principles that shape every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${cardBase} p-6 hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary mb-4">
                  <val.icon size={20} />
                </div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{val.title}</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{val.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section className="pb-24">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Meet the Team</h2>
            <p className={`mt-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>The people behind every word, pixel, and feature.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedMember(member)}
                className={`${cardBase} p-6 text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300`}
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary mx-auto"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{member.name}</h4>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.bio}</p>
                <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-slate-200/20">
                  {[FiTwitter, FiGithub, FiLinkedin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href={Object.values(member.social)[idx]}
                      onClick={e => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-500 hover:text-primary' : 'text-slate-400 hover:text-primary'}`}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Team Member Modal ── */}
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
              className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl text-center ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-slate-200'}`}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-dark-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                <FiX size={18} />
              </button>
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
              />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedMember.name}</h3>
              <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">{selectedMember.role}</p>
              <div className={`text-left p-4 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-dark-900/50 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                <p className="font-semibold mb-2 text-xs uppercase tracking-wider text-primary">About {selectedMember.name.split(' ')[0]}</p>
                <p>{selectedMember.description}</p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-5">
                {[FiTwitter, FiGithub, FiLinkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href={Object.values(selectedMember.social)[idx]}
                    className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-dark-700 text-slate-400 hover:text-primary' : 'bg-slate-100 text-slate-500 hover:text-primary'}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
