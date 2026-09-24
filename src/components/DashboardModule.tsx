import React, { useState, useEffect } from "react";
import {
  User,
  ShieldCheck,
  HardDrive,
  Activity,
  Layers,
  Bell,
  Settings,
  Database,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const DashboardModule: React.FC<{ initialTab?: "profile" | "metrics" | "admin" }> = ({
  initialTab,
}) => {
  const {
    currentModule,
    currentUser,
    setCurrentUser,
    logout,
    notifications,
    addNotification,
    t,
    language,
    setLanguage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"profile" | "metrics" | "admin">(
    initialTab || (currentModule === "admin" ? "admin" : "profile")
  );
  const [nameInput, setNameInput] = useState(currentUser?.name || "Mukesh Chouhan");
  const [bioInput, setBioInput] = useState(currentUser?.bio || "Digital Bharat Builder & Architect");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentModule === "admin") {
      setActiveTab("admin");
    }
  }, [currentModule]);

  const isAdmin = currentUser?.role === "admin";

  const toggleRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === "admin" ? "user" : "admin";
    setCurrentUser({
      ...currentUser,
      role: newRole,
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      name: nameInput,
      bio: bioInput,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    addNotification(
      `📢 ${t("System Broadcast", "सिस्टम सूचना")}: ${broadcastMsg.trim()}`
    );
    setBroadcastMsg("");
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* User Overview Profile Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt={currentUser?.name}
            className="w-20 h-20 rounded-3xl object-cover border-4 border-orange-100 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                {currentUser?.name || "Guest User"}
              </h2>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase border ${
                  isAdmin
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                {isAdmin ? "Super Admin" : "Citizen User"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              {currentUser?.email || "guest@anant.in"}
            </p>
            <p className="text-xs text-slate-600 max-w-md">
              {currentUser?.bio || "ANANT Platform explorer"}
            </p>
          </div>
        </div>

        {/* Quick Role Switcher (Simulates RBAC) */}
        <div className="flex sm:flex-col items-center gap-2">
          <button
            onClick={toggleRole}
            id="toggle-role-btn"
            className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>
              {isAdmin ? t("Switch to Citizen View", "नागरिक व्यू में बदलें") : t("Switch to Admin Role", "एडमिन रोल में बदलें")}
            </span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>{t("Logout", "लॉगआउट")}</span>
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
            activeTab === "profile"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          {t("User Profile & Preferences", "उपयोगकर्ता प्रोफ़ाइल")}
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
            activeTab === "metrics"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          {t("Ecosystem Analytics", "प्लेटफॉर्म स्थिति व मैट्रिक्स")}
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab("admin")}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === "admin"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("Admin Command Center", "एडमिन कंट्रोल सेंटर")}
          </button>
        )}
      </div>

      {/* Tab 1: Profile & Preferences */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-600" />
              <span>{t("Edit Profile Details", "प्रोफ़ाइल संपादित करें")}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {t("Full Name", "पूरा नाम")}
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {t("Bio / Occupation", "परिचय / पेशा")}
              </label>
              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {t("Preferred Language", "पसंदीदा भाषा")}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none"
              >
                <option value="en">English (India)</option>
                <option value="hi">हिंदी (भारत)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                id="save-profile-btn"
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                {t("Save Changes", "परिवर्तन सहेजें")}
              </button>

              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t("Saved!", "सहेजा गया!")}</span>
                </span>
              )}
            </div>
          </form>

          {/* Account Verification & Security */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t("Sovereign Identity Verification", "पहचान सत्यापन")}</span>
              </h3>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Aadhaar / DigiLocker Sovereign Verified
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Verified ID: XXXX-XXXX-9842 · Tier 3 KYC
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Firebase Authentication</span>
                  <span className="font-mono text-emerald-600 font-bold">Configured / Active</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>2-Factor Authentication (2FA)</span>
                  <span className="font-bold text-slate-800">Enabled (TOTP)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Cloud Session Key</span>
                  <span className="font-mono text-slate-400">sk_live_anant_894f2b</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ecosystem Analytics & Metrics */}
      {activeTab === "metrics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Super Platform Users", val: "1.42 Million", change: "+12.4% this week", color: "text-blue-600" },
              { label: "ANANT AI Queries / Day", val: "482,000", change: "Gemini 3.8 Flash 99.98% SLA", color: "text-indigo-600" },
              { label: "Cloud Drive Storage Used", val: "38.4 TB", change: "15 GB Free Quota Enabled", color: "text-teal-600" },
              { label: "API Gateway Latency", val: "18 ms avg", change: "Hosted on Sovereign Cloud", color: "text-emerald-600" },
            ].map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">{m.label}</div>
                <div className={`text-xl font-extrabold ${m.color}`}>{m.val}</div>
                <div className="text-[10px] text-slate-400">{m.change}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-600" />
              <span>{t("Interconnected Subsystems Health", "उप-प्रणालियों की कार्यशीलता")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { name: "ANANT AI (Gemini 3.8 Flash)", status: "Operational", ping: "14ms" },
                { name: "Sovereign Search Indexer", status: "Operational", ping: "22ms" },
                { name: "Video Content CDN", status: "Operational", ping: "9ms" },
                { name: "E-Commerce Gateway (₹)", status: "Operational", ping: "31ms" },
                { name: "Encrypted Webmail Engine", status: "Operational", ping: "17ms" },
                { name: "NavIC Satellite Maps Tile Server", status: "Operational", ping: "28ms" },
              ].map((svc, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{svc.name}</div>
                    <div className="text-[10px] text-slate-400">Ping: {svc.ping}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                    {svc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Admin Command Center (Admin Only) */}
      {activeTab === "admin" && isAdmin && (
        <div className="space-y-6">
          <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-purple-950">
                  {t("Admin Broadcast Notification", "व्यवस्थापक प्रसारण")}
                </h3>
                <p className="text-xs text-purple-800/80">
                  {t("Push live notification banner to all connected web clients", "सभी जुड़े हुए उपयोगकर्ताओं तक तुरंत सूचना भेजें")}
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-200 px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>

            <form onSubmit={handleBroadcast} className="flex gap-2">
              <input
                type="text"
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="Broadcast announcement text..."
                className="flex-1 p-2.5 rounded-xl border border-purple-200 text-xs outline-none bg-white"
              />
              <button
                type="submit"
                id="admin-broadcast-btn"
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                {t("Send Broadcast", "प्रसारित करें")}
              </button>
            </form>

            {broadcastSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>
                  {t(
                    "Notification successfully broadcast to all platform users and added to notification drawer!",
                    "सूचना सफलतापूर्वक सभी उपयोगकर्ताओं को प्रसारित कर दी गई है!"
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              <span>{t("Platform Control Flags", "सिस्टम नियंत्रण ध्वज")}</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {t("Platform Maintenance Mode", "रखरखाव मोड")}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t("Show friendly banner to regular users during upgrades", "सिस्टम अपग्रेड के दौरान सूचना प्रदर्शित करें")}
                  </div>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                    maintenanceMode
                      ? "bg-amber-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {maintenanceMode ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
