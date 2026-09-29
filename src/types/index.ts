export type Language = 'en' | 'ta' | 'tanglish';

export type AgeGroup = '13-14' | '15-16' | '17-18';

export type FocusArea = 'boys' | 'girls' | 'general';

export type Category = 
  | 'puberty_male' 
  | 'puberty_female' 
  | 'hygiene' 
  | 'skin_hair' 
  | 'nutrition_sleep' 
  | 'emotional';

export interface UserProfile {
  language: Language;
  ageGroup: AgeGroup;
  focusArea: FocusArea;
  onboarded: boolean;
}

export interface MultilingualText {
  en: string;
  ta: string;
  tanglish: string;
}

export interface QAItem {
  id: string;
  category: Category;
  genderTarget: 'male' | 'female' | 'both';
  question: MultilingualText;
  answer: MultilingualText;
  summary: MultilingualText;
  tags: string[];
  sources: string[];
}

export interface CrisisResource {
  id: string;
  name: string;
  phone: string;
  tollFree?: boolean;
  hours: string;
  description: MultilingualText;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
  isCrisis?: boolean;
  crisisResources?: CrisisResource[];
  matchedQA?: QAItem;
  source?: 'gemini' | 'local_match' | 'crisis_interceptor';
  language?: Language;
}

export interface ContentPolicy {
  title: MultilingualText;
  disclaimer: MultilingualText;
  educationalPurpose: MultilingualText;
  medicalReferences: string[];
  helplines: {
    telemanas: string;
    kiran: string;
    childline: string;
    sneha: string;
  };
}
