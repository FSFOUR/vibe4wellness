
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

export interface BrandPersona {
  name: string;
  role: string;
  demographics: string;
  motivations: string[];
  painPoints: string[];
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
}
