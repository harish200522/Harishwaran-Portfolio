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
  Menu,
  Linkedin
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
  { command: 'python train_model.py', output: '✓ Model trained successfully\n✓ Accuracy: 94.7%' },
  { command: 'git push origin main', output: '✓ Remote: github.com/harish200522\n✓ 5 commits pushed' },
  { command: 'node server.js', output: '✓ Server running on http://localhost:3000\n✓ Connected to Database' },
  { command: 'npm run build', output: '✓ Build complete\n✓ Bundle size: 245KB (gzipped)' },
  { command: 'docker run ai-app', output: '✓ Container started\n✓ AI Pipeline Active' }
];

const SKILLS_CATEGORIZED = {
  'Languages': ['Python', 'Java', 'JavaScript', 'SQL'],
  'Frameworks': ['React', 'Node.js', 'FastAPI'],
  'Databases': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  'Tools': ['Git', 'Netlify', 'VS Code', 'Postman'],
  'AI / ML': ['Gemini AI', 'Claude AI', 'Hugging Face', 'RAG Systems']
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
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.92] tracking-tighter uppercase">
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
        <div className="flex items-start justify-between mb-4">
          <project.icon size={32} className="text-cyan-400" />
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/30 rounded-full">
            Live
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 uppercase tracking-tight">{project.title}</h3>
        
        <p className="text-slate-400 text-sm mb-4 flex-grow">{project.desc}</p>
        
        {project.impact && (
          <p className="text-cyan-400 text-xs font-bold mb-4 italic">💡 {project.impact}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2 py-1 text-[8px] font-bold uppercase bg-white/5 border border-white/10 rounded-full text-slate-400">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 text-[8px] font-bold uppercase text-cyan-400">+{project.tech.length - 3} more</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onOpen(project)}
            className="Documents-btn"
          >
            👁 See Sample
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="uiverse-btn-github"
          >
            <span className="svgContainer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-1.02-2.44l.06-.06a3.37 3.37 0 0 0-1.02-2.44v-3.87m9.5-11a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0M6 5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0M12 5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"></path>
              </svg>
            </span>
            <span className="text-xs uppercase font-bold">View on GitHub</span>
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
          className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-md w-full"
        >
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1000);
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu after navigation
    }
  };

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#171717]/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        {/* Desktop: Traditional horizontal nav (visible on md+) */}
        <div className="hidden md:flex max-w-6xl mx-auto items-center justify-center">
          <div className="flex items-center justify-center overflow-x-auto no-scrollbar bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 lg:px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em]">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative transition-all duration-300 group uppercase whitespace-nowrap px-1 py-1 rounded-md ${activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-100'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${activeSection === item.id ? 'w-full opacity-90' : 'w-0 opacity-60 group-hover:w-full'}`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Hamburger menu (visible on md-) */}
        <div className="md:hidden max-w-full mx-auto">
          <div className="flex items-center justify-between bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <div className="text-sm font-bold uppercase tracking-[0.15em] text-white">Menu</div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 md:hidden z-40 bg-[#171717]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-xs font-bold uppercase tracking-[0.1em] ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==================== MAIN APP ====================
const App = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
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
      sampleImages: sampleImagesByFolder['image4']?.length ? sampleImagesByFolder['image4'] : [heroImage]
    },
    {
      title: "Fashion Catalogue",
      desc: "Full-stack e-commerce platform for real client",
      tech: ["React", "Node.js", "PostgreSQL", "Cloudinary"],
      icon: LayoutGrid,
      impact: "Deployed to production with 99.9% uptime",
      githubUrl: "https://github.com/harish200522/catalogue",
      sampleImages: sampleImagesByFolder['image5']?.length ? sampleImagesByFolder['image5'] : [heroImage]
    }
  ];

  const certificates = [
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

  // Scroll listeners
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowBadge(window.scrollY < 150); // Hide badge after scrolling 150px
      
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <div className="lg:col-span-7 z-10">
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

          <div className="lg:col-span-5">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {certificates.map((cert, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => {
                  setSelectedCert(cert);
                  setIsCertModalOpen(true);
                }}
                className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl hover:border-orange-500/40 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="text-orange-400 flex-shrink-0" size={28} />
                  <span className="text-orange-400 font-black text-xl">{cert.score}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">{cert.title}</h3>
                <p className="text-sm text-slate-400 mt-2">Click to view details</p>
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
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="btn">💼 Full-time Opportunities</span>
                <span className="btn">🚀 Internships</span>
                <span className="btn">💻 Freelance Projects</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a href="mailto:vsharishwaran@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                    <Mail size={18} className="text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium">vsharishwaran@gmail.com</span>
                </a>
                <a href="https://github.com/harish200522" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                    <Github size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium">github.com/harish200522</span>
                </a>
                <a href="https://www.linkedin.com/in/harishwaran-v-s-966964378/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                    <Linkedin size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium">linkedin.com/in/harishwaran-v-s</span>
                </a>
              </div>

              {/* Social Icon Row */}
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/harish200522" target="_blank" rel="noreferrer" className="Btn" aria-label="GitHub">
                  <span className="BG"></span>
                  <span className="svgContainer">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/harishwaran-v-s-966964378/" target="_blank" rel="noreferrer" className="LinkedinBtn" aria-label="LinkedIn">
                  <span className="BG"></span>
                  <span className="svgContainer">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.379l-.022.033h.022v-.033c.43-.664 1.195-1.612 2.905-1.612 2.122 0 3.714 1.388 3.714 4.374v5.596zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.915.762 1.915 1.715 0 .953-.728 1.715-1.958 1.715zm1.691 11.597H3.635V9.57h3.393v10.882zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                  </span>
                </a>
                <a href="https://www.instagram.com/harishwaran_22_/" target="_blank" rel="noreferrer" className="instagram-btn" aria-label="Instagram">
                  <span className="BG"></span>
                  <span className="svgContainer">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                  </span>
                </a>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden"
            >
              <div className="relative">
                <img
                  src={selectedProject.sampleImages[activeSampleIndex]}
                  alt="Sample"
                  className="w-full h-[400px] object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <div className="flex gap-2 justify-center">
                  {selectedProject.sampleImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSampleIndex(idx)}
                      className={`h-2 rounded-full transition-all ${idx === activeSampleIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600'}`}
                    />
                  ))}
                </div>
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
