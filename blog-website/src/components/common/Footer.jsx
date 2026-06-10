import { Link } from 'react-router-dom';
import { SiReact } from 'react-icons/si';
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', path: '/about' },
      { name: 'Blog', path: '/blogs' },
      { name: 'Pricing', path: '#' },
      { name: 'Changelog', path: '#' },
    ],
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '#' },
      { name: 'Contact', path: '/contact' },
      { name: 'Press', path: '#' },
    ],
    Resources: [
      { name: 'Documentation', path: '#' },
      { name: 'Help Center', path: '#' },
      { name: 'Community', path: '#' },
      { name: 'Templates', path: '#' },
    ],
    Legal: [
      { name: 'Privacy', path: '#' },
      { name: 'Terms', path: '#' },
      { name: 'Cookies', path: '#' },
      { name: 'License', path: '#' },
    ],
  };

  const socials = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className={`border-t ${isDark ? 'border-white/5 bg-dark-900' : 'border-slate-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <SiReact className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold gradient-text">BlogHub</span>
            </Link>
            <p className={`text-sm mb-6 max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              A premium blog platform for creators and readers. Share your stories with the world.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 ${isDark ? 'bg-dark-700 text-slate-400 hover:text-primary hover:bg-dark-600' : 'bg-slate-100 text-slate-500 hover:text-primary hover:bg-slate-200'}`}>
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            © {year} BlogHub. All rights reserved.
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Built by M Zain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
