
import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import { JOURNAL_POSTS } from '../constants';
import { BlogPost } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePost: (post: BlogPost) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigatePost }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ 
    text: string, 
    sources: { title: string, uri: string }[],
    relatedTopics: string[]
  } | null>(null);
  const [localMatches, setLocalMatches] = useState<BlogPost[]>([]);
  
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

    // Search local journal posts
    const matches = JOURNAL_POSTS.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );
    setLocalMatches(matches);

    // AI-Powered Grounded Search
    const data = await gemini.performSearch(query);
    setResult(data);
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-10 sm:pt-20 px-4 sm:px-10">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-3xl bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-10 duration-300">
        {/* Search Header */}
        <form onSubmit={handleSearch} className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl ml-2">🔍</span>
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Explore wellness protocols..."
            className="flex-1 bg-transparent text-base sm:text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300"
          />
          {query && !isSearching && (
            <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 font-bold p-2">✕</button>
          )}
          <button 
            type="submit"
            className="bg-emerald-500 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 space-y-6">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold animate-pulse text-sm">Resonating with Wellness Intelligence...</p>
            </div>
          )}

          {!isSearching && !result && localMatches.length === 0 && (
            <div className="py-4 space-y-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Popular Explorations</h4>
                <div className="flex flex-wrap gap-2">
                  {['Circadian sleep ritual', 'Inflammation reduction', 'Mindful breathwork', 'Sustainable meal prep', 'Eco-conscious living'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => { setQuery(tag); setTimeout(() => handleSearch(), 10) }}
                      className="bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 px-4 py-2.5 rounded-2xl text-xs font-bold border border-slate-100 transition-all hover:scale-105"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {(result || localMatches.length > 0) && !isSearching && (
            <div className="space-y-12 animate-in fade-in duration-500 pb-8">
              
              {/* Local Journal Results */}
              {localMatches.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">From The Journal</h4>
                  <div className="grid gap-4">
                    {localMatches.map(post => (
                      <button 
                        key={post.id} 
                        onClick={() => { onNavigatePost(post); onClose(); }}
                        className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all text-left group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={post.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">{post.category}</p>
                          <h5 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors truncate">{post.title}</h5>
                          <p className="text-xs text-slate-500 font-medium truncate">{post.excerpt}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insight */}
              {result && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Collective Intelligence</h4>
                    <div className="bg-slate-50 p-6 sm:p-8 rounded-[2rem] border border-slate-100">
                      <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                        {result.text}
                      </p>
                    </div>
                  </div>

                  {/* Related Topics Suggested by AI */}
                  {result.relatedTopics && result.relatedTopics.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Related Pathways</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.relatedTopics.map((topic, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { setQuery(topic); handleSearch(); }}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounded Sources */}
                  {result.sources.length > 0 && (
                    <div className="pt-8 border-t border-slate-100">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Research Sources</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {result.sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group"
                          >
                            <span className="text-lg">🔗</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black text-slate-900 truncate group-hover:text-emerald-600">{source.title}</p>
                              <p className="text-[9px] text-slate-400 truncate tracking-tight">{source.uri}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default SearchOverlay;
