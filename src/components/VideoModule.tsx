import React, { useState } from "react";
import {
  Play,
  ThumbsUp,
  Share2,
  Bookmark,
  Tv,
  Film,
  Sparkles,
  Flame,
  CheckCircle2,
  X,
  Volume2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { VideoItem } from "../types";
import { sampleVideos } from "../data/mockData";

export const VideoModule: React.FC = () => {
  const { activeVideo, setActiveVideo, t } = useApp();
  const [category, setCategory] = useState<string>("all");
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]);
  const [isShortsMode, setIsShortsMode] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  const toggleLike = (id: string) => {
    setLikedVideoIds((prev) =>
      prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id]
    );
  };

  const filteredVideos =
    category === "all"
      ? sampleVideos
      : sampleVideos.filter((v) => v.category === category);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Video Top Controls & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            <Play className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-800">
              {t("ANANT Video & Stream", "ANANT वीडियो व स्ट्रीमिंग")}
            </h2>
            <p className="text-[11px] text-slate-500">
              {t("Sovereign Indian media, documentaries & shorts", "भारतीय ज्ञान, वृत्तचित्र एवं लघु वीडियो")}
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          {[
            { id: "all", labelEn: "All Videos", labelHi: "सभी" },
            { id: "trending", labelEn: "Trending", labelHi: "ट्रेंडिंग" },
            { id: "tech", labelEn: "Tech & AI", labelHi: "तकनीक" },
            { id: "education", labelEn: "Education", labelHi: "शिक्षा" },
            { id: "cinema", labelEn: "Heritage & Cinema", labelHi: "संस्कृति" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                category === cat.id
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t(cat.labelEn, cat.labelHi)}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video) => {
          const isLiked = likedVideoIds.includes(video.id);
          return (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3
                    onClick={() => setActiveVideo(video)}
                    className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition cursor-pointer line-clamp-2"
                  >
                    {t(video.title, video.titleHi)}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div>
                    <span className="font-semibold text-slate-700 block">{video.channel}</span>
                    <span>{video.views} · {video.uploadedAt}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(video.id);
                    }}
                    className={`flex items-center gap-1 p-1.5 rounded-lg border cursor-pointer transition ${
                      isLiked
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "border-slate-200 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? "fill-red-600" : ""}`} />
                    <span className="text-[10px] font-bold">
                      {(video.likes + (isLiked ? 1 : 0)).toLocaleString()}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Playback Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                {activeVideo.channel}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Simulated Stage */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-black/80 via-transparent to-black/40">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl mb-4 animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold max-w-2xl text-white">
                  {t(activeVideo.title, activeVideo.titleHi)}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            {/* Video Metadata & Interactive Actions */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  {activeVideo.channel[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{activeVideo.channel}</div>
                  <div className="text-xs text-slate-400">
                    {activeVideo.views} · Verified Sovereign Channel
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike(activeVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    likedVideoIds.includes(activeVideo.id)
                      ? "bg-red-600 text-white border-red-500"
                      : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>
                    {(
                      activeVideo.likes +
                      (likedVideoIds.includes(activeVideo.id) ? 1 : 0)
                    ).toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setShareToast(true);
                    setTimeout(() => setShareToast(false), 2500);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareToast ? t("Copied!", "कॉपी हुआ!") : t("Share", "साझा करें")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
