
import React from 'react';
import SectionHeader from './SectionHeader';

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Creative Director",
    quote: "The circadian sleep ritual was the missing piece in my wellness puzzle. I wake up feeling truly resonant and ready to lead.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    pillar: "Sleep Well"
  },
  {
    name: "Marcus Thorne",
    role: "Endurance Athlete",
    quote: "Vibe4Wellness provides the precision I need for recovery. The Act Well protocols are scientifically sound and incredibly effective.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    pillar: "Act Well"
  },
  {
    name: "Elena Rodriguez",
    role: "Wellness Advocate",
    quote: "I love that my personal health milestones contribute to community farms. It's beautiful to be part of a collective that prioritizes the planet.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    pillar: "Care Well"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Voice of the Collective" 
          subtitle="Real stories from humans synchronizing their lives with the Vibe4Wellness mission." 
        />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 p-10 lg:p-12 rounded-[3rem] border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-500 group"
            >
              <div className="space-y-8">
                <div className="text-4xl text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity">“</div>
                <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                  {t.quote}
                </p>
              </div>
              
              <div className="flex items-center gap-5 mt-12">
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg border-2 border-white">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t.role}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black rounded uppercase tracking-tighter">
                    {t.pillar}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
