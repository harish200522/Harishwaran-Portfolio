import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import heroPortrait from './assets/hero-portrait.png';
import './App.css';

const imageModules = import.meta.glob('./assets/image{1,2,3,4,5,6,7}/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const imagesFor = (folder) => Object.entries(imageModules).filter(([path]) => path.includes(`/assets/${folder}/`)).sort(([a], [b]) => a.localeCompare(b)).map(([, image]) => image);
const projects = [
  { tag: 'AI / ANALYTICS', title: 'Event-Insight', description: 'Feedback collection and analysis platform.', tech: ['HTML', 'CSS', 'Firebase', 'Hugging Face'], github: 'https://github.com/harish200522/Event-feedback-system', images: imagesFor('image1') },
  { tag: 'AI / EDUCATION', title: 'CampusGuide', description: 'AI-powered placement preparation assistant.', tech: ['HTML', 'CSS', 'Firebase', 'Gemini AI'], github: 'https://github.com/harish200522/campusguide-ai', images: imagesFor('image2') },
  { tag: 'RAG / AI', title: 'FRS-Chatbot', description: 'Document query assistant that reduces search time.', tech: ['Python', 'React', 'Firebase', 'Claude AI'], github: 'https://github.com/harish200522/FRS-Chatbot', images: imagesFor('image3') },
  { tag: 'FULL STACK', title: 'POS System', description: 'Multi-tenant point-of-sale application.', tech: ['Node.js', 'MongoDB', 'React', 'Express'], github: 'https://github.com/harish200522/POS-System', live: 'https://possystemapp.netlify.app', images: imagesFor('image4') },
  { tag: 'COMMERCE', title: 'Fashion Catalogue', description: 'Production e-commerce platform for a real client.', tech: ['React', 'Node.js', 'PostgreSQL', 'Cloudinary'], github: 'https://github.com/harish200522/catalogue', live: 'https://inoutcatalogue.netlify.app', images: imagesFor('image5') },
  { tag: 'COMMERCE', title: 'InOut Fashion', description: 'Full-stack e-commerce platform with catalog & cart.', tech: ['React', 'Node.js', 'Express', 'MongoDB'], github: 'https://github.com/harish200522/catalogue', live: 'https://vocal-buttercream-06059c.netlify.app', isUnderDevelopment: true, images: imagesFor('image6') },
  { tag: 'WEB DESIGN', title: "Medical's Landing Page", description: 'Responsive online presence for a local business.', tech: ['HTML', 'CSS'], github: 'https://github.com/harish200522/Medical-Landing', live: 'https://harishwaranmedical.vercel.app', images: imagesFor('image7') },
];
const navItems = [['About', 'about'], ['Projects', 'projects'], ['Principles', 'testimonials'], ['Contact', 'contact']];
function Icon({ icon, className = '' }) { return <iconify-icon icon={icon} class={className} aria-hidden="true" />; }
function TickerContent() { return <div className="ticker-content"><span>REACT</span><b>•</b><span>AI INTEGRATION</span><b>•</b><span>NODE.JS</span><b>•</b><span>FIREBASE</span><b>•</b><span>POSTGRESQL</span><b>•</b><span>PRODUCT DESIGN</span><b>•</b><span>PYTHON</span><b>•</b></div>; }

function MessagePopupModal({ modal, onClose }) {
  if (!modal.open) return null;
  const isSuccess = modal.type === 'success';

  return (
    <div className="popup-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="popup-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose} aria-label="Close notification">×</button>
        <div className="popup-icon-shell">
          <Icon
            icon={isSuccess ? "solar:check-circle-bold-duotone" : "solar:danger-circle-bold-duotone"}
            className={isSuccess ? "popup-icon success" : "popup-icon error"}
          />
        </div>
        <p className="eyebrow">{isSuccess ? 'CONFIRMATION' : 'ATTENTION'}</p>
        <h3>{modal.title}</h3>
        <p className="popup-body">{modal.message}</p>
        <button className="btn-fill popup-action-btn" onClick={onClose}>
          <span>{isSuccess ? 'GOT IT, THANK YOU' : 'CLOSE'}</span>
          <Icon icon="solar:arrow-right-linear" />
        </button>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', title: '', message: '' });

  const update = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '39f329af-0826-4fca-9ceb-03a898e93fc7',
          ...formData,
          from_name: 'Portfolio Visitor',
          subject: `New message from ${formData.name}`
        })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setModal({
        open: true,
        type: 'success',
        title: 'Message Sent!',
        message: 'Thank you for reaching out. I have received your message and will get back to you within 24 hours.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setModal({
        open: true,
        type: 'error',
        title: 'Could Not Send Message',
        message: 'There was an error sending your message. Please try again or email me directly at vsharishwaran@gmail.com.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={submit}>
        <div className="contact-fields">
          <label>Your name<input name="name" value={formData.name} onChange={update} placeholder="e.g. Harishwaran V S" required /></label>
          <label>Your email<input type="email" name="email" value={formData.email} onChange={update} placeholder="yourname@gmail.com" required /></label>
        </div>
        <label>Your message<textarea name="message" value={formData.message} onChange={update} placeholder="Tell me about your project, role, or idea..." required rows="5" /></label>
        <button className="contact-submit" type="submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send message'} <Icon icon="solar:arrow-right-linear" />
        </button>
      </form>
      <MessagePopupModal modal={modal} onClose={() => setModal({ ...modal, open: false })} />
    </>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <main>
    <nav className="site-nav">
      <a className="brand" href="#top">HARISHWARAN V S</a>
      <div className="nav-links">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
        <a href="/resume.pdf" className="nav-link" download>Resume</a>
      </div>
    </nav>
    <section id="top" className="hero section-shell">
      <div className="hero-copy fade-up"><p className="eyebrow"><Icon icon="solar:map-point-bold-duotone" className="hero-location-icon" /> Karur, Tamil Nadu, India · Independent Developer</p><h1>Build<br /><em>with intent.</em></h1><p className="hero-subtitle">I turn thoughtful ideas into dependable, human-centred digital experiences.</p><div className="hero-actions"><a className="btn-fill" href="#projects"><span>Explore selected work</span><Icon icon="solar:arrow-right-linear" /></a><a className="btn-outline" href="/resume.pdf" download><Icon icon="solar:document-text-bold-duotone" /><span>Download Resume</span></a></div></div>
      <div className="hero-visual fade-up"><div className="portrait-ring"><img src={heroPortrait} alt="Portrait of Harishwaran V S" /></div><div className="player-card"><button aria-label="Play introduction"><Icon icon="solar:play-linear" /></button><div><p className="player-label">A QUICK INTRODUCTION</p><div className="progress"><i /></div></div><span>00:35</span></div></div>
    </section>
    <section className="tech-banner" aria-label="Technology expertise"><div className="tech-banner-heading"><span>TECH STACK</span><i /></div><div className="ticker"><div className="ticker-track"><TickerContent /><TickerContent /></div></div></section>
    <section id="about" className="about section-shell">
      <div className="about-copy fade-up"><p className="eyebrow">01 — ABOUT / STUDIO</p><h2>I design and build things that do it all.</h2><p>I’m Harishwaran, an AI & Data Science student and full-stack developer. I enjoy the hard part: translating a real business problem into a clear, performant product people want to use.</p><p>From a first landing page to an AI-assisted platform, I combine considered interfaces with practical engineering.</p></div>
      <aside className="studio-card fade-up"><Icon icon="solar:microphone-3-bold" className="studio-icon" /><div><p className="eyebrow">CAPABILITIES</p><h3>Digital products</h3><p>React, JavaScript, APIs, AI integration and full-stack web applications.</p></div><hr /><div><p className="eyebrow">WORKING WITH</p><h3>Ideas worldwide</h3><p>Open to freelance work, internships and full-time opportunities.</p></div></aside>
    </section>
    <section id="projects" className="portfolio"><div className="section-shell portfolio-heading fade-up"><p className="eyebrow">02 — SELECTED WORK</p><h2>Projects with a purpose.</h2><p>Seven selected builds spanning AI, commerce and useful everyday software.</p></div><div className="section-shell project-grid">{projects.map((project, index) => <QuantumProjectCard key={project.title} project={project} index={index} onOpenGallery={(p) => { setSelectedProject(p); setActiveImageIndex(0); }} />)}</div></section>
    <section id="testimonials" className="testimonials section-shell"><div className="testimonials-heading fade-up"><p className="eyebrow">03 — WORKING PRINCIPLES</p><h2>Good work should feel good to work with.</h2></div><div className="testimonial-grid"><blockquote className="testimonial fade-up"><Icon icon="solar:quote-right-bold-duotone" /><p>“Start with the real problem, then make the solution feel simple.”</p><footer><strong>Clarity first</strong><span>A considered product process</span></footer></blockquote><blockquote className="testimonial stagger fade-up"><Icon icon="solar:quote-right-bold-duotone" /><p>“Build with care: clear communication, useful details and a dependable finish.”</p><footer><strong>Collaboration matters</strong><span>A practical working style</span></footer></blockquote></div><div className="credentials fade-up"><span>Certified in</span><a href="/frontend_developer_react_certificate.pdf" target="_blank" rel="noreferrer">Frontend Development (React)</a><a href="/java_basic_certificate.pdf" target="_blank" rel="noreferrer">Java Basic</a></div></section>
    <section id="contact" className="contact-section"><Icon icon="solar:soundwave-circle-bold" className="cta-wave" /><div className="section-shell contact-layout"><div className="contact-copy fade-up"><p className="eyebrow">04 — GET IN TOUCH</p><h2>Let’s build something <em>great together.</em></h2><p>I’m open to full-time roles, internships and freelance projects in AI, data science and full-stack development. Drop me a message and I’ll get back to you within 24 hours.</p><div className="availability"><span>💼 Full-time opportunities</span><span>🚀 Internships</span><span>⌘ Freelance projects</span></div><a className="direct-email" href="mailto:vsharishwaran@gmail.com">vsharishwaran@gmail.com <Icon icon="solar:arrow-right-linear" /></a></div><div className="fade-up"><ContactForm /></div></div></section>
    <footer className="footer section-shell"><div className="footer-brand"><a className="brand" href="#top">HARISHWARAN V S</a><p>Developer focused on useful digital experiences.</p><div className="socials"><a className="uiverse-github-btn" href="https://github.com/harish200522" target="_blank" rel="noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 15 15" fill="none"><path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" /></svg><span className="uiverse-tooltip">GitHub</span></a><a className="uiverse-linkedin-btn" href="https://www.linkedin.com/in/harishwaran-v-s-966964378/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 512 512" fill="currentColor"><path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" /></svg><span className="uiverse-tooltip">Linkedin</span></a><a className="uiverse-insta-btn" href="https://www.instagram.com/harishwaran_22_/" target="_blank" rel="noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg><span className="uiverse-insta-username">@harishwaran_22_</span></a></div></div><div className="footer-list"><p className="eyebrow">MENU</p>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-list"><p className="eyebrow">MORE</p><a href="/resume.pdf" download>Download résumé</a><a href="mailto:vsharishwaran@gmail.com">Email me</a><a href="https://github.com/harish200522" target="_blank" rel="noreferrer">GitHub</a></div><p className="copyright">© 2026 HARISHWARAN V S — BUILT WITH INTENT.</p></footer>
    {selectedProject && <ProjectGallery project={selectedProject} index={activeImageIndex} onChange={setActiveImageIndex} onClose={() => setSelectedProject(null)} />}
  </main>;
}
export default App;

function ProjectGallery({ project, index, onChange, onClose }) {
  const images = project.images;
  const touchStart = useRef(null);
  const previous = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);
  return <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${project.title} gallery`} onClick={onClose}>
    <div className="gallery-dialog" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 35) distance > 0 ? next() : previous(); touchStart.current = null; }}>
      <button className="gallery-close" onClick={onClose} aria-label="Close gallery">×</button>
      <img src={images[index]} alt={`${project.title} screenshot ${index + 1}`} />
      {images.length > 1 && <><button className="gallery-arrow previous" onClick={previous} aria-label="Previous image"><Icon icon="solar:arrow-left-linear" /></button><button className="gallery-arrow next" onClick={next} aria-label="Next image"><Icon icon="solar:arrow-right-linear" /></button><span className="gallery-count">{index + 1} / {images.length}</span></>}
      <div className="gallery-caption"><p>{project.title}</p><span>Swipe or use the arrows to browse</span></div>
      {images.length > 1 && <div className="gallery-dots">{images.map((image, imageIndex) => <button key={image} className={index === imageIndex ? 'active' : ''} onClick={() => onChange(imageIndex)} aria-label={`Show image ${imageIndex + 1}`} />)}</div>}
    </div>
  </div>;
}

function VisitLiveButton({ href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="uiverse-live-btn">
      <span className="live-btn-text">Visit Live Site</span>
      <span className="live-icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
}

function QuantumProjectCard({ project, index, onOpenGallery }) {
  const tiltRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({ px: 0.5, py: 0.5, tx: 0.5, ty: 0.5, hov: 0, th: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl = null;
    try { gl = canvas.getContext('webgl'); } catch {}
    if (!gl) return;

    const VS = 'attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }';
    const FS = `
      precision highp float;
      uniform vec2 u_res; uniform float u_time; uniform vec2 u_ptr; uniform float u_hov;
      float hash(vec2 p){ p=fract(p*vec2(127.1,311.7)); return fract(p.x*p.y); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      vec3 pal(float t){ return vec3(0.5)+0.5*cos(6.283*(t+vec3(0,0.1,0.2))); }
      void main(){
        vec2 uv = gl_FragCoord.xy/u_res; vec2 p = uv-0.5; p.x *= u_res.x/u_res.y;
        float n = noise(uv*3.0 + u_time*0.05);
        float ang = uv.x*1.2 - uv.y*1.0 + (u_ptr.x-0.5)*2.0 + n*0.5;
        vec3 irid = pal(ang*0.5 + n*0.2);
        float sweep = exp(-10.0 * abs(dot(p,normalize(vec2(0.7))) - (u_ptr.x-0.5)*1.5));
        float foil = (pow(0.5+0.5*sin(ang*10.0), 2.0)*0.3 + sweep*0.6) * (0.5+0.5*u_hov);
        vec3 col = mix(vec3(0.03), irid, foil) + sweep*0.1*u_hov;
        gl_FragColor = vec4(col, 1.0);
      }`;

    const createShader = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
    const pr = gl.createProgram();
    gl.attachShader(pr, createShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, createShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr); gl.useProgram(pr);

    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(pr, 'u_res'), uTime = gl.getUniformLocation(pr, 'u_time'), uPtr = gl.getUniformLocation(pr, 'u_ptr'), uHov = gl.getUniformLocation(pr, 'u_hov');

    const fit = () => {
      if (!canvas) return;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * d;
      canvas.height = canvas.clientHeight * d;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();
    window.addEventListener('resize', fit);

    let animId = null;
    const loop = (t) => {
      const s = stateRef.current;
      s.px += (s.tx - s.px) * 0.1; s.py += (s.ty - s.py) * 0.1; s.hov += (s.th - s.hov) * 0.05;
      s.rx += ((0.5 - s.py) * 18 - s.rx) * 0.1; s.ry += ((s.px - 0.5) * 18 - s.ry) * 0.1;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t / 1000);
      gl.uniform2f(uPtr, s.px, 1 - s.py);
      gl.uniform1f(uHov, s.hov);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', fit);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    stateRef.current.tx = Math.max(0, Math.min(1, x));
    stateRef.current.ty = Math.max(0, Math.min(1, y));
    stateRef.current.th = 1;
  };

  const handlePointerLeave = () => {
    stateRef.current.tx = 0.5;
    stateRef.current.ty = 0.5;
    stateRef.current.th = 0;
  };

  return (
    <article
      className="nebula-card-shell fade-up"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="nebula-card-tilt" ref={tiltRef}>
        <div className="nebula-card-wrapper">
          <div className="nebula-card-inner">
            <canvas ref={canvasRef} className="nebula-gl-canvas" />
            <div className="nebula-overlay-gradient" />
            <div className="nebula-noise-layer" />
            <div className="nebula-interface-layer">
              <div className="project-top">
                <span className="project-tag-badge">
                  <Icon icon="solar:shield-unique-linear" className="shield-icon" /> {project.tag}
                </span>
                {project.isUnderDevelopment && <span className="dev-status-badge">⚡ IN DEV</span>}
                <a className="btn-github" href={project.github} target="_blank" rel="noreferrer">
                  <FaGithub /> <span>View on GitHub</span>
                </a>
              </div>

              <div className="project-bottom">
                <div className="project-title-header">
                  <h3>{project.title}</h3>
                  <Icon icon="solar:bolt-linear" className="bolt-icon" />
                </div>
                <div className="project-divider" />
                <p>{project.description}</p>
                <div className="project-tech">
                  <span>TECH STACK</span>
                  <div>{project.tech.map((item) => <b key={item}>{item}</b>)}</div>
                </div>
                <div className="project-actions">
                  <button className="Documents-btn" onClick={() => onOpenGallery(project)}>
                    <span className="folderContainer">
                      <svg className="fileBack" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id={`folderBackGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffe066" />
                            <stop offset="100%" stopColor="#d48200" />
                          </linearGradient>
                        </defs>
                        <path d="M10 15h25l10 10h45a5 5 0 0 1 5 5v45a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V20a5 5 0 0 1 5-5z" fill={`url(#folderBackGrad-${index})`} />
                      </svg>
                      <svg className="filePage" viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="70" height="60" rx="3" fill="#ffffff" />
                        <line x1="15" y1="20" x2="55" y2="20" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                        <line x1="15" y1="32" x2="65" y2="32" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                        <line x1="15" y1="44" x2="45" y2="44" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      <svg className="fileFront" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id={`folderFrontGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffea9f" />
                            <stop offset="100%" stopColor="#ffaa00" />
                          </linearGradient>
                        </defs>
                        <path d="M5 25h90a5 5 0 0 1 5 5v40a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V30a5 5 0 0 1 5-5z" fill={`url(#folderFrontGrad-${index})`} />
                      </svg>
                    </span>
                    <span className="text">See sample ({project.images.length})</span>
                  </button>
                  {project.live && <VisitLiveButton href={project.live} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
