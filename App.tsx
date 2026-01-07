
import React, { useState, useEffect } from 'react';
// Removed non-existent export UPCOMING_EVENTS and unused LEGAL_CONTENT
import { BRAND_PILLARS, JOURNAL_POSTS } from './constants';
import SectionHeader from './components/SectionHeader';
import AIAssistant from './components/AIAssistant';
import PillarModal from './components/PillarModal';
import PlanetaryVisual from './components/PlanetaryVisual';
import HeroSlideshow from './components/HeroSlideshow';
import SearchOverlay from './components/SearchOverlay';
import LegalView from './components/LegalView';
import Testimonials from './components/Testimonials';
import { GeminiService } from './services/geminiService';
import { BrandPillar, BlogPost } from './types';

type PageState = 'home' | 'about' | 'disclaimer' | 'privacy' | 'post';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<BrandPillar | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ goal: '', lifestyle: '', focus: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [ecoProgress, setEcoProgress] = useState(0);
  
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

  // Keyboard shortcut listener for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem('vibe_completed_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('vibe_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    const timer = setTimeout(() => setEcoProgress(84.2), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const result = await gemini.generatePersonalizedPlan(profile);
    setPlan(result);
    setCompletedTasks([]);
    setIsGenerating(false);
  };

  const openPlanGenerator = () => {
    setShowPlanGenerator(true);
    setIsMenuOpen(false);
  };

  const navigateTo = (page: PageState, post?: BlogPost) => {
    setCurrentPage(page);
    if (post) setSelectedPost(post);
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

  const adherenceRate = Math.round((completedTasks.length / 7) * 100) || 0;

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer shrink-0" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">V</div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 hidden xs:inline">Vibe4Wellness</span>
          </div>

          {/* Desktop Integrated Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="w-full group cursor-pointer flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-emerald-300 transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">🔍</span>
              <span className="text-sm font-bold text-slate-400">Search wellness protocols...</span>
              <kbd className="ml-auto px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-sans font-medium">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full text-slate-400 hover:text-emerald-500 transition-all"
            >
              <span>🔍</span>
            </button>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex items-center gap-8 border-l border-slate-100 pl-8 ml-2">
              {[
                { label: 'Journal', id: '#journal' },
                { label: 'Pillars', id: '#pillars' },
                { label: 'Mission', action: () => navigateTo('about') }
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={item.action || (() => scrollToId(item.id!))}
                  className="text-[13px] font-black text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={openPlanGenerator}
                className="bg-orange-500 hover:scale-105 text-white px-7 py-3 rounded-2xl text-[13px] font-black shadow-xl transition-all"
              >
                Start Protocol
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all relative z-[60] bg-slate-50 rounded-full border border-slate-200"
              aria-label="Toggle mobile menu"
            >
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay - Matches Home Aesthetic */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[45] md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] z-[50] bg-white md:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform shadow-[-20px_0_60px_rgba(0,0,0,0.15)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <div className="flex flex-col h-full pt-20 pb-10 px-6">
          
          {/* Menu Branding Hub */}
          <div className="flex items-center gap-4 mb-12 animate-in slide-in-from-right-10 duration-500">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">V</div>
            <div>
              <h4 className="text-xl font-black text-slate-900">Vibe Hub</h4>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Global Collective</p>
            </div>
          </div>

          {/* Section 1: Main Editorial Links as Cards */}
          <div className="mb-10 space-y-3 animate-in slide-in-from-right-10 duration-500 delay-100">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 block mb-4 ml-2">Exploration</span>
            <div className="grid gap-3">
              {[
                { label: 'The Journal', icon: '📖', id: '#journal', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                { label: 'Health Pillars', icon: '💎', id: '#pillars', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
                { label: 'The Mission', icon: '🌍', action: () => navigateTo('about'), color: 'bg-sky-50 text-sky-600 border-sky-100' },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={item.action || (() => scrollToId(item.id!))}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${item.color}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-black tracking-tight">{item.label}</span>
                  <span className="ml-auto opacity-30 text-lg">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Sync Tools Grid */}
          <div className="mb-10 animate-in slide-in-from-right-10 duration-500 delay-200">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 block mb-4 ml-2">Personal Sync</span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setIsMenuOpen(false); scrollToId('#progress'); }}
                className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-left hover:bg-white hover:shadow-md transition-all active:scale-95"
              >
                <span className="block text-xl mb-3">📊</span>
                <span className="block text-xs font-black text-slate-900 mb-1">Live Sync</span>
                <p className="text-[9px] text-slate-400 font-medium leading-tight">Monitor your vibe resonance.</p>
              </button>
              <button 
                onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-left hover:bg-white hover:shadow-md transition-all active:scale-95"
              >
                <span className="block text-xl mb-3">🔍</span>
                <span className="block text-xs font-black text-slate-900 mb-1">Search</span>
                <p className="text-[9px] text-slate-400 font-medium leading-tight">Find curated protocols.</p>
              </button>
            </div>
          </div>

          {/* Section 3: Bottom Actions */}
          <div className="mt-auto pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-10 duration-500 delay-300">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex gap-4">
                {[
                  { label: 'Privacy', action: () => navigateTo('privacy') },
                  { label: 'Terms', action: () => navigateTo('disclaimer') }
                ].map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={item.action}
                    className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-200 italic lowercase tracking-tighter">v.2.0.5</span>
            </div>
            
            <button 
              onClick={openPlanGenerator}
              className="group w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 overflow-hidden relative"
            >
              <span className="relative z-10">Craft My Protocol</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">✨</span>
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigatePost={(post) => navigateTo('post', post)}
      />

      {currentPage === 'home' ? (
        <div className="animate-in fade-in duration-700">
          {/* Hero */}
          <section className="relative pt-32 lg:pt-60 pb-16 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[60%] h-full bg-emerald-50/30 -skew-x-12 transform origin-top-right -z-10 rounded-bl-[200px]"></div>
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 lg:space-y-10 max-w-2xl">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] border border-emerald-200/50">
                  Global Wellness Collective ✨
                </div>
                <h1 className="text-4xl lg:text-[72px] font-extrabold leading-[1.05] text-slate-900 text-balance tracking-tight">
                  Intelligent <span className="text-emerald-500">Holistic</span> Wellness.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Synchronize your life with intuitive wellness blueprints. We connect nutrition, movement, sleep, and self-care through refined editorial insight.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button onClick={openPlanGenerator} className="bg-orange-500 text-white font-black px-12 py-6 rounded-[2rem] text-lg shadow-2xl transition-all hover:-translate-y-1 active:scale-95">
                    Craft My Protocol ✨
                  </button>
                  <a href="#journal" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-black px-12 py-6 rounded-[2rem] text-lg transition-all flex items-center justify-center">
                    Read the Journal
                  </a>
                </div>
              </div>
              <HeroSlideshow />
            </div>
          </section>

          {/* Journal Section (Blog Feed) */}
          <section id="journal" className="py-16 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="The Wellness Journal" subtitle="Deep dives into circadian science, mindful nutrition, and planetary health." />
              <div className="grid md:grid-cols-2 gap-12 mt-20">
                {JOURNAL_POSTS.map((post) => (
                  <div key={post.id} onClick={() => navigateTo('post', post)} className="group cursor-pointer space-y-8">
                    <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed">{post.excerpt}</p>
                      <button className="text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                        Read Story <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section id="pillars" className="py-16 lg:py-32 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="The Four Pillars" subtitle="The foundation of our holistic wellness architecture." />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                {BRAND_PILLARS.map((pillar, i) => (
                  <div key={i} onClick={() => setSelectedPillar(pillar)} className="pillar-card group bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-700 cursor-pointer">
                    <div className={`pillar-icon w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center text-3xl mb-10 shadow-xl shadow-slate-200 transition-transform`}>{pillar.icon}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10">{pillar.description}</p>
                    <div className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-6 transition-all">Protocol <span className="text-xl">→</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Eco Section */}
          <section id="eco" className="py-20 lg:py-40 bg-emerald-900 text-white relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10">
                  <SectionHeader title="Planetary Wellness" centered={false} subtitle="Scaling our collective impact through community milestones." />
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-2xl">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">Milestone</span>
                        <p className="text-3xl font-black">Community Farm #14</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-400">8,420 <span className="text-white/40 font-bold">/ 10,000</span></span>
                      </div>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                      <div className="h-full bg-emerald-400 rounded-full transition-all duration-[2000ms]" style={{ width: `${ecoProgress}%` }}></div>
                    </div>
                  </div>
                </div>
                <PlanetaryVisual />
              </div>
            </div>
          </section>

          {/* Progress Section */}
          <section id="progress" className="py-16 lg:py-32 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Sync Hub" subtitle="Real-time monitoring of your wellness resonance." />
              <div className="grid lg:grid-cols-2 gap-12 mt-20">
                <div className="bg-white rounded-[4rem] p-14 border border-slate-100 shadow-xl space-y-10">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-900">{adherenceRate}% Sync</span>
                    <span className="text-4xl font-black text-orange-500">{streak} Days 🔥</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${adherenceRate}%` }}></div>
                  </div>
                  <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
                    Open Dashboard
                  </button>
                </div>
                <AIAssistant />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <Testimonials />
        </div>
      ) : (
        <LegalView type={currentPage as any} post={selectedPost} onBack={() => navigateTo('home')} />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">V</div>
                <span className="text-3xl font-black tracking-tight">Vibe4Wellness</span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                The global mission to democratize holistic health through refined editorial insight and collective action.
              </p>
            </div>
            {['Journal', 'Pillars', 'Mission', 'Support'].map(title => (
              <div key={title} className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">{title}</h4>
                <ul className="space-y-4">
                  {['Latest Post', 'Our Story', 'Help Center', 'Contact'].map(item => (
                    <li key={item}><button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">© 2025 Vibe4Wellness Editorial Hub.</p>
            <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">Designed for Human Potential 🌱</span>
          </div>
        </div>
      </footer>
      
      {selectedPillar && <PillarModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} onCtaClick={openPlanGenerator} />}
      {showPlanGenerator && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-20 flex items-center justify-center animate-in slide-in-from-bottom-20 duration-500">
           <button onClick={() => setShowPlanGenerator(false)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 transition-transform font-bold">✕</button>
           <div className="max-w-2xl w-full text-center space-y-12">
              <SectionHeader title="Craft Your Protocol" subtitle="A unique 1-day wellness blueprint tailored to your frequency." />
              <div className="grid gap-6 max-w-md mx-auto">
                 <input type="text" placeholder="Your Main Goal" className="bg-slate-50 border border-slate-100 px-8 py-5 rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all" value={profile.goal} onChange={(e) => setProfile({...profile, goal: e.target.value})} />
                 <input type="text" placeholder="Your Lifestyle" className="bg-slate-50 border border-slate-100 px-8 py-5 rounded-[2rem] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all" value={profile.lifestyle} onChange={(e) => setProfile({...profile, lifestyle: e.target.value})} />
              </div>
              <button onClick={handleGeneratePlan} disabled={isGenerating || !profile.goal} className="bg-orange-500 text-white font-black px-12 py-6 rounded-[2rem] text-lg shadow-2xl transition-all disabled:opacity-50">
                {isGenerating ? 'Curating insight...' : 'Generate Blueprint ✨'}
              </button>
              {plan && (
                <div className="p-10 bg-slate-50 rounded-[3rem] text-left border border-slate-100 shadow-inner">
                  <h4 className="text-2xl font-black text-slate-900 mb-6">{plan.planTitle}</h4>
                  <div className="space-y-4 text-slate-600 font-medium">
                    <p><span className="text-emerald-500 font-black uppercase text-[10px] tracking-widest block mb-1">Eat</span> {plan.pillars.eat}</p>
                    <p><span className="text-indigo-500 font-black uppercase text-[10px] tracking-widest block mb-1">Sleep</span> {plan.pillars.sleep}</p>
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
