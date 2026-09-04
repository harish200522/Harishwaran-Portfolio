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
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Instagram as InstagramIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import heroImage from './assets/hero.png';

// ==================== IMAGE IMPORTS ====================
const sampleImageModules = import.meta.glob('./assets/image{1,2,3,4,5,6,7}/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default'
});

const sampleImagesByFolder = Object.entries(sampleImageModules).reduce((acc, [path, url]) => {
  const match = path.match(/assets\/(image[1-7])\//i);
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
  'Languages': ['Python', 'Java', 'JavaScript', 'C/C++', 'SQL'],
  'Frameworks': ['React', 'Node.js', 'Express.js', 'FastAPI'],
  'Databases': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  'AI/ML Tools': ['TensorFlow', 'Claude AI', 'Hugging Face', 'RAG Systems'],
  'Cloud & DevOps': ['Git', 'Docker', 'Firebase', 'Netlify']
};

const PROFICIENCY_SKILLS = [
  { name: 'Python', level: 85 },
  { name: 'React', level: 78 },
  { name: 'Java', level: 75 },
  { name: 'SQL', level: 82 },
  { name: 'AI/ML', level: 72 }
];

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

// Skill Proficiency Bar
const ProficiencyBar = ({ skill, level }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-bold text-slate-300 text-sm uppercase tracking-wider">{skill}</span>
        <span className="text-cyan-400 font-black text-xs">{level}%</span>
      </div>
      <motion.div
        className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </motion.div>
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
          {project.isUnderDevelopment ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Under Development
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/30 rounded-full">
              Live
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
            See Sample
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-github"
          >
            <Github size={16} />
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
    
    // Simulate form submission (replace with actual EmailJS integration)
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
      className="space-y-6 max-w-md mx-auto"
    >
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows="5"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
        />
      </div>
      
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
        className="bt mx-auto relative"
      >
        <span className="msg"></span>
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

// Navbar with sticky blur effect
const Navbar = ({ activeSection, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#171717]/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-center overflow-x-auto no-scrollbar bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 lg:px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] min-w-max">
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
    </nav>
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
      sampleImages: sampleImagesByFolder['image6']?.length ? sampleImagesByFolder['image6'] : [heroImage]
    },
    {
      title: "Medical's Landing Page",
      desc: "Landing page for a real business",
      tech: ["HTML", "CSS"],
      icon: Globe,
      impact: "Responsive online presence for local medical business",
      githubUrl: "https://github.com/harish200522/Harishwaran-Portfolio",
      liveUrl: "https://harishwaranmedical.vercel.app",
      sampleImages: sampleImagesByFolder['image7']?.length ? sampleImagesByFolder['image7'] : [heroImage]
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
      <section className="relative min-h-screen flex items-center pt-24 md:pt-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        {/* Open to Work Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-32 right-8 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Open to Work
        </motion.div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
          <div className="lg:col-span-7 z-10">
            <GlitchName />
            
            <div className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 mb-10 h-auto md:h-10 font-mono tracking-wide mt-6">
              {">"} <TypingEffect words={words} />
            </div>

            <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-xl">
              Final-year B.Tech AI & Data Science student building intelligent systems with React, Python, and AI. Passionate about RAG systems, full-stack development, and solving real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
              <a
                href={gmailComposeHref}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Get in Touch</span>
              </a>
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 border border-cyan-500 text-cyan-400 font-bold uppercase text-sm rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                View My Work
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
      <section id="profile" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">About Me</h2>
              <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-center max-w-3xl mx-auto">
              I'm Harishwaran V S, a passionate AI & Data Science student at M. Kumarasamy College of Engineering (2027). I specialize in building intelligent web applications that combine cutting-edge AI with full-stack development. My expertise spans Python machine learning, RAG-based AI systems, React frontend architecture, and cloud deployment. I'm actively seeking full-time opportunities to contribute to innovative projects.
            </p>

            {/* Skill Proficiency Bars */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
              {PROFICIENCY_SKILLS.map((skill, i) => (
                <ProficiencyBar key={i} skill={skill.name} level={skill.level} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <div className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase">
                CGPA: 7.3
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
      <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">Tech Stack</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {Object.entries(SKILLS_CATEGORIZED).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all"
              >
                <h3 className="font-bold text-cyan-400 uppercase text-sm tracking-widest mb-4">{category}</h3>
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
      <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">Featured Projects</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">Experience</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all"
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
      <section id="certificates" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">Certificates</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
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
      <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4">Get in Touch</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto mb-8"></div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button type="button" className="btn">
                💼 Full-time Opportunities
              </button>
              <button type="button" className="btn">
                🚀 Internships
              </button>
              <button type="button" className="btn">
                💻 Freelance Projects
              </button>
            </div>
          </motion.div>

          <ContactForm />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center gap-4 flex-wrap"
          >
            <a href="https://github.com/harish200522" target="_blank" rel="noreferrer" className="Btn" aria-label="GitHub Profile">
              <span className="BG"></span>
              <span className="svgContainer"><FaGithub size={24} /></span>
            </a>
            <a href="https://www.linkedin.com/in/harishwaran-v-s-966964378/" target="_blank" rel="noreferrer" className="LinkedinBtn">
              <span className="BG"></span>
              <span className="svgContainer"><FaLinkedinIn size={24} /></span>
            </a>
            <a href="https://www.instagram.com/harishwaran_22_/" target="_blank" rel="noreferrer" className="instagram-btn">
              <span className="BG"></span>
              <span className="svgContainer"><FaInstagram size={24} /></span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            HW.
          </div>
          <p className="text-slate-500 italic font-medium text-sm mb-4">
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
