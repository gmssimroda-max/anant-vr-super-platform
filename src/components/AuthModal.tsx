import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Flame,
  CheckCircle2,
  Code2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { UserProfile } from "../types";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    setCurrentUser,
    t,
  } = useApp();

  const [tab, setTab] = useState<"login" | "signup" | "firebase">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setFeedback("Please enter email and password");
      return;
    }
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].toUpperCase() || "Citizen User",
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: email.includes("admin") ? "admin" : "user",
      joinedDate: "Sept 2026",
      storageUsedMB: 1200,
      storageLimitMB: 15360,
    };
    setCurrentUser(user);
    setFeedback("Login successful!");
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setFeedback(null);
    }, 600);
  };

  const handleGoogleLogin = () => {
    const googleUser: UserProfile = {
      id: "usr_google_001",
      name: "Mukesh Chouhan",
      email: "mukeshchouhan645@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "admin",
      joinedDate: "Sept 2026",
      bio: "Signed in via Google Cloud Identity on ANANT Super Platform.",
      storageUsedMB: 3420,
      storageLimitMB: 15360,
    };
    setCurrentUser(googleUser);
    setFeedback("Google Sign-In Successful!");
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setFeedback(null);
    }, 600);
  };

  const handleQuickDemo = (role: "admin" | "citizen") => {
    if (role === "admin") {
      setCurrentUser({
        id: "usr_admin",
        name: "Mukesh Chouhan (Admin)",
        email: "mukeshchouhan645@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "admin",
        joinedDate: "Sept 2026",
        storageUsedMB: 3420,
        storageLimitMB: 15360,
      });
    } else {
      setCurrentUser({
        id: "usr_citizen",
        name: "Priya Sharma",
        email: "priya.sharma@anant.in",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        role: "user",
        joinedDate: "Sept 2026",
        storageUsedMB: 980,
        storageLimitMB: 15360,
      });
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        id="auth-modal-dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
              ∞
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">
                {t("ANANT Digital ID", "ANANT डिजिटल पहचान")}
              </h3>
              <p className="text-[10px] text-slate-500">
                {t("One Account for all ANANT Services", "एक ही खाते से सभी सेवाएं")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            id="close-auth-btn"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setTab("login")}
            id="tab-login-btn"
            className={`flex-1 py-3 text-xs font-bold transition cursor-pointer ${
              tab === "login"
                ? "text-orange-600 border-b-2 border-orange-600 bg-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("Sign In", "लॉग इन")}
          </button>
          <button
            onClick={() => setTab("signup")}
            id="tab-signup-btn"
            className={`flex-1 py-3 text-xs font-bold transition cursor-pointer ${
              tab === "signup"
                ? "text-orange-600 border-b-2 border-orange-600 bg-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("Register", "नया खाता")}
          </button>
          <button
            onClick={() => setTab("firebase")}
            id="tab-firebase-btn"
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              tab === "firebase"
                ? "text-orange-600 border-b-2 border-orange-600 bg-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Firebase SDK</span>
          </button>
        </div>

        <div className="p-6">
          {feedback && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {tab === "login" && (
            <div>
              {/* Google 1-Click Login */}
              <button
                onClick={handleGoogleLogin}
                id="google-signin-btn"
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700 text-xs shadow-sm transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{t("Continue with Google", "गूगल खाते से जारी रखें")}</span>
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 absolute">
                  {t("or with email", "या ईमेल द्वारा")}
                </span>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t("Email Address", "ईमेल पता")}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mukeshchouhan645@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t("Password", "पासवर्ड")}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="email-signin-submit-btn"
                  className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition cursor-pointer"
                >
                  {t("Sign In to ANANT", "ANANT में प्रवेश करें")}
                </button>
              </form>

              {/* Quick Demo Logins */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block mb-2">
                  {t("Instant Demo Access:", "त्वरित डेमो लॉगिन:")}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("admin")}
                    id="demo-admin-login-btn"
                    className="py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 text-[11px] font-semibold text-slate-700 transition cursor-pointer text-left"
                  >
                    👑 {t("Mukesh (Admin)", "मुकेश (एडमिन)")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("citizen")}
                    id="demo-citizen-login-btn"
                    className="py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-[11px] font-semibold text-slate-700 transition cursor-pointer text-left"
                  >
                    👤 {t("Priya (Citizen)", "प्रिया (यूज़र)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "signup" && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t("Full Name", "पूरा नाम")}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mukesh Chouhan"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t("Email Address", "ईमेल पता")}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@anant.in"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t("Create Password", "पासवर्ड बनाएं")}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="signup-submit-btn"
                  className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition cursor-pointer"
                >
                  {t("Create Sovereign ID", "सॉवरेन आईडी बनाएं")}
                </button>
              </div>
            </form>
          )}

          {tab === "firebase" && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>{t("Firebase Integration Structure", "फायरबेस एकीकरण आर्किटेक्चर")}</span>
                </div>
                {t(
                  "ANANT Super Platform V1 is built fully Firebase-ready. To deploy with live Firebase Auth and Firestore, place your Firebase credentials in src/firebase.ts or use the AI Studio Firebase provisioner.",
                  "ANANT सुपर प्लेटफॉर्म V1 फायरबेस ऑथेंटिकेशन और फायरस्टोर डेटाबेस के लिए पूरी तरह से तैयार है। इसे लाइव फायरबेस प्रोजेक्ट से सीधे कनेक्ट किया जा सकता है।"
                )}
              </div>

              <div className="bg-slate-900 rounded-xl p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                <div className="text-slate-400">// Sample src/firebase.ts initialization:</div>
                <div>import &#123; initializeApp &#125; from "firebase/app";</div>
                <div>import &#123; getAuth, GoogleAuthProvider &#125; from "firebase/auth";</div>
                <div>import &#123; getFirestore &#125; from "firebase/firestore";</div>
                <div className="text-slate-500 mt-1">// Configuration:</div>
                <div>const firebaseConfig = &#123;</div>
                <div className="pl-4">apiKey: "AIzaSy...",</div>
                <div className="pl-4">authDomain: "anant-platform.firebaseapp.com",</div>
                <div className="pl-4">projectId: "anant-platform",</div>
                <div className="pl-4">storageBucket: "anant-platform.appspot.com",</div>
                <div>&#125;;</div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supports Email/Password & Google Sign-In popups</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Role-Based Access Control (RBAC): Admin & Citizen roles</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
