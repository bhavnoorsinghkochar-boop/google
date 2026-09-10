import { GoogleGenAI } from '@google/genai';
import { SearchResponse } from '../types/search';
import { generateDynamicSearchResults, detectSpecialWidget } from '../utils/searchEngine';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function performSearchWithGemini(query: string): Promise<SearchResponse> {
  const fallback = generateDynamicSearchResults(query);
  const widget = detectSpecialWidget(query);

  // If it's a special widget like calculator or coin flip, return immediately
  if (widget.type) {
    return fallback;
  }

  const client = getAiClient();
  if (!client) {
    return fallback;
  }

  try {
    const prompt = `You are the backend engine for Google Search. For the user search query "${query}", generate realistic, high quality, accurate Google SERP data in JSON format matching this schema:
{
  "aiOverview": {
    "summary": "Clear, direct, factual synthesized overview answering the query (2-3 sentences).",
    "bullets": ["Key bullet point 1", "Key bullet point 2", "Key bullet point 3"],
    "sources": [
      {"title": "Source Page Title", "url": "https://example.com/page", "domain": "example.com"}
    ]
  },
  "knowledgeGraph": {
    "title": "Main entity name (or null if not a specific person/company/place/concept)",
    "subtitle": "Short subtitle e.g. Theoretical physicist or Technology company",
    "description": "1-2 sentence encyclopedic overview.",
    "wikipediaUrl": "https://en.wikipedia.org/...",
    "attributes": [
      {"label": "Founded/Born/Type", "value": "Relevant value"}
    ]
  },
  "peopleAlsoAsk": [
    {"question": "Relevant question 1?", "answer": "Direct answer snippet.", "sourceTitle": "Source Title", "sourceUrl": "https://example.com"}
  ],
  "webResults": [
    {"id": "1", "title": "Webpage Title", "url": "https://...", "displayUrl": "https://... › ...", "snippet": "Search result snippet emphasizing keywords."}
  ],
  "relatedSearches": [
    "related search 1", "related search 2", "related search 3", "related search 4"
  ]
}
Return only valid JSON. Do not include markdown code block ticks.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) return fallback;

    const parsed = JSON.parse(text);

    return {
      query,
      totalResults: fallback.totalResults,
      searchTime: fallback.searchTime,
      aiOverview: parsed.aiOverview || fallback.aiOverview,
      knowledgeGraph: (parsed.knowledgeGraph && parsed.knowledgeGraph.title) ? {
        ...fallback.knowledgeGraph,
        ...parsed.knowledgeGraph,
        images: fallback.knowledgeGraph?.images || [
          'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80'
        ]
      } : fallback.knowledgeGraph,
      peopleAlsoAsk: (parsed.peopleAlsoAsk && parsed.peopleAlsoAsk.length > 0) ? parsed.peopleAlsoAsk : fallback.peopleAlsoAsk,
      webResults: (parsed.webResults && parsed.webResults.length > 0) ? parsed.webResults : fallback.webResults,
      imageResults: fallback.imageResults,
      videoResults: fallback.videoResults,
      newsResults: fallback.newsResults,
      mapResults: fallback.mapResults,
      relatedSearches: parsed.relatedSearches || fallback.relatedSearches,
      specialWidget: widget.type,
      widgetData: widget.data
    };
  } catch (err) {
    console.warn('Gemini search failed or rate-limited, falling back to local search engine:', err);
    return fallback;
  }
}
