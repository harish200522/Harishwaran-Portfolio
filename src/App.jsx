import React, { useState, useEffect, useRef } from 'react';
import { 
  GitBranch as Github, 
  Mail, 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  ChevronRight,
  BookOpen,
  Terminal,
  MapPin,
  LayoutGrid,
  Zap,
  Sparkles,
  Calendar,
  User,
  GraduationCap,
  Briefcase,
  Award,
  ShieldCheck,
  X,
  ChevronLeft,
  Eye,
  ArrowUp,
  Sun,
  Moon,
  Send,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import heroImage from './assets/hero.png';

// ==================== IMAGE IMPORTS ====================
const sampleImageModules = import.meta.glob('./assets/image{1,2,3,4,5}/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default'
});

const sampleImagesByFolder = Object.entries(sampleImageModules).reduce((acc, [path, url]) => {
  const match = path.match(/assets\/(image[1-5])\//i);
  if (!match) return acc;
  const folder = match[1].toLowerCase();
  if (!acc[folder]) {
    acc[folder] = [];
  }
  acc[folder].push({ path, url });
  return acc;
}, {});

Object.keys(sampleImagesByFolder).forEach((folder) => {
  sampleImagesByFolder[folder] = sampleImagesByFolder[folder]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((item) => item.url);
});

// ==================== CONSTANTS ====================
const NAV_ITEMS = [
  { name: 'About', id: 'profile' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Certificates', id: 'certificates' },
  { name: 'Contact', id: 'contact' }
];

const TERMINAL_COMMANDS = [
  { command: 'npx cap sync android', output: '✓ Copying assets to Android project\n✓ Capacitor Android sync completed' },
  { command: 'node catalogue-server.js', output: '✓ INOUT Catalogue running on port 5000\n✓ Connected to PostgreSQL (Neon DB)' },
  { command: 'npm run build', output: '✓ vite v8.0.3 building client\n✓ dist/assets/index.js - 362 kB\n✓ Built successfully' },
  { command: 'git push origin main', output: '✓ Remote: github.com/harish200522/POS-System\n✓ Pushed 3 commits to branch main' },
  { command: 'python analyze_data.py', output: '✓ Connected to PostgreSQL database\n✓ Processed 1000+ entries\n✓ Analysis complete' }
];

const SKILLS_CATEGORIZED = {
  'Languages': ['Python', 'Java', 'JavaScript', 'SQL'],
  'Frameworks': ['React', 'Node.js'],
  'Databases': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  'Tools': ['Git', 'Netlify', 'VS Code', 'Hostinger', 'Vercel']
};

// ==================== COMPONENTS ====================

const TypingEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : 150, parseInt(Math.random() * 100)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-white border-r-2 border-slate-400 pr-1">
      {words[index].substring(0, subIndex)}
    </span>
  );
};

// Enhanced Terminal Component with animated commands
const AnimatedTerminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCommandIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
      setIsTyping(false);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { command, output } = TERMINAL_COMMANDS[currentCommandIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="p-6 sm:p-8 border border-cyan-500/30 rounded-2xl bg-[#0a1628]/40 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.15)]"
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-xs sm:text-sm text-cyan-400 space-y-2 min-h-[100px]">
          <div className="text-slate-500">~/portfolio $</div>
          <motion.div
            key={currentCommandIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-cyan-300 font-bold">{command}</div>
            <div className="text-green-400/80 mt-2 whitespace-pre-wrap">
              {output}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Glitch Effect for Name
const GlitchName = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.92] tracking-tighter uppercase">
        Harishwaran
        <motion.span
          animate={{ textShadow: ['0 0 0 rgba(0,188,212,0)', '0 0 10px rgba(0,188,212,0.5)', '0 0 0 rgba(0,188,212,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cyan-400 ml-2"
        >
          VS
        </motion.span>
      </h1>
    </motion.div>
  );
};

// Particle Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: -window.innerHeight,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Project Card
const ProjectCard = ({ project, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"></div>
      
      <div className="h-full p-6 sm:p-8 bg-[#1a1a1a] border border-white/5 rounded-3xl group-hover:border-cyan-500/30 transition-all duration-500 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <project.icon size={32} className="text-cyan-400" />
          {project.isUnderDevelopment && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Under Development
            </span>
          )}
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 uppercase tracking-tight">{project.title}</h3>
        
        <p className="text-slate-400 text-sm mb-4 flex-grow">{project.desc}</p>
        
        {project.impact && (
          <p className="text-cyan-400 text-xs font-bold mb-4 italic">💡 {project.impact}</p>
        )}
        
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="px-2 py-1 text-[8px] font-bold uppercase bg-white/5 border border-white/10 rounded-full text-slate-400">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-[8px] font-bold uppercase text-cyan-400">+{project.tech.length - 3} more</span>
            )}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="open-browser-btn"
            >
              <span>Open in Browser</span>
              <div className="iconButton">
                <Globe size={13} />
              </div>
            </a>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onOpen(project)}
            className="Documents-btn"
          >
            <span className="folderContainer">
              <svg className="fileBack" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="folderBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe066" />
                    <stop offset="100%" stopColor="#d48200" />
                  </linearGradient>
                </defs>
                <path d="M10 15h25l10 10h45a5 5 0 0 1 5 5v45a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V20a5 5 0 0 1 5-5z" fill="url(#folderBackGrad)" />
              </svg>
              <svg className="filePage" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="70" height="90" rx="5" fill="#ffffff" stroke="#e2e2eb" strokeWidth="2" />
                <path d="M20 30h40M20 45h40M20 60h25" stroke="#b0b0cc" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <svg className="fileFront" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="folderFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffea85" />
                    <stop offset="100%" stopColor="#f5a623" />
                  </linearGradient>
                </defs>
                <path d="M10 25h80a5 5 0 0 1 5 5v40a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V30a5 5 0 0 1 5-5z" fill="url(#folderFrontGrad)" />
              </svg>
            </span>
            <span className="text">See Sample</span>
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-github"
          >
            <FaGithub size={16} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Certificate Modal
const CertificateModal = ({ cert, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden ${(cert.pdfUrl || cert.imageUrl) ? 'w-full max-w-3xl' : 'p-8 max-w-md w-full'}`}
        >
          {cert.imageUrl ? (
            // Image viewer mode — clean lightbox
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight flex-1">{cert.title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white ml-4">
                  <X size={24} />
                </button>
              </div>
              <div className="w-full bg-[#0a0a0a] flex items-center justify-center p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-auto rounded-xl object-contain"
                  style={{ maxHeight: '75vh' }}
                />
              </div>
            </>
          ) : cert.pdfUrl ? (
            // PDF Viewer mode — clean embed like Google Drive
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight flex-1">{cert.title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white ml-4">
                  <X size={24} />
                </button>
              </div>
              <div className="w-full bg-[#111]" style={{ height: '80vh' }}>
                <iframe
                  src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title={cert.title}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </>
          ) : (
            // Score circle mode (existing certificates)
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight flex-1">{cert.title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Score</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="#00bcd4"
                          strokeWidth="8"
                          strokeDasharray="351.86"
                          initial={{ strokeDashoffset: 351.86 }}
                          animate={{ strokeDashoffset: 351.86 * (1 - cert.scorePercent / 100) }}
                          transition={{ duration: 1.5 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black text-cyan-400">{cert.score}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-300 font-bold mb-2">Performance</p>
                      <p className="text-slate-500 text-sm">{cert.description}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold uppercase rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);

    // Replace this string with your actual Web3Forms Access Key from https://web3forms.com/
    const accessKey = "39f329af-0826-4fca-9ceb-03a898e93fc7";

    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      // Mock submit simulation if key is not configured yet (degrades gracefully)
      setTimeout(() => {
        setLoading(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 4000);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Visitor",
          subject: `New Message from Portfolio: ${formData.name}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 5000);
      } else {
        throw new Error(data.message || "Failed to submit form.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setError(err.message || "Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-5 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
        />
      </div>
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows="6"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
      />
      {sent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-bold"
        >
          ✓ Message sent successfully!
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-bold"
        >
          ⚠ {error}
        </motion.div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-2"
      >
        <span>➤</span>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </motion.form>
  );
};

// Back to Top Button
const BackToTopButton = ({ isVisible, onClick }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-40 p-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full shadow-lg transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Dark/Light Mode Toggle
const ThemeToggle = ({ isDark, onChange }) => {
  return (
    <button
      onClick={() => onChange(!isDark)}
      className="fixed top-4 right-4 z-40 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Navbar with sticky blur effect - Responsive for mobile
const Navbar = ({ activeSection, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeBtn = navContainerRef.current.querySelector('[data-active="true"]');
    if (activeBtn) {
      const container = navContainerRef.current;
      const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // approx height of navbar + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Universal Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#171717]/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="flex max-w-6xl mx-auto items-center justify-center w-full">
          <div className="relative flex items-center w-full sm:w-auto bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden">
            {/* Left fade indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#171717] to-transparent pointer-events-none z-10 sm:hidden" />
            
            {/* Scrollable Container */}
            <div 
              ref={navContainerRef}
              className="overflow-x-auto no-scrollbar w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 scroll-smooth"
            >
              <div className="flex flex-row flex-nowrap items-center gap-4 md:gap-6 lg:gap-8 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em]">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.name}
                    data-active={activeSection === item.id ? "true" : "false"}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative transition-all duration-300 group uppercase whitespace-nowrap px-1 py-1 rounded-md shrink-0 ${activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${activeSection === item.id ? 'w-full opacity-90' : 'w-0 opacity-60 group-hover:w-full'}`}></span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right fade indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#171717] to-transparent pointer-events-none z-10 sm:hidden" />
          </div>
        </div>
      </nav>
    </>
  );
};

// ==================== MAIN APP ====================
const App = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const touchStartX = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const contactEmail = 'vsharishwaran@gmail.com';
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`;
  
  const words = ["Building Intelligent Systems", "Analyzing Complex Data", "Developing Full-Stack Solutions"];
  
  const projects = [
    {
      title: "Event-Insight",
      desc: "Responsive feedback collection and analysis platform",
      tech: ["HTML", "CSS", "Firebase", "Hugging Face"],
      icon: Sparkles,
      impact: "Processes 1000+ feedback entries efficiently",
      githubUrl: "https://github.com/harish200522/Event-feedback-system",
      sampleImages: sampleImagesByFolder['image1']?.length ? sampleImagesByFolder['image1'] : [heroImage]
    },
    {
      title: "CampusGuide",
      desc: "AI-powered placement preparation assistant",
      tech: ["HTML", "CSS", "Firebase", "Gemini AI"],
      icon: Globe,
      impact: "Helps 100+ students prepare for placements",
      githubUrl: "https://github.com/harish200522/campusguide-ai",
      sampleImages: sampleImagesByFolder['image2']?.length ? sampleImagesByFolder['image2'] : [heroImage]
    },
    {
      title: "FRS-Chatbot",
      desc: "RAG-based AI document query assistant",
      tech: ["Python", "React", "Firebase", "Claude AI"],
      icon: Cpu,
      impact: "Reduced query time by 70%",
      githubUrl: "https://github.com/harish200522/FRS-Chatbot",
      sampleImages: sampleImagesByFolder['image3']?.length ? sampleImagesByFolder['image3'] : [heroImage]
    },
    {
      title: "POS System",
      desc: "Multi-tenant Point of Sale application",
      tech: ["Node.js", "MongoDB", "React", "Express"],
      icon: Code2,
      impact: "Manages 50+ businesses with real-time analytics",
      githubUrl: "https://github.com/harish200522/POS-System",
      liveUrl: "https://possystemapp.netlify.app",
      sampleImages: sampleImagesByFolder['image4']?.length ? sampleImagesByFolder['image4'] : [heroImage]
    },
    {
      title: "Fashion Catalogue",
      desc: "Full-stack e-commerce platform for real client",
      tech: ["React", "Node.js", "PostgreSQL", "Cloudinary"],
      icon: LayoutGrid,
      impact: "Deployed to production with 99.9% uptime",
      githubUrl: "https://github.com/harish200522/catalogue",
      liveUrl: "https://inoutcatalogue.netlify.app",
      sampleImages: sampleImagesByFolder['image5']?.length ? sampleImagesByFolder['image5'] : [heroImage]
    },
    {
      title: "INOUT Fashion",
      desc: "Full-stack e-commerce platform for real client",
      tech: ["React", "Node.js", "PostgreSQL", "Cloudinary"],
      icon: LayoutGrid,
      impact: "🚧 Under Active Development — Live Demo Preview Available",
      githubUrl: "https://github.com/harish200522/catalogue",
      liveUrl: "https://vocal-buttercream-06059c.netlify.app",
      isUnderDevelopment: true,
      sampleImages: sampleImagesByFolder['image5']?.length ? sampleImagesByFolder['image5'] : [heroImage]
    },
    {
      title: "Medical's Landing Page",
      desc: "Landing page for a real business",
      tech: ["HTML", "CSS"],
      icon: Globe,
      impact: "Responsive online presence for local medical business",
      githubUrl: "https://github.com/harish200522/Harishwaran-Portfolio",
      liveUrl: "https://harishwaran-medicals.netlify.app",
      sampleImages: [heroImage]
    }
  ];

  const certificates = [
    {
      title: "Frontend Developer (React)",
      score: "✓",
      scorePercent: 100,
      description: "Meta certified React frontend development course",
      imageUrl: "/frontend_developer_react_certificate.png",
      badge: "HackerRank"
    },
    {
      title: "Java Basic",
      score: "✓",
      scorePercent: 100,
      description: "Java programming fundamentals and core concepts",
      imageUrl: "/java_basic_certificate.png",
      badge: "HackerRank"
    },
    {
      title: "Industry 4.0 & IIoT",
      score: "71%",
      scorePercent: 71,
      description: "Advanced cloud and IoT fundamentals"
    },
    {
      title: "Ethical Hacking",
      score: "54%",
      scorePercent: 54,
      description: "Cybersecurity and penetration testing basics"
    }
  ];

  // Scroll listeners & Active Section Observer
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowBadge(window.scrollY < 150); // Hide badge after scrolling 150px
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for Active Section
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.3, // trigger when 30% of the section is visible
        rootMargin: "-20% 0px -60% 0px" // prioritize sections in the upper-middle of screen
      }
    );
    
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen text-[#d1d5db] overflow-x-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-[#121212]' : 'bg-slate-100'}`}>
      <Navbar activeSection={activeSection} isDark={isDark} />
      <ThemeToggle isDark={isDark} onChange={setIsDark} />
      <BackToTopButton isVisible={showBackToTop} onClick={scrollToTop} />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center pt-32 pb-12 sm:pt-24 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        {/* Open to Work Badge */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 right-2 sm:right-4 md:right-6 z-40 px-1.5 py-1 sm:px-3 sm:py-1.5 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-[8px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1 sm:gap-1.5"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">Open to Work</span>
              <span className="sm:hidden">Open to Work</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center text-center lg:text-left">
          <div className="lg:col-span-8 z-10">
            <div className="text-cyan-400 font-bold text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase mb-2 font-mono">
              HI, I AM
            </div>
            <GlitchName />
            
            <div className="text-base sm:text-lg md:text-xl font-medium text-slate-300 mb-8 sm:mb-10 h-auto font-mono tracking-wide mt-6">
              {">"} <TypingEffect words={words} />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Final-year B.Tech AI & Data Science student building intelligent systems with React, Python, and AI. Passionate about RAG systems, full-stack development, and solving real-world problems.
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-6 justify-center lg:justify-start">
              <a
                href={gmailComposeHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex w-fit items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                <span className="relative text-white transition-colors duration-200 ease-in-out group-hover:text-white whitespace-nowrap">Get in Touch</span>
              </a>
              <a
                href="#projects"
                className="continue-application"
              >
                <div>
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M1 6h8l3 4h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
                      </svg>
                    </div>
                    <div className="paper"></div>
                  </div>
                  <div className="pencil"></div>
                </div>
                <span>View My Work</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-400 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-xs font-bold uppercase">Ariyalur, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-xs font-bold uppercase">{contactEmail}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 w-full max-w-sm lg:ml-auto">
            <AnimatedTerminal />
          </div>
        </div>
      </section>

      {/* ========== PROFILE SECTION ========== */}
      <section id="profile" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">About Me</h2>
              <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed text-center max-w-3xl mx-auto px-2 sm:px-4">
              I'm Harishwaran V S, a passionate AI & Data Science student at M. Kumarasamy College of Engineering (2027). I specialize in building intelligent web applications that combine cutting-edge AI with full-stack development. My expertise spans Python machine learning, RAG-based AI systems, React frontend architecture, and cloud deployment. I'm actively seeking full-time opportunities to contribute to innovative projects.
            </p>

            <div className="flex flex-row flex-wrap gap-4 justify-center pt-8 items-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-bold uppercase tracking-widest whitespace-nowrap">
                <span className="text-cyan-300">🎓</span> CGPA: 7.3
              </div>
              <a
                href="/resume.pdf"
                download="Harishwaran_VS_Resume.pdf"
                className="brutalist-button"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SKILLS SECTION ========== */}
      <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Tech Stack</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
            {Object.entries(SKILLS_CATEGORIZED).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 sm:p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all"
              >
                <h3 className="font-bold text-cyan-400 uppercase text-xs sm:text-sm tracking-widest mb-4">{category}</h3>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-slate-300 font-medium"
                    >
                      • {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Featured Projects</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                onOpen={(p) => {
                  setSelectedProject(p);
                  setActiveSampleIndex(0);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE SECTION ========== */}
      <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Experience</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <Briefcase className="text-cyan-400 flex-shrink-0 mt-1" size={28} />
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Cloud Computing Intern</h3>
                <p className="text-cyan-400 font-bold text-sm uppercase mt-1">ZYLO TECH</p>
              </div>
              <span className="px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold whitespace-nowrap">
                July 2025
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Gained hands-on experience with cloud computing platforms, deploying and managing production applications with focus on scalability and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== CERTIFICATES SECTION ========== */}
      <section id="certificates" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Certificates</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificates.map((cert, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setSelectedCert(cert);
                  setIsCertModalOpen(true);
                }}
                className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl hover:border-orange-500/40 hover:scale-[1.02] transition-all text-left group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="text-orange-400 flex-shrink-0" size={28} />
                  {(cert.pdfUrl || cert.imageUrl) ? (
                    <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                      {cert.badge || 'View'}
                    </span>
                  ) : (
                    <span className="text-orange-400 font-black text-xl">{cert.score}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors mb-1">{cert.title}</h3>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Eye size={12} />
                  Click to view certificate
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

       {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Get in Touch</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Let's build something <span className="text-cyan-400">great together.</span></h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  I'm currently open to full-time roles, internships, and freelance projects in AI, data science, and full-stack development. Drop me a message and I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Availability Badges */}
              <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider w-full sm:w-fit shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <span>💼</span> Full-time Opportunities
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider w-full sm:w-fit shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <span>🚀</span> Internships
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider w-full sm:w-fit shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <span>💻</span> Freelance Projects
                </div>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Centered Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center gap-4 pt-2"
          >
            <a
              href="https://github.com/harish200522"
              target="_blank"
              rel="noreferrer"
              className="group relative flex justify-center items-center p-3 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 text-[10px] group-hover:-translate-y-8 duration-700 pointer-events-none transition-all font-black uppercase tracking-widest whitespace-nowrap">
                GitHub
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/harishwaran-v-s-966964378/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex justify-center items-center p-3 rounded-md drop-shadow-xl bg-[#0077b5] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1.1em"
                viewBox="0 0 512 512"
                strokeWidth="0"
                fill="currentColor"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
              </svg>
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 text-[10px] group-hover:-translate-y-8 duration-700 pointer-events-none transition-all font-black uppercase tracking-widest whitespace-nowrap">
                Linkedin
              </span>
            </a>
            <a
              href="https://www.instagram.com/harishwaran_22_/"
              target="_blank"
              rel="noreferrer"
              className="group w-12 hover:w-44 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 relative rounded text-neutral-50 duration-700 hover:before:duration-500 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 hover:before:left-40 before:w-6 before:h-6 before:bg-pink-600 hover:before:bg-pink-500 before:rotate-45 overflow-hidden"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 shrink-0 fill-neutral-50"
              >
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
              <span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all whitespace-nowrap text-xs">
                @harishwaran_22_
              </span>
            </a>
          </motion.div>
        </div>
      </section>


      {/* ========== FOOTER ========== */}
      <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            HW.
          </div>
          <p className="text-slate-500 italic font-medium text-xs sm:text-sm mb-4">
            "Designing the web, building the future"
          </p>
          <p className="text-slate-600 text-xs font-black uppercase tracking-widest">
            © 2026 HARISHWARAN V S
          </p>
        </motion.div>
      </footer>

      {/* Project Sample Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl sm:rounded-3xl w-full max-w-3xl overflow-hidden"
              style={{ maxHeight: '92vh' }}
            >
              {/* Image area with swipe support */}
              <div
                className="relative w-full overflow-hidden bg-black"
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const diff = touchStartX.current - e.changedTouches[0].clientX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                      setActiveSampleIndex(i => (i + 1) % selectedProject.sampleImages.length);
                    } else {
                      setActiveSampleIndex(i => (i - 1 + selectedProject.sampleImages.length) % selectedProject.sampleImages.length);
                    }
                  }
                  touchStartX.current = null;
                }}
              >
                <img
                  src={selectedProject.sampleImages[activeSampleIndex]}
                  alt="Sample"
                  className="w-full object-contain"
                  style={{ maxHeight: '65vh' }}
                />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Prev / Next arrows (shown when >1 image) */}
                {selectedProject.sampleImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveSampleIndex(i => (i - 1 + selectedProject.sampleImages.length) % selectedProject.sampleImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={() => setActiveSampleIndex(i => (i + 1) % selectedProject.sampleImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {/* Image counter badge */}
                {selectedProject.sampleImages.length > 1 && (
                  <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-black/60 text-white px-2 py-1 rounded-full">
                    {activeSampleIndex + 1} / {selectedProject.sampleImages.length}
                  </span>
                )}
              </div>

              {/* Bottom info */}
              <div className="px-5 py-4">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{selectedProject.title}</h3>
                {selectedProject.sampleImages.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {selectedProject.sampleImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSampleIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === activeSampleIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-400'}`}
                      />
                    ))}
                  </div>
                )}
                {selectedProject.sampleImages.length > 1 && (
                  <p className="text-center text-slate-500 text-xs mt-2">← Swipe to browse →</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <CertificateModal cert={selectedCert} isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
    </div>
  );
};

export default App;
