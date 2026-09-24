import React, { useState, useEffect } from "react";
import {
  Infinity,
  Layers,
  Grid,
  Bell,
  ShoppingCart,
  Shield,
  User,
  Globe,
  Search,
  Sparkles,
  Menu,
  Mic,
  Clock,
  Home,
  Bot,
  Video,
  ShoppingBag,
  Mail,
  HardDrive,
  Navigation,
  Newspaper,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Store,
  UserCheck,
  Download,
  Github,
  Settings,
  Cpu,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AppModuleType } from "../types";
import { GithubVercelModal } from "./GithubVercelModal";
import { AVAILABLE_AI_MODELS } from "../data/aiModels";

export const Navbar: React.FC<{ onMobileMenuToggle?: () => void }> = () => {
  const {
    currentModule,
    setCurrentModule,
    language,
    setLanguage,
    currentUser,
    setIsAuthModalOpen,
    isAppLauncherOpen,
    setIsAppLauncherOpen,
    cart,
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isAISettingsModalOpen,
    setIsAISettingsModalOpen,
    selectedAIModel,
    setSearchQuery,
    t,
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>("");
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "numeric",
        month: "short",
        hour12: true,
      };
      setCurrentTime(
        new Intl.DateTimeFormat(
          language === "hi" ? "hi-IN" : "en-IN",
          options
        ).format(now)
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // Voice Search / Voice Assistant handler
  const handleVoiceCommand = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => {
          setIsVoiceListening(true);
        };
        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setVoiceTranscript(text);
          setSearchQuery(text);
          setIsVoiceListening(false);
          setCurrentModule("search");
        };
        recognition.onerror = () => {
          setIsVoiceListening(false);
          // Fallback simulation
          const sample =
            language === "hi" ? "अनंत वीआर 3D स्पेस" : "ANANT VR Space Tour";
          setSearchQuery(sample);
          setCurrentModule("search");
        };
        recognition.onend = () => {
          setIsVoiceListening(false);
        };
        recognition.start();
      } catch {
        setIsVoiceListening(false);
        setSearchQuery("ANANT VR Super Platform");
        setCurrentModule("search");
      }
    } else {
      // simulated speech recognition for browser preview
      setIsVoiceListening(true);
      setTimeout(() => {
        setIsVoiceListening(false);
        setSearchQuery("ANANT VR Gaganyaan 3D");
        setCurrentModule("vr");
      }, 1200);
    }
  };

  const navMenuItems: {
    id: AppModuleType;
    labelEn: string;
    labelHi: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    { id: "home", labelEn: "Home", labelHi: "होम", icon: <Home className="w-4 h-4" /> },
    {
      id: "vr",
      labelEn: "ANANT VR 3D",
      labelHi: "अनंत VR 3D",
      icon: <Sparkles className="w-4 h-4 text-orange-400" />,
      badge: "SPATIAL",
    },
    {
      id: "ai",
      labelEn: "ANANT AI",
      labelHi: "अनंत एआई",
      icon: <Bot className="w-4 h-4" />,
      badge: "Gemini",
    },
    { id: "video", labelEn: "Video 4K", labelHi: "वीडियो 4K", icon: <Video className="w-4 h-4" /> },
    { id: "apps", labelEn: "Apps Store", labelHi: "ऐप्स स्टोर", icon: <Grid className="w-4 h-4" /> },
    {
      id: "shop",
      labelEn: "Shop & UPI",
      labelHi: "शॉपिंग व UPI",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: cart.length > 0 ? `${cart.reduce((s, i) => s + i.quantity, 0)}` : undefined,
    },
    { id: "mail", labelEn: "Webmail", labelHi: "वेबमेल", icon: <Mail className="w-4 h-4" /> },
    { id: "drive", labelEn: "Drive 15GB", labelHi: "क्लाउड ड्राइव", icon: <HardDrive className="w-4 h-4" /> },
    { id: "maps", labelEn: "NavIC Maps", labelHi: "नाविक मैप्स", icon: <Navigation className="w-4 h-4" /> },
    { id: "news", labelEn: "Samachar", labelHi: "समाचार", icon: <Newspaper className="w-4 h-4" /> },
    { id: "dashboard", labelEn: "Dashboard", labelHi: "डैशबोर्ड", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "admin", labelEn: "Admin Command", labelHi: "एडमिन कमांड", icon: <Shield className="w-4 h-4" /> },
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" id="master-header">
      {/* TIER 1: Prominent Master Single-Line Heading with Sovereign Monogram and NO glasses icons */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Main Brand Title & ANANT Sovereign Monogram (मोनो) */}
            <button
              onClick={() => setCurrentModule("home")}
              className="flex items-center gap-3 group cursor-pointer text-left py-1"
              title="अनंत VR सुपर प्लेटफार्म - मुख्य पृष्ठ"
              id="brand-master-heading-btn"
            >
              {/* Sovereign ANANT Monogram (बिना चश्मा आइकन के - विशुद्ध मोनो) */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform p-2">
                  {/* ANANT Sovereign Infinity Loop Monogram */}
                  <svg
                    className="w-6 h-6 text-white drop-shadow-sm"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12c-2-2.5-4-4-6.5-4a4.5 4.5 0 0 0 0 9c2.5 0 4.5-1.5 6.5-4 2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 0-9c-2.5 0-4.5-1.5-6.5 4z" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-950 border border-amber-400 flex items-center justify-center text-[9px] text-amber-300 font-black shadow-xs">
                  <span>अ</span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-base sm:text-xl md:text-2xl tracking-tight text-white leading-tight">
                    {language === "hi" ? "अनंत VR" : "ANANT VR"}
                  </h1>
                  <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                    V1 SPATIAL
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-orange-400 tracking-wide uppercase">
                    {language === "hi" ? "सुपर प्लेटफार्म" : "SUPER PLATFORM"}
                  </span>
                  <span className="text-slate-500 text-xs hidden sm:inline">•</span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 hidden md:inline">
                    {t("Bharat's Sovereign Digital & VR Metaverse", "भारत का संप्रभु वीआर एवं डिजिटल सुपर इकोसिस्टम")}
                  </span>
                </div>
              </div>
            </button>

            {/* Right Corner of Main Heading: Live IST Clock + VR Quick Launch + MIC ICON + SEARCH OPTION */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Live IST Clock */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/90 text-slate-300 text-xs font-mono border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>{currentTime || "IST Live"}</span>
              </div>
              {/* Quick VR Launch Button */}
              <button
                onClick={() => setCurrentModule("vr")}
                id="header-launch-vr-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ${
                  currentModule === "vr"
                    ? "bg-orange-500 text-white shadow-orange-500/30 ring-2 ring-orange-400"
                    : "bg-orange-600 hover:bg-orange-500 text-white"
                }`}
                title="Launch ANANT VR 3D Spatial Tour"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-200" />
                <span className="hidden sm:inline">
                  {language === "hi" ? "VR 3D टूर" : "VR Tour"}
                </span>
              </button>
              {/* MIC ICON */}
              <button
                onClick={handleVoiceCommand}
                id="header-top-voice-mic-btn"
                className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 border border-slate-700 ${
                  isVoiceListening
                    ? "bg-red-600 text-white animate-pulse ring-4 ring-red-400/40"
                    : "bg-slate-800 hover:bg-orange-600 text-orange-400 hover:text-white"
                }`}
                title={t("Voice Search / Command", "आवाज़ से खोजें या निर्देश दें")}
              >
                <Mic className="w-4 h-4" />
              </button>
              {/* SEARCH OPTION AT THE VERY END OF MAIN HEADING */}
              <button
                onClick={() => setCurrentModule("search")}
                id="header-top-search-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer border ${
                  currentModule === "search"
                    ? "bg-orange-500 text-white border-orange-400 ring-2 ring-orange-400/40"
                    : "bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white border-slate-700"
                }`}
                title={t("Sovereign Search Engine", "संप्रभु सर्च इंजन")}
              >
                <Search className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">
                  {language === "hi" ? "सर्च खोज" : "Search"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TIER 2: भाषा, स्टोर, नोटिफिकेशन, सेवाएं, AI इंजन, GitHub/Vercel Export */}
      <div className="bg-white border-b border-slate-200 py-2" id="header-tier-2-toolbar">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            {/* The Toolbar Options: भाषा, स्टोर, नोटिफिकेशन, सेवाएं, AI इंजन, GitHub/Vercel */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* 1. भाषा (Language) */}
              <button
                onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
                id="opt-language-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-orange-300 bg-slate-50 hover:bg-orange-50/50 text-xs font-bold text-slate-800 transition cursor-pointer"
                title={language === "hi" ? "Switch to English" : "हिंदी में बदलें"}
              >
                <Globe className="w-3.5 h-3.5 text-orange-600" />
                <span>{language === "hi" ? "भाषा: हिंदी" : "Language: English"}</span>
              </button>
              {/* 2. स्टोर (Store) */}
              <button
                onClick={() => setCurrentModule("shop")}
                id="opt-store-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  currentModule === "shop" || currentModule === "apps"
                    ? "bg-orange-50 border-orange-300 text-orange-700 font-extrabold"
                    : "bg-slate-50 border-slate-200 hover:border-orange-300 text-slate-800 hover:bg-orange-50/50"
                }`}
                title="ANANT Apps & Shopping Store"
              >
                <Store className="w-3.5 h-3.5 text-orange-600" />
                <span>{t("Store", "स्टोर")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 font-extrabold">
                  {totalCartCount > 0 ? `${totalCartCount}` : "UPI"}
                </span>
              </button>
              {/* 3. नोटिफिकेशन (Notifications) */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  id="opt-notifications-btn"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isNotificationsOpen
                      ? "bg-orange-50 border-orange-300 text-orange-700"
                      : "bg-slate-50 border-slate-200 hover:border-orange-300 text-slate-800 hover:bg-orange-50/50"
                  }`}
                  title="Platform Notifications"
                >
                  <div className="relative">
                    <Bell className="w-3.5 h-3.5 text-orange-600" />
                    {unreadNotifs > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <span>{t("Notifications", "नोटिफिकेशन")}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                    {unreadNotifs > 0 ? unreadNotifs : notifications.length}
                  </span>
                </button>
                {/* Notifications Dropdown Panel */}
                {isNotificationsOpen && (
                  <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-extrabold text-slate-900">
                        {t("ANANT Platform Notifications", "अनंत प्लेटफॉर्म सूचनाएं")}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        {notifications.length} {t("Updates", "अपडेट")}
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100 mt-2 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="py-2.5 text-xs hover:bg-slate-50 rounded-lg px-2 transition"
                        >
                          <div className="font-semibold text-slate-800">{n.title}</div>
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* 4. सेवाएं (Services / App Launcher) */}
              <button
                onClick={() => setIsAppLauncherOpen(!isAppLauncherOpen)}
                id="opt-services-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  isAppLauncherOpen
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "bg-slate-50 border-slate-200 hover:border-orange-300 text-slate-800 hover:bg-orange-50/50"
                }`}
                title="All Sovereign Services & Super Apps"
              >
                <Grid className="w-3.5 h-3.5 text-orange-600" />
                <span>{t("Services", "सेवाएं")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                  13+
                </span>
              </button>
              {/* 5. AI सेटिंग्स (AI Model & Keys) */}
              <button
                onClick={() => setIsAISettingsModalOpen(true)}
                id="opt-ai-settings-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-xs font-bold text-indigo-700 transition cursor-pointer"
                title={t("Configure AI Models, Gemini Default & API Keys", "AI मॉडल, जेमिनी डिफ़ॉल्ट एवं API Key सेटिंग्स")}
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t("AI Engine", "AI इंजन")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                  Gemini
                </span>
              </button>

              {/* 6. GitHub & Vercel Export */}
              <button
                onClick={() => setIsGithubModalOpen(true)}
                id="opt-github-vercel-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition cursor-pointer shadow-xs"
                title={t("Download ZIP for GitHub and Vercel Deploy", "गिटहब और Vercel हेतु जिप कोड डाउनलोड करें")}
              >
                <Github className="w-3.5 h-3.5 text-amber-400" />
                <span>{t("Deploy", "डिप्लॉय")}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold">
                  Vercel
                </span>
              </button>
            </div>
            {/* Right Action Tools: Cart and User Profile */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Cart Drawer Button */}
              <button
                onClick={() => setCurrentModule("shop")}
                id="header-cart-btn"
                className="relative p-1.5 px-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer flex items-center gap-1"
                title="ANANT Shop Cart"
              >
                <ShoppingCart className="w-4 h-4 text-slate-700" />
                {totalCartCount > 0 && (
                  <span className="bg-orange-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.2">
                    {totalCartCount}
                  </span>
                )}
              </button>
              {/* User Avatar / Login */}
              {currentUser ? (
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  id="header-user-profile-btn"
                  className="flex items-center gap-1.5 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition cursor-pointer"
                  title="Citizen Profile"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-slate-200 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden lg:inline max-w-[80px] truncate">
                    {currentUser.name}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  id="header-sign-in-btn"
                  className="px-3 py-1 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  {t("Sign In", "लॉग इन")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TIER 3: Secondary Navigation Menu Strip Directly Beneath */}
      <div className="bg-slate-50/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs font-semibold select-none">
            {navMenuItems.map((item) => {
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentModule(item.id)}
                  id={`nav-menu-${item.id}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm font-bold ring-2 ring-orange-500/20"
                      : "bg-white text-slate-700 hover:bg-slate-200/80 hover:text-slate-950 border border-slate-200/70"
                  }`}
                >
                  <span className={isActive ? "text-orange-400" : "text-slate-500"}>
                    {item.icon}
                  </span>
                  <span>{t(item.labelEn, item.labelHi)}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Github & Vercel ZIP Export Modal */}
      <GithubVercelModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </header>
  );
};
