import React, { useState } from "react";
import {
  LayoutGrid,
  Star,
  Download,
  Check,
  Search,
  Sparkles,
  CreditCard,
  Sprout,
  Code2,
  HeartPulse,
  BookOpen,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AppItem } from "../types";
import { sampleApps } from "../data/mockData";

export const AppsModule: React.FC = () => {
  const { installedAppIds, toggleInstallApp, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-white" />;
      case "Sprout":
        return <Sprout className="w-6 h-6 text-white" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-white" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-white" />;
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-white" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-white" />;
      default:
        return <LayoutGrid className="w-6 h-6 text-white" />;
    }
  };

  const filteredApps = sampleApps.filter((app) => {
    const matchesCat =
      selectedCategory === "all" || app.category === selectedCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.nameHi.includes(searchFilter) ||
      app.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Featured App Spotlight Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl border border-emerald-700/50">
        <div className="max-w-xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("Editor's Choice 2026", "संपादक की पहली पसंद")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ANANT Pay & UPI 3.0
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {t(
              "Zero fee sovereign peer-to-peer payments, Digital Rupee interoperability, and offline sound-box validation.",
              "शून्य शुल्क, सुरक्षित यूपीआई, डिजिटल रुपया वॉलेट एवं ऑफ़लाइन भुगतान सत्यापन।"
            )}
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => toggleInstallApp("app_1")}
              id="install-featured-app-btn"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
            >
              {installedAppIds.includes("app_1") ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t("Installed & Active", "सक्रिय है")}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{t("Install App (24 MB)", "इंस्टॉल करें")}</span>
                </>
              )}
            </button>
            <span className="text-xs text-emerald-200">50M+ Downloads</span>
          </div>
        </div>
      </div>

      {/* App Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={t("Search apps and utilities...", "ऐप्स खोजें...")}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          {[
            { id: "all", labelEn: "All", labelHi: "सभी" },
            { id: "finance", labelEn: "Finance", labelHi: "वित्त" },
            { id: "utilities", labelEn: "Agri & Utility", labelHi: "कृषि व जनसेवा" },
            { id: "tools", labelEn: "Dev Tools", labelHi: "टूल्स" },
            { id: "social", labelEn: "Culture & Health", labelHi: "स्वास्थ्य व संस्कृति" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-emerald-700 text-white font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t(cat.labelEn, cat.labelHi)}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => {
          const isInstalled = installedAppIds.includes(app.id);
          return (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${app.iconBg}`}
                >
                  {getAppIcon(app.iconName)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate">
                    {t(app.name, app.nameHi)}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {app.developer}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-0.5" />
                      {app.rating}
                    </span>
                    <span>·</span>
                    <span>{app.downloads}</span>
                    <span>·</span>
                    <span>{app.size}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {t(app.description, app.descriptionHi)}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sovereign Verified</span>
                </div>

                <button
                  onClick={() => toggleInstallApp(app.id)}
                  id={`app-action-${app.id}`}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    isInstalled
                      ? "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  }`}
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("Installed", "इंस्टॉल है")}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{t("Install", "इंस्टॉल")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
