import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Code2, Github, Linkedin, X, Stethoscope, Truck, Contact2,
  ArrowUpRight, ChevronRight, Rocket, GraduationCap, Building2, MessageCircle,
  Terminal, Cpu, Layers, Database, Cloud, Globe, Copy, Check, ShoppingCart,
  Activity, ExternalLink, Braces, GitBranch, Search, Settings, User, Coffee,
  Zap, Box, Monitor, Command, Lock, Eye, Play, Ticket, Calendar, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// --- Code Snippets for Modal ---
const codeSnippets = {
  mediBot: `// AI Medical Interaction Analysis
class MediBotEngine {
  final LlamaModel _model;
  
  Future<Analysis> analyzeInteraction(Drug a, Drug b) async {
    final prompt = "Analyze interaction between: \${a.name} and \${b.name}";
    final response = await _model.generate(prompt);
    return Analysis.fromNLP(response);
  }
}`,
  logistics: `// Real-time Geospatial Tracking
const trackShipment = (id) => {
  const socket = useSocket(ENV.GEO_SERVER);
  
  socket.on('position_update', (data) => {
    updateMapMarker({
      id: data.truckId,
      coords: [data.lat, data.lng],
      bearing: data.heading
    });
  });
}`,
  vcard: `// NFC Handshake Protocol
void initializeHandshake() {
  NFCManager.instance.startSession(
    onDiscovered: (Tag tag) async {
      await tag.writeVCard(currentUser.profile);
      HapticFeedback.heavyImpact();
    }
  );
}`,
  quest: `// Digital Loyalty Processing
void claimReward(String userId, String stampId) {
  Firestore.instance
    .collection('users/\${userId}/stamps')
    .add({
      'timestamp': FieldValue.serverTimestamp(),
      'type': 'loyalty_earn'
    });
}`,
  queue: `// Real-time Queue Management
socket.on('queue_update', (update) => {
  setState((prev) => ({
    ...prev,
    waitingList: update.newQueue,
    estimatedWait: update.newTime
  }));
});`
};

const translations = {
  ar: {
    navWork: "المستودع", navLab: "المختبر", navHistory: "السجل",
    heroTitle: "يوسف الخولي", heroSubtitle: "مهندس نظم برمجية",
    heroDesc: "متخصص في هندسة تطبيقات Flutter العالية الأداء، دمج نماذج الذكاء الاصطناعي (LLMs)، وبناء أنظمة Odoo ERP للمؤسسات.",
    cvBtn: "تحميل السيرة الذاتية", projectsTitle: "المشاريع المختارة",
    skillsTitle: "المواصفات التقنية", expTitle: "الخط الزمني",
    roles: "FLUTTER_ARCH // AI_ENGINEER // ODOO_DEV",
    hireBtn: "بدء جلسة عمل", footerQuote: "الكود النظيف هو الشعر الذي يكتبه المهندسون.",
    stats: { projects: "٢٥+", years: "٣+", clients: "١٠+" },
    close: "إغلاق", demo: "تشغيل العرض الحي", credentials: "بيانات الدخول التجريبية",
    copy: "نسخ البيانات", copied: "تم النسخ!", details: "تفاصيل النظام"
  },
  en: {
    navWork: "Repository", navLab: "The Lab", navHistory: "History",
    heroTitle: "YOUSEF ELKHOLY", heroSubtitle: "SOFTWARE Engineer",
    heroDesc: "Specializing in high-concurrency Flutter ecosystems, Large Language Model (LLM) integrations, and enterprise-grade Odoo ERP architecture.",
    cvBtn: "Download Resume", projectsTitle: "Selected Projects",
    skillsTitle: "Tech Specs", expTitle: "Timeline",
    roles: "FLUTTER_ARCH // AI_ENGINEER // ODOO_DEV",
    hireBtn: "Initialize Session", footerQuote: "Clean code is the poetry of logic.",
    stats: { projects: "5+", years: "1+", clients: "5+" },
    close: "Close", demo: "Launch Live Demo", credentials: "Access Credentials",
    copy: "Copy Data", copied: "Copied!", details: "System Details"
  }
};

const experienceData = (lang) => [
  { id: 1, year: "2025 - Present", title: lang === 'ar' ? "Space Techs - كبير مهندسي Flutter" : "Space Techs - Lead Flutter Architect", icon: Rocket, desc: lang === 'ar' ? "قيادة هندسة تطبيقات Flutter وتطوير محركات الذكاء الاصطناعي." : "Leading Flutter architecture and AI engine development." },
  { id: 2, year: "2025 - 2026", title: lang === 'ar' ? "VAI Development - HelpDesk" : "VAI Development - HelpDesk", icon: Building2, desc: lang === 'ar' ? "تخصيص أنظمة Odoo ERP وإدارة البنية التحتية البرمجية." : "Odoo ERP customization and infrastructure management." },
  { id: 3, year: "2021 - 2025", title: lang === 'ar' ? "جامعة المستقبل - بكالوريوس حاسبات" : "Future University - CS Degree", icon: GraduationCap, desc: lang === 'ar' ? "تخصص في الذكاء الاصطناعي والأنظمة الموزعة." : "Specialized in AI and Distributed Systems." }
];

const projectsData = (lang) => [
  {
    id: 1, title: "MediBot AI", slug: "mediBot",
    description: lang === 'ar' ? "محرك تحليل طبي يعتمد على LLaMA 3 لمعالجة التفاعلات الدوائية الحرجة." : "Medical inference engine utilizing LLaMA 3 for critical drug interaction analysis.",
    tech: ["Flutter", "NLP", "LLaMA 3", "Python"], icon: Stethoscope,
    demoUrl: "https://appetize.io/app/b_jjrd2oc5f2hifx7pndpcvffj64",
    color: "from-emerald-500/20 to-blue-500/10", accent: "text-emerald-400",
    metrics: { cpu: "12%", memory: "256MB", latency: "45ms" }
  },
  {
    id: 2, title: "Quest Loyalty", slug: "quest",
    description: lang === 'ar' ? "تطبيق ولاء للمطاعم يتيح جمع الطوابع الرقمية والحصول على مكافآت مجانية فورية." : "Restaurant loyalty app that rewards users with digital stamps for every visit.",
    tech: ["Flutter", "Firebase", "QR Sync", "Node.js"], icon: Ticket,
    demoUrl: "https://appetize.io/app/8v6kqj7", 
    color: "from-orange-500/20 to-yellow-500/10", accent: "text-orange-400",
    metrics: { users: "2.4k", stamps: "15k+", active: "88%" }
  },
  {
    id: 3, title: "Queue Management", slug: "queue",
    description: lang === 'ar' ? "نظام ذكي لحجز الطاولات وإدارة الانتظار لتقليل وقت الإنتظار بنسبة 30%." : "Smart reservation and queue system designed to optimize restaurant seating flow.",
    tech: ["React Native", "WebSockets", "PostgreSQL", "Python"], icon: Calendar,
    demoUrl: "https://appetize.io/app/8v6kqj7",
    color: "from-indigo-500/20 to-purple-500/10", accent: "text-indigo-400",
    metrics: { avgWait: "-18m", bookings: "500+", load: "14%" }
  },
  {
    id: 4, title: "My Three Sons", slug: "logistics",
    description: lang === 'ar' ? "نظام إدارة لوجستية متكامل مع تتبع جغرافي لحظي للسوق الأمريكي." : "Full-stack logistics engine with real-time geospatial tracking for US fleets.",
    tech: ["Flutter", "Google Maps", "REST API", "Firebase"], icon: Truck,
    demoUrl: "https://appetize.io/app/b_c3ebqhdx23xwyvhmfhmpnkrxoi",
    color: "from-blue-500/20 to-indigo-500/10", accent: "text-blue-400",
    metrics: { cpu: "5%", memory: "128MB", latency: "12ms" }
  },
  {
    id: 5, title: "NFC MyCard", slug: "vcard",
    description: lang === 'ar' ? "بروتوكول تبادل هويات رقمية يعتمد على تقنية NFC والتعريف الذكي QR." : "Digital identity exchange protocol utilizing NFC and smart QR handshakes.",
    tech: ["Flutter", "NFC Core", "Cloud Sync", "Node.js"], icon: Contact2,
    demoUrl: "https://appetize.io/app/b_i4dcyfseqhhytmekfu3vz5id6y",
    color: "from-purple-500/20 to-pink-500/10", accent: "text-purple-400",
    metrics: { cpu: "2%", memory: "64MB", latency: "8ms" }
  }
];

const PerspectiveCard = ({ children, className, onClick }) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) / 20);
    y.set((event.clientY - (rect.top + rect.height / 2)) / 20);
  }
  function handleLeave() { x.set(0); y.set(0); }
  return (
    <motion.div onMouseMove={handleMouse} onMouseLeave={handleLeave} onClick={onClick}
      style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d" }} className={className}>
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

const SkillBar = ({ label, val, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
        <span className="text-[10px] font-mono text-slate-600">{val}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${val}%` } : { width: 0 }} 
          transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
          className={`h-full ${color} shadow-[0_0_15px_rgba(37,99,235,0.3)]`} />
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const t = translations[lang];
  const isRtl = lang === 'ar';
  const WHATSAPP_NUMBER = "201026997368";
  const CREDENTIALS = { email: "yousef.elkholy2022@gmail.com", pass: "yousef1234" };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyCredentials = () => {
    const text = `Email: ${CREDENTIALS.email}\nPassword: ${CREDENTIALS.pass}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-[#050508] text-slate-300 selection:bg-blue-600/50 overflow-x-hidden ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'py-4 bg-[#050508]/80 backdrop-blur-xl border-white/5' : 'py-8 bg-transparent border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg"><Terminal size={20} className="text-white" /></div>
            <span className="font-black text-xl tracking-tight text-white uppercase italic">YOUSEF<span className="text-blue-500">.</span>DEV</span>
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest">
              {['work', 'lab', 'history'].map((item) => (
                <a key={item} href={`#${item}`} className="text-slate-500 hover:text-white transition-colors">{t[`nav${item.charAt(0).toUpperCase() + item.slice(1)}`]}</a>
              ))}
            </div>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-4 py-2 rounded-md border border-white/10 text-[10px] font-bold flex items-center gap-2 bg-white/5">
              <Globe size={14} className="text-blue-500" /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="min-h-screen flex items-center px-6 relative">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center pt-20">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">{t.roles}</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] uppercase italic">
              {t.heroTitle} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">{t.heroSubtitle}</span>
            </h1>
            <p className={`text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-14 ${isRtl ? 'border-r-4 pr-8' : 'border-l-4 pl-8'} border-blue-600/30 font-light italic`}>{t.heroDesc}</p>
            <div className="flex flex-wrap gap-8">
              <button className="px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center gap-4 hover:bg-blue-600 hover:text-white transition-all">{t.cvBtn} <ArrowUpRight size={18} /></button>
              <div className="flex gap-4">
                {[Github, Linkedin].map((Icon, i) => <button key={i} className="w-14 h-14 border border-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Icon size={22} /></button>)}
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative perspective-1000">
            <div className="bg-[#0c0d12]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#1a1b26] px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div>
                <div className="text-[9px] font-bold text-slate-500 tracking-[0.3em]">ARCH_CORE // V2.5</div>
              </div>
              <div className="p-8 text-[12px] font-mono leading-relaxed min-h-[350px]">
                <div className="text-blue-500 italic mb-4">// System Protocol Initialized</div>
                <div><span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span> {'{'}</div>
                <div className="pl-6"><span className="text-blue-400">final</span> <span className="text-emerald-400">String</span> name = <span className="text-orange-300">"Yousef Elkholy"</span>;</div>
                <div className="pl-6"><span className="text-blue-400">final</span> <span className="text-emerald-400">List</span> stack = [<span className="text-orange-300">"Flutter"</span>, <span className="text-orange-300">"AI"</span>];</div>
                <div className="pl-6 mt-4"><span className="text-blue-400">void</span> <span className="text-yellow-400">executeInnovation</span>() {'{'}</div>
                <div className="pl-12 text-slate-500">print(<span className="text-orange-300">"System Online."</span>);</div>
                <div className="pl-6">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Repository */}
      <section id="work" className="py-32 px-6 bg-[#030305]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter">Code_<span className="text-blue-500">Vault</span></h2>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase"><Database size={14} /> 5+ Units Deployed</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projectsData(lang).map((project) => (
              <PerspectiveCard key={project.id} onClick={() => { setSelectedProject(project); setIsModalOpen(true); }}
                className="group relative bg-[#0c0d12] border border-white/5 rounded-2xl p-10 cursor-pointer hover:border-blue-500/40 transition-all duration-500">
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-xl border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all"><project.icon size={28} /></div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Live View Available</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">BUILD::{project.id}</div>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase italic leading-none">{project.title}</h3>
                <p className="text-slate-500 mb-10 leading-relaxed font-light text-sm line-clamp-3">{project.description}</p>
                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-2">
                  {project.tech.map(tag => <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-md text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{tag}</span>)}
                </div>
              </PerspectiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Lab / Skills Section */}
      <section id="lab" className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-24 items-center">
          <div>
            <span className="text-blue-500 text-[11px] font-black tracking-[0.5em] uppercase mb-6 block italic">Stack Specs</span>
            <h2 className="text-7xl md:text-8xl font-black text-white italic mb-12 uppercase tracking-tighter">Core_<span className="text-slate-800">Capacity</span></h2>
            <div className="grid grid-cols-2 gap-6">
              {[ { label: "Completed", val: "5+", icon: Box, color: "text-blue-500" }, { label: "Uptime", val: "03+", icon: Activity, color: "text-emerald-500" }].map((stat, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/5"><stat.icon className={`${stat.color} mb-6`} size={24} /><div className="text-4xl font-black text-white mb-1 tracking-tighter">{stat.val}</div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div></div>
              ))}
            </div>
          </div>
          <div className="bg-[#0c0d12]/50 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/10">
            <div className="space-y-12">
              <SkillBar label="Flutter Architecture" val={95} color="bg-blue-500" index={0} />
              <SkillBar label="AI Inference Models" val={88} color="bg-indigo-500" index={1} />
              <SkillBar label="ERP System Design" val={92} color="bg-emerald-500" index={2} />
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section id="history" className="py-32 px-6 bg-[#030305]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-32"><h2 className="text-6xl md:text-7xl font-black text-white italic uppercase tracking-tighter">System_Timeline</h2></div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 to-transparent hidden md:block"></div>
            <div className="space-y-16">
              {experienceData(lang).map((item, i) => (
                <div key={item.id} className={`relative flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                      <div className="text-blue-500 font-mono text-xs font-bold mb-2 uppercase">{item.year}</div>
                      <h4 className="text-2xl font-black text-white uppercase italic mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                  <div className="z-10 w-14 h-14 bg-[#050508] border-2 border-blue-600 rounded-xl flex items-center justify-center shrink-0"><item.icon size={22} className="text-white" /></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-[#030305] text-center">
        <h3 className="text-5xl md:text-7xl font-black text-white italic mb-12 tracking-tighter">Ready to <span className="text-blue-500">Initialize</span>?</h3>
        <div className="flex justify-center gap-8 flex-wrap">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="px-12 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-lg">{t.hireBtn}</a>
          <button onClick={() => window.location.href = `mailto:${CREDENTIALS.email}`} className="px-12 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-lg">Send Email</button>
        </div>
      </footer>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-[#050508]/95 backdrop-blur-2xl" onClick={() => setIsModalOpen(false)}></div>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-6xl bg-[#0c0d12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[850px]">
              
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"><X size={20} /></button>

              {/* Device Preview Mockup */}
              <div className="flex-1 bg-[#08080a] relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 min-h-[450px]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2),transparent_70%)]"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-[270px] h-[540px] bg-[#16171d] rounded-[3rem] border-[8px] border-[#2a2b35] shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#2a2b35] rounded-b-3xl z-20"></div>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1a1b26] to-[#0c0d12]">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center text-white mb-8 shadow-2xl`}><selectedProject.icon size={40} /></div>
                      <h4 className="text-white font-black text-center text-xl mb-3 italic uppercase tracking-tighter">{selectedProject.title}</h4>
                      <div className="flex items-center gap-2 mb-12"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Environment Ready</span></div>
                      <button onClick={() => window.open(selectedProject.demoUrl, '_blank')} className="w-full py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-3">{t.demo} <ExternalLink size={14} /></button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Project Info & Code */}
              <div className="flex-1 p-10 md:p-16 overflow-y-auto">
                <div className="mb-12">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedProject.accent} mb-4 block italic`}>{t.details}</span>
                  <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-8">{selectedProject.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-light italic border-l-2 border-white/5 pl-6">{selectedProject.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-12">
                  {Object.entries(selectedProject.metrics).map(([key, val]) => (
                    <div key={key} className="p-4 bg-white/5 border border-white/5 rounded-xl"><div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">{key}</div><div className="text-sm font-mono text-white">{val}</div></div>
                  ))}
                </div>
                <div className="bg-[#050508] rounded-2xl border border-white/5 overflow-hidden">
                  <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center"><span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">source_preview.dart</span></div>
                  <pre className="p-6 text-[11px] font-mono leading-relaxed text-blue-300/70 overflow-x-auto"><code>{codeSnippets[selectedProject.slug]}</code></pre>
                </div>
                <div className="mt-8 p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex items-center justify-between group">
                  <div><div className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">{t.credentials}</div><div className="text-[11px] font-mono text-slate-400 italic">User: yousef.elkholy@gmail.com // Pass: yousef1234</div></div>
                  <button onClick={handleCopyCredentials} className="p-3 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
