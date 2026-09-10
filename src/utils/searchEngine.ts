import { SearchResponse, WebResult, ImageResult, VideoResult, NewsResult, MapResult, KnowledgeGraph, PeopleAlsoAskItem, AiOverview } from '../types/search';
import { POPULAR_SEARCH_PREVIEWS } from '../data/mockData';

// Helper to detect special widget needs
export function detectSpecialWidget(query: string): { type: SearchResponse['specialWidget']; data?: any } {
  const clean = query.trim().toLowerCase();

  // Coin flip
  if (['flip a coin', 'coin flip', 'flip coin', 'heads or tails'].includes(clean)) {
    return { type: 'coin_flip' };
  }

  // Roll die
  if (['roll a die', 'roll dice', 'dice roll', 'roll a dice'].includes(clean)) {
    return { type: 'roll_die' };
  }

  // Timer / Stopwatch
  if (clean === 'timer' || clean === 'stopwatch' || clean.startsWith('set timer')) {
    return { type: 'timer' };
  }

  // Calculator
  if (
    clean === 'calc' ||
    clean === 'calculator' ||
    /^[\d\s+\-*/^%().,e]+$/.test(clean) && /[+\-*/^%]/.test(clean) ||
    /^(sin|cos|tan|sqrt|log|ln)\(/.test(clean)
  ) {
    return { type: 'calculator' };
  }

  // Weather
  if (clean === 'weather' || clean.startsWith('weather in') || clean.endsWith('weather') || clean.includes('temperature in')) {
    const city = clean.replace(/weather in|weather|temperature in/g, '').trim() || 'San Francisco';
    return { type: 'weather', data: { city: city.charAt(0).toUpperCase() + city.slice(1) } };
  }

  // Dictionary
  if (clean.startsWith('define ') || clean.startsWith('meaning of ') || clean.startsWith('definition of ')) {
    const word = clean.replace(/^(define|meaning of|definition of)\s+/, '').trim();
    return { type: 'dictionary', data: { word } };
  }

  // Converter
  if (
    clean.includes('convert') ||
    /\b(usd|eur|gbp|inr|jpy|cad|aud)\s+to\s+(usd|eur|gbp|inr|jpy|cad|aud)\b/i.test(clean) ||
    /\b(km|miles|kg|lbs|cm|inches|celsius|fahrenheit)\s+to\s+(km|miles|kg|lbs|cm|inches|celsius|fahrenheit)\b/i.test(clean)
  ) {
    return { type: 'converter' };
  }

  return { type: undefined };
}

// Generate realistic dynamic results for any query
export function generateDynamicSearchResults(query: string): SearchResponse {
  const clean = query.trim();
  const lower = clean.toLowerCase();

  // Check predefined catalog first
  if (POPULAR_SEARCH_PREVIEWS[lower]) {
    const base = POPULAR_SEARCH_PREVIEWS[lower];
    const widget = detectSpecialWidget(query);
    return {
      query: clean,
      totalResults: base.totalResults || '8,120,000,000',
      searchTime: base.searchTime || '0.34',
      aiOverview: base.aiOverview,
      knowledgeGraph: base.knowledgeGraph,
      peopleAlsoAsk: base.peopleAlsoAsk || [],
      webResults: base.webResults || [],
      imageResults: base.imageResults || [],
      videoResults: base.videoResults || [],
      newsResults: base.newsResults || [],
      mapResults: base.mapResults || [],
      relatedSearches: base.relatedSearches || [],
      specialWidget: widget.type,
      widgetData: widget.data,
    };
  }

  const widget = detectSpecialWidget(query);

  // Capitalize query for display
  const titleCased = clean
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // AI Overview synthesis
  const aiOverview: AiOverview = {
    summary: `${titleCased} refers to a widely discussed topic encompassing key principles, historical context, and contemporary applications. Understanding ${clean} provides foundational insights into relevant modern systems and workflows.`,
    bullets: [
      `Key definition and fundamental concepts regarding ${clean}.`,
      `Practical applications and common methodologies associated with ${clean}.`,
      `Recent advancements, ongoing research, and future directions for ${clean}.`
    ],
    sources: [
      {
        title: `${titleCased} - Comprehensive Guide & Overview`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}`,
        domain: 'wikipedia.org',
      },
      {
        title: `Official Documentation and Reference for ${titleCased}`,
        url: `https://www.britannica.com/topic/${encodeURIComponent(clean)}`,
        domain: 'britannica.com',
      },
      {
        title: `Recent Developments in ${titleCased}`,
        url: `https://www.nature.com/search?q=${encodeURIComponent(clean)}`,
        domain: 'nature.com',
      }
    ],
    additionalNote: 'Generative AI is experimental.'
  };

  // Knowledge graph
  let knowledgeGraph: KnowledgeGraph | undefined = undefined;
  if (!widget.type && clean.length > 2) {
    knowledgeGraph = {
      title: titleCased,
      subtitle: 'Topic & Overview',
      description: `${titleCased} encompasses foundational principles, widespread global use, and prominent ongoing development in contemporary research and technology.`,
      wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}`,
      images: [
        'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
      ],
      attributes: [
        { label: 'Category', value: 'General Knowledge & Science' },
        { label: 'Related fields', value: 'Research, Technology, Education' },
        { label: 'Global interest', value: 'High (Worldwide search trend)' },
        { label: 'Status', value: 'Active and expanding' }
      ],
      socialLinks: [
        { platform: 'Wikipedia', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}` }
      ],
      relatedEntities: [
        { name: 'Research & Science', subtitle: 'Academic discipline', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&auto=format&fit=crop&q=80' },
        { name: 'Global Innovation', subtitle: 'Technology movement', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80' },
        { name: 'Data & Systems', subtitle: 'Computing domain', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&auto=format&fit=crop&q=80' }
      ]
    };
  }

  // People also ask
  const peopleAlsoAsk: PeopleAlsoAskItem[] = [
    {
      question: `What is ${clean} and how does it work?`,
      answer: `${titleCased} operates through systematic mechanisms designed to deliver reliable outcomes based on verified criteria and established standards.`,
      sourceTitle: `${titleCased} Explained - Knowledge Base`,
      sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}`
    },
    {
      question: `Why is ${clean} important today?`,
      answer: `It serves a vital role across education, industry, and modern daily applications, fostering greater efficiency and deeper subject understanding.`,
      sourceTitle: `Understanding the Impact of ${titleCased}`,
      sourceUrl: `https://www.britannica.com/topic/${encodeURIComponent(clean)}`
    },
    {
      question: `What are the key benefits and advantages of ${clean}?`,
      answer: `Key advantages include enhanced accuracy, broader accessibility, structured workflows, and versatile integration capabilities across multiple platforms.`,
      sourceTitle: `Benefits & Principles of ${titleCased}`,
      sourceUrl: `https://www.sciencedirect.com/topics/${encodeURIComponent(clean)}`
    },
    {
      question: `How can one learn more about ${clean}?`,
      answer: `Extensive documentation, interactive tutorials, peer-reviewed articles, and accredited educational courses provide in-depth pathways for mastery.`,
      sourceTitle: `Learning Resources & Guide for ${titleCased}`,
      sourceUrl: `https://ocw.mit.edu/search/?q=${encodeURIComponent(clean)}`
    }
  ];

  // Web results
  const webResults: WebResult[] = [
    {
      id: 'res-1',
      title: `${titleCased} - Wikipedia, the free encyclopedia`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}`,
      displayUrl: `https://en.wikipedia.org › wiki › ${encodeURIComponent(clean)}`,
      snippet: `<b>${clean}</b> is defined in scholarly literature as a primary concept in modern study. Learn about its background, historical origins, structure, and applications.`,
      sitelinks: [
        { title: 'Overview & History', snippet: 'Origins and development timeline', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}#History` },
        { title: 'Core Principles', snippet: 'Detailed breakdown of fundamental rules', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}#Principles` },
        { title: 'Modern Applications', snippet: 'Everyday and industrial use cases', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}#Applications` },
        { title: 'References & Citations', snippet: 'Academic bibliography and source index', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(clean)}#References` }
      ]
    },
    {
      id: 'res-2',
      title: `${titleCased} | Definition, History, & Facts | Britannica`,
      url: `https://www.britannica.com/topic/${encodeURIComponent(clean)}`,
      displayUrl: `https://www.britannica.com › topic › ${encodeURIComponent(clean)}`,
      snippet: `Explore <b>${clean}</b> with Encyclopædia Britannica editors. Comprehensive examination of origins, key figures, global relevance, and critical evaluations.`
    },
    {
      id: 'res-3',
      title: `The Ultimate Guide to ${titleCased}: Everything You Need to Know`,
      url: `https://www.guidehub.org/guides/${encodeURIComponent(clean)}`,
      displayUrl: `https://www.guidehub.org › guides › ${encodeURIComponent(clean)}`,
      snippet: `A complete breakdown answering what <b>${clean}</b> means, step-by-step best practices, expert recommendations, FAQs, and practical real-world examples.`
    },
    {
      id: 'res-4',
      title: `Research and Academic Papers on ${titleCased}`,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(clean)}`,
      displayUrl: `https://scholar.google.com › scholar › ${encodeURIComponent(clean)}`,
      snippet: `Discover top cited academic literature, peer-reviewed conference proceedings, and foundational publications on <b>${clean}</b> across major university libraries.`
    },
    {
      id: 'res-5',
      title: `Interactive Tutorials and Documentation: ${titleCased}`,
      url: `https://www.learnplatform.io/topic/${encodeURIComponent(clean)}`,
      displayUrl: `https://www.learnplatform.io › topic › ${encodeURIComponent(clean)}`,
      snippet: `Hands-on practice exercises, visual demonstrations, interactive walkthroughs, and practical cheatsheets for <b>${clean}</b>.`
    }
  ];

  // Images
  const imageResults: ImageResult[] = [
    { id: 'img-1', title: `${titleCased} High Resolution Visual Concept`, imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
    { id: 'img-2', title: `${titleCased} Diagram and Schematic Framework`, imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
    { id: 'img-3', title: `${titleCased} Creative Illustration & Architecture`, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
    { id: 'img-4', title: `${titleCased} Experimental Setup and Testing`, imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
    { id: 'img-5', title: `${titleCased} Global Network Connectivity`, imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
    { id: 'img-6', title: `${titleCased} Modern Technology Workspace`, imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' }
  ];

  // Videos
  const videoResults: VideoResult[] = [
    { id: 'vid-1', title: `${titleCased} in 10 Minutes: The Full Overview`, url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80', channel: 'CrashCourse Education', duration: '10:18', views: '1.8M views', uploadedAt: '4 months ago' },
    { id: 'vid-2', title: `Understanding ${titleCased} from First Principles`, url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80', channel: '3Blue1Brown', duration: '21:05', views: '3.4M views', uploadedAt: '1 year ago' },
    { id: 'vid-3', title: `Top 5 Mistakes People Make with ${titleCased}`, url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80', channel: 'Fireship', duration: '5:42', views: '890K views', uploadedAt: '2 months ago' }
  ];

  // News
  const newsResults: NewsResult[] = [
    { id: 'news-1', title: `Major announcements and industry trends regarding ${titleCased}`, source: 'Reuters', url: 'https://reuters.com', publishedAt: '4 hours ago', snippet: `Global organizations discuss strategic implementation and roadmap milestones for ${clean} during annual tech summit.` },
    { id: 'news-2', title: `How ${titleCased} is reshaping digital productivity this year`, source: 'TechCrunch', url: 'https://techcrunch.com', publishedAt: '12 hours ago', snippet: `Industry analysts point toward rising efficiency benchmarks and streamlined adoption among leading enterprises.` },
    { id: 'news-3', title: `New benchmark report highlights rapid evolution in ${titleCased}`, source: 'Wired', url: 'https://wired.com', publishedAt: '1 day ago', snippet: `A comprehensive evaluation explores key performance metrics and future outlook for developers and researchers.` }
  ];

  // Maps
  const mapResults: MapResult[] = [
    { id: 'map-1', name: `${titleCased} Research Center`, category: 'Research institute', rating: 4.8, reviewsCount: 340, address: '100 Innovation Way, Tech Park', status: 'Open', hours: 'Closes 6 PM', coordinates: { lat: 37.7749, lng: -122.4194 } },
    { id: 'map-2', name: `${titleCased} Community Hub`, category: 'Learning center', rating: 4.6, reviewsCount: 180, address: '450 University Ave, Suite 200', status: 'Open', hours: 'Closes 8 PM', coordinates: { lat: 37.7833, lng: -122.4167 } }
  ];

  // Related searches
  const relatedSearches = [
    `${clean} definition and examples`,
    `${clean} tutorial for beginners`,
    `best practices for ${clean}`,
    `history of ${clean}`,
    `${clean} vs alternatives comparison`,
    `${clean} tools and software`,
    `future of ${clean} in 2026`,
    `how to use ${clean} effectively`
  ];

  // Number of results
  const randomCount = Math.floor(Math.random() * 8000000000) + 1200000000;
  const formattedCount = randomCount.toLocaleString();
  const searchTime = (0.2 + Math.random() * 0.3).toFixed(2);

  return {
    query: clean,
    totalResults: formattedCount,
    searchTime,
    aiOverview,
    knowledgeGraph,
    peopleAlsoAsk,
    webResults,
    imageResults,
    videoResults,
    newsResults,
    mapResults,
    relatedSearches,
    specialWidget: widget.type,
    widgetData: widget.data,
  };
}
