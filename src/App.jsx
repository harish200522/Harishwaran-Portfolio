import React, { useState, useEffect } from 'react';
import { 
  GitBranch as Github, 
  Link as Linkedin, 
  Mail, 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  ChevronRight,
  BookOpen,
  Camera as Instagram,
  Terminal,
  MapPin,
  Send as Twitter,
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
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import heroImage from './assets/hero.png';

const sampleImageModules = import.meta.glob('./assets/image{1,2,3,4}/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default'
});

const sampleImagesByFolder = Object.entries(sampleImageModules).reduce((acc, [path, url]) => {
  const match = path.match(/assets\/(image[1-4])\//i);
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

const NAV_ITEMS = [
  { name: 'About', id: 'profile' },
  { name: 'Education', id: 'education' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Certificates', id: 'certificates' },
  { name: 'Contact', id: 'contact' }
];

// --- Colors & Theme Constants ---
// Background: #121212 (Charcoal Black)
// Text Primary: #d1d5db (Light Ash)
// Text Heading: #ffffff (White)

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

const Navbar = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed navbar
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
    <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 lg:px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300">
        {/* Navigation Links - Centered */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] min-w-max">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className={`relative transition-all duration-300 group uppercase whitespace-nowrap px-1 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] ${activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-100'}`}
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

const EducationItem = ({ title, school, status, desc, isLast }) => (
  <div className="relative pl-8 pb-12 group">
    {!isLast && <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-slate-800 group-hover:bg-cyan-900 transition-colors"></div>}
    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#121212] border-4 border-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
      <div className="w-full h-full rounded-full animate-ping bg-cyan-500 opacity-20"></div>
    </div>
    
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-cyan-500 font-bold text-sm md:text-base uppercase tracking-wider">{school}</p>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-4 italic font-medium">
          {desc}
        </p>
      </div>
      <div className={`px-4 sm:px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest self-start md:self-auto border ${status === 'Present' ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-[#1a1a1a] text-cyan-400 border-cyan-900/30'}`}>
        {status}
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ title, company, date, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative p-6 sm:p-8 md:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:border-cyan-500/30 transition-all duration-500"
  >
    <div className="space-y-4">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-400 tracking-tight italic uppercase">
        {title}
      </h3>
      <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
        <span className="text-white/80">{company}</span>
        <span className="text-cyan-600 font-black">/</span>
        <span>{date}</span>
      </div>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed italic mt-6 font-medium text-slate-400">
        "{desc}"
      </p>
    </div>
  </motion.div>
);

const CertificateCard = ({ title, score, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="relative p-6 sm:p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all duration-500"
  >
    <div className="flex items-start gap-4 sm:gap-6">
      <div className="p-3 sm:p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl group-hover:bg-orange-500/20 transition-colors">
        <Icon size={28} sm:size={32} className="text-orange-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-orange-400/80 font-bold uppercase tracking-[0.2em] text-xs">
          Scored {score}
        </p>
      </div>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Award size={100} />
    </div>
  </motion.div>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [viewCount, setViewCount] = useState(null);
  const [viewCountError, setViewCountError] = useState(false);
  const words = ["Building Intelligent Systems", "Analyzing Complex Data", "Developing User-Centric Web Applications"];
  const contactEmail = 'vsharishwaran@gmail.com';
  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent('Portfolio Inquiry')}`;
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent('Portfolio Inquiry')}`;
  const resumeFilePath = '/resume.pdf';
  const resumeDownloadName = 'Harishwaran_VS_Resume.pdf';
  const socialLinks = {
    github: 'https://github.com/harish200522',
    linkedin: 'https://www.linkedin.com/in/harishwaran-v-s-966964378/',
    instagram: 'https://www.instagram.com/harishwaran_22_/'
  };
  
  const projects = [
    {
      title: "Event-Insight",
      desc: "A responsive web application designed to collect and analyze user feedback efficiently.",
      tech: ["HTML & CSS", "Firebase", "Hugging Face"],
      icon: Sparkles, 
      githubUrl: "https://github.com/harish200522/Event-feedback-system",
      sampleImages: sampleImagesByFolder['image1']?.length ? sampleImagesByFolder['image1'] : [heroImage]
    },
    {
      title: "CampusGuide",
      desc: "AI-powered placement assistant helping college students prepare for their professional careers.",
      tech: ["HTML & CSS", "Firebase", "Gemini AI"],
      icon: Globe,
      githubUrl: "https://github.com/harish200522/campusguide-ai",
      sampleImages: sampleImagesByFolder['image2']?.length ? sampleImagesByFolder['image2'] : [heroImage]
    },
    {
      title: "FRS-Chatbot",
      desc: "A RAG-based AI chatbot that transforms static FRS documents into an interactive query-driven assistant.",
      tech: ["Python,JavaScript,HTML,React", "Firebase", "Claude AI"],
      icon: Cpu,
      githubUrl: "https://github.com/harish200522/FRS-Chatbot",
      sampleImages: sampleImagesByFolder['image3']?.length ? sampleImagesByFolder['image3'] : [heroImage]
    },
    {
      title: "POS System",
      desc: "A modern multi-tenant POS (Point of Sale) web application that enables businesses to manage billing, inventory, and transactions efficiently with real-time analytics and seamless mobile app support.",
      tech: ["Frontend: HTML, CSS, JavaScript", "Backend: Node.js, Express.js", "Database: MongoDB"],
      icon: Code2,
      githubUrl: "https://github.com/harish200522/POS-System",
      sampleImages: sampleImagesByFolder['image4']?.length ? sampleImagesByFolder['image4'] : [heroImage]
    }
  ];

  const openSamples = (project) => {
    setSelectedProject(project);
    setActiveSampleIndex(0);
  };

  const closeSamples = () => {
    setSelectedProject(null);
    setActiveSampleIndex(0);
  };

  const showPrevSample = () => {
    if (!selectedProject?.sampleImages?.length) return;
    setActiveSampleIndex((prev) =>
      prev === 0 ? selectedProject.sampleImages.length - 1 : prev - 1
    );
  };

  const showNextSample = () => {
    if (!selectedProject?.sampleImages?.length) return;
    setActiveSampleIndex((prev) =>
      prev === selectedProject.sampleImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-38% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = 'harishwaran_portfolio_view_count';
    const lastSeenKey = 'harishwaran_portfolio_last_view_at';
    const namespace = 'harishwaran-vs-portfolio';
    const key = 'views';
    const registerWindowMs = 1000 * 60 * 60 * 12;

    const setCountSafely = (value) => {
      if (!isMounted) return;
      setViewCount(value);
      setViewCountError(false);
      if (typeof value === 'number') {
        localStorage.setItem(cacheKey, String(value));
      }
    };

    const shouldRegisterVisit = () => {
      const lastSeen = Number(localStorage.getItem(lastSeenKey));
      if (!Number.isFinite(lastSeen)) return true;
      return Date.now() - lastSeen > registerWindowMs;
    };

    const fetchViewCount = async (registerVisit) => {
      const endpoint = registerVisit
        ? `https://api.countapi.xyz/hit/${namespace}/${key}`
        : `https://api.countapi.xyz/get/${namespace}/${key}`;

      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('CountAPI request failed');

      const data = await response.json();
      if (typeof data?.value !== 'number') {
        throw new Error('Invalid CountAPI response');
      }

      setCountSafely(data.value);

      if (registerVisit) {
        localStorage.setItem(lastSeenKey, String(Date.now()));
      }
    };

    const loadCounter = async () => {
      try {
        await fetchViewCount(shouldRegisterVisit());
      } catch {
        const cachedCount = Number(localStorage.getItem(cacheKey));
        if (Number.isFinite(cachedCount) && cachedCount > 0) {
          setCountSafely(cachedCount);
          return;
        }

        if (isMounted) {
          setViewCountError(true);
          setViewCount(null);
        }
      }
    };

    loadCounter();

    const pollId = window.setInterval(() => {
      fetchViewCount(false).catch(() => {
        // Keep the last known value visible if polling temporarily fails.
      });
    }, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(pollId);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeSamples();
      if (event.key === 'ArrowLeft') showPrevSample();
      if (event.key === 'ArrowRight') showNextSample();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#d1d5db] selection:bg-white/20 selection:text-white overflow-x-hidden font-sans">
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
        <div className="view-counter-badge" aria-live="polite" title="Portfolio views">
          <Eye size={14} className="text-cyan-300" />
          <span className="view-counter-label">Views</span>
          <span className="view-counter-value">
            {viewCountError ? 'Unavailable' : viewCount === null ? '...' : viewCount.toLocaleString()}
          </span>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
          <div className="lg:col-span-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <span className="h-[1px] w-12 bg-slate-700"></span>
                <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">AI & Data Science Student</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.92] tracking-tighter mb-7 md:mb-8 uppercase">
                It's <br />
                <span className="text-slate-400">Harishwaran V{'\u00A0'}S</span>
              </h1>

              <div className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 mb-10 h-auto md:h-10 font-mono tracking-wide">
                {">"} <TypingEffect words={words} />
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-8 mb-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Ariyalur, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={16} />
                  <a href={mailtoHref} className="text-xs font-bold uppercase tracking-widest underline decoration-slate-700 hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]">{contactEmail}</a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="p-8 border border-white/5 rounded-3xl bg-[#1a1a1a]/30"
            >
              <Terminal size={40} className="text-slate-700 mb-6" />
              <div className="space-y-4">
                <div className="h-2 w-3/4 bg-white/5 rounded"></div>
                <div className="h-2 w-full bg-white/5 rounded"></div>
                <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                <p className="pt-4 text-xs font-mono text-slate-600 leading-relaxed italic">
                  Focused on building highly-available systems that derive meaningful insights from raw data.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic">Profile</h2>
              <div className="w-12 h-1 bg-white/10"></div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto px-4">
              I am an AI and Data Science student and a passionate web developer. I specialize in building responsive websites and integrating intelligent features to create modern, user-friendly applications.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
              <div className="brutalist-button" aria-label="CGPA 7.3 percent">
                <div className="button-text">
                  <span>CGPA</span>
                  <span>7.3%</span>
                </div>
              </div>
              <a
                href={resumeFilePath}
                download={resumeDownloadName}
                className="brutalist-button"
              >
                <div className="button-text">
                  <span>Download</span>
                  <span>Resume</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Education</h2>
            <div className="w-12 h-1 bg-white/10 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <EducationItem 
              title="B.Tech in Artificial Intelligence & Data Science"
              school="M. Kumarasamy College of Engineering (Anna University)"
              status="Present"
              desc="Passionate about AI, machine learning, and data analytics. Secured a CGPA of 7.3 and steadily improving it."
            />
            <EducationItem 
              title="Higher Secondary (CBSE)"
              school="Ramco Vidhya Mandir School"
              status="Completed"
              desc="Specialized in Biology and Mathematics."
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Tech Stack</h2>
            <div className="w-12 h-1 bg-white/10 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { n: 'Python', i: Terminal },
              { n: 'Java', i: Code2 },
              { n: 'MySQL', i: Database },
              { n: 'C / C++', i: Cpu },
              { n: 'JavaScript', i: Code2 },
              { n: 'HTML / CSS', i: Globe }
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 md:p-10 bg-transparent border border-white/5 rounded-3xl text-center transition-all group"
              >
                <skill.i className="mx-auto mb-4 text-slate-600 group-hover:text-white transition-colors" size={32} />
                <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300">{skill.n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-16 sm:mb-20 text-center uppercase tracking-tighter italic underline decoration-slate-800 underline-offset-[16px]">My Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="group relative bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 flex flex-col"
              >
                <p.icon size={24} className="text-slate-600 mb-8" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 uppercase tracking-tight">{p.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-10 text-sm">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-white/5 text-[9px] font-bold uppercase tracking-widest rounded-full text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons Container */}
                <div className="flex flex-nowrap items-center gap-2 mt-auto">
                  <button
                    onClick={() => openSamples(p)}
                    className="Documents-btn"
                  >
                    <span className="folderContainer" aria-hidden="true">
                      <svg className="fileBack" viewBox="0 0 146 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C0 1.79086 1.79086 0 4 0H42.6888C44.5924 0 46.4357 0.678792 47.8867 1.91411L64.5589 16.0859C66.0099 17.3212 67.8532 18 69.7568 18H142C144.209 18 146 19.7909 146 22V109C146 111.209 144.209 113 142 113H4C1.79086 113 0 111.209 0 109V4Z" fill="#7f86c7" />
                      </svg>
                      <svg className="filePage" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0H61L88 27V93C88 96.3137 85.3137 99 82 99H16C12.6863 99 10 96.3137 10 93V6C10 2.68629 12.6863 0 16 0Z" fill="white" />
                        <path d="M61 0V21C61 24.3137 63.6863 27 67 27H88" fill="#dbeafe" />
                      </svg>
                      <svg className="fileFront" viewBox="0 0 160 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C0 2.23858 2.23858 0 5 0H155C157.761 0 160 2.23858 160 5V74C160 76.7614 157.761 79 155 79H5C2.23858 79 0 76.7614 0 74V5Z" fill="#f8fafc" />
                        <path d="M16 18H74" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                        <path d="M16 33H108" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text">See Sample</span>
                  </button>
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${p.title} in GitHub`}
                    className="btn-github"
                  >
                    Open in GitHub <Github size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Experience</h2>
            <div className="w-12 h-1 bg-white/10 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ExperienceCard 
              title="Cloud Computing Intern"
              company="ZYLO TECH"
              date="JULY 2025"
              desc="Hands-on cloud computing internship experience deploying and managing applications across cloud platforms."
            />
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Certificates</h2>
            <div className="w-12 h-1 bg-white/10 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <CertificateCard 
              title="Introduction To Industry 4.0 And Industrial Internet Of Things"
              score="71 %"
              icon={Award}
            />
            <CertificateCard 
              title="Ethical Hacking"
              score="54 %"
              icon={ShieldCheck}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 text-center border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block p-4 bg-white/5 rounded-full text-slate-500 mb-8">
            <Mail size={32} />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Let's Start a <br /> <span className="text-slate-500 italic">Conversation.</span>
          </h2>
          <div className="text-slate-400 mb-12 sm:mb-16 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            <p className="mb-4">
              I am currently seeking internship opportunities where I can apply my skills in data analysis and development.
            </p>
            <p>
              I am also{" "}
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block cursor-pointer relative group"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black text-base md:text-lg">
                  open to building websites for businesses.
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
              </motion.span>
            </p>
          </div>
          <a 
            href={gmailComposeHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Email ${contactEmail}`}
            className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 bg-white text-[#121212] rounded-full font-black uppercase tracking-[0.2em] text-xs transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
          >
            <span>{contactEmail}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* Brand & Quote Info inside a Box Design */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem] backdrop-blur-sm space-y-4 w-full max-w-md md:w-auto text-center md:text-left shadow-2xl shadow-black/50"
          >
            <div className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">HW.</div>
            <p className="text-slate-500 italic font-medium text-sm md:text-base">
              "Designing the web, building the future"
            </p>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] pt-4">
              © 2026 HARISHWARAN V S
            </p>
          </motion.div>

          <div className="footer-gap-connector hidden md:flex" aria-hidden="true">
            <span className="footer-gap-line"></span>
            <span className="footer-gap-pulse"></span>
          </div>

          {/* Social Icons Dock */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={socialLinks.github}
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer noopener"
              className="github-btn"
            >
              <FaGithub size={20} className="github-svg-icon" aria-hidden="true" />
              <span className="github-text">GitHub</span>
            </a>

            <a
              href={socialLinks.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer noopener"
              className="linkedin-btn"
            >
              <span className="linkedin-sign" aria-hidden="true">
                <FaLinkedinIn size={20} />
              </span>
              <span className="linkedin-text">LinkedIn</span>
            </a>

            <a
              href={socialLinks.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer noopener"
              className="instagram-btn"
            >
              <FaInstagram size={20} className="instagram-svg-icon" aria-hidden="true" />
              <span className="instagram-text">Instagram</span>
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm px-4 py-8 flex items-center justify-center"
          onClick={closeSamples}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} sample gallery`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-5xl bg-[#151515] border border-white/10 rounded-3xl p-4 sm:p-5 md:p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wide">
                {selectedProject.title} Samples
              </h3>
              <button
                onClick={closeSamples}
                aria-label="Close samples"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f0f]">
              <img
                src={selectedProject.sampleImages[activeSampleIndex]}
                alt={`${selectedProject.title} sample ${activeSampleIndex + 1}`}
                className="w-full h-[200px] sm:h-[260px] md:h-[380px] lg:h-[460px] object-cover"
              />

              {selectedProject.sampleImages.length > 1 && (
                <>
                  <button
                    onClick={showPrevSample}
                    aria-label="Previous sample"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={showNextSample}
                    aria-label="Next sample"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {selectedProject.sampleImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSampleIndex(idx)}
                  aria-label={`Show sample ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${idx === activeSampleIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'}`}
                ></button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Poppins:wght@600;700;800;900&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #121212;
          color: #d1d5db;
          line-height: 1.6;
        }

        h1, h2, h3, nav button {
          font-family: 'Poppins', sans-serif;
        }

        section[id] {
          scroll-margin-top: 120px;
        }

        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .view-counter-badge {
          position: absolute;
          top: clamp(5.2rem, 9vw, 6.4rem);
          right: 1.35rem;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(34, 211, 238, 0.35);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.78), rgba(8, 47, 73, 0.58));
          border-radius: 9999px;
          padding: 0.5rem 0.8rem;
          box-shadow: 0 0 24px rgba(34, 211, 238, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
        }

        .view-counter-label {
          color: #cbd5e1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .view-counter-value {
          color: #ecfeff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .footer-gap-connector {
          position: relative;
          width: clamp(80px, 14vw, 150px);
          height: 2px;
          align-items: center;
          justify-content: center;
        }

        .footer-gap-line {
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(148, 163, 184, 0.08), rgba(34, 211, 238, 0.45), rgba(148, 163, 184, 0.08));
          background-size: 180% 100%;
          animation: footerLineShift 3.6s linear infinite;
        }

        .footer-gap-pulse {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #22d3ee;
          box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.5);
          animation: footerPulse 2.4s ease-in-out infinite;
        }

        .btn-github {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;

          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 100px;
          font-weight: 800;
          place-content: center;

          padding: 0.55rem 0.75rem;
          font-size: 0.7rem;
          line-height: 0.9rem;
          white-space: nowrap;
          flex-shrink: 0;

          background-color: rgba(0, 0, 0, 0.4);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
          color: #fff;
        }

        .btn-github:hover {
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(252, 232, 3, 0.08);
          color: #fce803;
          transform: translate(0, -0.25rem);
          background-color: rgba(0, 0, 0, 0.5);
        }

        .Documents-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: fit-content;
          height: 40px;
          border: none;
          padding: 0px 10px;
          border-radius: 5px;
          background-color: rgb(49, 49, 83);
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .folderContainer {
          width: 30px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          position: relative;
        }

        .fileBack {
          z-index: 1;
          width: 80%;
          height: auto;
        }

        .filePage {
          width: 50%;
          height: auto;
          position: absolute;
          z-index: 2;
          transition: all 0.3s ease-out;
        }

        .fileFront {
          width: 85%;
          height: auto;
          position: absolute;
          z-index: 3;
          opacity: 0.95;
          transform-origin: bottom;
          transition: all 0.3s ease-out;
        }

        .text {
          color: white;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .Documents-btn:hover .filePage {
          transform: translateY(-5px);
        }

        .Documents-btn:hover {
          background-color: rgb(58, 58, 94);
        }

        .Documents-btn:active {
          transform: scale(0.95);
        }

        .Documents-btn:hover .fileFront {
          transform: rotateX(30deg);
        }

        .brutalist-button {
          display: flex;
          align-items: center;
          cursor: pointer;
          width: 169px;
          height: 60px;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-weight: bold;
          border: 3px solid #fff;
          outline: 3px solid #000;
          box-shadow: 6px 6px 0 #00a4ef;
          transition: all 0.1s ease-out;
          padding: 0 15px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .brutalist-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          z-index: 1;
          transition: none;
          opacity: 0;
        }

        @keyframes slide {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .brutalist-button:hover::before {
          opacity: 1;
          animation: slide 2s infinite;
        }

        .brutalist-button:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0 #000;
          background-color: #000;
          color: #fff;
        }

        @keyframes slide {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .brutalist-button:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0 #00a4ef;
          background-color: #fff;
          color: #000;
          border-color: #000;
        }

        .button-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          transition: transform 0.2s ease-out;
          position: relative;
          z-index: 1;
        }

        .brutalist-button:hover .button-text {
          transform: skew(-5deg);
        }

        .brutalist-button:active .button-text {
          transform: skew(5deg);
        }

        .button-text span:first-child {
          font-size: 11px;
          text-transform: uppercase;
        }

        .button-text span:last-child {
          font-size: 16px;
          text-transform: uppercase;
        }

        .github-btn {
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition-duration: 0.4s;
          cursor: pointer;
          position: relative;
          background-color: rgb(31, 31, 31);
          overflow: hidden;
          color: #fff;
          flex-shrink: 0;
        }

        .github-svg-icon {
          transition-duration: 0.3s;
        }

        .github-text {
          position: absolute;
          color: rgb(255, 255, 255);
          width: 120px;
          font-weight: 600;
          opacity: 0;
          transition-duration: 0.4s;
          text-align: center;
          white-space: nowrap;
        }

        .github-btn:hover {
          width: 110px;
          transition-duration: 0.4s;
          border-radius: 30px;
        }

        .github-btn:hover .github-text {
          opacity: 1;
          transition-duration: 0.4s;
        }

        .github-btn:hover .github-svg-icon {
          opacity: 0;
          transition-duration: 0.3s;
        }

        .github-btn:focus-visible {
          outline: 2px solid #67e8f9;
          outline-offset: 2px;
        }

        .linkedin-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition-duration: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          background-color: #0a66c2;
          color: #fff;
          flex-shrink: 0;
        }

        .linkedin-sign {
          width: 100%;
          transition-duration: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .linkedin-text {
          position: absolute;
          right: 0;
          width: 0;
          opacity: 0;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 600;
          white-space: nowrap;
          transition-duration: 0.3s;
          text-align: center;
        }

        .linkedin-btn:hover {
          width: 135px;
          border-radius: 40px;
        }

        .linkedin-btn:hover .linkedin-sign {
          width: 30%;
          padding-left: 10px;
        }

        .linkedin-btn:hover .linkedin-text {
          opacity: 1;
          width: 70%;
          padding-right: 10px;
        }

        .linkedin-btn:active {
          transform: translate(2px, 2px);
        }

        .linkedin-btn:focus-visible {
          outline: 2px solid #67e8f9;
          outline-offset: 2px;
        }

        .instagram-btn {
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition-duration: 0.4s;
          cursor: pointer;
          position: relative;
          background: #f09433;
          background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
          overflow: hidden;
          flex-shrink: 0;
        }

        .instagram-svg-icon {
          transition-duration: 0.3s;
        }

        .instagram-svg-icon path {
          fill: white;
        }

        .instagram-text {
          position: absolute;
          color: rgb(255, 255, 255);
          width: 120px;
          font-weight: 600;
          opacity: 0;
          transition-duration: 0.4s;
          text-align: center;
          white-space: nowrap;
        }

        .instagram-btn:hover {
          width: 110px;
          transition-duration: 0.4s;
          border-radius: 30px;
        }

        .instagram-btn:hover .instagram-text {
          opacity: 1;
          transition-duration: 0.4s;
        }

        .instagram-btn:hover .instagram-svg-icon {
          opacity: 0;
          transition-duration: 0.3s;
        }

        .instagram-btn:focus-visible {
          outline: 2px solid #67e8f9;
          outline-offset: 2px;
        }

        @keyframes footerLineShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 180% 50%;
          }
        }

        @keyframes footerPulse {
          0%,
          100% {
            transform: translateX(-42px) scale(0.9);
            opacity: 0.55;
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.45);
          }
          50% {
            transform: translateX(42px) scale(1);
            opacity: 1;
            box-shadow: 0 0 0 8px rgba(34, 211, 238, 0);
          }
        }

        @media (max-width: 767px) {
          .view-counter-badge {
            top: 4.75rem;
            right: 1rem;
            padding: 0.45rem 0.72rem;
          }

          .view-counter-label {
            font-size: 9px;
          }

          .view-counter-value {
            font-size: 11px;
          }
        }

        @media (max-width: 767px) {
          section {
            padding-left: 1.15rem;
            padding-right: 1.15rem;
          }
        }

        ::selection {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default App;