
import React, { useState, useEffect } from 'react';
import { BRAND_PILLARS, UPCOMING_EVENTS, LEGAL_CONTENT } from './constants';
import SectionHeader from './components/SectionHeader';
import AIAssistant from './components/AIAssistant';
import PillarModal from './components/PillarModal';
import AIPlanetaryVisual from './components/AIPlanetaryVisual';
import HeroSlideshow from './components/HeroSlideshow';
import SearchOverlay from './components/SearchOverlay';
import LegalView from './components/LegalView';
import { GeminiService } from './services/geminiService';
import { BrandPillar } from './types';

type PageState = 'home' | 'about' | 'disclaimer' | 'privacy';

// Subtle Animated Illustrations
const HolisticIcon = () => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-emerald-500 stroke-[1.5]">
      <circle cx="50" cy="50" r="30" className="animate-[pulse_3s_ease-in-out_infinite]" />
      <circle cx="50" cy="50" r="45" className="opacity-20 animate-[spin_10s_linear_infinite]" strokeDasharray="4 8" />
      <path d="M50 5 L50 95 M5 50 L95 50" className="opacity-10" />
      <circle cx="50" cy="5" r="3" fill="currentColor" className="animate-[bounce_2s_infinite]" />
      <circle cx="95" cy="50" r="3" fill="currentColor" className="animate-[bounce_2s_infinite_1s]" />
      <circle cx="50" cy="95" r="3" fill="currentColor" className="animate-[bounce_2s_infinite_0.5s]" />
      <circle cx="5" cy="50" r="3" fill="currentColor" className="animate-[bounce_2s_infinite_1.5s]" />
    </svg>
  </div>
);

const SupportiveIcon = () => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-orange-500 stroke-[2]">
      <path d="M50 85 C10 60 10 30 50 30 C90 30 90 60 50 85 Z" className="animate-[pulse_2.5s_ease-in-out_infinite]" fill="rgba(245, 158, 11, 0.05)" />
      <g className="animate-[bounce_4s_ease-in-out_infinite]">
        <circle cx="30" cy="20" r="2" fill="currentColor" className="opacity-40" />
        <circle cx="70" cy="15" r="3" fill="currentColor" className="opacity-60" />
        <circle cx="50" cy="10" r="1.5" fill="currentColor" />
      </g>
    </svg>
  </div>
);

const ScienceIcon = () => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-sky-500 stroke-[1.5]">
      <rect x="20" y="20" width="60" height="60" rx="10" className="opacity-10" />
      <path d="M30 70 L45 40 L60 55 L75 30" strokeDasharray="100" strokeDashoffset="100" className="animate-[draw_3s_ease-in-out_infinite]">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="75" cy="30" r="4" fill="currentColor" className="animate-pulse" />
      <line x1="20" y1="85" x2="80" y2="85" strokeWidth="1" className="opacity-20" />
      <line x1="15" y1="20" x2="15" y2="80" strokeWidth="1" className="opacity-20" />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<BrandPillar | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ goal: '', lifestyle: '', focus: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('morning');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Progress Tracking State
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('vibe_completed_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('vibe_streak');
    return saved ? parseInt(saved, 10) : 3; 
  });

  const gemini = new GeminiService();

  useEffect(() => {
    localStorage.setItem('vibe_completed_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('vibe_streak', streak.toString());
  }, [streak]);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const result = await gemini.generatePersonalizedPlan(profile);
    setPlan(result);
    setCompletedTasks([]);
    setIsGenerating(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const openPlanGenerator = () => {
    setShowPlanGenerator(true);
    setIsMenuOpen(false);
  };

  const navigateTo = (page: PageState) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    navigateTo('home');
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getStartedText = plan ? "View My Wellness Plan" : "Create Your Personalized Wellness Plan";

  const rituals = {
    morning: [
      { id: 'm1', time: "0-5 min", pillar: "Care Well", title: "Mindful Centering", desc: "4-7-8 breathing + 3 gratitudes.", icon: "🧘‍♀️", color: "bg-sky-100 text-sky-600" },
      { id: 'm2', time: "5-12 min", pillar: "Act Well", title: "Dynamic Flow", desc: "Joint mobilization & neck rolls.", icon: "🤸‍♂️", color: "bg-emerald-100 text-emerald-600" },
      { id: 'm3', time: "12-15 min", pillar: "Eat Well", title: "Lemon Hydration", desc: "Warm water with lemon to wake the gut.", icon: "🍋", color: "bg-orange-100 text-orange-600" }
    ],
    evening: [
      { id: 'e1', time: "0-10 min", pillar: "Care Well", title: "Digital Sunset", desc: "All screens away, switch to warm light.", icon: "📵", color: "bg-indigo-100 text-indigo-600" },
      { id: 'e2', time: "10-20 min", pillar: "Sleep Well", title: "Magnesium Soak", desc: "Epsom salt bath or warm shower.", icon: "🛁", color: "bg-blue-100 text-blue-600" },
      { id: 'e3', time: "20-30 min", pillar: "Care Well", title: "Vibe Journal", desc: "Reflect on one 'sync' moment today.", icon: "✍️", color: "bg-purple-100 text-purple-600" }
    ]
  };

  const totalPossibleTasks = 4 + (activeTab === 'morning' ? rituals.morning.length : rituals.evening.length);
  const totalCompleted = completedTasks.length;
  const adherenceRate = Math.round((totalCompleted / totalPossibleTasks) * 100) || 0;

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform text-sm sm:text-base">V</div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 hidden xs:inline">Vibe4Wellness</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-full text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all text-sm font-bold"
            >
              <span>🔍</span>
              <span className="opacity-60 hidden md:inline">Search wellness...</span>
            </button>

            {/* Desktop Menu - visible from medium screens up */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 border-l border-slate-100 pl-6 ml-2">
              {[
                { label: 'Pillars', id: '#pillars' },
                { label: 'Progress', id: '#progress' },
                { label: 'About', action: () => navigateTo('about') }
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={item.action || (() => scrollToId(item.id!))}
                  className="text-[12px] lg:text-[13px] font-bold text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={openPlanGenerator}
                className={`${plan ? 'bg-emerald-600' : 'bg-orange-500'} hover:scale-105 text-white px-5 lg:px-7 py-2.5 lg:py-3 rounded-2xl text-[12px] lg:text-[13px] font-bold shadow-xl transition-all active:scale-95`}
              >
                {plan ? "My Plan" : "Get Started"}
              </button>
            </div>

            {/* Mobile Menu Button - STRICTLY FOR MOBILE ONLY (hidden on md+) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - SMALL VERSION */}
      <div className={`fixed inset-0 z-[40] bg-white md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-20 pb-10 px-6">
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">Navigation</span>
            {[
              { label: 'Home', action: () => navigateTo('home') },
              { label: 'Pillars', id: '#pillars' },
              { label: 'Progress', id: '#progress' },
              { label: 'Recipes', id: '#recipes' },
              { label: 'About', action: () => navigateTo('about') }
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={item.action || (() => scrollToId(item.id!))}
                className="text-xl font-bold text-slate-800 hover:text-emerald-500 transition-all text-left animate-in slide-in-from-left-4"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
            <button 
              onClick={openPlanGenerator}
              className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-orange-100 active:scale-95"
            >
              Start My Blueprint ✨
            </button>
            <p className="text-center text-[8px] font-bold uppercase tracking-[0.2em] text-slate-300">Vibe4Wellness Protocol v2.5</p>
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Conditional Rendering of Pages */}
      {currentPage === 'home' ? (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="relative pt-32 pb-16 lg:pt-60 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[60%] h-full bg-emerald-50/30 -skew-x-12 transform origin-top-right -z-10 rounded-bl-[200px]"></div>
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 lg:space-y-10 max-w-2xl">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border border-emerald-200/50">
                  Global Campaign • Holistic Health ✨
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-extrabold leading-[1.05] text-slate-900 text-balance tracking-tight">
                  AI-Powered Holistic <span className="text-emerald-500">Wellness.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                  Synchronize your life with intelligent wellness blueprints. We connect nutrition, movement, sleep, and self-care using advanced AI to help you achieve perfect resonance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
                  <button 
                    onClick={openPlanGenerator}
                    className={`${plan ? 'bg-emerald-500 shadow-emerald-100' : 'bg-orange-500 shadow-orange-100'} hover:bg-opacity-90 text-white font-black px-8 lg:px-12 py-4 lg:py-6 rounded-2xl lg:rounded-[2rem] text-base lg:text-lg shadow-2xl transition-all hover:-translate-y-1 active:scale-95 ${plan ? 'animate-pulse-subtle' : ''}`}
                  >
                    {getStartedText}
                  </button>
                  <a href="#recipes" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-black px-8 lg:px-12 py-4 lg:py-6 rounded-2xl lg:rounded-[2rem] text-base lg:text-lg transition-all flex items-center justify-center">
                    Healthy Recipes
                  </a>
                </div>
              </div>
              <HeroSlideshow />
            </div>
          </section>

          {/* Trust Bar */}
          <section className="py-8 lg:py-12 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center sm:justify-between items-center gap-8 sm:gap-12 grayscale opacity-50">
              <div className="flex items-center gap-3 sm:gap-4"><span className="text-xl sm:text-2xl font-black">150k+</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Lives</span></div>
              <div className="flex items-center gap-3 sm:gap-4"><span className="text-xl sm:text-2xl font-black">50+</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Hubs</span></div>
              <div className="flex items-center gap-3 sm:gap-4"><span className="text-xl sm:text-2xl font-black">12M+</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Eco</span></div>
              <div className="flex items-center gap-3 sm:gap-4"><span className="text-xl sm:text-2xl font-black">4.9/5</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Vibe</span></div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative order-2 lg:order-1">
                  <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-orange-100 rounded-full blur-[60px] -z-10"></div>
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" className="rounded-3xl lg:rounded-[4rem] shadow-xl border-4 lg:border-8 border-slate-50 h-[300px] sm:h-[400px] lg:h-[500px] w-full object-cover" alt="Happiness and Wellness Studio Space" loading="lazy" />
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                  <SectionHeader title="Our Mission" centered={false} subtitle="Bringing harmony to the chaos of modern life." />
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                    Vibe4Wellness started as a local rally to encourage healthier habits in a digital world. Today, it is a global movement driven by the belief that wellness shouldn't be a chore—it should be a resonance.
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Science Based</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-semibold leading-tight">Vetted by circadian health experts.</p>
                    </div>
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Human Centric</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-semibold leading-tight">Designed for busy professionals.</p>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('about')} className="text-emerald-600 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">Learn our story →</button>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section id="pillars" className="py-16 lg:py-32 bg-slate-50/50 relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="The Four Pillars" subtitle="The foundation of our holistic wellness architecture." />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 lg:mt-20">
                {BRAND_PILLARS.map((pillar, i) => (
                  <div key={i} onClick={() => setSelectedPillar(pillar)} className="pillar-card group bg-white p-8 lg:p-12 rounded-3xl lg:rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer">
                    <div className={`pillar-icon w-12 h-12 lg:w-16 lg:h-16 ${pillar.color} rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mb-6 lg:mb-10 shadow-xl shadow-slate-200 transition-transform duration-700`}>{pillar.icon}</div>
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 lg:mb-4">{pillar.title}</h3>
                    <p className="text-sm lg:text-[15px] text-slate-500 font-medium leading-relaxed mb-6 lg:mb-10">{pillar.description}</p>
                    <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] lg:text-xs uppercase tracking-widest group-hover:gap-6 transition-all">Deep Dive <span className="text-lg lg:text-xl">→</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Our Approach Works Section */}
          <section id="approach" className="py-16 lg:py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader 
                title="Why Our Approach Works" 
                subtitle="A philosophy rooted in connection, evidence, and optimism." 
              />
              <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mt-12 lg:mt-20">
                <div className="text-center space-y-6 lg:space-y-8 p-8 lg:p-10 rounded-3xl lg:rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <HolisticIcon />
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900">Holistic & Integrated</h3>
                    <p className="text-sm lg:text-[15px] text-slate-500 font-medium leading-relaxed">
                      We see the invisible threads connecting your sleep to your diet, and your movement to your mood.
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-6 lg:space-y-8 p-8 lg:p-10 rounded-3xl lg:rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <SupportiveIcon />
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900">Positive & Supportive</h3>
                    <p className="text-sm lg:text-[15px] text-slate-500 font-medium leading-relaxed">
                      No shame. No guilt. Just a supportive AI guide and a global community that cheers for every win.
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-6 lg:space-y-8 p-8 lg:p-10 rounded-3xl lg:rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <ScienceIcon />
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900">Science-Backed</h3>
                    <p className="text-sm lg:text-[15px] text-slate-500 font-medium leading-relaxed">
                      Every ritual and suggestion is backed by peer-reviewed research, decoded for the real world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eco Section with AI Planetary Visual */}
          <section id="eco" className="py-20 lg:py-40 bg-emerald-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 opacity-10 hidden sm:block"><div className="w-96 h-96 border-[48px] border-white rounded-full"></div></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-8 lg:space-y-10">
                  <SectionHeader title="Planetary Wellness" centered={false} subtitle="For every user milestone, we fund a community vertical farm." />
                  <p className="text-lg lg:text-xl text-emerald-100/70 font-medium leading-relaxed">Sustainable health is more than personal—it is planetary. Join us in reducing footprints while increasing your own energy.</p>
                  <div className="bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] border border-white/10 space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center"><span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-300">Goal</span> <span className="text-[10px] sm:text-xs font-black">8,420 / 10,000</span></div>
                    <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[84%]"></div></div>
                  </div>
                </div>
                <div className="relative group">
                  <AIPlanetaryVisual />
                </div>
              </div>
            </div>
          </section>

          {/* Unified Progress & AI Guide Section */}
          <section id="progress" className="py-16 lg:py-32 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader 
                title="Your Personal Hub" 
                subtitle="Track your evolution and synchronize with your AI wellness architect in real-time." 
              />
              
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-20 items-stretch">
                <div className="bg-white rounded-[2rem] lg:rounded-[4rem] p-8 lg:p-14 border border-slate-100 shadow-xl flex flex-col justify-between">
                  <div className="space-y-8 lg:space-y-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Live Analytics</span>
                      <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        Top 15%
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
                      <div className="relative w-36 h-36 lg:w-48 lg:h-48 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                          <circle 
                            cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="12" fill="transparent" 
                            className="text-emerald-500 transition-all duration-1000 ease-out"
                            strokeDasharray="276"
                            strokeDashoffset={276 - (276 * adherenceRate) / 100}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl lg:text-5xl font-black text-slate-900">{adherenceRate}%</span>
                          <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Sync</span>
                        </div>
                      </div>

                      <div className="space-y-4 flex-1 text-center sm:text-left">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">Streak</p>
                          <h4 className="text-3xl lg:text-4xl font-black text-slate-900">{streak} Days 🔥</h4>
                        </div>
                        <p className="text-slate-500 font-medium italic leading-relaxed text-xs lg:text-sm">
                          "Keep the momentum!"
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Points</p>
                          <p className="text-xl lg:text-2xl font-black text-slate-900">1,240 🌱</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mastery</p>
                          <p className="text-xl lg:text-2xl font-black text-slate-900">Eat Well 🥗</p>
                       </div>
                    </div>
                  </div>

                  <button className="mt-8 lg:mt-12 w-full py-4 lg:py-5 bg-slate-900 text-white rounded-2xl lg:rounded-[2rem] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-xl">
                    View Report
                  </button>
                </div>

                <div className="flex flex-col h-full">
                  <AIAssistant />
                </div>
              </div>
            </div>
          </section>

          {/* Recipes Section */}
          <section id="recipes" className="py-16 lg:py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Healthy Recipes" subtitle="AI-curated nutrition that doesn't compromise on taste." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12 lg:mt-20">
                {[
                  { title: "Golden Quinoa Glow Bowl", tag: "High Protein", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
                  { title: "Zesty Avocado Salad", tag: "Heart Healthy", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
                  { title: "Midnight Berry Bowl", tag: "Antioxidant", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop" }
                ].map((recipe, idx) => (
                  <div key={idx} className="group relative rounded-3xl lg:rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                    <div className="h-60 sm:h-72 lg:h-80 overflow-hidden relative">
                      <img src={recipe.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={recipe.title} />
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 shadow-xl">{recipe.tag}</div>
                    </div>
                    <div className="p-8 lg:p-10 space-y-3 lg:space-y-4 bg-white">
                      <h4 className="text-xl lg:text-2xl font-black text-slate-900">{recipe.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Personalized metabolic sync.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rituals Section */}
          <section id="rituals" className="py-16 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Circadian Rituals" subtitle="Daily anchors for a balanced life." />
              <div className="mt-12 lg:mt-20 bg-slate-900 rounded-3xl lg:rounded-[4rem] p-8 lg:p-24 text-white relative">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    <div className="lg:w-1/3 space-y-8 lg:space-y-10">
                      <div className="flex gap-3">
                          <button onClick={() => setActiveTab('morning')} className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'morning' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/60'}`}>Morning</button>
                          <button onClick={() => setActiveTab('evening')} className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'evening' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>Evening</button>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-extrabold">{activeTab === 'morning' ? 'Rise & Align.' : 'Unwind & Restore.'}</h3>
                    </div>
                    <div className="lg:w-2/3 grid gap-4 lg:gap-6 w-full">
                      {(activeTab === 'morning' ? rituals.morning : rituals.evening).map((step, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 flex items-center gap-4 sm:gap-8">
                            <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl ${step.color}`}>{step.icon}</div>
                            <div><h4 className="text-base sm:text-xl font-bold">{step.title}</h4><p className="text-[10px] sm:text-sm text-slate-400 font-medium">{step.desc}</p></div>
                          </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <LegalView type={currentPage as any} onBack={() => navigateTo('home')} />
      )}

      {/* Shared Footer */}
      <footer className="bg-slate-900 text-white pt-20 lg:pt-32 pb-12 lg:pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          {/* Newsletter Section */}
          <div className="mb-20 bg-emerald-950/40 rounded-[2.5rem] p-8 lg:p-16 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Stay Synced</span>
                <h3 className="text-3xl lg:text-4xl font-black">Ready for a weekly vibe-check?</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Join 150k+ wellness enthusiasts and get advanced biohacking tips, recipes, and planetary updates delivered directly to your inbox.
                </p>
              </div>

              <div className="w-full max-w-md">
                {!subscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-8 py-5 rounded-[2rem] font-bold outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-all text-sm"
                    />
                    <button 
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black px-8 py-5 rounded-[2rem] text-sm whitespace-nowrap shadow-2xl transition-all active:scale-95"
                    >
                      Subscribe to Wellness Insights
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2rem] text-center animate-in zoom-in-95 duration-500">
                    <p className="text-emerald-400 font-black text-lg">✨ Welcome to the Movement! ✨</p>
                    <p className="text-slate-400 text-sm mt-2">Check your inbox for your first Vibe Blueprint.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-20">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-lg">V</div>
                <span className="text-2xl lg:text-3xl font-black tracking-tight">Vibe4Wellness</span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed max-w-sm text-sm lg:text-base">
                The global mission to democratize holistic health using intelligent technology and community milestones.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Navigation</h4>
              <ul className="space-y-3 lg:space-y-4">
                {['Pillars', 'Recipes', 'Progress', 'Eco'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} onClick={() => navigateTo('home')} className="text-xs lg:text-sm font-bold text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Column */}
            <div className="lg:col-span-3 space-y-6 lg:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Support</h4>
              <ul className="space-y-3 lg:space-y-4">
                <li><button onClick={() => navigateTo('about')} className="text-xs lg:text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={() => navigateTo('disclaimer')} className="text-xs lg:text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">Disclaimer</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="text-xs lg:text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">Privacy</button></li>
                <li><a href="mailto:vibe@wellness.com" className="text-xs lg:text-sm font-bold text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* AI Status Column */}
            <div className="lg:col-span-3 space-y-6 lg:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">System</h4>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase">Gemini 2.5</span>
                  <span className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase">Grounding</span>
                  <span className="text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 lg:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[8px] sm:text-[10px]">© 2025 Vibe4Wellness. All Rights Reserved.</p>
            <div className="flex gap-6 sm:gap-8">
               <span className="text-slate-700 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Designed for Human Potential</span>
               <span className="text-slate-700 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Eco-Verified 🌱</span>
            </div>
          </div>
        </div>
      </footer>
      
      {selectedPillar && <PillarModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} onCtaClick={openPlanGenerator} />}
      {showPlanGenerator && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-8 sm:p-20 flex items-center justify-center animate-in slide-in-from-bottom-20 duration-500">
           <button onClick={() => setShowPlanGenerator(false)} className="absolute top-6 right-6 lg:top-10 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 transition-transform">✕</button>
           <div className="max-w-2xl w-full text-center space-y-10 lg:space-y-12">
              <div className="space-y-6">
                <SectionHeader title="Your AI Blueprint" subtitle="Tailoring a 1-day wellness protocol to your specific frequency." />
                <div className="grid gap-4 sm:gap-6 max-w-md mx-auto">
                   <input 
                    type="text" 
                    placeholder="Main Goal (e.g. Better Focus)" 
                    className="bg-slate-50 border border-slate-100 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm sm:text-base"
                    value={profile.goal}
                    onChange={(e) => setProfile({...profile, goal: e.target.value})}
                   />
                   <input 
                    type="text" 
                    placeholder="Lifestyle (e.g. Remote Office)" 
                    className="bg-slate-50 border border-slate-100 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all text-sm sm:text-base"
                    value={profile.lifestyle}
                    onChange={(e) => setProfile({...profile, lifestyle: e.target.value})}
                   />
                </div>
              </div>

              <button 
                onClick={handleGeneratePlan} 
                disabled={isGenerating || !profile.goal}
                className="bg-orange-500 hover:bg-emerald-500 disabled:opacity-50 text-white font-black px-10 lg:px-12 py-5 lg:py-6 rounded-[2rem] text-base lg:text-lg shadow-2xl transition-all active:scale-95 w-full sm:w-auto"
              >
                {isGenerating ? 'Synthesizing...' : 'Generate AI Plan ✨'}
              </button>

              {plan && (
                <div className="p-6 sm:p-10 bg-slate-50 rounded-3xl lg:rounded-[3rem] text-left border border-slate-100 shadow-inner animate-in zoom-in-95 duration-700">
                  <h4 className="text-xl lg:text-2xl font-black text-slate-900 mb-6">{plan.planTitle}</h4>
                  <div className="space-y-4 text-slate-600 font-medium text-sm lg:text-base">
                    <p><span className="text-emerald-500 font-black uppercase text-[10px] tracking-widest block mb-1">Eat Well</span> {plan.pillars.eat}</p>
                    <p><span className="text-orange-500 font-black uppercase text-[10px] tracking-widest block mb-1">Act Well</span> {plan.pillars.act}</p>
                    <p><span className="text-indigo-500 font-black uppercase text-[10px] tracking-widest block mb-1">Sleep Well</span> {plan.pillars.sleep}</p>
                    <p><span className="text-sky-500 font-black uppercase text-[10px] tracking-widest block mb-1">Care Well</span> {plan.pillars.care}</p>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
