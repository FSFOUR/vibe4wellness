
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
  const [profile, setProfile] = useState({ goal: '', lifestyle: '', focus: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('morning');
  
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

  const openPlanGenerator = () => {
    setShowPlanGenerator(true);
  };

  const navigateTo = (page: PageState) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">V</div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Vibe4Wellness</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group/search">
               <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all text-sm font-bold"
               >
                 <span>🔍</span>
                 <span className="opacity-60">Search wellness...</span>
                 <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] border rounded bg-white font-mono uppercase text-slate-300 group-hover/search:text-slate-400">Ctrl K</kbd>
               </button>
            </div>

            <div className="flex items-center gap-8 border-l border-slate-100 pl-6 ml-2">
              {[
                { label: 'Pillars', id: '#pillars' },
                { label: 'Recipes', id: '#recipes' },
                { label: 'Progress', id: '#progress' },
                { label: 'About', action: () => navigateTo('about') }
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={item.action || (() => { navigateTo('home'); setTimeout(() => { window.location.hash = item.id!; }, 50); })}
                  className="text-[13px] font-bold text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={openPlanGenerator}
                className={`${plan ? 'bg-emerald-600' : 'bg-orange-500'} hover:scale-105 text-white px-7 py-3 rounded-2xl text-[13px] font-bold shadow-xl transition-all active:scale-95`}
              >
                {plan ? "My Plan" : "Get Started"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Conditional Rendering of Pages */}
      {currentPage === 'home' ? (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="relative pt-48 pb-24 lg:pt-60 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[60%] h-full bg-emerald-50/30 -skew-x-12 transform origin-top-right -z-10 rounded-bl-[200px]"></div>
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 max-w-2xl">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] border border-emerald-200/50">
                  Global Campaign • Holistic Health ✨
                </div>
                <h1 className="text-5xl lg:text-[72px] font-extrabold leading-[1.05] text-slate-900 text-balance tracking-tight">
                  AI-Powered Holistic <span className="text-emerald-500">Wellness.</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                  Synchronize your life with intelligent wellness blueprints. We connect nutrition, movement, sleep, and self-care using advanced AI to help you achieve perfect resonance.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button 
                    onClick={openPlanGenerator}
                    className={`${plan ? 'bg-emerald-500 shadow-emerald-100' : 'bg-orange-500 shadow-orange-100'} hover:bg-opacity-90 text-white font-black px-12 py-6 rounded-[2rem] text-lg shadow-2xl transition-all hover:-translate-y-1 active:scale-95 ${plan ? 'animate-pulse-subtle' : ''}`}
                  >
                    {getStartedText}
                  </button>
                  <a href="#recipes" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-black px-12 py-6 rounded-[2rem] text-lg transition-all flex items-center justify-center">
                    Healthy Recipes
                  </a>
                </div>
              </div>
              <HeroSlideshow />
            </div>
          </section>

          {/* Trust Bar */}
          <section className="py-12 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12 grayscale opacity-50">
              <div className="flex items-center gap-4"><span className="text-2xl font-black">150k+</span> <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Lives Synced</span></div>
              <div className="flex items-center gap-4"><span className="text-2xl font-black">50+</span> <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Global Hubs</span></div>
              <div className="flex items-center gap-4"><span className="text-2xl font-black">12M+</span> <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Eco-Points</span></div>
              <div className="flex items-center gap-4"><span className="text-2xl font-black">4.9/5</span> <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Vibe Rating</span></div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                  <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-orange-100 rounded-full blur-[60px] -z-10"></div>
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" className="rounded-[4rem] shadow-xl border-8 border-slate-50 h-[500px] w-full object-cover" alt="Happiness and Wellness Studio Space" loading="lazy" />
              </div>
              <div className="space-y-8">
                  <SectionHeader title="Our Mission" centered={false} subtitle="Bringing harmony to the chaos of modern life." />
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Vibe4Wellness started as a local rally to encourage healthier habits in a digital world. Today, it is a global movement driven by the belief that wellness shouldn't be a chore—it should be a resonance.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-2">Science Based</h4>
                        <p className="text-xs text-slate-500 font-semibold">Every ritual is vetted by circadian health experts.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-2">Human Centric</h4>
                        <p className="text-xs text-slate-500 font-semibold">Designed for busy professionals and real families.</p>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('about')} className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">Learn our full story →</button>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section id="pillars" className="py-32 bg-slate-50/50 relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="The Four Pillars" subtitle="The foundation of our holistic wellness architecture." />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                {BRAND_PILLARS.map((pillar, i) => (
                  <div key={i} onClick={() => setSelectedPillar(pillar)} className="pillar-card group bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-[0_32px_64px_-16px_rgba(16,185,129,0.15)] transition-all duration-700 hover:-translate-y-4 cursor-pointer">
                    <div className={`pillar-icon w-16 h-16 ${pillar.color} rounded-[1.5rem] flex items-center justify-center text-3xl mb-10 shadow-xl shadow-slate-200 transition-transform duration-700`}>{pillar.icon}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10">{pillar.description}</p>
                    <div className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-6 transition-all">Deep Dive <span className="text-xl">→</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Our Approach Works Section */}
          <section id="approach" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader 
                title="Why Our Approach Works" 
                subtitle="A philosophy rooted in connection, evidence, and optimism." 
              />
              <div className="grid md:grid-cols-3 gap-12 mt-20">
                <div className="text-center space-y-8 p-10 rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <HolisticIcon />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Holistic & Integrated</h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                      We see the invisible threads connecting your sleep to your diet, and your movement to your mood. Everything is one vibe.
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-8 p-10 rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <SupportiveIcon />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Positive & Supportive</h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                      No shame. No guilt. Just a supportive AI guide and a global community that cheers for every single micro-win.
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-8 p-10 rounded-[3.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <ScienceIcon />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Science-Backed</h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                      Every ritual and suggestion is backed by peer-reviewed research, decoded for the chaos of the real world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eco Section with AI Planetary Visual */}
          <section id="eco" className="py-40 bg-emerald-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 opacity-10"><div className="w-96 h-96 border-[48px] border-white rounded-full"></div></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10">
                  <SectionHeader title="Planetary Wellness" centered={false} subtitle="For every user milestone, we fund a community vertical farm." />
                  <p className="text-xl text-emerald-100/70 font-medium leading-relaxed">Sustainable health is more than personal—it is planetary. Join us in reducing carbon footprints while increasing your own energy output.</p>
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 space-y-6">
                    <div className="flex justify-between items-center"><span className="text-xs font-black uppercase tracking-widest text-emerald-300">Next Farm Goal</span> <span className="text-xs font-black">8,420 / 10,000 Users</span></div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[84%]"></div></div>
                  </div>
                </div>
                <div className="relative group">
                  <AIPlanetaryVisual />
                </div>
              </div>
            </div>
          </section>

          {/* Progress Dashboard */}
          <section id="progress" className="py-32 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="My Vibe Dashboard" subtitle="Visualize your consistency and track your evolution." />
              <div className="grid lg:grid-cols-12 gap-8 mt-20">
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-[4rem] p-10 lg:p-16 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-12">
                    <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100" />
                        <circle 
                          cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" 
                          className="text-emerald-500 transition-all duration-1000 ease-out"
                          strokeDasharray={552.92}
                          strokeDashoffset={552.92 - (552.92 * adherenceRate) / 100}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-5xl font-black text-slate-900">{adherenceRate}%</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Sync</span>
                      </div>
                    </div>
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">🔥</div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Current Consistency Streak</p>
                          <h4 className="text-3xl font-black text-slate-900">{streak} Days in a Row</h4>
                        </div>
                      </div>
                      <p className="text-slate-500 font-medium italic leading-relaxed">
                        "You're currently in the top 15% of the Vibe4Wellness community. Your morning hydration ritual is your most consistent anchor!" — VibeGuide AI 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VibeGuide Section — Integrated under Dashboard */}
          <section className="pb-32 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 block">Interactive Coaching</span>
                  <h3 className="text-3xl font-black text-slate-900">Synchronize with VibeGuide AI</h3>
                </div>
                <AIAssistant />
              </div>
            </div>
          </section>

          {/* Recipes Section */}
          <section id="recipes" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Healthy Recipes" subtitle="AI-curated nutrition that doesn't compromise on taste." />
              <div className="grid lg:grid-cols-3 gap-12 mt-20">
                {[
                  { title: "Golden Quinoa Glow Bowl", calories: "445", tag: "High Protein", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
                  { title: "Zesty Avocado Salad", calories: "320", tag: "Heart Healthy", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
                  { title: "Midnight Berry Bowl", calories: "280", tag: "Antioxidant", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop" }
                ].map((recipe, idx) => (
                  <div key={idx} className="group relative rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                    <div className="h-80 overflow-hidden relative">
                      <img src={recipe.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={recipe.title} />
                      <div className="absolute top-8 left-8 px-5 py-2 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-xl">{recipe.tag}</div>
                    </div>
                    <div className="p-10 space-y-4 bg-white">
                      <h4 className="text-2xl font-black text-slate-900">{recipe.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">Personalized metabolic sync.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rituals Section */}
          <section id="rituals" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Circadian Rituals" subtitle="Daily anchors for a balanced life." />
              <div className="mt-20 bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white relative">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3 space-y-10">
                      <div className="flex gap-4">
                          <button onClick={() => setActiveTab('morning')} className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'morning' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/60'}`}>Morning</button>
                          <button onClick={() => setActiveTab('evening')} className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'evening' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>Evening</button>
                      </div>
                      <h3 className="text-4xl font-extrabold">{activeTab === 'morning' ? 'Rise & Align.' : 'Unwind & Restore.'}</h3>
                    </div>
                    <div className="lg:w-2/3 grid gap-6">
                      {(activeTab === 'morning' ? rituals.morning : rituals.evening).map((step, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-8">
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl ${step.color}`}>{step.icon}</div>
                            <div><h4 className="text-xl font-bold">{step.title}</h4><p className="text-sm text-slate-400 font-medium">{step.desc}</p></div>
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
      <footer className="bg-slate-900 text-white pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">V</div>
                <span className="text-3xl font-black tracking-tight">Vibe4Wellness</span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                The global mission to democratize holistic health using intelligent technology and community-driven milestones.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Quick Navigation</h4>
              <ul className="space-y-4">
                {['Pillars', 'Recipes', 'Progress', 'Eco'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} onClick={() => navigateTo('home')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Column */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Support & Privacy</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('about')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">About the Campaign</button></li>
                <li><button onClick={() => navigateTo('disclaimer')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">Medical Disclaimer</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">Privacy & AI Usage</button></li>
                <li><a href="mailto:vibe@wellness.com" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Contact Expert Support</a></li>
              </ul>
            </div>

            {/* AI Status Column */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">System Status</h4>
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Gemini 2.5 Flash</span>
                  <span className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Search Grounding</span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">© 2025 Vibe4Wellness Global Campaign. All Rights Reserved.</p>
            <div className="flex gap-8">
               <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">Designed for Human Potential</span>
               <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">Eco-Verified 🌱</span>
            </div>
          </div>
        </div>
      </footer>
      
      {selectedPillar && <PillarModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} onCtaClick={openPlanGenerator} />}
      {showPlanGenerator && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-20 flex items-center justify-center animate-in slide-in-from-bottom-20 duration-500">
           <button onClick={() => setShowPlanGenerator(false)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 transition-transform">✕</button>
           <div className="max-w-2xl text-center space-y-12">
              <div className="space-y-6">
                <SectionHeader title="Your AI Blueprint" subtitle="Tailoring a 1-day wellness protocol to your specific frequency." />
                <div className="grid gap-6 max-w-md mx-auto">
                   <input 
                    type="text" 
                    placeholder="Main Goal (e.g. Better Focus, Muscle Gain)" 
                    className="bg-slate-50 border border-slate-100 px-8 py-5 rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                    value={profile.goal}
                    onChange={(e) => setProfile({...profile, goal: e.target.value})}
                   />
                   <input 
                    type="text" 
                    placeholder="Lifestyle (e.g. Remote Office, High Stress)" 
                    className="bg-slate-50 border border-slate-100 px-8 py-5 rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                    value={profile.lifestyle}
                    onChange={(e) => setProfile({...profile, lifestyle: e.target.value})}
                   />
                </div>
              </div>

              <button 
                onClick={handleGeneratePlan} 
                disabled={isGenerating || !profile.goal}
                className="bg-orange-500 hover:bg-emerald-500 disabled:opacity-50 text-white font-black px-12 py-6 rounded-[2.5rem] text-lg shadow-2xl transition-all active:scale-95"
              >
                {isGenerating ? 'Synthesizing Plan...' : 'Generate AI Plan ✨'}
              </button>

              {plan && (
                <div className="p-10 bg-slate-50 rounded-[3rem] text-left border border-slate-100 shadow-inner animate-in zoom-in-95 duration-700">
                  <h4 className="text-2xl font-black text-slate-900 mb-6">{plan.planTitle}</h4>
                  <div className="space-y-4 text-slate-600 font-medium">
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
