
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const SLIDE_PROMPTS = [
  "Eat Well: A high-resolution image showcasing a vibrant assortment of healthy foods, emphasizing fresh fruits, vegetables, and whole grains. A beautifully arranged plate on a minimalist stone table, natural sunlight, conveying freshness, vitality, and nutritional balance. Professional food photography.",
  "Act Well: An energizing image of diverse individuals engaging in physical activities like yoga, running, and functional training in a bright, modern park setting. Capturing the joy of movement and the importance of an active lifestyle. Dynamic composition, inclusive representation, high-energy atmosphere.",
  "Sleep Well: A serene and calming image embodying restful sleep. A peaceful bedroom scene with soft, warm lighting, cozy organic bedding, and tranquil colors. Elements suggesting a perfect night's rest and relaxation. Cinematic interior photography, deep restorative mood.",
  "Care Well: An image representing self-care and mental wellness. A person journaling peacefully by a window with soft light, or practicing mindfulness meditation. Evoking feelings of warmth, emotional support, and mental clarity. Soft color palette, modern lifestyle photography."
];

const HeroSlideshow: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  // Using any for interval type to avoid NodeJS namespace error in browser environment.
  const slideInterval = useRef<any>(null);

  const generateSlides = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const generated: string[] = [];

    // Generate slides one by one to show progress and populate the UI progressively
    for (let i = 0; i < SLIDE_PROMPTS.length; i++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: SLIDE_PROMPTS[i] }] },
          config: { 
            imageConfig: { 
              aspectRatio: "16:9" 
            } 
          }
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) {
          const b64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          generated.push(b64);
          setSlides([...generated]);
          setLoadingProgress(((i + 1) / SLIDE_PROMPTS.length) * 100);
        }
      } catch (err) {
        console.error(`Slide ${i} generation failed:`, err);
      }
    }
  };

  useEffect(() => {
    generateSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="relative rounded-[3.5rem] shadow-2xl w-full h-[650px] border-[12px] border-white z-10 bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-slate-100 animate-pulse"></div>
        <div className="relative z-20 text-center space-y-6 px-10">
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <div>
            <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Vibe Architecture In Progress</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">Visualizing the 4 Pillars...</h3>
            <p className="text-slate-500 text-sm font-medium mt-2 max-w-sm mx-auto">Gemini is painting high-resolution visuals for your Eat, Act, Sleep, and Care protocols.</p>
          </div>
          <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-700 ease-out" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  const pillarNames = ["Eat Well", "Act Well", "Sleep Well", "Care Well"];

  return (
    <div className="relative group rounded-[3.5rem] shadow-2xl w-full h-[650px] border-[12px] border-white z-10 overflow-hidden bg-slate-900">
      {slides.map((src, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={src} 
            alt={pillarNames[idx]} 
            className="w-full h-full object-cover transform transition-transform duration-[10000ms] scale-100 group-hover:scale-105" 
          />
          {/* Subtle Overlay to make text and badges pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          {/* Animated Pillar Label */}
          <div className={`absolute bottom-20 left-12 transition-all duration-1000 delay-500 ${idx === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="text-white text-5xl font-black tracking-tighter drop-shadow-2xl">
              {pillarNames[idx]}
            </h4>
            <p className="text-emerald-400 text-sm font-bold mt-2 uppercase tracking-[0.2em] drop-shadow-lg">
              Optimized by VibeGuide AI
            </p>
          </div>
        </div>
      ))}

      {/* Slide Indicators with Titles */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group flex flex-col items-center gap-2"
          >
            <div className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'
            }`} />
            <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-500 ${idx === currentIndex ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-white/60'}`}>
              {pillarNames[idx].split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* AI Intelligence Badge */}
      <div className="absolute top-8 left-8 z-30 flex items-center gap-3 px-5 py-2.5 bg-slate-900/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Gemini 2.5 Active Vision</span>
      </div>

      {/* Navigation UI */}
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-14 h-14 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-2xl group/btn"
        >
          <span className="group-hover/btn:-translate-x-1 transition-transform">←</span>
        </button>
        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          className="w-14 h-14 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-2xl group/btn"
        >
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSlideshow;
