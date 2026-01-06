
import { BrandPillar } from './types';

export const BRAND_COLORS = {
  primary: '#10B981', // Emerald 500
  secondary: '#3B82F6', // Blue 500
  accent: '#F59E0B', // Amber 500
  lightAccent: '#FBBF24', // Amber 400
  background: '#F9FAFB', // Slate 50
  white: '#FFFFFF',
};

export interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'Rally' | 'Class' | 'Activity';
  description: string;
  image: string;
  location: string;
}

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Sunrise Yoga in the Park',
    date: 'Oct 15, 2025',
    type: 'Class',
    location: 'Central Park, NY & Virtual',
    description: 'Join our community for a refreshing morning flow to start your day with Act Well vibes. Live stream available globally.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Eat Well Nutrition Rally',
    date: 'Oct 22, 2025',
    type: 'Rally',
    location: 'London Design District',
    description: 'A global gathering focused on sustainable, whole-food nutrition, vertical farming tours, and live cooking demos.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Sustainable Living Workshop',
    date: 'Nov 05, 2025',
    type: 'Activity',
    location: 'Sydney Hub / Zoom',
    description: 'Practical tips for an eco-friendly home that supports both your health and the planet. Zero-waste focus.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=400&auto=format&fit=crop'
  }
];

export const BRAND_PILLARS: BrandPillar[] = [
  {
    title: 'Eat Well',
    tagline: 'Fuel your body.',
    description: 'Fuel your body with balanced nutrition, healthy recipes, and AI-powered meal plans designed for energy and long-term health.',
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
      ctaText: "Generate My Meal Plan",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
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
      ctaText: "Start Workout Timer",
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
      ctaText: "Track My Sleep Quality",
      image: "https://images.unsplash.com/photo-1511295742364-903144576373?q=80&w=800&auto=format&fit=crop"
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
      ctaText: "Start Meditation Session",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
    }
  },
];

export const LEGAL_CONTENT = {
  about: {
    title: "About Vibe4Wellness",
    content: `
      Vibe4Wellness is a global campaign and digital platform dedicated to democratizing holistic health. We believe that true wellness is not a luxury, but a fundamental resonance that everyone should be able to achieve. 

      Our platform combines the wisdom of traditional wellness practices with the precision of modern AI. By focusing on the four pillars—Eat Well, Act Well, Sleep Well, and Care Well—we help our users build sustainable habits that fit into real, busy lives.

      Founded in 2024, Vibe4Wellness has grown from a local movement into a global community. We are committed to not only personal health but planetary health, funding sustainable agriculture projects through our user-driven milestones. Join us as we sync the world, one vibe at a time.
    `
  },
  disclaimer: {
    title: "Disclaimer & AI Terms",
    content: `
      The information provided by Vibe4Wellness and our AI assistant, VibeGuide, is for informational and educational purposes only. 

      1. Not Medical Advice: We are not medical professionals. The content on this site, including personalized plans and AI responses, is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
      2. Consult Your Physician: Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or before starting any new fitness or nutrition program.
      3. AI Accuracy: VibeGuide utilizes advanced AI models (Google Gemini). While we strive for accuracy, AI can occasionally produce incorrect or misleading information. Use the suggestions as a guide, not as absolute fact.
      4. Limitation of Liability: Vibe4Wellness is not responsible for any injury, loss, or damage resulting from the use of our platform or follow-through on any suggested rituals or plans.
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      Your privacy is paramount to the Vibe4Wellness mission. We collect only the data necessary to provide you with a high-quality, personalized wellness experience.

      1. Data Collection: We collect information provided during the Vibe Quiz (goals, lifestyle, focus) to generate your personalized blueprint.
      2. AI Processing: Your interactions with VibeGuide AI are processed via the Google Gemini API. We do not store these conversations in a way that links them to your permanent identity without your explicit consent.
      3. Third Parties: We do not sell your personal health data to third-party advertisers. 
      4. Data Security: We implement industry-standard encryption to protect your data during transit and at rest.
      5. Your Rights: You have the right to request the deletion of your quiz data at any time by contacting our support team.
    `
  }
};
