import React from "react";
import {
  Home,
  Bot,
  Search,
  Video,
  LayoutGrid,
  ShoppingBag,
  Mail,
  HardDrive,
  MapPin,
  Newspaper,
  User,
  ShieldAlert,
  X,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AppModuleType } from "../types";

export const AppLauncherModal: React.FC = () => {
  const {
    isAppLauncherOpen,
    setIsAppLauncherOpen,
    setCurrentModule,
    currentModule,
    t,
  } = useApp();

  if (!isAppLauncherOpen) return null;

  const apps: {
    id: AppModuleType;
    labelEn: string;
    labelHi: string;
    descEn: string;
    descHi: string;
    icon: React.ReactNode;
    color: string;
    badge?: string;
  }[] = [
    {
      id: "home",
      labelEn: "ANANT Home",
      labelHi: "होम पोर्टल",
      descEn: "Unified ecosystem dashboard",
      descHi: "केंद्रीय डिजिटल पोर्टल",
      icon: <Home className="w-5 h-5" />,
      color: "bg-orange-500 text-white",
    },
    {
      id: "vr",
      labelEn: "ANANT VR 3D",
      labelHi: "अनंत VR 3D",
      descEn: "360° Spatial & Metaverse",
      descHi: "360° स्पेसियल व मेटावर्स",
      icon: <Sparkles className="w-5 h-5 text-orange-200" />,
      color: "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white",
      badge: "SPATIAL",
    },
    {
      id: "ai",
      labelEn: "ANANT AI",
      labelHi: "अनंत एआई",
      descEn: "Gemini 3.8 Flash intelligence",
      descHi: "बुद्धिमान द्विभाषी सहायक",
      icon: <Bot className="w-5 h-5" />,
      color: "bg-indigo-600 text-white",
      badge: "Gemini",
    },
    {
      id: "search",
      labelEn: "ANANT Search",
      labelHi: "वेब खोज",
      descEn: "Instant search & AI overview",
      descHi: "सटीक खोज एवं सारांश",
      icon: <Search className="w-5 h-5" />,
      color: "bg-blue-600 text-white",
    },
    {
      id: "video",
      labelEn: "ANANT Video",
      labelHi: "वीडियो व रील्स",
      descEn: "Streaming & shorts",
      descHi: "स्ट्रीमिंग व शॉर्ट्स",
      icon: <Video className="w-5 h-5" />,
      color: "bg-red-600 text-white",
    },
    {
      id: "apps",
      labelEn: "App Store",
      labelHi: "ऐप स्टोर",
      descEn: "Indian software ecosystem",
      descHi: "स्वदेशी डिजिटल ऐप्स",
      icon: <LayoutGrid className="w-5 h-5" />,
      color: "bg-emerald-600 text-white",
    },
    {
      id: "shop",
      labelEn: "ANANT Shop",
      labelHi: "शॉपिंग स्टोर",
      descEn: "Handcrafted & Tech in ₹",
      descHi: "स्वदेशी व आधुनिक उत्पाद",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "bg-amber-600 text-white",
    },
    {
      id: "mail",
      labelEn: "ANANT Mail",
      labelHi: "वेब मेल",
      descEn: "Encrypted sovereign email",
      descHi: "सुरक्षित निजी मेल",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-sky-600 text-white",
    },
    {
      id: "drive",
      labelEn: "ANANT Drive",
      labelHi: "क्लाउड ड्राइव",
      descEn: "15 GB high-speed storage",
      descHi: "15 GB सुरक्षित क्लाउड स्टोरेज",
      icon: <HardDrive className="w-5 h-5" />,
      color: "bg-teal-600 text-white",
    },
    {
      id: "maps",
      labelEn: "ANANT Maps",
      labelHi: "मानचित्र व नेविगेशन",
      descEn: "Routes & POIs across Bharat",
      descHi: "मार्ग, नेविगेशन व स्थान",
      icon: <MapPin className="w-5 h-5" />,
      color: "bg-emerald-700 text-white",
    },
    {
      id: "news",
      labelEn: "Samachar (News)",
      labelHi: "समाचार",
      descEn: "National & global headlines",
      descHi: "ताज़ा राष्ट्रीय व वैश्विक खबरें",
      icon: <Newspaper className="w-5 h-5" />,
      color: "bg-rose-600 text-white",
    },
    {
      id: "dashboard",
      labelEn: "User Profile",
      labelHi: "यूजर डैशबोर्ड",
      descEn: "Activity & storage controls",
      descHi: "खाता व गतिविधि विवरण",
      icon: <User className="w-5 h-5" />,
      color: "bg-purple-600 text-white",
    },
    {
      id: "admin",
      labelEn: "Admin Panel",
      labelHi: "एडमिन पैनल",
      descEn: "RBAC, metrics & logs",
      descHi: "सिस्टम नियंत्रण व ऑडिट",
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "bg-slate-800 text-white",
      badge: "RBAC",
    },
  ];

  const handleSelect = (id: AppModuleType) => {
    setCurrentModule(id);
    setIsAppLauncherOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end sm:pr-8 pt-18 p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        id="app-launcher-modal"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm tracking-tight">
              {t("ANANT Super Services", "ANANT सुपर सेवाएं")}
            </span>
            <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-orange-100 text-orange-700">
              V1 Ecosystem
            </span>
          </div>
          <button
            onClick={() => setIsAppLauncherOpen(false)}
            id="close-launcher-btn"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
          {apps.map((app) => {
            const isCurrent = currentModule === app.id;
            return (
              <button
                key={app.id}
                onClick={() => handleSelect(app.id)}
                id={`launcher-item-${app.id}`}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer group ${
                  isCurrent
                    ? "bg-orange-50/60 border-orange-300 ring-2 ring-orange-500/20"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                {app.badge && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                    {app.badge}
                  </span>
                )}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform ${app.color}`}
                >
                  {app.icon}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition">
                  {t(app.labelEn, app.labelHi)}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {t(app.descEn, app.descHi)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-500">
          <span>{t("All sovereign modules interconnected", "सभी मॉड्यूल एक साथ जुड़े हैं")}</span>
          <span className="font-semibold text-orange-600">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
