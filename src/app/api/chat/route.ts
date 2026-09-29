import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchHealthBank } from '@/utils/searchEngine';
import { Language, FocusArea, AgeGroup } from '@/types';

// Cap serverless function at 25s — never let Vercel hit its 300s limit
export const maxDuration = 25;

const GEMINI_TIMEOUT_MS = 8000; // 8s per model attempt
const CANDIDATE_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];

const LANG_INSTRUCTIONS: Record<Language, string> = {
  en: 'Simple 8th-grade level English. Keep sentences short, supportive, and clear.',
  ta: 'Simple Tamil using proper Tamil script. Empathetic and easy to understand for school students.',
  tanglish: 'Conversational Tanglish (Tamil words written in English alphabet). Friendly tone with natural South Indian adolescent slang like "bro", "normal dhaan".',
};

function getGenericFallback(lang: Language): string {
  switch (lang) {
    case 'ta':
      return 'மன்னிக்கவும், இந்த கேள்விக்கான தெளிவான பதில் என்னிடம் இல்லை. தயவுசெய்து கீழே உள்ள தலைப்புகளில் ஒன்றை தேர்ந்தெடுக்கவும்.';
    case 'tanglish':
      return 'Sorry bro, indha question ku exact answer enkitta illa. Keela irukra suggested topics try pannunga!';
    default:
      return 'I am sorry, I do not have an exact answer for that question. Please try selecting one of the suggested topics below.';
  }
}

/** Calls a single Gemini model with an AbortController timeout. */
async function tryGeminiModel(
  genAI: GoogleGenerativeAI,
  modelName: string,
  prompt: string
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    // Pass signal via requestOptions so the fetch is cancelled on abort
    const result = await model.generateContent(prompt, {
      // @ts-expect-error: signal is supported at runtime but not yet in the type defs
      signal: controller.signal,
    });
    const text = result.response.text();
    return text?.trim() || null;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn(`Gemini model ${modelName} timed out after ${GEMINI_TIMEOUT_MS}ms`);
    } else {
      console.warn(`Gemini model ${modelName} failed:`, err instanceof Error ? err.message : err);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body.query || '';
    const language: Language = body.language || 'en';
    const focusArea: FocusArea = body.focusArea || 'general';
    const ageGroup: AgeGroup = body.ageGroup || '15-16';

    if (!query.trim()) {
      return NextResponse.json({ error: 'Query string is required' }, { status: 400 });
    }

    // 1. Crisis check first — always synchronous and instant
    const searchResult = searchHealthBank(query, focusArea, language);

    if (searchResult.isCrisis) {
      return NextResponse.json({
        isCrisis: true,
        crisisResources: searchResult.crisisResources,
        text: searchResult.fallbackText?.[language] || searchResult.fallbackText?.en || '',
        source: 'crisis_interceptor',
        language,
      });
    }

    const matchedQA = searchResult.matchedQA;

    // 2. Try Gemini if API key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey?.trim()) {
      const genAI = new GoogleGenerativeAI(apiKey);

      const groundedContext = matchedQA
        ? `Grounded Medical Reference:\nQuestion: "${matchedQA.question[language] || matchedQA.question.en}"\nVetted Answer: "${matchedQA.answer[language] || matchedQA.answer.en}"\nSources: ${matchedQA.sources.join(', ')}`
        : `Provide evidence-based adolescent health guidance based on WHO/CDC guidelines.`;

      const prompt = `You are CareBuddy, an empathetic, discreet, and expert adolescent health assistant for South Indian school students aged ${ageGroup}.
User Question: "${query}"
Language requested: ${language} (${LANG_INSTRUCTIONS[language]}).

${groundedContext}

TASK: Answer the student's question directly in ${language}.
RULES:
1. Warm, reassuring, evidence-based answer at an 8th-grade reading level.
2. Concise — 2 to 4 sentences max.
3. For medical symptoms (fever, pain, swelling): reassure, explain normal body cause, give self-care tips, advise doctor if worsens.
4. No clinical jargon. Respond only in ${language}.`;

      // Try each model in order — stop at first success
      for (const modelName of CANDIDATE_MODELS) {
        const text = await tryGeminiModel(genAI, modelName, prompt);
        if (text) {
          return NextResponse.json({
            isCrisis: false,
            text,
            matchedQA,
            source: 'gemini',
            language,
          });
        }
      }

      // All Gemini attempts failed — fall through to local bank
      console.warn('All Gemini models failed. Falling back to local health bank.');
    }

    // 3. Local deterministic fallback — always fast
    const localAnswer =
      matchedQA?.answer[language] ||
      matchedQA?.answer.en ||
      searchResult.fallbackText?.[language] ||
      searchResult.fallbackText?.en ||
      getGenericFallback(language);

    return NextResponse.json({
      isCrisis: false,
      text: localAnswer,
      matchedQA,
      source: 'local_match',
      language,
    });

  } catch (err) {
    console.error('API Chat Error:', err);
    return NextResponse.json({
      error: 'An internal error occurred',
      isCrisis: false,
      text: 'Sorry, I had trouble processing that. Please try again.',
      source: 'local_match',
    }, { status: 500 });
  }
}
