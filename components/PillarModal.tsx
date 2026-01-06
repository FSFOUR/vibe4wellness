
import React, { useState, useRef, useEffect } from 'react';
import { BrandPillar, ChatMessage } from '../types';
import { GeminiService } from '../services/geminiService';

interface PillarModalProps {
  pillar: BrandPillar;
  onClose: () => void;
  onCtaClick: () => void;
}

const PillarModal: React.FC<PillarModalProps> = ({ pillar, onClose, onCtaClick }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'specialist'>('overview');
  const [aiDeepDive, setAiDeepDive] = useState<{ advancedTips: string[], proHack: string } | null>(null);
  const [instantExample, setInstantExample] = useState<{ title: string, content: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingInstant, setLoadingInstant] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Specialist Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const gemini = new GeminiService();

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isChatLoading]);

  useEffect(() => {
    const fetchInstant = async () => {
      setLoadingInstant(true);
      const res = await gemini.generateInstantExample(pillar.title);
      setInstantExample(res);
      setLoadingInstant(false);
    };
    fetchInstant();
  }, [pillar.title]);

  const handleFetchAiInsight = async () => {
    setLoadingAi(true);
    const result = await gemini.generatePillarDeepDive(pillar.title, pillar.focus);
    if (result) setAiDeepDive(result);
    setLoadingAi(false);
  };

  const handleSpecialistChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsChatLoading(true);

    const response = await gemini.generatePillarChatResponse(pillar.title, msg, chatMessages);
    
    setIsChatLoading(false);
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  const handleCopyHack = () => {
    if (!aiDeepDive) return;
    navigator.clipboard.writeText(`Vibe4Wellness Pro Hack for ${pillar.title}: "${aiDeepDive.proHack}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[12px] animate-in fade-in duration-500" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-6xl bg-white rounded-[2rem] lg:rounded-[3.5rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-8 lg:right-8 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 transition-transform shadow-sm"
        >
          ✕
        </button>

        {/* Left Visual Sidebar */}
        <div className="lg:w-1/3 relative hidden lg:block overflow-hidden">
          <img src={pillar.details.image} alt={pillar.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-16 left-12 right-12 text-white">
            <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-2xl`}>
              {pillar.icon}
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-4">{pillar.title}</h2>
            <p className="text-xl font-medium text-white/80 leading-relaxed italic">"{pillar.tagline}"</p>
          </div>
        </div>

        {/* Right Dynamic Content Area */}
        <div className="flex-1 flex flex-col h-[85vh] lg:h-[800px] overflow-hidden">
          {/* Internal Tab Navigation */}
          <div className="p-6 lg:p-12 lg:pt-12 flex gap-4 lg:gap-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: '📖' },
              { id: 'blueprint', label: 'AI Blueprint', icon: '✨' },
              { id: 'specialist', label: 'Specialist Chat', icon: '🧠' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                  activeTab === tab.id 
                    ? `border-emerald-500 text-slate-900` 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar bg-slate-50/20">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-10 lg:space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
                {/* Dynamic Instant Example - FETCHED ON OPEN */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:scale-125 transition-transform duration-700">⚡</div>
                  <div className="space-y-4 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Today's Live AI Ritual</span>
                    {loadingInstant ? (
                      <div className="space-y-3">
                        <div className="h-6 w-1/2 bg-emerald-200/50 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-emerald-200/30 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-emerald-200/30 rounded animate-pulse"></div>
                      </div>
                    ) : instantExample ? (
                      <>
                        <h4 className="text-2xl font-black text-slate-900">{instantExample.title}</h4>
                        <p className="text-slate-600 font-medium leading-relaxed italic">"{instantExample.content}"</p>
                      </>
                    ) : (
                      <p className="text-slate-400 font-bold">Syncing fresh insight...</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Core Foundations</span>
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">{pillar.details.exampleTitle}</h3>
                  <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">{pillar.details.exampleDesc}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  {pillar.details.actionItems.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl lg:rounded-3xl border border-slate-100 shadow-sm flex gap-4 items-start group hover:border-emerald-200 transition-all">
                      <div className={`w-8 h-8 ${pillar.color} rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform text-xs font-bold`}>
                        {i + 1}
                      </div>
                      <p className="text-slate-700 font-bold leading-relaxed text-sm sm:text-base">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                   <button onClick={onCtaClick} className={`${pillar.color} text-white font-black px-10 lg:px-12 py-4 lg:py-5 rounded-2xl lg:rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all active:scale-95 text-xs lg:text-sm`}>
                     {pillar.details.ctaText}
                   </button>
                </div>
              </div>
            )}

            {/* TAB: AI BLUEPRINT */}
            {activeTab === 'blueprint' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
                {!aiDeepDive ? (
                  <div className="text-center space-y-8 py-16 lg:py-20">
                    <div className="w-20 lg:w-24 h-20 lg:h-24 bg-emerald-100 rounded-full flex items-center justify-center text-4xl lg:text-5xl mx-auto animate-pulse">✨</div>
                    <div className="space-y-4">
                      <h4 className="text-xl lg:text-2xl font-black text-slate-900">Unlock Advanced Mastery</h4>
                      <p className="text-sm lg:text-base text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">Let VibeGuide AI analyze the {pillar.title} pillar to generate unique biohacking strategies.</p>
                    </div>
                    <button 
                      onClick={handleFetchAiInsight}
                      disabled={loadingAi}
                      className="bg-slate-900 text-white font-black px-10 lg:px-12 py-5 lg:py-6 rounded-2xl lg:rounded-[2rem] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-3 mx-auto disabled:opacity-50 text-xs lg:text-sm"
                    >
                      {loadingAi ? 'Synthesizing...' : 'Generate Expert Blueprint'}
                      <span>💎</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="bg-slate-900 rounded-2xl lg:rounded-[3rem] p-8 lg:p-14 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-12 opacity-10">
                         <div className="w-48 h-48 border-[32px] border-emerald-400 rounded-full"></div>
                       </div>
                       <div className="relative z-10 space-y-10">
                         <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Pillar Intelligence</span>
                            <h4 className="text-3xl lg:text-4xl font-black tracking-tighter">Vibe Mastery Protocols</h4>
                         </div>
                         <div className="grid gap-4 lg:gap-6">
                           {aiDeepDive.advancedTips.map((tip, i) => (
                             <div key={i} className="flex gap-4 lg:gap-6 items-start bg-white/5 border border-white/5 p-6 lg:p-8 rounded-2xl lg:rounded-[2rem] hover:bg-white/10 transition-colors group">
                               <span className="text-2xl lg:text-3xl font-black text-emerald-500/30 group-hover:text-emerald-400 transition-colors">0{i+1}</span>
                               <p className="text-base lg:text-lg font-bold leading-relaxed text-slate-200">{tip}</p>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-white p-8 lg:p-14 rounded-2xl lg:rounded-[3rem] border-l-8 border-orange-500 shadow-xl group">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-6 block">The Signature Pro Hack</span>
                       <p className="text-2xl lg:text-3xl font-black italic text-slate-900 leading-snug mb-10">"{aiDeepDive.proHack}"</p>
                       <button 
                         onClick={handleCopyHack}
                         className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors"
                       >
                         {copied ? 'Copied to Clipboard! ✨' : 'Copy Secret Technique 📎'}
                       </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SPECIALIST CHAT */}
            {activeTab === 'specialist' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-500">
                 <div ref={chatScrollRef} className="flex-1 space-y-6 mb-8 pr-4 overflow-y-auto custom-scrollbar">
                    {chatMessages.length === 0 && (
                      <div className="text-center space-y-6 py-12">
                         <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl lg:text-4xl mx-auto">🏗️</div>
                         <div className="space-y-2">
                           <h4 className="text-lg lg:text-xl font-black text-slate-900">Direct Line to the Architect</h4>
                           <p className="text-slate-500 font-medium text-xs lg:text-sm">Ask anything about {pillar.title} and receive deep context.</p>
                         </div>
                      </div>
                    )}
                    {chatMessages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-5 lg:p-6 rounded-2xl lg:rounded-[2rem] text-sm lg:text-[15px] font-bold leading-relaxed shadow-sm ${
                          m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm flex gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    )}
                 </div>
                 
                 <div className="p-2 bg-slate-100 rounded-2xl lg:rounded-[2.5rem] flex gap-2">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSpecialistChat()}
                      placeholder={`Ask about ${pillar.title.toLowerCase()}...`}
                      className="flex-1 bg-transparent px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold text-slate-900 outline-none"
                    />
                    <button 
                      onClick={handleSpecialistChat}
                      className="bg-emerald-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform shrink-0"
                    >
                      🚀
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PillarModal;
