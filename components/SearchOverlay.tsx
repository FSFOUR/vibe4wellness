
import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../services/geminiService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ text: string, sources: { title: string, uri: string }[] } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const gemini = new GeminiService();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResult(null);
    const data = await gemini.performSearch(query);
    setResult(data);
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-6 sm:px-10">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-10 duration-300">
        {/* Search Header */}
        <form onSubmit={handleSearch} className="p-6 border-b border-slate-100 flex items-center gap-4">
          <span className="text-2xl ml-2">🔍</span>
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for wellness tips, recipes, or pillars..."
            className="flex-1 bg-transparent text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300"
          />
          {query && !isSearching && (
            <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          )}
          <button 
            type="submit"
            className="bg-emerald-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-emerald-600 transition-all"
          >
            Search
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-[70vh] overflow-y-auto p-8 custom-scrollbar">
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold animate-pulse">Syncing with Google Knowledge Base...</p>
            </div>
          )}

          {!isSearching && !result && (
            <div className="py-8 space-y-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Suggested Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {['Circadian fasting tips', 'Morning meditation for stress', 'Vertical farming benefits', 'Protein-rich recipes'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => { setQuery(tag); setTimeout(() => handleSearch(), 10) }}
                      className="bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-slate-100 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">AI Synthesized Result</span>
                <p className="text-lg text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                  {result.text}
                </p>
              </div>

              {result.sources.length > 0 && (
                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Grounded Sources</h4>
                  <div className="space-y-3">
                    {result.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-white transition-all group"
                      >
                        <span className="text-xl">🔗</span>
                        <div className="flex-1">
                          <p className="text-xs font-black text-slate-900 truncate group-hover:text-emerald-600">{source.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">{source.uri}</p>
                        </div>
                        <span className="text-xs text-slate-300 group-hover:text-emerald-400">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default SearchOverlay;
