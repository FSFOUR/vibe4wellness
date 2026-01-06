
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  /**
   * Performs a grounded search using Google Search for the site's search bar.
   */
  async performSearch(query: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are the Vibe4Wellness Search Architect. 
      Your goal is to provide helpful, grounded answers to user wellness queries.
      Focus on Vibe4Wellness pillars (Eat, Act, Sleep, Care) but use Google Search to provide up-to-date information.
      Keep the response concise, informative, and high-vibe. 
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: query }] }],
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // Extract unique URLs from grounding chunks
      const sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri)
        .map((web: any) => ({ title: web.title, uri: web.uri }));

      return { text, sources };
    } catch (error) {
      console.error("Gemini Search Error:", error);
      return { text: "I couldn't complete the search right now. My vibe-synchronizer is calibrating! 🛠️", sources: [] };
    }
  }

  /**
   * Generates a playful, emoji-rich response from VibeGuide.
   */
  async generateVibeResponse(userMessage: string, history: ChatMessage[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are "VibeGuide" 🌈, the super-friendly, high-energy, and playful AI wellness buddy for Vibe4Wellness.com! 
      Vibe4Wellness is built on 4 pillars: Eat Well 🥗, Act Well ⚡, Sleep Well 🌙, and Care Well 🌿.
      
      Your personality:
      - Super upbeat, encouraging, and a bit cheeky! 😉
      - Use lots of emojis in every response to keep the vibe high! ✨🚀🌈
      - Focus on making wellness feel fun and easy, not like a chore.
      - Keep responses snappy but packed with value.

      CRITICAL: You must always respond in JSON format with two fields:
      1. "text": Your playful, emoji-rich response.
      2. "suggestions": An array of 2-3 short, fun, and interactive follow-up questions using emojis.
    `;

    try {
      const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.8,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["text", "suggestions"],
          },
        },
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Vibe Response Error:", error);
      return { text: "Oops! My vibe-meter hit a glitch! 😵 Try again? 🔄", suggestions: ["Try again! 🚀"] };
    }
  }

  /**
   * Deep Pillar Chat for specific domain expertise inside the modal.
   */
  async generatePillarChatResponse(pillarTitle: string, userMessage: string, chatHistory: ChatMessage[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are the "Pillar Specialist" 🧠 for Vibe4Wellness, specifically an expert in ${pillarTitle}.
      Your tone is professional, sophisticated, yet encouraging.
      Focus ONLY on ${pillarTitle} related advice. 
      If a user asks about something else, politely pivot back to ${pillarTitle}.
      Provide high-value, actionable, and science-backed information.
      Use some emojis, but keep it more "Expert Masterclass" than "Playful Buddy".
    `;

    try {
      const contents = chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text || "I'm reflecting on that... could you rephrase? 🤔";
    } catch (error) {
      console.error("Gemini Pillar Chat Error:", error);
      return "I've hit a temporary knowledge block. Let's try another question!";
    }
  }

  /**
   * Generates a personalized 1-day wellness plan with a playful twist.
   */
  async generatePersonalizedPlan(profile: { goal: string; lifestyle: string; focus: string }) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-pro-preview';
    const systemInstruction = `
      Act as the world's most enthusiastic holistic wellness coach! 🏃‍♀️💨
      Create a 1-day personalized wellness plan that feels like an exciting adventure. 🗺️
      Use plenty of emojis 🌈✨ and give the plan a fun, catchy title! 
      Respond ONLY in JSON format following the schema provided. 
    `;

    try {
      const prompt = `Create a high-vibe 1-day plan for a user whose goal is "${profile.goal}", lifestyle is "${profile.lifestyle}", and primary focus is "${profile.focus}".`;
      
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              planTitle: { type: Type.STRING },
              dailyVibe: { type: Type.STRING },
              pillars: {
                type: Type.OBJECT,
                properties: {
                  eat: { type: Type.STRING, description: "Fun nutrition tip with emojis" },
                  act: { type: Type.STRING, description: "Exciting movement idea with emojis" },
                  sleep: { type: Type.STRING, description: "Cozy recovery ritual with emojis" },
                  care: { type: Type.STRING, description: "Self-love moment with emojis" }
                }
              },
              topTip: { type: Type.STRING },
              motivation: { type: Type.STRING }
            },
            required: ["planTitle", "dailyVibe", "pillars", "topTip", "motivation"]
          }
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Personalized Plan Error:", error);
      return null;
    }
  }

  /**
   * Generates playful and advanced tailored insights for a specific wellness pillar.
   */
  async generatePillarDeepDive(pillarTitle: string, focusAreas: string[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are the Lead Wellness Architect 🏗️ for Vibe4Wellness, specializing in "${pillarTitle}".
      Your task is to provide cutting-edge, advanced insights that go beyond basic advice.
      Think biohacking, circadian optimization, and high-performance wellness tailored to the brand pillars.
      
      Specifically for "${pillarTitle}" (which focuses on: ${focusAreas.join(', ')}), generate:
      - 3 "Vibe Mastery" tips: These must be sophisticated, research-backed, and slightly unexpected techniques.
      - 1 "Signature Pro Hack": A legendary, high-impact secret technique that creates a massive physiological or mental shift.

      Tone: Playful but authoritative. Use emojis! ✨💎🔥
    `;

    try {
      const prompt = `Unleash the 'Vibe Mastery' for ${pillarTitle}! 🧪✨ We need the most effective, advanced strategies that align with our focus on ${focusAreas.join(', ')}.`;
      
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advancedTips: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "3 highly specific Vibe Mastery techniques"
              },
              proHack: { 
                type: Type.STRING,
                description: "The definitive Signature Pro Hack for this pillar"
              }
            },
            required: ["advancedTips", "proHack"]
          }
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Pillar Deep Dive Error:", error);
      return null;
    }
  }

  /**
   * Generates a specific, fresh example for today for a specific pillar.
   */
  async generateInstantExample(pillarTitle: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are a specialist for the ${pillarTitle} pillar at Vibe4Wellness.
      Provide a specific, actionable example for today based on the pillar:
      - If Eat Well: A 10-min vibrant recipe.
      - If Act Well: A 5-min movement micro-ritual.
      - If Sleep Well: A deep sleep recovery hack.
      - If Care Well: A mindfulness/meditation micro-exercise.
      
      Format: JSON object with "title" (short, catchy) and "content" (the detailed ritual/recipe/routine).
      Keep the content under 60 words. Use emojis! ✨🧘‍♀️🥗
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: `Give me today's instant ${pillarTitle} example.` }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
            },
            required: ["title", "content"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Instant Example Error:", error);
      return null;
    }
  }
}
