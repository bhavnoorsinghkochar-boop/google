import React, { useState, useEffect } from 'react';
import { GoogleLogo } from './components/GoogleLogo';
import { SearchBar } from './components/SearchBar';
import { GoogleHeader } from './components/GoogleHeader';
import { GoogleFooter } from './components/GoogleFooter';
import { SerpHeader } from './components/SerpHeader';
import { GoogleVoiceModal } from './components/GoogleVoiceModal';
import { GoogleLensModal } from './components/GoogleLensModal';
import { AiOverviewCard } from './components/widgets/AiOverviewCard';
import { GoogleCalculator } from './components/widgets/GoogleCalculator';
import { GoogleWeatherWidget } from './components/widgets/GoogleWeatherWidget';
import { GoogleConverterWidget } from './components/widgets/GoogleConverterWidget';
import { GoogleTimerWidget } from './components/widgets/GoogleTimerWidget';
import { GoogleDictionaryWidget } from './components/widgets/GoogleDictionaryWidget';
import { GoogleCoinDiceWidget } from './components/widgets/GoogleCoinDiceWidget';
import { KnowledgeGraphCard } from './components/widgets/KnowledgeGraphCard';
import { PeopleAlsoAsk } from './components/widgets/PeopleAlsoAsk';
import { WebResultItem } from './components/widgets/WebResultItem';
import { GooglePagination } from './components/widgets/GooglePagination';
import { ImagesView } from './components/views/ImagesView';
import { VideosView } from './components/views/VideosView';
import { NewsView } from './components/views/NewsView';
import { MapsView } from './components/views/MapsView';
import { SearchResponse, SearchTab } from './types/search';
import { generateDynamicSearchResults } from './utils/searchEngine';
import { INITIAL_SEARCH_HISTORY } from './data/mockData';

// Multilingual labels for Google
const LOCALES: Record<string, { name: string; searchBtn: string; luckyBtn: string; offeredIn: string }> = {
  en: { name: 'English', searchBtn: 'Google Search', luckyBtn: "I'm Feeling Lucky", offeredIn: 'Google offered in:' },
  hi: { name: 'हिन्दी', searchBtn: 'Google खोज', luckyBtn: 'मेरी किस्मत अच्छी है', offeredIn: 'Google इन भाषाओं में भी उपलब्ध है:' },
  bn: { name: 'বাংলা', searchBtn: 'Google অনুসন্ধান', luckyBtn: 'ভাগ্য পরীক্ষা করুন', offeredIn: 'Google এই ভাষায় পাওয়া যাচ্ছে:' },
  te: { name: 'తెలుగు', searchBtn: 'Google శోధన', luckyBtn: 'నా అదృష్టం బాగుంది', offeredIn: 'Google వీటిలో అందించబడుతోంది:' },
  mr: { name: 'मराठी', searchBtn: 'Google शोध', luckyBtn: 'माझे नशीब चांगले आहे', offeredIn: 'Google यामध्ये उपलब्ध आहे:' },
  ta: { name: 'தமிழ்', searchBtn: 'Google தேடல்', luckyBtn: 'நான் அதிர்ஷ்டசாலி', offeredIn: 'Google இந்த மொழிகளில் கிடைக்கிறது:' },
  gu: { name: 'ગુજરાતી', searchBtn: 'Google શોધ', luckyBtn: 'હું નસીબદાર છું', offeredIn: 'Google આ ભાષાઓમાં ઉપલબ્ધ છે:' },
  kn: { name: 'ಕನ್ನಡ', searchBtn: 'Google ಹುಡುಕಾಟ', luckyBtn: 'ನನ್ನ ಅದೃಷ್ಟ ಚನ್ನಾಗಿದೆ', offeredIn: 'Google ಈ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ:' },
  ml: { name: 'മലയാളം', searchBtn: 'Google തിരയൽ', luckyBtn: 'എനിക്ക് ഭാഗ്യമുണ്ട്', offeredIn: 'Google ഈ ഭാഷകളിൽ ലഭ്യമാണ്:' },
  pa: { name: 'ਪੰਜਾਬੀ', searchBtn: 'Google ਖੋਜ', luckyBtn: 'ਮੈਂ ਕਿਸਮਤ ਵਾਲਾ ਹਾਂ', offeredIn: 'Google ਇਹਨਾਂ ਵਿੱਚ ਉਪਲਬਧ ਹੈ:' }
};

const LUCKY_PHRASES = [
  "I'm Feeling Lucky",
  "I'm Feeling Artistic",
  "I'm Feeling Playful",
  "I'm Feeling Adventurous",
  "I'm Feeling Curious",
  "I'm Feeling Stellar"
];

const LUCKY_TOPICS = [
  'James Webb Space Telescope discoveries',
  'Google Doodles Archive',
  'Albert Einstein general relativity',
  'Photosynthesis molecular process',
  'Ancient wonders of the world',
  'DeepMind AlphaFold breakthroughs'
];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [safeSearch, setSafeSearch] = useState<boolean>(true);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isLensOpen, setIsLensOpen] = useState(false);
  const [luckyIndex, setLuckyIndex] = useState(0);
  const [locale, setLocale] = useState('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState<string[]>(INITIAL_SEARCH_HISTORY);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync dark class on document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Sync page title
  useEffect(() => {
    if (activeSearch) {
      document.title = `${activeSearch} - Google Search`;
    } else {
      document.title = 'Google';
    }
  }, [activeSearch]);

  const executeSearch = async (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setActiveSearch(trimmed);
    setQuery(trimmed);
    setIsLoading(true);
    setCurrentPage(1);

    // Save to history
    setHistory(prev => [trimmed, ...prev.filter(h => h.toLowerCase() !== trimmed.toLowerCase())].slice(0, 10));

    try {
      // Attempt backend API call first
      const resp = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (resp.ok) {
        const data: SearchResponse = await resp.json();
        setSearchData(data);
      } else {
        throw new Error('API unavailable');
      }
    } catch {
      // Seamless local generator fallback
      const data = generateDynamicSearchResults(trimmed);
      setSearchData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeelingLucky = () => {
    const randomTopic = LUCKY_TOPICS[Math.floor(Math.random() * LUCKY_TOPICS.length)];
    executeSearch(query.trim() || randomTopic);
  };

  const handleVoiceResult = (transcript: string) => {
    setQuery(transcript);
    executeSearch(transcript);
  };

  const handleLensSearch = (searchQuery: string, _imgUrl?: string) => {
    executeSearch(searchQuery);
  };

  const handleRemoveHistory = (item: string) => {
    setHistory(prev => prev.filter(h => h !== item));
  };

  const handleHomeClick = () => {
    setActiveSearch('');
    setQuery('');
    setSearchData(null);
    setActiveTab('all');
  };

  const currentLocale = LOCALES[locale] || LOCALES.en;

  return (
    <div
      id="google-platform-root"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-150 ${
        isDark ? 'bg-[#202124] text-[#e8eaed]' : 'bg-[#ffffff] text-[#202124]'
      }`}
    >
      {/* 1. HOMEPAGE VIEW */}
      {!activeSearch ? (
        <div id="google-home-view" className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <GoogleHeader
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            onSelectApp={(appName) => executeSearch(appName)}
            onImagesClick={() => {
              setActiveTab('images');
              executeSearch('Google Images');
            }}
          />

          {/* Center Main Stage */}
          <main className="flex flex-col items-center justify-center px-4 -mt-16 w-full max-w-2xl mx-auto">
            {/* Google Logo */}
            <GoogleLogo size="normal" className="mb-7" />

            {/* Search Bar */}
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={executeSearch}
              onVoiceClick={() => setIsVoiceOpen(true)}
              onLensClick={() => setIsLensOpen(true)}
              isDark={isDark}
              autoFocus={true}
              history={history}
              onRemoveHistory={handleRemoveHistory}
              onFeelingLucky={handleFeelingLucky}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
              <button
                type="button"
                id="btn-google-search"
                onClick={() => executeSearch(query)}
                className={`text-sm px-4 py-2.5 rounded-md font-normal transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#303134] text-[#e8eaed] hover:bg-[#3c4043] border border-transparent hover:border-[#5f6368]'
                    : 'bg-[#f8f9fa] text-[#3c4043] hover:bg-[#f1f3f4] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-2xs'
                }`}
              >
                {currentLocale.searchBtn}
              </button>

              <button
                type="button"
                id="btn-feeling-lucky"
                onClick={handleFeelingLucky}
                onMouseEnter={() => setLuckyIndex((luckyIndex + 1) % LUCKY_PHRASES.length)}
                className={`text-sm px-4 py-2.5 rounded-md font-normal transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#303134] text-[#e8eaed] hover:bg-[#3c4043] border border-transparent hover:border-[#5f6368]'
                    : 'bg-[#f8f9fa] text-[#3c4043] hover:bg-[#f1f3f4] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-2xs'
                }`}
              >
                {locale === 'en' ? LUCKY_PHRASES[luckyIndex] : currentLocale.luckyBtn}
              </button>
            </div>

            {/* Languages available */}
            <div className="mt-8 text-xs text-center leading-relaxed">
              <span className="text-gray-500 dark:text-gray-400 mr-2">
                {currentLocale.offeredIn}
              </span>
              <div className="inline-flex flex-wrap gap-x-2 gap-y-1 justify-center">
                {Object.entries(LOCALES).map(([key, lang]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLocale(key)}
                    className={`hover:underline cursor-pointer ${
                      locale === key
                        ? 'font-bold text-[#1a0dab] dark:text-[#8ab4f8]'
                        : 'text-[#1a0dab] dark:text-[#8ab4f8]'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </main>

          {/* Footer */}
          <GoogleFooter
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            safeSearch={safeSearch}
            onToggleSafeSearch={() => setSafeSearch(!safeSearch)}
          />
        </div>
      ) : (
        /* 2. SEARCH RESULTS PAGE (SERP) */
        <div id="google-serp-view" className="flex-1 flex flex-col min-h-screen">
          {/* SERP Header with search input & navigation tabs */}
          <SerpHeader
            query={query}
            onQueryChange={setQuery}
            onSearch={executeSearch}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onVoiceClick={() => setIsVoiceOpen(true)}
            onLensClick={() => setIsLensOpen(true)}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            onHomeClick={handleHomeClick}
            history={history}
            onRemoveHistory={handleRemoveHistory}
            safeSearch={safeSearch}
            onToggleSafeSearch={() => setSafeSearch(!safeSearch)}
          />

          {/* Results Main Container */}
          <main className="flex-1 px-4 sm:px-8 sm:ml-32 pt-3 pb-12 max-w-7xl">
            {/* Loading Indicator */}
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#4285F4] animate-bounce" />
                  <span className="w-3 h-3 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-3 h-3 rounded-full bg-[#FBBC05] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="w-3 h-3 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '450ms' }} />
                </div>
                <span className="text-xs text-gray-400">Loading results...</span>
              </div>
            ) : searchData ? (
              <>
                {/* Search result count statistics */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 select-none">
                  About {searchData.totalResults} results ({searchData.searchTime} seconds)
                </div>

                {/* Tab: ALL */}
                {activeTab === 'all' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: AI Overview, Widgets, PAA, Web results */}
                    <div className="lg:col-span-8">
                      {/* Special Interactive Widgets */}
                      {searchData.specialWidget === 'calculator' && (
                        <GoogleCalculator initialExpr={query} isDark={isDark} />
                      )}

                      {searchData.specialWidget === 'weather' && (
                        <GoogleWeatherWidget
                          city={searchData.widgetData?.city || 'San Francisco, CA'}
                          isDark={isDark}
                        />
                      )}

                      {searchData.specialWidget === 'converter' && (
                        <GoogleConverterWidget isDark={isDark} />
                      )}

                      {searchData.specialWidget === 'timer' && (
                        <GoogleTimerWidget isDark={isDark} />
                      )}

                      {searchData.specialWidget === 'dictionary' && (
                        <GoogleDictionaryWidget
                          word={searchData.widgetData?.word || query}
                          isDark={isDark}
                        />
                      )}

                      {(searchData.specialWidget === 'coin_flip' ||
                        searchData.specialWidget === 'roll_die') && (
                        <GoogleCoinDiceWidget
                          type={searchData.specialWidget}
                          isDark={isDark}
                        />
                      )}

                      {/* AI Overview */}
                      {searchData.aiOverview && (
                        <AiOverviewCard data={searchData.aiOverview} isDark={isDark} />
                      )}

                      {/* Mobile Knowledge Graph (placed here on small screens) */}
                      {searchData.knowledgeGraph && (
                        <div className="block lg:hidden mb-6">
                          <KnowledgeGraphCard
                            data={searchData.knowledgeGraph}
                            isDark={isDark}
                            onSearchEntity={executeSearch}
                          />
                        </div>
                      )}

                      {/* People Also Ask */}
                      {searchData.peopleAlsoAsk && searchData.peopleAlsoAsk.length > 0 && (
                        <PeopleAlsoAsk
                          items={searchData.peopleAlsoAsk}
                          isDark={isDark}
                        />
                      )}

                      {/* Web Results */}
                      <div className="space-y-2">
                        {searchData.webResults.map((result) => (
                          <WebResultItem
                            key={result.id}
                            result={result}
                            isDark={isDark}
                          />
                        ))}
                      </div>

                      {/* People Also Search For / Related Searches */}
                      {searchData.relatedSearches && searchData.relatedSearches.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 max-w-2xl">
                          <h3 className="text-base sm:text-lg font-normal mb-4">
                            Related searches
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {searchData.relatedSearches.map((rel, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => executeSearch(rel)}
                                className={`flex items-center gap-3 p-3 rounded-full text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                                  isDark
                                    ? 'bg-[#303134] text-[#8ab4f8] hover:bg-[#3c4043]'
                                    : 'bg-[#f1f3f4] text-[#1a0dab] hover:bg-gray-200'
                                }`}
                              >
                                <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="11" cy="11" r="8" />
                                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <span className="truncate">{rel}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Google Pagination */}
                      <GooglePagination
                        currentPage={currentPage}
                        onPageChange={(p) => {
                          setCurrentPage(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        isDark={isDark}
                      />
                    </div>

                    {/* Right Column: Knowledge Graph on desktop */}
                    <div className="hidden lg:block lg:col-span-4">
                      {searchData.knowledgeGraph && (
                        <KnowledgeGraphCard
                          data={searchData.knowledgeGraph}
                          isDark={isDark}
                          onSearchEntity={executeSearch}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: IMAGES */}
                {activeTab === 'images' && (
                  <ImagesView
                    images={searchData.imageResults}
                    query={query}
                    isDark={isDark}
                  />
                )}

                {/* Tab: VIDEOS */}
                {activeTab === 'videos' && (
                  <VideosView
                    videos={searchData.videoResults}
                    isDark={isDark}
                  />
                )}

                {/* Tab: NEWS */}
                {activeTab === 'news' && (
                  <NewsView
                    news={searchData.newsResults}
                    isDark={isDark}
                  />
                )}

                {/* Tab: MAPS */}
                {activeTab === 'maps' && (
                  <MapsView
                    maps={searchData.mapResults}
                    isDark={isDark}
                  />
                )}

                {/* Tab: SHOPPING */}
                {activeTab === 'shopping' && (
                  <div className="py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div
                          key={item}
                          className={`p-3 rounded-2xl border transition-all ${
                            isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-gray-200 bg-white shadow-xs'
                          }`}
                        >
                          <div className="h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
                            <img
                              src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-xs font-medium truncate mb-1">
                            {query} Premium Edition - Model {item}
                          </h4>
                          <div className="text-sm font-bold text-green-600 mb-1">
                            ${(49 + item * 20).toFixed(2)}
                          </div>
                          <p className="text-[11px] text-gray-400">Free delivery • In stock</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </main>

          {/* SERP Footer */}
          <GoogleFooter
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            safeSearch={safeSearch}
            onToggleSafeSearch={() => setSafeSearch(!safeSearch)}
          />
        </div>
      )}

      {/* Voice Search Modal */}
      <GoogleVoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceResult={handleVoiceResult}
        isDark={isDark}
      />

      {/* Google Lens Modal */}
      <GoogleLensModal
        isOpen={isLensOpen}
        onClose={() => setIsLensOpen(false)}
        onSearchImage={handleLensSearch}
        isDark={isDark}
      />
    </div>
  );
}
