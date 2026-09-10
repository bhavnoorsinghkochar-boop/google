import { SearchResponse } from '../types/search';

export const POPULAR_SEARCH_PREVIEWS: Record<string, Partial<SearchResponse>> = {
  google: {
    query: 'Google',
    totalResults: '14,230,000,000',
    searchTime: '0.38',
    aiOverview: {
      summary: 'Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI).',
      bullets: [
        'Founded on September 4, 1998, by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University.',
        'Sundar Pichai was appointed CEO of Google in 2015 and later CEO of parent company Alphabet in 2019.',
        'Known for the Google Search engine, Android OS, Chrome browser, YouTube, Google Cloud, and Gemini AI models.'
      ],
      sources: [
        { title: 'Google - About Google, Our Culture & Company News', url: 'https://about.google', domain: 'about.google' },
        { title: 'Google - Wikipedia', url: 'https://en.wikipedia.org/wiki/Google', domain: 'wikipedia.org' },
        { title: 'Alphabet Inc. - Investor Relations', url: 'https://abc.xyz', domain: 'abc.xyz' }
      ]
    },
    knowledgeGraph: {
      title: 'Google',
      subtitle: 'Technology company',
      description: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence.',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Google',
      images: [
        'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80'
      ],
      attributes: [
        { label: 'CEO', value: 'Sundar Pichai (Oct 2, 2015–)' },
        { label: 'Founded', value: 'September 4, 1998, Menlo Park, CA' },
        { label: 'Founders', value: 'Larry Page, Sergey Brin' },
        { label: 'Headquarters', value: 'Mountain View, CA' },
        { label: 'Parent organization', value: 'Alphabet Inc.' },
        { label: 'Subsidiaries', value: 'YouTube, Android, DeepMind, Waymo' }
      ],
      socialLinks: [
        { platform: 'Twitter', url: 'https://twitter.com/google' },
        { platform: 'YouTube', url: 'https://youtube.com/google' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/google' }
      ],
      relatedEntities: [
        { name: 'Alphabet Inc.', subtitle: 'Holding company', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80' },
        { name: 'Microsoft', subtitle: 'Technology company', imageUrl: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=200&auto=format&fit=crop&q=80' },
        { name: 'Apple', subtitle: 'Technology company', imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=200&auto=format&fit=crop&q=80' },
        { name: 'Amazon', subtitle: 'Conglomerate', imageUrl: 'https://images.unsplash.com/photo-1523474255658-4af61b168344?w=200&auto=format&fit=crop&q=80' }
      ]
    },
    peopleAlsoAsk: [
      {
        question: 'Who owns Google today?',
        answer: 'Google is owned by its parent conglomerate Alphabet Inc., which was created in October 2015 to restructure Google by moving its other ventures under a single parent company.',
        sourceTitle: 'Alphabet Inc. - Wikipedia',
        sourceUrl: 'https://en.wikipedia.org/wiki/Alphabet_Inc.'
      },
      {
        question: 'What was Google\'s original name?',
        answer: 'Google was originally called "BackRub" because the search engine analyzed the web\'s back links to estimate the importance of individual sites.',
        sourceTitle: 'Our History - Google',
        sourceUrl: 'https://about.google/our-story/'
      },
      {
        question: 'What are the main products of Google?',
        answer: 'Google\'s core products include Google Search, Google Chrome, Gmail, YouTube, Google Maps, Google Drive, Google Photos, Android OS, and Google Pixel devices.',
        sourceTitle: 'Google Products & Services',
        sourceUrl: 'https://about.google/products/'
      },
      {
        question: 'Where is Google headquarters located?',
        answer: 'Googleplex is the corporate headquarters complex of Alphabet and its subsidiary Google, located at 1600 Amphitheatre Parkway in Mountain View, California.',
        sourceTitle: 'Googleplex - Wikipedia',
        sourceUrl: 'https://en.wikipedia.org/wiki/Googleplex'
      }
    ],
    webResults: [
      {
        id: '1',
        title: 'Google: Search the world\'s information',
        url: 'https://www.google.com',
        displayUrl: 'https://www.google.com',
        snippet: 'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking for.',
        sitelinks: [
          { title: 'Google Search', snippet: 'Discover web results and explore answers', url: 'https://www.google.com' },
          { title: 'Images', snippet: 'Search the most comprehensive image search on the web', url: 'https://images.google.com' },
          { title: 'Google Maps', snippet: 'Find local businesses, view maps and get driving directions', url: 'https://maps.google.com' },
          { title: 'Google Translate', snippet: 'Translate text, documents, and websites in 100+ languages', url: 'https://translate.google.com' }
        ]
      },
      {
        id: '2',
        title: 'About Google - Our Products, Technology & Company History',
        url: 'https://about.google',
        displayUrl: 'https://about.google',
        snippet: 'Stay up to date with the latest Google news, technology breakthroughs, company mission, and corporate commitments across sustainability and education.'
      },
      {
        id: '3',
        title: 'Google - Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Google',
        displayUrl: 'https://en.wikipedia.org › wiki › Google',
        snippet: 'Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, and AI.'
      },
      {
        id: '4',
        title: 'Google Cloud Platform: Cloud Computing Services',
        url: 'https://cloud.google.com',
        displayUrl: 'https://cloud.google.com',
        snippet: 'Meet your business challenges head on with cloud computing services from Google, including computing, data analytics, machine learning, and developer tools.'
      },
      {
        id: '5',
        title: 'Gemini - Direct access to Google AI',
        url: 'https://gemini.google.com',
        displayUrl: 'https://gemini.google.com',
        snippet: 'Chat with Gemini to supercharge your ideas, write, learn, plan and more with Google\'s most capable generative AI model.'
      }
    ],
    imageResults: [
      { id: 'img-1', title: 'Google Headquarters Googleplex Mountain View', imageUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
      { id: 'img-2', title: 'Google Android Lawn Statues', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
      { id: 'img-3', title: 'Modern Tech Workspace and Office', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
      { id: 'img-4', title: 'Google Pixel and Ecosystem Devices', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
      { id: 'img-5', title: 'Server Room and Data Center Infrastructure', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' },
      { id: 'img-6', title: 'Google Tech Developers Coding at Conference', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80', sourceUrl: 'https://unsplash.com', sourceDomain: 'unsplash.com' }
    ],
    videoResults: [
      { id: 'vid-1', title: 'Google I/O 2024 Keynote in 12 Minutes', url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80', channel: 'Google', duration: '12:44', views: '2.4M views', uploadedAt: '3 months ago' },
      { id: 'vid-2', title: 'Inside Google\'s Massive Quantum AI Lab', url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80', channel: 'Veritasium', duration: '18:15', views: '4.8M views', uploadedAt: '1 year ago' },
      { id: 'vid-3', title: 'How Google Search Actually Works Behind the Scenes', url: 'https://youtube.com', thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80', channel: 'Google Search Central', duration: '8:50', views: '1.1M views', uploadedAt: '6 months ago' }
    ],
    newsResults: [
      { id: 'news-1', title: 'Google expands Gemini AI capabilities across Workspace and Android', source: 'The Verge', url: 'https://theverge.com', publishedAt: '3 hours ago', snippet: 'Google is rolling out deep AI integration to millions of Android devices and Workspace subscribers worldwide.' },
      { id: 'news-2', title: 'Alphabet shares rally following earnings beat and Cloud surge', source: 'Bloomberg', url: 'https://bloomberg.com', publishedAt: '7 hours ago', snippet: 'Strong enterprise adoption of generative AI tools bolstered Google Cloud revenues in the latest fiscal quarter.' },
      { id: 'news-3', title: 'DeepMind showcases new breakthroughs in biomedical research', source: 'Nature', url: 'https://nature.com', publishedAt: '1 day ago', snippet: 'New molecular modeling tools promise to accelerate drug discovery pipelines for complex biological structures.' }
    ],
    mapResults: [
      { id: 'map-1', name: 'Googleplex - Headquarters', category: 'Corporate campus', rating: 4.6, reviewsCount: 7820, address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043', status: 'Open', hours: 'Closes 6 PM', coordinates: { lat: 37.422, lng: -122.084 } },
      { id: 'map-2', name: 'Google Visitor Experience', category: 'Visitor center', rating: 4.7, reviewsCount: 3120, address: '2000 N Shoreline Blvd, Mountain View, CA 94043', status: 'Open', hours: 'Closes 7 PM', coordinates: { lat: 37.424, lng: -122.087 } }
    ],
    relatedSearches: [
      'google logo history',
      'google stock alphabet',
      'google account login',
      'google doodle archive',
      'google careers',
      'google drive storage plans',
      'google search console',
      'gemini advanced features'
    ]
  }
};

export const TRENDING_SEARCHES = [
  'Google Gemini 2.0 release and benchmarks',
  'James Webb Space Telescope latest images',
  'Premier League fixtures and table',
  'World Economic Forum updates',
  'TypeScript 5.8 features overview',
  'How does photosynthesis work step by step',
  'Best places to visit in Japan in spring',
  'Stock market live updates today'
];

export const INITIAL_SEARCH_HISTORY = [
  'google',
  'weather',
  'calculator',
  'albert einstein'
];
