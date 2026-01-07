
export interface PillarDetail {
  exampleTitle: string;
  exampleDesc: string;
  actionItems: string[];
  ctaText: string;
  image: string;
}

export interface BrandPillar {
  title: string;
  tagline: string;
  description: string;
  focus: string[];
  icon: string;
  color: string;
  details: PillarDetail;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
}
