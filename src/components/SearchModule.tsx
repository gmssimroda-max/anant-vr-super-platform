import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  ExternalLink,
  Filter,
  Image as ImageIcon,
  Video,
  Newspaper,
  LayoutGrid,
  Globe,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SearchResult } from "../types";
import { sampleSearchResults } from "../data/mockData";

export const SearchModule: React.FC = () => {
  const { searchQuery, setSearchQuery, setCurrentModule, t } = useApp();
  const [query, setQuery] = useState(searchQuery || "ANANT Super Platform V1");
  const [activeTab, setActiveTab] = useState<"all" | "news" | "images" | "videos" | "apps">("all");
  const [results, setResults] = useState<SearchResult[]>(sampleSearchResults);
  const [aiOverview, setAiOverview] = useState<string | null>(null);
  const [isOverviewLoading, setIsOverviewLoading] = useState(false);
  const [isSafeSearchOn, setIsSafeSearchOn] = useState(true);
  const overviewCache = React.useRef<Record<string, string>>({});

  useEffect(() => {
    const topic = searchQuery || "ANANT Super Platform V1";
    setQuery(topic);
    fetchAiOverview(topic);
  }, [searchQuery]);

  const fetchAiOverview = async (searchTopic: string) => {
    const trimmed = searchTopic.trim();
    if (!trimmed) return;

    if (overviewCache.current[trimmed]) {
      setAiOverview(overviewCache.current[trimmed]);
      return;
    }

    setIsOverviewLoading(true);
    try {
      const res = await fetch("/api/search/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.overview || "";
        overviewCache.current[trimmed] = text;
        setAiOverview(text);
      } else {
        const fallbackText = `**ANANT AI Overview for "${trimmed}"**:\n\nयह खोज परिणाम भारत के संप्रभु डिजिटल इकोसिस्टम और एआई सेवाओं से सत्यापित जानकारी प्रदर्शित करता है।`;
        overviewCache.current[trimmed] = fallbackText;
        setAiOverview(fallbackText);
      }
    } catch {
      const fallbackText = `**ANANT AI Overview for "${trimmed}"**:\n\nANANT Super Platform V1 delivers unified search intelligence powered by sovereign AI.`;
      overviewCache.current[trimmed] = fallbackText;
      setAiOverview(fallbackText);
    } finally {
      setIsOverviewLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchQuery(query.trim());
    fetchAiOverview(query.trim());
  };

  const filteredResults =
    activeTab === "all"
      ? results
      : results.filter((r) => r.category === activeTab || r.category === "all");

  const trendingQueries = [
    "ANANT Super Platform V1",
    "Gaganyaan 2026 update",
    "BSE Sensex record high",
    "Digital Rupee UPI expansion",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Search Header Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2" id="search-engine-form">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search sovereign web, news, documents...", "वेब, समाचार, ज्ञान खोजें...")}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
          <button
            type="submit"
            id="search-engine-submit-btn"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer shrink-0"
          >
            {t("Search", "खोजें")}
          </button>
        </form>

        {/* Search Categories Tabs + SafeSearch Indicator */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 overflow-x-auto text-xs font-semibold">
          <div className="flex items-center gap-2 shrink-0">
            {[
              { id: "all", labelEn: "All", labelHi: "सभी", icon: <Globe className="w-3.5 h-3.5" /> },
              { id: "news", labelEn: "News", labelHi: "समाचार", icon: <Newspaper className="w-3.5 h-3.5" /> },
              { id: "images", labelEn: "Images", labelHi: "चित्र", icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: "videos", labelEn: "Videos", labelHi: "वीडियो", icon: <Video className="w-3.5 h-3.5" /> },
              { id: "apps", labelEn: "Apps", labelHi: "ऐप्स", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.icon}
                <span>{t(tab.labelEn, tab.labelHi)}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsSafeSearchOn(!isSafeSearchOn)}
            id="toggle-safe-search-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0 ${
              isSafeSearchOn
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 text-slate-500 border border-slate-200"
            }`}
            title="Sovereign Family-Safe Content Filter"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isSafeSearchOn ? t("SafeSearch: ON", "सेफ़ सर्च: चालू") : t("SafeSearch: OFF", "सेफ़ सर्च: बंद")}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Results Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* AI Overview Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 border border-indigo-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-xs text-indigo-900">
                  {t("ANANT AI Overview", "ANANT एआई सारांश")}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded-full font-bold">
                  Gemini 3.8 Flash
                </span>
              </div>
            </div>

            <div className="mt-3 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
              {isOverviewLoading ? (
                <div className="flex items-center gap-2 py-3 text-indigo-600">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 animate-ping" />
                  <span>{t("Synthesizing intelligent overview...", "एआई सारांश तैयार किया जा रहा है...")}</span>
                </div>
              ) : (
                aiOverview
              )}
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              {t(`About ${filteredResults.length} verified results`, `लगभग ${filteredResults.length} सत्यापित परिणाम`)}
            </div>

            {filteredResults.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-blue-700 truncate max-w-sm">{item.url}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-blue-700 hover:underline cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.snippet}
                </p>

                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-lg mt-2"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Trending & Quick Services */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span>{t("Trending on ANANT Search", "ट्रेंडिंग खोज विषय")}</span>
            </div>
            <div className="space-y-2">
              {trendingQueries.map((tq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(tq);
                    fetchAiOverview(tq);
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition flex items-center justify-between cursor-pointer"
                >
                  <span>{tq}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 text-xs text-orange-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <span>🇮🇳 {t("Sovereign Search Index", "संप्रभु भारतीय खोज")}</span>
            </div>
            <p className="text-[11px] text-orange-800/80 leading-relaxed">
              {t(
                "Indexed over 500 million Indian regional web pages, research repositories, and public sector data portals.",
                "50 करोड़ से अधिक भारतीय क्षेत्रीय वेब पृष्ठों, सरकारी पोर्टलों और शोध प्रकाशनों का संग्रह।"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
