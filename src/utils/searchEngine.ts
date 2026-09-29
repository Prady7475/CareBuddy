import Fuse, { IFuseOptions } from 'fuse.js';
import { QAItem, CrisisResource, FocusArea, Language } from '../types';
import { VETTED_QUESTIONS, CRISIS_RESOURCES } from '../data/questions';

const CRISIS_KEYWORDS = [
  // English
  'suicide', 'kill myself', 'want to die', 'end my life', 'cut myself', 
  'self harm', 'self-harm', 'hopeless', 'cannot live', 'worthless', 
  'harm myself', 'hanging', 'poison', 'die', 'depressed',
  // Tamil Script
  'தற்கொலை', 'சாக', 'உயிரை மாய்க்க', 'செத்துப்போக', 'வாழ பிடிக்கவில்லை', 
  'மன அழுத்தம்', 'வலி தாங்க முடியல',
  // Tanglish
  'tharkolai', 'tarkolai', 'kollanum', 'saaga', 'sethupoganum', 
  'cut panren', 'pain thaanga mudiyala', 'vaazha pudikkala', 'end panren',
  'die panna'
];

const MALE_KEYWORDS = [
  'boy', 'boys', 'male', 'penis', 'semen', 'erection', 'testicles', 'beard', 
  'mustache', 'meesai', 'thaadi', 'swapnadhosham', 'nightfall', 'wet dream', 
  'gynecomastia', 'lingam', 'viraipu'
];

const FEMALE_KEYWORDS = [
  'girl', 'girls', 'female', 'period', 'cramps', 'vagina', 'menses', 'menarche', 
  'sanitary pad', 'discharge', 'bra', 'mathavidai', 'vellai padudhal', 'uterus', 
  'menstrual', 'cycle', 'period flu', 'period fever'
];

export interface SearchResult {
  isCrisis: boolean;
  crisisResources?: CrisisResource[];
  matchedQA?: QAItem;
  allMatches?: QAItem[];
  fallbackText?: {
    en: string;
    ta: string;
    tanglish: string;
  };
  isGenericFallback?: boolean;
}

export function checkCrisisKeywords(input: string): boolean {
  if (!input || !input.trim()) return false;
  const lowerInput = input.toLowerCase().trim();
  
  return CRISIS_KEYWORDS.some(keyword => {
    return lowerInput.includes(keyword.toLowerCase());
  });
}

const fuseOptions: IFuseOptions<QAItem> = {
  keys: [
    { name: 'tags', weight: 0.4 },
    { name: 'question.en', weight: 0.3 },
    { name: 'question.ta', weight: 0.3 },
    { name: 'question.tanglish', weight: 0.3 },
    { name: 'summary.en', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
};

export function searchHealthBank(
  query: string, 
  focusArea: FocusArea = 'general',
  lang: Language = 'en'
): SearchResult {
  const trimmed = query.trim();
  const lowerQuery = trimmed.toLowerCase();

  // 1. Check Crisis Interceptor FIRST
  if (checkCrisisKeywords(trimmed)) {
    return {
      isCrisis: true,
      crisisResources: CRISIS_RESOURCES,
      fallbackText: {
        en: 'We hear you, and your life is extremely valuable. If you are experiencing distress or thoughts of harm, please reach out immediately to these free, 24/7 confidential South Indian helplines:',
        ta: 'உங்கள் மனநிலை எங்களுக்கு புரிகிறது. உங்கள் உயிர் மிகவும் மதிப்புமிக்கது! தயவுசெய்து கீழ்கண்ட இலவச 24/7 உதவி எண்களை தொடர்புகொண்டு பேசுங்கள்:',
        tanglish: 'Ungal manasu puriyudhu. Ungal uyir romba precious! Pls indha free 24/7 helplines ku உடனே call panni pesunga:'
      }
    };
  }

  // 2. Context-Aware Keyword Routing
  const isPeriodQuery = ['period', 'menstrual', 'cycle', 'menses', 'cramps', 'pad', 'flow', 'fever'].some(k => lowerQuery.includes(k));
  const isLipQuery = ['lip', 'upper lip', 'mouth'].some(k => lowerQuery.includes(k));
  const isGeneralSkinQuery = ['swelling', 'bump', 'pimple', 'acne', 'face', 'mark', 'spot', 'skin', 'hand', 'arm', 'leg', 'finger'].some(k => lowerQuery.includes(k));
  const isHygieneQuery = ['sweat', 'odor', 'smell', 'vervai', 'breath', 'halitosis', 'deodorant'].some(k => lowerQuery.includes(k));
  const isSleepQuery = ['sleep', 'thookam', 'tired', 'insomnia', 'night', 'dizzy'].some(k => lowerQuery.includes(k));

  let pool = VETTED_QUESTIONS;

  if (isPeriodQuery) {
    pool = VETTED_QUESTIONS.filter(q => q.category === 'puberty_female' || q.tags.some(t => t.includes('period') || t.includes('menstrual') || t.includes('fever')));
  } else if (isLipQuery) {
    pool = VETTED_QUESTIONS.filter(q => q.id === 'skin_hair_6');
  } else if (isGeneralSkinQuery) {
    // If asking about hand/arm/leg skin swelling and NOT lip:
    pool = VETTED_QUESTIONS.filter(q => q.category === 'skin_hair' && q.id !== 'skin_hair_6');
  } else if (isHygieneQuery) {
    pool = VETTED_QUESTIONS.filter(q => q.category === 'hygiene');
  } else if (isSleepQuery) {
    pool = VETTED_QUESTIONS.filter(q => q.category === 'nutrition_sleep');
  } else if (focusArea === 'boys') {
    pool = VETTED_QUESTIONS.filter(q => q.genderTarget !== 'female');
  } else if (focusArea === 'girls') {
    pool = VETTED_QUESTIONS.filter(q => q.genderTarget !== 'male');
  }

  // 3. Perform Fuse.js search on target pool
  const localFuse = new Fuse(pool, fuseOptions);
  const results = localFuse.search(trimmed);

  if (results.length > 0) {
    const topMatch = results[0].item;
    // Extra safety: if query mentions 'hand'/'arm' and top match is lip, discard!
    if ((lowerQuery.includes('hand') || lowerQuery.includes('arm') || lowerQuery.includes('leg')) && topMatch.id === 'skin_hair_6') {
      // Don't match lip Q&A for hand
    } else {
      return {
        isCrisis: false,
        matchedQA: topMatch,
        allMatches: results.slice(0, 3).map(r => r.item)
      };
    }
  }

  // 4. Token Overlap Score Fallback
  const queryTokens = lowerQuery.split(/\s+/).filter(t => t.length > 2);
  let bestScore = 0;
  let bestItem: QAItem | undefined = undefined;

  for (const item of pool) {
    if (item.id === 'skin_hair_6' && !isLipQuery) continue; // Don't match lip for non-lip queries

    let score = 0;
    for (const token of queryTokens) {
      if (item.tags.some(t => t.toLowerCase().includes(token))) score += 3;
      if (item.question.en.toLowerCase().includes(token)) score += 2;
      if (item.question.ta.includes(token)) score += 2;
      if (item.question.tanglish.toLowerCase().includes(token)) score += 2;
      if (item.answer.en.toLowerCase().includes(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && bestScore >= 3) {
    return {
      isCrisis: false,
      matchedQA: bestItem,
      allMatches: [bestItem]
    };
  }

  // 5. Intelligent Polite Fallback (DO NOT return random unrelated topics!)
  return {
    isCrisis: false,
    isGenericFallback: true,
    fallbackText: {
      en: `CareBuddy is an educational guide for adolescent health. I couldn't find an exact match in our vetted bank for "${trimmed}".\n\nFor swelling or bumps on hands/arms, wash gently with cool water, avoid scratching, and consult a school nurse or doctor if pain or redness increases.`,
      ta: `கேர்பட்டி வளர்இளம் பருவத்தினருக்கான விழிப்புணர்வு வழிகாட்டி. நீங்கள் கேட்ட "${trimmed}" பற்றிய நேரடி தகவல் எங்கள் வங்கியில் இல்லை.\n\nகைகளில் வீக்கம் இருந்தால் வெதுவெதுப்பான நீரால் கழுவி, வலி அதிகமானால் மருத்துவரை அணுகவும்.`,
      tanglish: `CareBuddy teen wellness guide. Ungal question "${trimmed}" ku exact match enkitta illa.\n\nHands la swelling irundha cold water vechu gentle ah wash pannunga. Pain adhigama aana doctor ah paarkalam.`
    }
  };
}
