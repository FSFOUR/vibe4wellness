
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Hey there, Vibe-Seeker! 🌈 I'm VibeGuide, your personal wellness partner! 🤘 Ready to sync your life and feel absolutely legendary today? Let's get this journey started! 🧘‍♀️🥗✨ What's on your mind?",
      suggestions: ["Plan my lunch! 🥗", "Evening ritual? 🌙", "What is Act Well? ⚡"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gemini = new GeminiService();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim()) return;

    setInput('');
    // When sending a new message, clear previous suggestions from view (visually they stay in history)
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsTyping(true);

    const response = await gemini.generateVibeResponse(textToSend, messages);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      suggestions: response.suggestions 
    }]);
  };

  return (
    <div className="bg-white rounded-[3.5rem] shadow-[0_48px_96px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 max-w-xl mx-auto flex flex-col h-[650px] relative">
      {/* Glossy Header — Deep and Modern */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 p-8 text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent)]"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-2xl border border-white/20 shadow-lg">✨</div>
          <div>
            <h3 className="font-black text-xl tracking-tight">VibeGuide 🌈</h3>
            <p className="text-[10px] text-emerald-100 font-black uppercase tracking-[0.3em] opacity-80">Living Your Best Life • Present</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-emerald-700/30 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm relative z-10">
          <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-pulse shadow-[0_0_8px_#6ee7b7]"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-50">Resonating</span>
        </div>
      </div>

      {/* Chat Area — Spacious and Clean */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-4">
            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] p-6 rounded-[2rem] text-[15px] leading-relaxed shadow-sm font-semibold transition-all ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
            
            {/* Suggestion Chips - Only show for the very last model message and when not typing */}
            {msg.role === 'model' && msg.suggestions && idx === messages.length - 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
                {msg.suggestions.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSend(suggestion)}
                    className="bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm flex gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area — Integrated and Large */}
      <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tell me a health tip! 🚀"
            className="w-full bg-slate-100/60 border-2 border-transparent rounded-[2rem] px-8 py-5 text-[15px] font-bold text-slate-800 focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <button 
          onClick={() => handleSend()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-[2rem] text-sm transition-all shadow-xl shadow-orange-100 active:scale-95 group"
        >
          Send <span className="inline-block group-hover:translate-x-1 transition-transform ml-1">🔥</span>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
