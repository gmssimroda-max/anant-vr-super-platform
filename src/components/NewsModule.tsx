import React, { useState } from "react";
import {
  Newspaper,
  Clock,
  Share2,
  Bookmark,
  Volume2,
  X,
  ExternalLink,
  Flame,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { NewsItem } from "../types";
import { sampleNews } from "../data/mockData";

export const NewsModule: React.FC = () => {
  const { t, language } = useApp();
  const [category, setCategory] = useState<string>("all");
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const handleReadAloud = (text: string) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "hi" ? "hi-IN" : "en-US";
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredNews =
    category === "all"
      ? sampleNews
      : sampleNews.filter((n) => n.category === category);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* News Header & Categories */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900">
              {t("ANANT Samachar & Global Wire", "ANANT समाचार")}
            </h2>
            <p className="text-xs text-slate-500">
              {t("Verified sovereign news, economy & tech updates", "सत्यापित राष्ट्रीय व वैश्विक समाचार")}
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: "all", labelEn: "Top Stories", labelHi: "शीर्ष समाचार" },
            { id: "tech", labelEn: "Tech & AI", labelHi: "तकनीक" },
            { id: "india", labelEn: "National", labelHi: "राष्ट्रीय" },
            { id: "business", labelEn: "Economy", labelHi: "व्यापार" },
            { id: "sports", labelEn: "Sports", labelHi: "खेल" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                category === cat.id
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t(cat.labelEn, cat.labelHi)}
            </button>
          ))}
        </div>
      </div>

      {/* Breaking News Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          <span className="uppercase tracking-wider text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full">
            {t("BREAKING", "ताज़ा खबर")}
          </span>
          <span className="truncate">
            {t(
              "India AI Mission activates 10,000 GPUs compute cluster for indigenous startups",
              "भारत एआई मिशन: 10,000 जीपीयू संप्रभु कंप्यूट क्लस्टर राष्ट्र को समर्पित"
            )}
          </span>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);
          return (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {article.source}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition line-clamp-2">
                    {t(article.title, article.titleHi)}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {t(article.summary, article.summaryHi)}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.publishedAt}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(article.id);
                    }}
                    className={`p-1 rounded hover:bg-slate-100 transition cursor-pointer ${
                      isBookmarked ? "text-rose-600" : "text-slate-400"
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? "fill-rose-600" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="relative aspect-video bg-slate-900 overflow-hidden shrink-0">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (isSpeaking) {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{activeArticle.source} · {activeArticle.publishedAt}</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900">
                {t(activeArticle.title, activeArticle.titleHi)}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {t(activeArticle.summary, activeArticle.summaryHi)}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-800">
                  {t("Key Takeaways:", "मुख्य बिंदु:")}
                </div>
                <ul className="list-disc pl-4 space-y-1">
                  <li>{t("High-speed sovereign infrastructure deployed.", "संप्रभु बुनियादी ढांचा स्थापित किया गया।")}</li>
                  <li>{t("Multi-lingual data pipelines supported.", "बहुभाषी डेटा पाइपलाइन समर्थित।")}</li>
                  <li>{t("Encrypted under Digital Personal Data Protection guidelines.", "डिजिटल व्यक्तिगत डेटा संरक्षण नियमों के अनुरूप।")}</li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    handleReadAloud(
                      t(activeArticle.title, activeArticle.titleHi) +
                        ". " +
                        t(activeArticle.summary, activeArticle.summaryHi)
                    )
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isSpeaking
                      ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse"
                      : "border-slate-200 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isSpeaking ? t("Stop Reading", "रोकें") : t("Listen Aloud", "सुनें")}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setShareCopied(true);
                    setTimeout(() => setShareCopied(false), 2500);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{shareCopied ? t("Link Copied!", "लिंक कॉपी हुआ!") : t("Share", "साझा करें")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
