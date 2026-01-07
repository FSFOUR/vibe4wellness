
import React, { useState, useEffect, useRef } from 'react';

const SLIDES = [
  {
    name: "Eat Well",
    src: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1200&auto=format&fit=crop",
    tagline: "Nourish your frequency"
  },
  {
    name: "Act Well",
    src: "https://images.unsplash.com/photo-1518310327275-3347a4582b13?q=80&w=1200&auto=format&fit=crop",
    tagline: "Move with intention"
  },
  {
    name: "Sleep Well",
    src: "https://images.unsplash.com/photo-1520206159579-53d712e7424b?q=80&w=1200&auto=format&fit=crop",
    tagline: "Restore your resonance"
  },
  {
    name: "Care Well",
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    tagline: "Mindfulness in sync"
  }
];

const HeroSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<any>(null);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  return (
    <div className="relative group rounded-3xl lg:rounded-[3.5rem] shadow-2xl w-full h-[350px] sm:h-[500px] lg:h-[650px] border-4 lg:border-[12px] border-white z-10 overflow-hidden bg-slate-900">
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.src} 
            alt={slide.name} 
            className="w-full h-full object-cover transform transition-transform duration-[10000ms] scale-100 group-hover:scale-105" 
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
          
          {/* Animated Pillar Label */}
          <div className={`absolute bottom-12 lg:bottom-20 left-8 lg:left-12 transition-all duration-1000 delay-500 ${idx === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="text-white text-3xl lg:text-5xl font-black tracking-tighter drop-shadow-2xl">
              {slide.name}
            </h4>
            <p className="text-emerald-400 text-[10px] lg:text-sm font-bold mt-2 uppercase tracking-[0.2em] drop-shadow-lg">
              {slide.tagline}
            </p>
          </div>
        </div>
      ))}

      {/* Slide Indicators with Titles */}
      <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 lg:gap-4 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group flex flex-col items-center gap-1.5 lg:gap-2"
          >
            <div className={`h-1 lg:h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-8 lg:w-12 bg-white' : 'w-3 lg:w-4 bg-white/40 hover:bg-white/60'
            }`} />
            <span className={`text-[7px] lg:text-[9px] font-black uppercase tracking-widest transition-opacity duration-500 ${idx === currentIndex ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-white/60'} hidden sm:inline`}>
              {SLIDES[idx].name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation UI */}
      <div className="absolute inset-x-4 lg:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 hidden lg:flex">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="w-12 lg:w-14 h-12 lg:h-14 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-2xl group/btn"
        >
          <span className="group-hover/btn:-translate-x-1 transition-transform">←</span>
        </button>
        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % SLIDES.length)}
          className="w-12 lg:w-14 h-12 lg:h-14 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-2xl group/btn"
        >
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSlideshow;
