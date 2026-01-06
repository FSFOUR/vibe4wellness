
import React, { useEffect } from 'react';
import { LEGAL_CONTENT } from '../constants';
import SectionHeader from './SectionHeader';

interface LegalViewProps {
  type: 'about' | 'disclaimer' | 'privacy';
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  const pageData = LEGAL_CONTENT[type];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="mb-12 group flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all font-black uppercase tracking-widest text-xs"
        >
          <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
          Return to Hub
        </button>

        <div className="space-y-16">
          <SectionHeader 
            title={pageData.title} 
            centered={false} 
            subtitle="Transparency and purpose in our global wellness mission."
          />

          <div className="prose prose-slate prose-lg max-w-none">
            {pageData.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed font-medium mb-6 text-lg">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">V</div>
              <div>
                <p className="text-sm font-black text-slate-900">Vibe4Wellness Protocol</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Version 2.5 • Verified 2025</p>
              </div>
            </div>
            
            <button 
              onClick={onBack}
              className="bg-slate-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-xl"
            >
              Acknowledged
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalView;
