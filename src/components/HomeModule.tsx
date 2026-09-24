import React, { useState } from "react";
import {
  Infinity,
  Sparkles,
  Search,
  Bot,
  Video,
  LayoutGrid,
  ShoppingBag,
  Mail,
  HardDrive,
  MapPin,
  Newspaper,
  User,
  ShieldCheck,
  TrendingUp,
  CloudSun,
  ArrowRight,
  Flame,
  Play,
  Download,
  CheckCircle,
  X,
  Compass,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AppModuleType } from "../types";
import { sampleVideos, sampleApps, sampleProducts } from "../data/mockData";
import { sampleVRDestinations } from "../data/vrData";
import { downloadModulePackage } from "../utils/zipExport";

export const HomeModule: React.FC = () => {
  const { setCurrentModule, setSearchQuery, t, setActiveVideo, addToCart } =
    useApp();
  const [localSearch, setLocalSearch] = useState("");
  const [activeCityWeather, setActiveCityWeather] = useState("Delhi");
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [downloadingServiceId, setDownloadingServiceId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownloadService = async (
    e: React.MouseEvent,
    svcId: string,
    title: string,
    desc: string
  ) => {
    e.stopPropagation();
    try {
      setDownloadingServiceId(svcId);
      await downloadModulePackage(svcId, title, desc);
      setDownloadSuccessId(svcId);
      setTimeout(() => setDownloadSuccessId(null), 2500);
    } catch {
      // fallback
    } finally {
      setDownloadingServiceId(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setCurrentModule("search");
    }
  };

  const handleAiQuickAsk = (promptText: string) => {
    setSearchQuery(promptText);
    setCurrentModule("ai");
  };

  const weatherData: Record<
    string,
    { temp: string; cond: string; air: string }
  > = {
    Delhi: { temp: "29°C", cond: "Clear Sky", air: "AQI 142 (Moderate)" },
    Mumbai: { temp: "31°C", cond: "Humid Breezes", air: "AQI 88 (Good)" },
    Bengaluru: { temp: "24°C", cond: "Pleasant Rain", air: "AQI 45 (Clean)" },
  };

  const coreServices: {
    id: AppModuleType;
    titleEn: string;
    titleHi: string;
    tagEn: string;
    tagHi: string;
    icon: React.ReactNode;
    color: string;
    textColor: string;
    badge?: string;
  }[] = [
    {
      id: "vr",
      titleEn: "ANANT VR 3D",
      titleHi: "अनंत VR 3D",
      tagEn: "360° Spatial & Cultural Metaverse",
      tagHi: "गगनयान कॉकपिट, अयोध्या व 3D टूर",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-600",
      textColor: "text-purple-600",
      badge: "SPATIAL 4K",
    },
    {
      id: "ai",
      titleEn: "ANANT AI",
      titleHi: "अनंत एआई",
      tagEn: "Gemini 3.8 Flash Bilingual Assistant",
      tagHi: "द्विभाषी बुद्धिमत्ता, कोडिंग व ज्ञान",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
      badge: "Gemini AI",
    },
    {
      id: "search",
      titleEn: "ANANT Search",
      titleHi: "वेब व ज्ञान खोज",
      tagEn: "Real-time search with AI overview",
      tagHi: "सटीक परिणाम एवं एआई सारांश",
      icon: <Search className="w-6 h-6" />,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: "video",
      titleEn: "ANANT Video",
      titleHi: "वीडियो व रील्स",
      tagEn: "4K documentaries, education & cinema",
      tagHi: "शैक्षिक, तकनीकी व लघु वीडियो",
      icon: <Video className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600",
    },
    {
      id: "apps",
      titleEn: "ANANT Store",
      titleHi: "ऐप स्टोर",
      tagEn: "Curated Indian super app ecosystem",
      tagHi: "स्वदेशी ऐप्स, उपयोगिता एवं सुरक्षा",
      icon: <LayoutGrid className="w-6 h-6" />,
      color: "bg-emerald-600",
      textColor: "text-emerald-600",
    },
    {
      id: "shop",
      titleEn: "ANANT Shop",
      titleHi: "शॉपिंग स्टोर",
      tagEn: "Artisan crafts & tech gear in ₹",
      tagHi: "स्वदेशी उत्पाद, हथकरघा व गैजेट्स",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-amber-600",
      textColor: "text-amber-600",
    },
    {
      id: "mail",
      titleEn: "ANANT Mail",
      titleHi: "वेब मेल",
      tagEn: "Encrypted, sovereign communication",
      tagHi: "सुरक्षित भारतीय निजी ईमेल",
      icon: <Mail className="w-6 h-6" />,
      color: "bg-sky-600",
      textColor: "text-sky-600",
    },
    {
      id: "drive",
      titleEn: "ANANT Drive",
      titleHi: "क्लाउड ड्राइव",
      tagEn: "15 GB free high-speed cloud storage",
      tagHi: "15 GB सुरक्षित क्लाउड भंडारण",
      icon: <HardDrive className="w-6 h-6" />,
      color: "bg-teal-600",
      textColor: "text-teal-600",
      badge: "15 GB Free",
    },
    {
      id: "maps",
      titleEn: "ANANT Maps",
      titleHi: "मानचित्र",
      tagEn: "Smart navigation & points of interest",
      tagHi: "मार्ग, मेट्रो, पेट्रोल पंप व अस्पताल",
      icon: <MapPin className="w-6 h-6" />,
      color: "bg-emerald-700",
      textColor: "text-emerald-700",
    },
    {
      id: "news",
      titleEn: "Samachar",
      titleHi: "समाचार",
      tagEn: "National & global verified headlines",
      tagHi: "सत्यापित ताज़ा राष्ट्रीय समाचार",
      icon: <Newspaper className="w-6 h-6" />,
      color: "bg-rose-600",
      textColor: "text-rose-600",
    },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Hero Super Portal Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-slate-700/50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-orange-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {t("ANANT Super Platform V1 Ecosystem", "अनंत सुपर प्लेटफॉर्म V1 इकोसिस्टम")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t("One Sovereign Platform.", "एक संपूर्ण संप्रभु प्लेटफॉर्म।")}
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-indigo-300 bg-clip-text text-transparent">
              {t("Infinite Possibilities.", "अनंत संभावनाएं।")}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t(
              "Experience unified AI, Web Search, Streaming, Cloud Storage, Communication, and Digital Commerce — built for the next billion users.",
              "एआई बुद्धिमत्ता, खोज, वीडियो, क्लाउड स्टोरेज, ई-कॉमर्स और ऐप्स का एक ही शक्तिशाली स्थान पर सहज अनुभव।"
            )}
          </p>

          {/* Unified Global Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="pt-2 max-w-2xl mx-auto"
            id="home-search-form"
          >
            <div className="relative flex items-center shadow-2xl rounded-2xl bg-white p-1.5 border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t(
                  "Search web or ask ANANT AI anything (e.g. Chandrayaan mission, Python code)...",
                  "वेब खोजें या ANANT AI से कुछ भी पूछें (उदा. चंद्रयान मिशन, कोडिंग, मौसम)..."
                )}
                className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                id="home-search-btn"
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>{t("Search", "खोजें")}</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* Quick AI Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">
              {t("Trending AI Prompts:", "ट्रेंडिंग प्रश्न:")}
            </span>
            {[
              "भारत का स्पेस स्टेशन 2028",
              "Python vs Rust comparison",
              "Startups in Bharat 2026",
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleAiQuickAsk(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 text-[11px] transition cursor-pointer"
              >
                🤖 {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Market & Weather Ticker Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Market Widget - Clickable */}
        <button
          onClick={() => setIsMarketModalOpen(true)}
          id="home-market-widget-btn"
          className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-between text-left transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">
                BSE SENSEX & NIFTY 50
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span>84,210.40 (+342.15 pts / +0.41%)</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold group-hover:bg-emerald-200">
            {t("View Trends", "विवरण")}
          </span>
        </button>

        {/* Weather Widget - Clickable */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <button
            onClick={() => setIsWeatherModalOpen(true)}
            id="home-weather-widget-btn"
            className="flex items-center gap-3 text-left cursor-pointer group flex-1"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span>{activeCityWeather}</span>
                <span className="text-slate-400">·</span>
                <span className="text-orange-600">
                  {weatherData[activeCityWeather]?.temp}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                {weatherData[activeCityWeather]?.cond} ({t("Forecast", "5-दिन पूर्वानुमान")})
              </div>
            </div>
          </button>
          <div className="flex gap-1 text-[10px]">
            {Object.keys(weatherData).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCityWeather(city)}
                className={`px-1.5 py-0.5 rounded font-semibold cursor-pointer ${
                  activeCityWeather === city
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {city[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Sovereign Security & Cloud Sync Status */}
        <button
          onClick={() => setCurrentModule("dashboard")}
          id="home-security-status-btn"
          className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-between text-left transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">
                {t("Sovereign Cloud & Security", "क्लाउड व सुरक्षा स्थिति")}
              </div>
              <div className="text-[11px] text-slate-500">
                {t("TLS 1.3 · RBAC Active · 15 GB Drive", "TLS 1.3 · 15 GB स्टोरेज")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ready</span>
          </div>
        </button>
      </div>

      {/* Featured Showcase: ANANT VR Super Platform (3D Spatial Metaverse) */}
      <section className="bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-900/60 shadow-xl relative overflow-hidden space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
              <Sparkles className="w-4 h-4" />
              <span>{t("ANANT VR Super Platform Feature", "अनंत VR सुपर प्लेटफॉर्म विशेष")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t("Explore India in 360° High-Fidelity Virtual Reality", "360° वर्चुअल रियलिटी में भारत का अद्भुत अनुभव")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t(
                "Interactive spatial walkthroughs with 3D audio, VR headset split-screen, and educational hotspots.",
                "इसरो गगनयान, श्री राम मंदिर, काशी घाट और वर्चुअल साइंस लैब का इमर्सिव स्पेसियल टूर।"
              )}
            </p>
          </div>

          <button
            onClick={() => setCurrentModule("vr")}
            id="home-open-vr-module-btn"
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-600/30 transition cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <Sparkles className="w-4 h-4 text-orange-200" />
            <span>{t("Launch VR Metaverse", "VR 3D टूर शुरू करें")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* VR Quick Destination Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {sampleVRDestinations.slice(0, 4).map((dest) => (
            <button
              key={dest.id}
              onClick={() => setCurrentModule("vr")}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] text-left cursor-pointer border border-white/10 hover:border-orange-400 transition transform hover:-translate-y-1"
            >
              <img
                src={dest.thumbnail}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-600 text-white self-start mb-1">
                  {dest.category}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {t(dest.title, dest.titleHi)}
                </h4>
                <div className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <Compass className="w-3 h-3 text-orange-400" />
                  <span>360° 4K Tour</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 9 Core Ecosystem Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t("ANANT Digital Services", "ANANT डिजिटल सेवाएं")}
            </h2>
            <p className="text-xs text-slate-500">
              {t(
                "Access all interconnected modules of the super platform",
                "सुपर प्लेटफॉर्म के सभी एकीकृत मॉड्यूल्स तक त्वरित पहुंच"
              )}
            </p>
          </div>
          <span className="text-xs font-semibold text-orange-600">
            9 Core Services
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreServices.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setCurrentModule(svc.id)}
              id={`service-card-${svc.id}`}
              className="relative p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5 transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform ${svc.color}`}
                  >
                    {svc.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {svc.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                        {svc.badge}
                      </span>
                    )}
                    {/* Download option for each menu / service item */}
                    <button
                      type="button"
                      onClick={(e) =>
                        handleDownloadService(
                          e,
                          svc.id,
                          language === "hi" ? svc.titleHi : svc.titleEn,
                          language === "hi" ? svc.tagHi : svc.tagEn
                        )
                      }
                      id={`download-service-btn-${svc.id}`}
                      className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-xs ${
                        downloadSuccessId === svc.id
                          ? "bg-emerald-500 text-white border-emerald-600 scale-105"
                          : downloadingServiceId === svc.id
                          ? "bg-orange-500 text-white border-orange-600 animate-pulse"
                          : "bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-600 border-slate-200 hover:border-orange-200"
                      }`}
                      title={t("Download Service Package", "सर्विस पैकेज डाउनलोड करें")}
                    >
                      {downloadSuccessId === svc.id ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                          <span className="text-[10px] hidden sm:inline font-bold">
                            {t("Saved", "डाउनलोड")}
                          </span>
                        </>
                      ) : downloadingServiceId === svc.id ? (
                        <>
                          <Download className="w-3.5 h-3.5 animate-bounce" />
                          <span className="text-[10px] hidden sm:inline font-bold">
                            {t("...", "पैकिंग...")}
                          </span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-medium">
                            {t("Download", "डाउनलोड")}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition">
                  {t(svc.titleEn, svc.titleHi)}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t(svc.tagEn, svc.tagHi)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-orange-600">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>{t("Open Service", "खोलें")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-normal">
                  v1.0.0
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Spotlight: Trending Videos & Apps Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Spotlight */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-800 text-sm">
                {t("Trending on ANANT Video", "ANANT वीडियो पर ट्रेंडिंग")}
              </h3>
            </div>
            <button
              onClick={() => setCurrentModule("video")}
              className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
            >
              {t("View All", "सभी देखें")} →
            </button>
          </div>

          <div className="space-y-3">
            {sampleVideos.slice(0, 2).map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setCurrentModule("video");
                }}
                className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
              >
                <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-bold">
                    {vid.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 line-clamp-2 transition">
                    {t(vid.title, vid.titleHi)}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {vid.channel} · {vid.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Spotlight */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-800 text-sm">
                {t("ANANT Shop Featured", "ANANT शॉप विशेष")}
              </h3>
            </div>
            <button
              onClick={() => setCurrentModule("shop")}
              className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
            >
              {t("Visit Store", "दुकान देखें")} →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sampleProducts.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/20 transition group"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                  referrerPolicy="no-referrer"
                />
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                  {t(prod.name, prod.nameHi)}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-extrabold text-slate-900">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="p-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-2 cursor-pointer transition"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive BSE / NIFTY Market Insights Modal */}
      {isMarketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {t("Indian Financial Markets & Indices", "भारतीय वित्तीय बाजार एवं सूचकांक")}
                  </h3>
                  <p className="text-xs text-slate-500">BSE & NSE Real-time Data Feed · IST</p>
                </div>
              </div>
              <button
                onClick={() => setIsMarketModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "BSE SENSEX", val: "84,210.40", chg: "+342.15 (+0.41%)", high: "84,500.10", low: "83,920.00" },
                { name: "NIFTY 50", val: "25,790.95", chg: "+98.40 (+0.38%)", high: "25,850.00", low: "25,680.10" },
                { name: "GOLD (10g 24K)", val: "₹76,450", chg: "+₹220 (+0.29%)", high: "₹76,800", low: "₹76,200" },
                { name: "RBI DIGITAL RUPEE (e₹)", val: "₹1.00", chg: "CBDC Sovereign Peg", high: "Instant UPI", low: "0 Fee" },
              ].map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500">{m.name}</div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">{m.val}</div>
                  <div className="text-xs font-semibold text-emerald-600 mt-0.5">{m.chg}</div>
                  <div className="text-[10px] text-slate-400 mt-2 flex justify-between">
                    <span>H: {m.high}</span>
                    <span>L: {m.low}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold">UPI 2.0 & e-Rupee Ecosystem:</span>
              <p className="text-[11px] text-amber-800">
                Connected to National Payments Corporation of India (NPCI) gateway for instant zero-charge merchant settlements.
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setIsMarketModalOpen(false);
                  setCurrentModule("shop");
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                {t("Open ANANT Shop & Pay via UPI", "शॉपिंग करें व UPI से भुगतान करें")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 5-Day Weather Forecast Modal */}
      {isWeatherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {t(`Weather Forecast · ${activeCityWeather}`, `मौसम पूर्वानुमान · ${activeCityWeather}`)}
                  </h3>
                  <p className="text-xs text-slate-500">India Meteorological Department (IMD) Live Satellite Feed</p>
                </div>
              </div>
              <button
                onClick={() => setIsWeatherModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Selector Pills */}
            <div className="flex gap-2">
              {Object.keys(weatherData).map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCityWeather(city)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                    activeCityWeather === city
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* 5-Day Outlook */}
            <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl p-3 border border-slate-200">
              {[
                { day: "Today", temp: weatherData[activeCityWeather].temp, cond: weatherData[activeCityWeather].cond, rain: "10%" },
                { day: "Tomorrow", temp: "28°C", cond: "Partly Cloudy", rain: "25%" },
                { day: "Wednesday", temp: "30°C", cond: "Sunny Breezes", rain: "5%" },
                { day: "Thursday", temp: "27°C", cond: "Scattered Rain", rain: "65%" },
                { day: "Friday", temp: "26°C", cond: "Pleasant", rain: "15%" },
              ].map((f, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 w-24">{f.day}</span>
                  <span className="text-slate-500 flex-1">{f.cond}</span>
                  <span className="text-slate-400 text-[11px] mr-3">Rain: {f.rain}</span>
                  <span className="font-extrabold text-slate-900">{f.temp}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>AQI: {weatherData[activeCityWeather].air}</span>
              <button
                onClick={() => {
                  setIsWeatherModalOpen(false);
                  setCurrentModule("maps");
                }}
                className="text-orange-600 font-bold hover:underline cursor-pointer"
              >
                {t("View Radar on Maps →", "नक्शे पर रडार देखें →")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
