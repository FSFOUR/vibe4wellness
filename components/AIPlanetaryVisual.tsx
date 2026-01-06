
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIPlanetaryVisual: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PLANETARY_WELLNESS_PROMPT = `
    A cinematic, ultra-high-definition photograph of a pristine and flourishing natural ecosystem. 
    A wide shot of a verdant valley with a winding crystal-clear river, dense ancient forests, and majestic 
    mountains in the distance. Soft morning light filtering through a light mist, creating a divine, ethereal glow. 
    The image should feel 'breathable', pure, and deeply connected to the earth's natural rhythms. 
    Vivid greens, earthy textures, and atmospheric depth. No human-made technology, structures, or artificial metaphors. 
    Just raw, peaceful, flourishing nature in its most balanced state.
  `;

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: PLANETARY_WELLNESS_PROMPT,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      // Search for the image part in the response
      let foundImageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          foundImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (foundImageUrl) {
        setImageUrl(foundImageUrl);
      } else {
        throw new Error("No image data found in AI response.");
      }
    } catch (err) {
      console.error("Image generation failed:", err);
      setError("Failed to generate AI visual. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateImage();
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[600px] rounded-[2rem] lg:rounded-[4rem] overflow-hidden border-4 lg:border-[12px] border-white/5 bg-slate-800 shadow-2xl group">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 lg:space-y-6">
          <div className="w-12 h-12 lg:w-20 lg:h-20 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="text-center px-6">
            <p className="text-emerald-400 font-black uppercase tracking-widest text-[8px] lg:text-[10px] animate-pulse">Syncing Vibe...</p>
            <p className="text-white/40 text-[10px] lg:text-xs font-bold mt-2">Gemini is painting your vision</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 lg:p-10 text-center space-y-4 lg:space-y-6">
          <div className="text-3xl lg:text-4xl">⚠️</div>
          <p className="text-white font-bold text-sm lg:text-base">{error}</p>
          <button 
            onClick={generateImage}
            className="bg-emerald-500 text-white px-6 lg:px-8 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Retry
          </button>
        </div>
      )}

      {imageUrl && !isLoading && (
        <>
          <img 
            src={imageUrl} 
            alt="AI Generated Natural Wellness Vision" 
            className="w-full h-full object-cover animate-in fade-in duration-1000"
          />
          <div className="absolute top-4 lg:top-8 left-4 lg:left-8 flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-1.5 lg:py-2.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            <span className="flex h-1.5 w-1.5 lg:h-2 lg:w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-white">AI Vision</span>
          </div>
          <button 
            onClick={generateImage}
            className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 w-10 h-10 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center text-xl lg:text-2xl hover:bg-emerald-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            title="Regenerate Vision"
          >
            🔄
          </button>
        </>
      )}
    </div>
  );
};

export default AIPlanetaryVisual;
