
import { BrandPillar, BlogPost } from './types';

export const BRAND_COLORS = {
  primary: '#10B981', // Emerald 500
  secondary: '#3B82F6', // Blue 500
  accent: '#F59E0B', // Amber 500
  lightAccent: '#FBBF24', // Amber 400
  background: '#F9FAFB', // Slate 50
  white: '#FFFFFF',
};

export const JOURNAL_POSTS: BlogPost[] = [
  {
    id: 'circadian-rhythms',
    title: "The Silent Language of Circadian Rhythms",
    category: "Science",
    author: "The Vibe Collective",
    date: "May 12, 2025",
    readTime: "6 min read",
    excerpt: "Why the sun is your most powerful wellness tool, and how to start listening to your internal clock.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    content: `
      ## Returning to the Source
      In our modern world, we have forgotten that we are biological creatures tied to the rise and fall of the sun. The light that hits your eyes at 7:00 AM does more than wake you up—it sets a cascade of hormones in motion that determine your energy, your mood, and your hunger.

      > "The sun is not just a light source; it is a synchronizer for the soul."

      ### The First 15 Minutes
      We recommend stepping outside within 15 minutes of waking. Natural light exposure signals the brain to stop melatonin production and start cortisol release. This isn't just a 'hack'; it's a physiological necessity.

      ## The Evening Reset
      Conversely, as the sun dips, our bodies require darkness to begin the restoration process. The blue light from our devices acts as a false sun, confusing the brain and delaying deep sleep.
    `
  },
  {
    id: 'conscious-eating',
    title: "Conscious Eating: Beyond the Macronutrient",
    category: "Nutrition",
    author: "Elena Vibe",
    date: "June 04, 2025",
    readTime: "4 min read",
    excerpt: "Transitioning from 'fueling' to 'nourishing' through the lens of mindful presence.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
    content: `
      ## The Ritual of the Meal
      How often do we eat while standing, scrolling, or driving? At Vibe4Wellness, we believe the *environment* of the meal is as important as the ingredients.

      ### Sourcing with Intent
      When we choose seasonal, local produce, we aren't just helping the planet—we are consuming food at its peak nutritional frequency. 

      > "Food is information. What message are you sending to your cells today?"
    `
  }
];

export const BRAND_PILLARS: BrandPillar[] = [
  {
    title: 'Eat Well',
    tagline: 'Fuel your body.',
    description: 'Fuel your body with balanced nutrition, healthy recipes, and intelligent meal plans designed for energy and long-term health.',
    focus: ['Interactive Meal Planner', 'Seasonal Recipes', 'Nutrition Courses'],
    icon: '🥗',
    color: 'bg-emerald-500',
    details: {
      exampleTitle: "The Vibe Glow Bowl",
      exampleDesc: "A nutrient-dense masterpiece designed to sustain energy for 6+ hours without the crash.",
      actionItems: [
        "Base: Quinoa or Roasted Sweet Potato",
        "Protein: Grilled Tempeh or Wild-caught Salmon",
        "Healthy Fats: Half an avocado + pumpkin seeds",
        "Vibe Secret: Lemon-tahini dressing with a pinch of turmeric"
      ],
      ctaText: "Get My Meal Protocol",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
    }
  },
  {
    title: 'Act Well',
    tagline: 'Movement that fits.',
    description: 'Build an active lifestyle with movement that fits your routine — from walking and cycling to personalized workout guides.',
    focus: ['Workout Trackers', 'Guided Fitness', 'Global Challenges'],
    icon: '⚡',
    color: 'bg-orange-500',
    details: {
      exampleTitle: "10-Minute Micro-HIIT",
      exampleDesc: "No gym needed. Perfect for the 'Busy Professional' vibe to spike metabolic rate in under 15 mins.",
      actionItems: [
        "1 Min: High Knees (Get that heart rate up)",
        "1 Min: Air Squats (Focus on depth and form)",
        "1 Min: Mountain Climbers (Core engagement)",
        "Repeat cycle 3 times with 30s rest in between"
      ],
      ctaText: "Start Movement Timer",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
    }
  },
  {
    title: 'Sleep Well',
    tagline: 'Improve sleep quality.',
    description: 'Improve sleep quality with gentle habits, night routines, and recovery practices that support relaxation and mental clarity.',
    focus: ['Sleep Habit Tracker', 'Guided Wind-downs', 'Recovery Science'],
    icon: '🌙',
    color: 'bg-indigo-500',
    details: {
      exampleTitle: "The Deep Rest Ritual",
      exampleDesc: "A scientifically-backed sequence to lower cortisol and prepare the brain for REM sleep.",
      actionItems: [
        "90 Mins Before: Screens off, warm amber lighting",
        "60 Mins Before: Magnesium-rich snack (Handful of walnuts)",
        "30 Mins Before: 5-minute gratitude journaling",
        "Bedtime: Cool room temperature (approx 18°C/65°F)"
      ],
      ctaText: "Review Sleep Insights",
      image: "https://images.unsplash.com/photo-1520206159579-53d712e7424b?q=80&w=1200&auto=format&fit=crop"
    }
  },
  {
    title: 'Care Well',
    tagline: 'Strengthen emotional wellness.',
    description: 'Strengthen emotional wellness through stress balance, mindfulness, spirituality, and daily reflections.',
    focus: ['Mindfulness Apps', 'Spirituality Courses', 'Stress Analysis'],
    icon: '🌿',
    color: 'bg-sky-500',
    details: {
      exampleTitle: "Box Breathing 4-4-4",
      exampleDesc: "The ultimate tool for immediate nervous system regulation during high-stress moments.",
      actionItems: [
        "Inhale for 4 seconds (Visualize the energy entering)",
        "Hold for 4 seconds (Be present in the stillness)",
        "Exhale for 4 seconds (Release all tension)",
        "Hold empty for 4 seconds (Reset for the next cycle)"
      ],
      ctaText: "Start Daily Reflection",
      image: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=800&auto=format&fit=crop"
    }
  },
];

export const LEGAL_CONTENT = {
  about: {
    title: "The Resonance Manifesto",
    subtitle: "A story of connection, health, and a world in sync.",
    content: `
      ## Our Mission: Democratizing the Human Pulse
      We believe that wellness is not a luxury, but a fundamental frequency. In a world that is increasingly fragmented and noisy, Vibe4Wellness exists to help you find your center. Our mission is to provide the intelligence and community needed to synchronize your personal health rituals with the natural rhythms of life. We are here to bridge the gap between high-performance bio-rhythms and everyday reality.

      > "True health is found when our internal cadence matches the environment we inhabit." — The Vibe Collective

      ## Our Vision: 1 Billion Lives in Sync by 2030
      We see a future where every human has access to a personalized, intuitive health protocol. We aren't just building an app; we are cultivating a global resonance. By 2030, our vision is to have synchronized the daily habits of one billion people, leading to a collective reduction in stress and a massive increase in planetary energy.

      ## Our Values: The Foundations of Vibe
      
      ### 1. Radical Transparency
      We honor the human behind the screen. Every insight we provide is rooted in verified science and delivered with honesty. We don't hide behind complex jargon; we speak the language of health that everyone can understand.

      ### 2. Circadian Intelligence
      Nature has a clock, and so do you. We value the alignment of movement, food, and rest with the solar cycle. By respecting these ancient biological anchors, we unlock modern potential.

      ### 3. Planetary Stewardship
      Personal health and planetary health are one and the same. Every milestone our community reaches funds regenerative agriculture. We grow together, or not at all.
    `
  },
  disclaimer: {
    title: "Terms of Resonance",
    content: `
      The information provided by Vibe4Wellness is for informational and educational purposes only. 

      1. Not Medical Advice: We are not medical professionals. The content on this site is not intended to be a substitute for professional medical advice.
      2. Consult Your Physician: Always seek the advice of your physician before starting any new fitness or nutrition program.
      3. Protocol Accuracy: While we strive for absolute accuracy in our curated protocols, individual results may vary.
    `
  },
  privacy: {
    title: "Privacy & Connection",
    content: `
      Your privacy is paramount to our mission. We collect only the data necessary to provide you with a high-quality, personalized wellness experience.

      1. Data Collection: Information provided during the Vibe Quiz is used solely for blueprint generation.
      2. Secure Processing: Your interactions are processed with industry-standard encryption.
      3. Third Parties: We do not sell your personal health data to third-party advertisers.
    `
  }
};
