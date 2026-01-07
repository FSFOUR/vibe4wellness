
import React, { useEffect } from 'react';
import { LEGAL_CONTENT } from '../constants';
import { BlogPost } from '../types';
import SectionHeader from './SectionHeader';

interface LegalViewProps {
  type: 'about' | 'disclaimer' | 'privacy' | 'post';
  post?: BlogPost | null;
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, post, onBack }) => {
  const contentToRender = type === 'post' && post ? post.content : (LEGAL_CONTENT[type as keyof typeof LEGAL_CONTENT]?.content || "");
  const title = type === 'post' && post ? post.title : (LEGAL_CONTENT[type as keyof typeof LEGAL_CONTENT]?.title || "");
  const subtitle = type === 'post' && post ? `${post.category} • ${post.date} • ${post.readTime}` : (type === 'about' ? "A story of connection and health." : "Transparency in our mission.");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type, post]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this wellness insight from Vibe4Wellness: ${title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing is not supported on this browser. Copy the URL to share!");
    }
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={idx} className="h-4" />;

      if (trimmedLine.startsWith('## ')) {
        return <h2 key={idx} className="text-3xl lg:text-4xl font-black text-slate-900 mt-12 mb-6">{trimmedLine.replace('## ', '')}</h2>;
      }

      if (trimmedLine.startsWith('### ')) {
        return <h3 key={idx} className="text-xl lg:text-2xl font-black text-emerald-600 mt-8 mb-4">{trimmedLine.replace('### ', '')}</h3>;
      }

      if (trimmedLine.startsWith('> ')) {
        return (
          <div key={idx} className="editorial-quote my-12">
            <p className="text-3xl font-serif italic text-slate-800 leading-tight">
              {trimmedLine.replace('> ', '')}
            </p>
          </div>
        );
      }

      // Add drop cap to the first actual paragraph of a blog post
      const isFirstParagraph = idx < 5 && type === 'post';
      return (
        <p key={idx} className={`text-slate-600 leading-relaxed font-medium mb-8 text-xl text-balance ${isFirstParagraph ? 'drop-cap' : ''}`}>
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <button onClick={onBack} className="group flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all font-black uppercase tracking-widest text-xs">
            <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
            Return to Hub
          </button>
          <button onClick={handleShare} className="px-6 py-3 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-2">
            <span>📤</span> Share Story
          </button>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">{type === 'post' ? 'Journal Entry' : 'Collective Manifesto'}</span>
            <SectionHeader title={title} centered={false} subtitle={subtitle} />
            {type === 'post' && post && (
              <div className="flex items-center gap-4 pt-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">V</div>
                <div>
                  <p className="text-sm font-black text-slate-900">{post.author}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Wellness Specialist</p>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            {(type === 'about' || type === 'post') && (
              <div className="mb-16 rounded-[3rem] overflow-hidden h-[30vh] lg:h-[50vh] shadow-2xl">
                <img src={type === 'post' && post ? post.image : "https://images.unsplash.com/photo-1518310327275-3347a4582b13?q=80&w=1200&auto=format&fit=crop"} alt="Editorial Cover" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="prose prose-slate prose-xl max-w-none">
              {renderContent(contentToRender)}
            </div>
          </div>

          <div className="pt-20 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">V</div>
              <div>
                <p className="text-sm font-black text-slate-900">Vibe4Wellness Collective</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Curating Your Frequency since 2024</p>
              </div>
            </div>
            <button onClick={onBack} className="bg-slate-900 text-white font-black px-12 py-5 rounded-[2rem] hover:bg-emerald-600 transition-all active:scale-95 shadow-xl text-sm">
              Back to Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalView;
