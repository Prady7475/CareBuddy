import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchHealthBank } from '@/utils/searchEngine';
import { Language, FocusArea, AgeGroup } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body.query || '';
    const language: Language = body.language || 'en';
    const focusArea: FocusArea = body.focusArea || 'general';
    const ageGroup: AgeGroup = body.ageGroup || '15-16';

    if (!query.trim()) {
      return NextResponse.json({
        error: 'Query string is required'
      }, { status: 400 });
    }

    // 1. Check Crisis Interceptor FIRST
    const searchResult = searchHealthBank(query, focusArea, language);

    // Crisis Interceptor Triggered
    if (searchResult.isCrisis) {
      const fallbackMsg = searchResult.fallbackText?.[language] || searchResult.fallbackText?.en || '';
      return NextResponse.json({
        isCrisis: true,
        crisisResources: searchResult.crisisResources,
        text: fallbackMsg,
        source: 'crisis_interceptor',
        language
      });
    }

    const matchedQA = searchResult.matchedQA;

    const langInstructions = {
      en: 'Simple 8th-grade level English. Keep sentences short, supportive, and clear.',
      ta: 'Simple Tamil using proper Tamil script. Empathetic and easy to understand for school students.',
      tanglish: 'Conversational Tanglish (Tamil words written in English alphabet). Friendly tone with natural South Indian adolescent slang like "bro", "normal dhaan", "bayapadaாதீங்க".'
    };

    // 2. CHECK FOR GEMINI_API_KEY -> FULL DYNAMIC GEMINI AI GENERATION
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const groundedContext = matchedQA
          ? `Grounded Medical Reference:
Question: "${matchedQA.question[language] || matchedQA.question.en}"
Vetted Answer: "${matchedQA.answer[language] || matchedQA.answer.en}"
Sources: ${matchedQA.sources.join(', ')}`
          : `Provide evidence-based adolescent health guidance based on WHO/CDC guidelines.`;

        const prompt = `You are CareBuddy, an empathetic, discreet, and expert adolescent health assistant for South Indian school students aged ${ageGroup}.
User Question: "${query}"
Language requested: ${language} (${langInstructions[language]}).

${groundedContext}

TASK:
Analyze and answer the student's question "${query}" directly in ${language}.
CRITICAL RULES:
1. Provide a warm, reassuring, evidence-based answer at an 8th-grade reading level.
2. Keep it concise (2 to 4 sentences max).
3. If this is a medical symptom question (like fever, pain, or swelling), reassure them, explain the normal body cause, provide self-care tips, and gently advise consulting a doctor or school nurse if symptoms worsen.
4. Respond directly in ${language}. Do not use clinical jargon.`;

        const candidateModels = ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash'];
        let responseText = '';

        for (const mName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({ model: mName });
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            if (text && text.trim().length > 0) {
              responseText = text.trim();
              break;
            }
          } catch (mErr) {
            console.warn(`Gemini model ${mName} attempt failed, trying next:`, mErr);
          }
        }

        if (responseText) {
          return NextResponse.json({
            isCrisis: false,
            text: responseText,
            matchedQA,
            source: 'gemini',
            language
          });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local search bank:', geminiErr);
      }
    }

    // 3. LOCAL DETERMINISTIC FALLBACK (Used when GEMINI_API_KEY is not set)
    if (searchResult.isGenericFallback || !matchedQA) {
      const msg = searchResult.fallbackText?.[language] || searchResult.fallbackText?.en || getGenericFallback(language);
      return NextResponse.json({
        isCrisis: false,
        text: msg,
        source: 'local_match',
        language
      });
    }

    const groundedAnswer = matchedQA.answer[language] || matchedQA.answer.en;

    return NextResponse.json({
      isCrisis: false,
      text: groundedAnswer,
      matchedQA,
      source: 'local_match',
      language
    });

  } catch (err) {
    console.error('API Chat Error:', err);
    return NextResponse.json({
      error: 'An internal error occurred',
      isCrisis: false,
      text: 'Sorry, I had trouble processing that question. Please try asking again or select one of the suggested topics.',
      source: 'local_match'
    }, { status: 500 });
  }
}

function getGenericFallback(lang: Language): string {
  switch (lang) {
    case 'ta':
      return 'மன்னிக்கவும், இந்த கேள்விக்கான தெளிவான பதில் என்னிடம் இல்லை. தயவுசெய்து கீழே உள்ள தலைப்புகளில் ஒன்றை தேர்ந்தெடுக்கவும்.';
    case 'tanglish':
      return 'Sorry bro, indha question ku exact answer enkitta illa. Keela irukra suggested topics try pannunga!';
    default:
      return 'I am sorry, I do not have a exact answer for that question. Please try selecting one of the suggested topics below.';
  }
}
