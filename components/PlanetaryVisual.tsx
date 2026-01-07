
import React from 'react';

const PlanetaryVisual: React.FC = () => {
  // Breathtaking forest sunbeams to evoke a natural, grounded feeling.
  const imageUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[600px] rounded-[2rem] lg:rounded-[4rem] overflow-hidden border-4 lg:border-[12px] border-white/5 bg-slate-800 shadow-2xl group">
      <img 
        src={imageUrl} 
        alt="Breathtaking Natural Wellness Vision" 
        className="w-full h-full object-cover transform transition-transform duration-[10000ms] scale-100 group-hover:scale-110"
      />
      
      {/* Editorial Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>

      {/* Brand Badge */}
      <div className="absolute top-4 lg:top-8 left-4 lg:left-8 flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-1.5 lg:py-2.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
        <span className="flex h-1.5 w-1.5 lg:h-2 lg:w-2 relative">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-white">Planetary Resonance</span>
      </div>

      <div className="absolute bottom-4 lg:bottom-10 left-4 lg:left-10 right-4 lg:right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <p className="text-white font-bold text-xs lg:text-sm max-w-sm italic text-balance">
          "Sustainable health is the foundation of a thriving world."
        </p>
      </div>
    </div>
  );
};

export default PlanetaryVisual;
