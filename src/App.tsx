/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { AppLauncherModal } from "./components/AppLauncherModal";
import { AuthModal } from "./components/AuthModal";
import { ProfileUpdateModal } from "./components/ProfileUpdateModal";
import { AISettingsModal } from "./components/AISettingsModal";
import { HomeModule } from "./components/HomeModule";
import { VRModule } from "./components/VRModule";
import { AIModule } from "./components/AIModule";
import { SearchModule } from "./components/SearchModule";
import { VideoModule } from "./components/VideoModule";
import { AppsModule } from "./components/AppsModule";
import { ShopModule } from "./components/ShopModule";
import { MailModule } from "./components/MailModule";
import { DriveModule } from "./components/DriveModule";
import { MapsModule } from "./components/MapsModule";
import { NewsModule } from "./components/NewsModule";
import { DashboardModule } from "./components/DashboardModule";
import {
  Home,
  Sparkles,
  Bot,
  Search,
  Video,
  ShoppingBag,
  LayoutGrid,
  User,
  ShieldCheck,
  Globe2,
  Heart,
} from "lucide-react";
import { AppModuleType } from "./types";

const MainContent: React.FC = () => {
  const { currentModule, setCurrentModule, t } = useApp();

  const renderModule = () => {
    switch (currentModule) {
      case "home":
        return <HomeModule />;
      case "vr":
        return <VRModule />;
      case "ai":
        return <AIModule />;
      case "search":
        return <SearchModule />;
      case "video":
        return <VideoModule />;
      case "apps":
        return <AppsModule />;
      case "shop":
        return <ShopModule />;
      case "mail":
        return <MailModule />;
      case "drive":
        return <DriveModule />;
      case "maps":
        return <MapsModule />;
      case "news":
        return <NewsModule />;
      case "dashboard":
        return <DashboardModule />;
      case "admin":
        return <DashboardModule initialTab="admin" />;
      default:
        return <HomeModule />;
    }
  };

  const mobileNavItems: {
    id: AppModuleType;
    labelEn: string;
    labelHi: string;
    icon: React.ReactNode;
  }[] = [
    { id: "home", labelEn: "Home", labelHi: "होम", icon: <Home className="w-5 h-5" /> },
    { id: "vr", labelEn: "VR 3D", labelHi: "VR 3D", icon: <Sparkles className="w-5 h-5 text-orange-400" /> },
    { id: "ai", labelEn: "AI", labelHi: "एआई", icon: <Bot className="w-5 h-5" /> },
    { id: "search", labelEn: "Search", labelHi: "खोज", icon: <Search className="w-5 h-5" /> },
    { id: "shop", labelEn: "Shop", labelHi: "शॉप", icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Module Render Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-5 pb-20 sm:pb-8">
        {renderModule()}
      </main>

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentModule(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition ${
              currentModule === item.id
                ? "text-orange-600 font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{t(item.labelEn, item.labelHi)}</span>
          </button>
        ))}
      </nav>

      {/* Universal Platform Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-500 text-xs py-6 hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 tracking-tight">
              ANANT VR Super Platform V1
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sovereign Indian Digital Ecosystem</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setCurrentModule("vr")}
              className="hover:text-purple-600 font-semibold transition cursor-pointer"
            >
              {t("360° VR Metaverse", "360° VR मेटावर्स")}
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentModule("dashboard")}
              className="hover:text-orange-600 transition cursor-pointer"
            >
              {t("Citizen Dashboard", "नागरिक डैशबोर्ड")}
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentModule("ai")}
              className="hover:text-orange-600 transition cursor-pointer"
            >
              {t("ANANT AI Assistant", "ANANT एआई")}
            </button>
            <span>·</span>
            <span className="text-slate-400">
              {t("Protected under DPDP Act 2023", "भारतीय डेटा सुरक्षा नियमों के अनुरूप")}
            </span>
          </div>
        </div>
      </footer>

      {/* Modal Dialogs */}
      <AppLauncherModal />
      <AuthModal />
      <ProfileUpdateModal />
      <AISettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
