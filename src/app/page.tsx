'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  RotateCcw, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Bot, 
  X, 
  ChevronRight, 
  Info, 
  Lock, 
  AlertTriangle, 
  Heart, 
  CheckCircle2, 
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Filter,
  Check,
  Shield,
  Globe,
  UserCheck
} from 'lucide-react';

import { 
  Language, 
  AgeGroup, 
  FocusArea, 
  UserProfile, 
  ChatMessage, 
  QAItem,
  Category
} from '@/types';
import { CONTENT_POLICY, CRISIS_RESOURCES, VETTED_QUESTIONS } from '@/data/questions';
import { searchHealthBank } from '@/utils/searchEngine';

export default function CareBuddyApp() {
  // Onboarding & User State (Stored ONLY in component state - zero localStorage persistence for privacy)
  const [profile, setProfile] = useState<UserProfile>({
    language: 'en',
    ageGroup: '15-16',
    focusArea: 'general',
    onboarded: false
  });

  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  // Chat Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal States
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [selectedQAForDetails, setSelectedQAForDetails] = useState<QAItem | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (profile.onboarded) {
      scrollToBottom();
    }
  }, [messages, isLoading, profile.onboarded]);

  // Initial Welcome Message on Onboarding completion
  const initWelcomeMessage = (lang: Language, focus: FocusArea) => {
    let text = '';
    if (lang === 'ta') {
      text = 'வணக்கம்! நான் கேர்பட்டி (CareBuddy) — உங்கள் ரகசிய உடல்நல வழிகாட்டி 🌸\n\nபருக்கள், குரல் மாற்றம், தூய்மை, மாதவிடாய் அல்லது தேர்வு மன அழுத்தம் பற்றி எதையும் தயக்கமின்றி கேளுங்கள்.';
    } else if (lang === 'tanglish') {
      text = 'Vanakkam! Naan CareBuddy — unga private health guide 🌸\n\nBody changes, pimples, periods, hygiene illana exam stress pathi edhu venumnalum ketkalam. 100% private & safe!';
    } else {
      text = 'Hello! I am CareBuddy — your discreet, safe health & wellness guide 🌸\n\nAsk me anything about puberty, body changes, acne, periods, hygiene, or exam stress without any hesitation.';
    }

    setMessages([
      {
        id: 'welcome_1',
        sender: 'bot',
        text,
        timestamp: Date.now(),
        source: 'local_match',
        language: lang
      }
    ]);
  };

  // Complete Onboarding
  const handleCompleteOnboarding = () => {
    setProfile(prev => ({ ...prev, onboarded: true }));
    initWelcomeMessage(profile.language, profile.focusArea);
  };

  // Emergency Panic / Quick Exit Button
  const handlePanicExit = () => {
    // Immediately redirect to Google
    window.location.href = 'https://www.google.com';
  };

  // Reset — go back to onboarding so user can change language, age, or focus area
  const handleResetChat = () => {
    setProfile({
      language: 'en',
      ageGroup: '15-16',
      focusArea: 'general',
      onboarded: false,
    });
    setOnboardingStep(1);
    setMessages([]);
    setInputQuery('');
    setSelectedCategory('all');
  };

  // Handle Language Change on the fly
  const handleLanguageChange = (newLang: Language) => {
    setProfile(prev => ({ ...prev, language: newLang }));
  };

  // Handle Sending a Question
  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: Date.now(),
      language: profile.language
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      // Send request to serverless API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: textToSend.trim(),
          language: profile.language,
          focusArea: profile.focusArea,
          ageGroup: profile.ageGroup
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.text,
        timestamp: Date.now(),
        isCrisis: data.isCrisis,
        crisisResources: data.crisisResources,
        matchedQA: data.matchedQA,
        source: data.source || 'local_match',
        language: profile.language
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn('API error, executing client-side local search fallback:', err);
      
      // Client-side fallback if server fetch completely fails
      const fallbackSearchResult = searchHealthBank(textToSend, profile.focusArea, profile.language);

      const botMsg: ChatMessage = {
        id: `bot_fallback_${Date.now()}`,
        sender: 'bot',
        text: fallbackSearchResult.isCrisis 
          ? (fallbackSearchResult.fallbackText?.[profile.language] || 'Please reach out to helplines immediately.')
          : (fallbackSearchResult.matchedQA?.answer[profile.language] || fallbackSearchResult.matchedQA?.answer.en || 'Here is information on that topic.'),
        timestamp: Date.now(),
        isCrisis: fallbackSearchResult.isCrisis,
        crisisResources: fallbackSearchResult.crisisResources,
        matchedQA: fallbackSearchResult.matchedQA,
        source: fallbackSearchResult.isCrisis ? 'crisis_interceptor' : 'local_match',
        language: profile.language
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter suggested question chips according to selected focus area & category
  const getSuggestedQuestions = (): QAItem[] => {
    let pool = VETTED_QUESTIONS;
    if (profile.focusArea === 'boys') {
      pool = VETTED_QUESTIONS.filter(q => q.genderTarget !== 'female');
    } else if (profile.focusArea === 'girls') {
      pool = VETTED_QUESTIONS.filter(q => q.genderTarget !== 'male');
    }

    if (selectedCategory !== 'all') {
      pool = pool.filter(q => q.category === selectedCategory);
    }

    return pool.slice(0, 8);
  };

  // UI Strings dictionary for multi-lingual labels
  const uiText = {
    en: {
      appName: 'CareBuddy',
      tagline: 'Discreet Adolescent Health & Wellness',
      panicBtn: 'Quick Exit ⚡',
      policyBtn: 'Policy & Sources',
      resetBtn: 'Reset',
      inputPlaceholder: 'Ask about body changes, pimples, periods, hygiene...',
      sendBtn: 'Ask',
      suggestedTitle: 'Explore Vetted Questions (Tap to ask):',
      vettedSources: 'Verified Medical Sources',
      viewDetails: 'Medical Facts',
      geminiBadge: 'AI Rephrased (Vetted)',
      localBadge: 'Vetted Health Bank',
      crisisBadge: 'Crisis Interceptor Active',
      helplinesTitle: 'Immediate South Indian Helplines (24/7 Free Call):',
      callNow: 'Call Now',
      discreetNote: 'Zero Search History Saved | 100% Confidential',
      catAll: 'All Topics',
      catPuberty: 'Puberty',
      catHygiene: 'Hygiene',
      catSkin: 'Skin & Hair',
      catNutrition: 'Nutrition & Sleep',
      catEmotional: 'Emotional'
    },
    ta: {
      appName: 'கேர்பட்டி',
      tagline: 'வளர்இளம் பருவத்தினருக்கான ரகசிய உடல்நல வழிகாட்டி',
      panicBtn: 'வேக வெளியேற்றம் ⚡',
      policyBtn: 'பாதுகாப்பு & ஆதாரங்கள்',
      resetBtn: 'மீட்டமை',
      inputPlaceholder: 'உடல் மாற்றங்கள், பருக்கள், தூய்மை பற்றி கேட்கவும்...',
      sendBtn: 'கேள்',
      suggestedTitle: 'அடிக்கடி கேட்கப்படும் கேள்விகள்:',
      vettedSources: 'ஆதாரப்பூர்வ மருத்துவ மூலங்கள்',
      viewDetails: 'மருத்துவ விவரங்கள்',
      geminiBadge: 'AI வடிவில் (சரிபார்க்கப்பட்டது)',
      localBadge: 'சரிபார்க்கப்பட்ட தகவல் வங்கி',
      crisisBadge: 'அவசர உதவி மையம்',
      helplinesTitle: 'தென்னிந்திய 24/7 இலவச உதவி எண்கள்:',
      callNow: 'அழைக்கவும்',
      discreetNote: 'தேடல் பதிவுகள் சேமிக்கப்படாது | 100% ரகசியமானது',
      catAll: 'அனைத்தும்',
      catPuberty: 'பருவமடைதல்',
      catHygiene: 'தூய்மை',
      catSkin: 'சருமம் & முடி',
      catNutrition: 'உணவு & தூக்கம்',
      catEmotional: 'மனநலம்'
    },
    tanglish: {
      appName: 'CareBuddy',
      tagline: 'Discreet Teen Wellness & Q&A',
      panicBtn: 'Quick Exit ⚡',
      policyBtn: 'Policy & Sources',
      resetBtn: 'Reset',
      inputPlaceholder: 'Body changes, pimples, periods, hygiene pathi kellunga...',
      sendBtn: 'Ask',
      suggestedTitle: 'Popular Questions (Tap to ask):',
      vettedSources: 'Vetted Medical Sources',
      viewDetails: 'Medical Facts',
      geminiBadge: 'AI Rephrased (Vetted)',
      localBadge: 'Vetted Health Bank',
      crisisBadge: 'Crisis Support',
      helplinesTitle: 'Immediate 24/7 Helplines (Tap to Call):',
      callNow: 'Call Now',
      discreetNote: 'Zero Search History Saved | 100% Private',
      catAll: 'All Topics',
      catPuberty: 'Puberty',
      catHygiene: 'Hygiene',
      catSkin: 'Skin & Hair',
      catNutrition: 'Nutrition & Sleep',
      catEmotional: 'Emotional'
    }
  }[profile.language];

  return (
    <div className="min-h-screen bg-[#060a18] text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Glowing Ambient Mesh Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none animate-float [animation-delay:3s]" />
      <div className="fixed top-[40%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none animate-float [animation-delay:1.5s]" />

      {/* ----------------- HEADER BAR ----------------- */}
      <header className="sticky top-0 z-30 glass-panel border-b border-slate-800/80 px-4 py-3 shadow-xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo & Online Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-blue-400 to-indigo-400 flex items-center justify-center shadow-lg shadow-blue-500/25 text-slate-950 font-bold transform hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-slate-950 stroke-none" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-400 border-2 border-slate-950 rounded-full animate-ping" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-400 border-2 border-slate-950 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-slate-100 tracking-tight leading-none bg-gradient-to-r from-slate-100 via-teal-100 to-slate-300 bg-clip-text text-transparent">
                  {uiText.appName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/25">
                  <Shield className="w-3 h-3 text-blue-400" />
                  {profile.onboarded
                    ? `Age ${profile.ageGroup} · ${profile.focusArea === 'boys' ? 'Boys' : profile.focusArea === 'girls' ? 'Girls' : 'General'}`
                    : 'Ages 13–18'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block font-medium mt-0.5">
                {uiText.tagline}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Multi-Lingual Switcher Pill */}
            <div className="bg-slate-900/90 p-1 rounded-2xl border border-slate-800 flex items-center gap-0.5 shadow-inner">
              {(['en', 'ta', 'tanglish'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                    profile.language === lang 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-slate-950 shadow-md transform scale-105' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'ta' ? 'தமிழ்' : 'Tanglish'}
                </button>
              ))}
            </div>

            {/* Content Policy & Sources Button */}
            <button
              onClick={() => setShowPolicyModal(true)}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 rounded-xl transition-all border border-transparent hover:border-slate-700/60"
              title={uiText.policyBtn}
            >
              <BookOpen className="w-5 h-5" />
            </button>

            {/* Reset Chat Button */}
            <button
              onClick={handleResetChat}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-xl transition-all border border-transparent hover:border-slate-700/60"
              title={uiText.resetBtn}
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* PROMINENT PANIC / QUICK EXIT BUTTON */}
            <button
              onClick={handlePanicExit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 active:scale-95 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition-all border border-rose-400/40 animate-pulse-glow"
              title="Quickly hide page and open Google"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>{uiText.panicBtn}</span>
            </button>

          </div>
        </div>
      </header>

      {/* ----------------- CONVERSATIONAL ONBOARDING MODAL ----------------- */}
      {!profile.onboarded && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-pop-in">
          <div className="max-w-lg w-full glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Glow background accent */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-black text-slate-100">Welcome to CareBuddy</h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-blue-300 rounded-full border border-blue-500/30">
                Step {onboardingStep} of 3
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-500 ease-out" 
                style={{ width: `${(onboardingStep / 3) * 100}%` }}
              />
            </div>

            {/* Step 1: Language Selection */}
            {onboardingStep === 1 && (
              <div className="space-y-4 animate-slide-up">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  Select your language:
                </h3>
                <p className="text-xs text-slate-400">
                  Choose what feels most comfortable. You can change this anytime.
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'en', title: 'Simple English', desc: 'Clear, 8th-grade level English' },
                    { id: 'ta', title: 'தமிழ் (Tamil)', desc: 'தெளிவான தமிழ் விளக்கம்' },
                    { id: 'tanglish', title: 'Tanglish', desc: 'Tamil words in English letters' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProfile(p => ({ ...p, language: item.id as Language }))}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all transform hover:scale-[1.01] ${
                        profile.language === item.id
                          ? 'border-blue-400 bg-blue-500/15 text-blue-200 font-bold shadow-lg shadow-blue-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{item.title}</div>
                        <div className="text-xs text-slate-400 font-normal mt-0.5">{item.desc}</div>
                      </div>
                      {profile.language === item.id && (
                        <div className="w-6 h-6 rounded-full bg-blue-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:opacity-95 transform hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Age Selection (UPDATED WITH AGE 17-18 & CLEAR LABELS) */}
            {onboardingStep === 2 && (
              <div className="space-y-4 animate-slide-up">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-400" />
                    Select your Age (Years):
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    This tailors health guidance specifically to your age and school level.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: '13-14', title: 'Age 13 – 14', sub: 'Grades 8–9 (Middle)' },
                    { id: '15-16', title: 'Age 15 – 16', sub: 'Grades 9–10 (High)' },
                    { id: '17-18', title: 'Age 17 – 18', sub: 'Grades 11–12 (Higher Sec)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProfile(p => ({ ...p, ageGroup: item.id as AgeGroup }))}
                      className={`p-4 sm:p-5 rounded-2xl border text-center transition-all transform hover:scale-[1.02] flex flex-col justify-center items-center ${
                        profile.ageGroup === item.id
                          ? 'border-blue-400 bg-blue-500/15 text-blue-200 font-bold shadow-lg shadow-blue-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="text-base font-extrabold">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">{item.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setOnboardingStep(1)}
                    className="w-1/3 py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-2xl border border-slate-700 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setOnboardingStep(3)}
                    className="w-2/3 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:opacity-95 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Focus Area Selection */}
            {onboardingStep === 3 && (
              <div className="space-y-4 animate-slide-up">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  Select primary focus area:
                </h3>
                <p className="text-xs text-slate-400">
                  You can explore any topic freely in the chat.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'boys', title: "Boys' Health", desc: 'Voice change, wet dreams, facial hair, hygiene' },
                    { id: 'girls', title: "Girls' Health", desc: 'Periods, cramps, discharge, pad hygiene' },
                    { id: 'general', title: 'General Wellness', desc: 'Acne, sleep, exam focus, mood swings' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProfile(p => ({ ...p, focusArea: item.id as FocusArea }))}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all transform hover:scale-[1.01] ${
                        profile.focusArea === item.id
                          ? 'border-blue-400 bg-blue-500/15 text-blue-200 font-bold shadow-lg shadow-blue-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{item.title}</div>
                        <div className="text-xs text-slate-400 font-normal mt-0.5">{item.desc}</div>
                      </div>
                      {profile.focusArea === item.id && (
                        <div className="w-6 h-6 rounded-full bg-blue-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setOnboardingStep(2)}
                    className="w-1/3 py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-2xl border border-slate-700 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCompleteOnboarding}
                    className="w-2/3 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:opacity-95 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                  >
                    <span>Start Private Session</span>
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>No sign-up, no login, zero tracking history.</span>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- MAIN CHAT VIEW CONTAINER ----------------- */}
      <main className="flex-1 max-w-3xl w-full mx-auto flex flex-col p-3 sm:p-4 gap-3.5 overflow-hidden z-10">
        
        {/* Safe Privacy Notice Ribbon */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800/90 rounded-2xl px-4 py-2 flex items-center justify-between gap-2 text-xs text-slate-300 shadow-sm">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate font-medium">{uiText.discreetNote}</span>
          </div>
          <button 
            onClick={() => setShowPolicyModal(true)} 
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 flex-shrink-0 font-bold transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Info</span>
          </button>
        </div>

        {/* Chat Messages Scroll Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-slate-950 font-bold flex-shrink-0 shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-transform">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 shadow-xl border transition-all ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-br-none border-blue-400/40 shadow-blue-600/20'
                    : msg.isCrisis
                    ? 'bg-rose-950/90 text-rose-100 rounded-bl-none border-rose-500/60 shadow-rose-900/30 animate-pulse-glow'
                    : 'glass-panel text-slate-100 rounded-bl-none border-slate-700/60'
                }`}>
                  
                  {/* Bot Source Badge */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        {msg.isCrisis ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600/30 text-rose-300 border border-rose-500/50 animate-pulse">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            {uiText.crisisBadge}
                          </span>
                        ) : msg.source === 'gemini' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            {uiText.geminiBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            <ShieldCheck className="w-3 h-3 text-indigo-400" />
                            {uiText.localBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  {/* Message Text Body */}
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal tracking-wide">
                    {msg.text}
                  </p>

                  {/* CRISIS SAFETY CARD (Distress Interceptor) */}
                  {msg.isCrisis && msg.crisisResources && (
                    <div className="mt-4 pt-3.5 border-t border-rose-800/80 space-y-3">
                      <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                        <PhoneCall className="w-4 h-4 text-rose-400 animate-bounce" />
                        {uiText.helplinesTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {msg.crisisResources.map((res) => (
                          <a
                            key={res.id}
                            href={`tel:${res.phone.replace(/[^0-9]/g, '')}`}
                            className="p-3.5 bg-rose-900/50 hover:bg-rose-900/80 border border-rose-700/60 rounded-2xl flex flex-col justify-between transition-all transform hover:scale-[1.02] group"
                          >
                            <div>
                              <div className="text-xs font-extrabold text-white group-hover:text-rose-200">
                                {res.name}
                              </div>
                              <div className="text-xs text-rose-300 font-mono font-bold mt-1">
                                📞 {res.phone}
                              </div>
                              <div className="text-[11px] text-rose-200/80 mt-1 line-clamp-2">
                                {res.description[profile.language] || res.description.en}
                              </div>
                            </div>
                            <div className="mt-2.5 text-right">
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-950 bg-rose-300 group-hover:bg-white px-3 py-1 rounded-xl transition-colors shadow-md">
                                {uiText.callNow} ↗
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounded Medical References Action Toggle */}
                  {!isUser && !msg.isCrisis && msg.matchedQA && (
                    <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedQAForDetails(msg.matchedQA || null)}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 transition-colors group"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
                        <span className="underline underline-offset-2">{uiText.viewDetails}</span>
                      </button>
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">
                        {msg.matchedQA.sources[0]}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Animated Typing Wave Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-slide-up">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-slate-950 font-bold animate-pulse shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div className="glass-panel border border-slate-700/60 rounded-3xl rounded-bl-none p-4 flex items-center gap-3 text-slate-300 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-wave-1" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-wave-2" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-wave-3" />
                </div>
                <span className="text-xs font-semibold text-slate-300">Searching health bank...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ----------------- CATEGORY FILTER & SUGGESTED QUESTION CHIPS ----------------- */}
        <div className="space-y-2 pt-1">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catAll}
            </button>
            <button
              onClick={() => setSelectedCategory('puberty_female')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'puberty_female' || selectedCategory === 'puberty_male'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catPuberty}
            </button>
            <button
              onClick={() => setSelectedCategory('hygiene')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'hygiene'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catHygiene}
            </button>
            <button
              onClick={() => setSelectedCategory('skin_hair')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'skin_hair'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catSkin}
            </button>
            <button
              onClick={() => setSelectedCategory('nutrition_sleep')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'nutrition_sleep'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catNutrition}
            </button>
            <button
              onClick={() => setSelectedCategory('emotional')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 ${
                selectedCategory === 'emotional'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uiText.catEmotional}
            </button>
          </div>

          {/* Interactive Question Chips (Clean Truncation & Readable Text) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {getSuggestedQuestions().map((item) => {
              const qText = item.question[profile.language] || item.question.en;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSendQuery(qText)}
                  className="flex-shrink-0 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/60 text-slate-200 hover:text-blue-300 text-xs font-medium rounded-2xl transition-all shadow-md text-left max-w-[320px] truncate transform hover:scale-[1.02] active:scale-[0.98]"
                  title={qText}
                >
                  💬 {qText}
                </button>
              );
            })}
          </div>

        </div>

        {/* ----------------- CHAT INPUT BAR ----------------- */}
        <div className="glass-panel border border-slate-700/80 rounded-3xl p-2 sm:p-2.5 shadow-2xl flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendQuery();
            }}
            placeholder={uiText.inputPlaceholder}
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-0 px-3 py-2 font-medium"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!inputQuery.trim() || isLoading}
            className={`p-3.5 rounded-2xl font-black transition-all flex items-center justify-center transform active:scale-95 ${
              inputQuery.trim() && !isLoading
                ? 'bg-gradient-to-r from-blue-500 to-indigo-400 text-slate-950 shadow-lg shadow-blue-500/25 hover:opacity-95 hover:scale-105'
                : 'bg-slate-800/80 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* ----------------- VETTED QA DETAILS MODAL ----------------- */}
      {selectedQAForDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 animate-pop-in">
          <div className="max-w-lg w-full glass-panel border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-blue-400">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="font-extrabold text-base text-slate-100">Vetted Medical Grounding Facts</h3>
              </div>
              <button
                onClick={() => setSelectedQAForDetails(null)}
                className="p-1.5 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question:</label>
                <p className="text-slate-100 font-bold mt-0.5 text-base">
                  {selectedQAForDetails.question[profile.language] || selectedQAForDetails.question.en}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complete Vetted Answer:</label>
                <p className="text-slate-200 leading-relaxed mt-1 bg-slate-950/90 p-4 rounded-2xl border border-slate-800">
                  {selectedQAForDetails.answer[profile.language] || selectedQAForDetails.answer.en}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Summary:</label>
                <p className="text-slate-300 mt-0.5">
                  {selectedQAForDetails.summary[profile.language] || selectedQAForDetails.summary.en}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medical Authorities & References:</label>
                <ul className="mt-1 list-disc list-inside text-xs text-blue-300 font-semibold space-y-1">
                  {selectedQAForDetails.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Keywords / Tanglish Tags:</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedQAForDetails.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-800/80 text-blue-300 text-xs rounded-xl border border-slate-700 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={() => setSelectedQAForDetails(null)}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-2xl border border-slate-700 transition-all mt-2"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ----------------- CONTENT POLICY & DISCLAIMER MODAL ----------------- */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 animate-pop-in">
          <div className="max-w-xl w-full glass-panel border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5 text-blue-400">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
                <h3 className="font-extrabold text-lg text-slate-100">
                  {CONTENT_POLICY.title[profile.language] || CONTENT_POLICY.title.en}
                </h3>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-blue-500/10 border border-blue-500/25 rounded-2xl text-blue-200 leading-relaxed">
                <h4 className="font-black text-xs uppercase tracking-wider mb-1 text-blue-400">Educational Purpose</h4>
                <p>{CONTENT_POLICY.educationalPurpose[profile.language] || CONTENT_POLICY.educationalPurpose.en}</p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-amber-200 leading-relaxed">
                <h4 className="font-black text-xs uppercase tracking-wider mb-1 text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Medical Non-Prescriptive Disclaimer
                </h4>
                <p>{CONTENT_POLICY.disclaimer[profile.language] || CONTENT_POLICY.disclaimer.en}</p>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 mb-2">Medical References</h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside text-xs font-medium">
                  {CONTENT_POLICY.medicalReferences.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 mb-2">Active South Indian Emergency Helplines</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 font-medium">Tele-MANAS (Govt):</span>
                    <span className="font-mono text-blue-300 font-bold block mt-0.5">{CONTENT_POLICY.helplines.telemanas}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 font-medium">KIRAN Helpline:</span>
                    <span className="font-mono text-blue-300 font-bold block mt-0.5">{CONTENT_POLICY.helplines.kiran}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 font-medium">Childline India:</span>
                    <span className="font-mono text-blue-300 font-bold block mt-0.5">{CONTENT_POLICY.helplines.childline}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 font-medium">Sneha (Tamil Nadu):</span>
                    <span className="font-mono text-blue-300 font-bold block mt-0.5">{CONTENT_POLICY.helplines.sneha}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPolicyModal(false)}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-400 hover:opacity-95 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-blue-500/20"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-2.5 text-center text-[11px] text-slate-500 border-t border-slate-900 bg-[#060a18]/90 backdrop-blur-md z-10">
        <p>CareBuddy Adolescent Health Guide • Confidential Educational Application</p>
      </footer>
    </div>
  );
}
