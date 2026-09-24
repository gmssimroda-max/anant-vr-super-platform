import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Camera,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ProfileUpdateModal: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    setCurrentModule,
    t,
  } = useApp();

  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210");
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setBio(currentUser.bio || "");
      setEmail(currentUser.email);
      setPhone(currentUser.phone || "+91 98765 43210");
      setSelectedAvatar(currentUser.avatar);
    }
  }, [currentUser, isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  const avatarOptions = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setCurrentUser({
      ...currentUser,
      name: name.trim() || currentUser.name,
      bio: bio.trim(),
      email: email.trim() || currentUser.email,
      phone: phone.trim(),
      avatar: selectedAvatar || currentUser.avatar,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  const handleOpenDashboard = () => {
    setIsProfileModalOpen(false);
    setCurrentModule("dashboard");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
      id="profile-update-modal-backdrop"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t("Profile Update & Sovereign Identity", "प्रोफाइल अपडेट व संप्रभु नागरिक पहचान")}
              </h3>
              <p className="text-xs text-slate-500">
                {t("Update your personal details & cloud preferences", "अपनी व्यक्तिगत जानकारी व प्राथमिकताएं अपडेट करें")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {t("Avatar Profile Picture", "प्रोफाइल चित्र (अवतार)")}
            </label>
            <div className="flex items-center gap-3">
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-2">
                {avatarOptions.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      selectedAvatar === url
                        ? "border-orange-600 ring-2 ring-orange-400/30 scale-105"
                        : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Avatar option ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("Full Name", "पूरा नाम")}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mukesh Chouhan"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("Bio / Professional Title", "बायो / व्यवसाय व परिचय")}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Digital Bharat Builder & Architect"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t("Email ID", "ईमेल पता")}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mukesh@anant.in"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t("Mobile Number", "मोबाइल नंबर")}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sovereign Security Badge */}
          <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-orange-950 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DigiLocker Verified Citizen Tier-3</span>
            </div>
            <span className="text-[11px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
              15 GB Cloud Active
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleOpenDashboard}
              className="text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{t("Go to Full Citizen Dashboard", "पूर्ण डैशबोर्ड देखें")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                {t("Cancel", "रद्द करें")}
              </button>
              <button
                type="submit"
                id="save-profile-modal-btn"
                className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                {isSaved ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>{t("Updated!", "अपडेट हो गया!")}</span>
                  </>
                ) : (
                  <span>{t("Save Changes", "प्रोफाइल सेव करें")}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
