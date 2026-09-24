import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Compass,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Layers,
  Camera,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Info,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Eye,
  Sun,
  Moon,
  Sunset,
  Smartphone,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { VRDestination } from "../types";
import { sampleVRDestinations } from "../data/vrData";

export const VRModule: React.FC = () => {
  const { t, language } = useApp();
  const [destinations] = useState<VRDestination[]>(sampleVRDestinations);
  const [activeDestination, setActiveDestination] = useState<VRDestination>(
    sampleVRDestinations[0]
  );
  const [activeHotspot, setActiveHotspot] = useState<
    VRDestination["hotspots"][0] | null
  >(null);
  const [isVrHeadsetMode, setIsVrHeadsetMode] = useState<boolean>(false);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [timeOfDay, setTimeOfDay] = useState<"day" | "sunset" | "night">("sunset");
  const [yaw, setYaw] = useState<number>(0); // 0 to 360 degrees
  const [pitch, setPitch] = useState<number>(0); // -45 to 45 degrees
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 0.8 to 1.8
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [snapshotToast, setSnapshotToast] = useState<string | null>(null);
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);

  // Mobile Gyroscope DeviceOrientation listener
  useEffect(() => {
    if (!isGyroActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null) {
        setYaw((360 - e.alpha) % 360);
        // Clamp beta elevation between -40 and 40 degrees
        const clmpBeta = Math.max(-40, Math.min(40, (e.beta || 0) - 45));
        setPitch(clmpBeta);
      }
    };

    if (typeof (DeviceOrientationEvent as any)?.requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isGyroActive]);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioOscillatorRef = useRef<OscillatorNode | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const autoTourAnimRef = useRef<number | null>(null);

  // Auto-tour slow rotation loop
  useEffect(() => {
    if (isAutoTour) {
      const step = () => {
        setYaw((prev) => (prev + 0.15) % 360);
        autoTourAnimRef.current = requestAnimationFrame(step);
      };
      autoTourAnimRef.current = requestAnimationFrame(step);
    } else if (autoTourAnimRef.current) {
      cancelAnimationFrame(autoTourAnimRef.current);
    }
    return () => {
      if (autoTourAnimRef.current) cancelAnimationFrame(autoTourAnimRef.current);
    };
  }, [isAutoTour]);

  // Audio ambience synthesis using Web Audio API
  const startAmbience = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop existing if any
      if (audioOscillatorRef.current) {
        audioOscillatorRef.current.stop();
        audioOscillatorRef.current.disconnect();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (activeDestination.ambientAudioType === "space") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Deep space harmonic
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
      } else if (activeDestination.ambientAudioType === "temple") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(216, ctx.currentTime); // Harmonic bell frequency
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
      } else if (activeDestination.ambientAudioType === "river") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(144, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioOscillatorRef.current = osc;
      audioGainRef.current = gain;
      setIsAudioMuted(false);
    } catch {
      // Audio autoplay restrictions graceful fallback
    }
  }, [activeDestination.ambientAudioType]);

  const stopAmbience = useCallback(() => {
    if (audioGainRef.current && audioContextRef.current) {
      audioGainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
      setTimeout(() => {
        audioOscillatorRef.current?.stop();
        audioOscillatorRef.current?.disconnect();
        audioOscillatorRef.current = null;
      }, 150);
    }
    setIsAudioMuted(true);
  }, []);

  const toggleAudio = () => {
    if (isAudioMuted) {
      startAmbience();
    } else {
      stopAmbience();
    }
  };

  useEffect(() => {
    if (!isAudioMuted) {
      startAmbience();
    }
    return () => {
      // Clean audio on unmount or destination change
      if (audioOscillatorRef.current) {
        try {
          audioOscillatorRef.current.stop();
          audioOscillatorRef.current.disconnect();
          audioOscillatorRef.current = null;
        } catch {
          // ignore
        }
      }
    };
  }, [activeDestination.id, isAudioMuted, startAmbience]);

  // Mouse / Touch Drag Handlers for 360 Exploration
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setYaw((prev) => (prev - dx * 0.25 + 360) % 360);
    setPitch((prev) => Math.max(-40, Math.min(40, prev + dy * 0.25)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setYaw((prev) => (prev - dx * 0.35 + 360) % 360);
    setPitch((prev) => Math.max(-40, Math.min(40, prev + dy * 0.35)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.75, Math.min(1.8, prev + delta)));
  };

  const resetView = () => {
    setYaw(0);
    setPitch(0);
    setZoomLevel(1);
    setActiveHotspot(null);
  };

  const playInteractionChime = (type: "bell" | "shutter" | "click") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "bell") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "shutter") {
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const takeSnapshot = () => {
    playInteractionChime("shutter");
    // Generate snapshot simulation
    const fileName = `${activeDestination.id}_360_snapshot_${Date.now()}.png`;
    setSnapshotToast(t(`Snapshot saved: ${fileName}`, `3D स्क्रीनशॉट सहेजा गया: ${fileName}`));
    setTimeout(() => setSnapshotToast(null), 3500);
  };

  const filteredDestinations =
    filterCategory === "all"
      ? destinations
      : destinations.filter((d) => d.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in" id="vr-super-platform-container">
      {/* VR Module Title & Sovereign Introduction Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-800/40 shadow-xl relative overflow-hidden">
        {/* Glow backdrop decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{t("ANANT VR • 360° Sovereign Spatial Metaverse", "अनंत वीआर • 360° संप्रभु 3D मेटावर्स")}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t("ANANT VR Super Platform", "अनंत VR सुपर प्लेटफार्म")}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              {t(
                "Immersive 3D virtual reality exploration of India's iconic cultural heritage, ISRO space frontiers, sacred spiritual architectures, and interactive STEM laboratories with stereoscopic headset support.",
                "भारत की सांस्कृतिक धरोहरों, इसरो अंतरिक्ष अभियानों, पावन आध्यात्मिक वास्तुकला और विज्ञान प्रयोगशालाओं का सजीव 360-डिग्री वीआर अनुभव।"
              )}
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setIsVrHeadsetMode(!isVrHeadsetMode)}
              id="vr-toggle-headset-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                isVrHeadsetMode
                  ? "bg-orange-500 hover:bg-orange-600 text-white ring-4 ring-orange-500/30"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>
                {isVrHeadsetMode
                  ? t("Stereo VR Active (Exit)", "स्टीरियो VR चालू है")
                  : t("Launch VR Headset Mode (SBS)", "VR हेडसेट मोड चालू करें")}
              </span>
            </button>

            <button
              onClick={toggleAudio}
              id="vr-toggle-audio-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                !isAudioMuted
                  ? "bg-indigo-600 text-white border border-indigo-400"
                  : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              }`}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{!isAudioMuted ? t("Spatial Audio: ON", "स्थानिक ऑडियो: चालू") : t("Unmute Spatial Audio", "स्थानिक ध्वनि चालू करें")}</span>
            </button>

            {/* Mobile Gyroscope 360 Head-Tracking Button */}
            <button
              onClick={() => setIsGyroActive(!isGyroActive)}
              id="vr-toggle-gyro-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                isGyroActive
                  ? "bg-teal-600 text-white ring-4 ring-teal-500/30"
                  : "bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{isGyroActive ? t("Gyro Tracking: ON", "जाइरो ट्रैकिंग: चालू") : t("Mobile Gyroscope", "जाइरोस्कोप नेविगेशन")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Toast Feedback */}
      {snapshotToast && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <Camera className="w-4 h-4" />
          <span>{snapshotToast}</span>
        </div>
      )}

      {/* Destination Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 text-xs font-semibold">
        <div className="flex items-center gap-2 shrink-0">
          {[
            { id: "all", labelEn: "All Experiences", labelHi: "सभी अनुभव" },
            { id: "space", labelEn: "ISRO Space Orbit", labelHi: "इसरो अंतरिक्ष" },
            { id: "heritage", labelEn: "Indian Heritage", labelHi: "राष्ट्रीय धरोहर" },
            { id: "culture", labelEn: "Spiritual Culture", labelHi: "सांस्कृतिक स्थल" },
            { id: "metaverse", labelEn: "Metaverse 3D Lab", labelHi: "मेटावर्स लैब" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              id={`vr-cat-${cat.id}`}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                filterCategory === cat.id
                  ? "bg-slate-900 text-white shadow-sm font-bold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {t(cat.labelEn, cat.labelHi)}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          {destinations.length} {t("Interactive 360° Scenes", "360° दृश्य")}
        </span>
      </div>

      {/* Primary 360° Spatial Stage */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
        {/* Top Control Bar inside canvas */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          {/* Active scene label */}
          <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700/80 text-white flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold truncate max-w-[200px] sm:max-w-xs">
              {t(activeDestination.title, activeDestination.titleHi)}
            </span>
          </div>

          {/* Canvas Toolbar controls */}
          <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-md">
            {/* Auto-tour */}
            <button
              onClick={() => setIsAutoTour(!isAutoTour)}
              id="vr-auto-tour-btn"
              className={`p-2 rounded-xl transition cursor-pointer ${
                isAutoTour ? "bg-orange-500 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              title={isAutoTour ? "Pause Auto-Rotation" : "Start 360° Auto-Tour"}
            >
              {isAutoTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Time of day lighting */}
            <button
              onClick={() => {
                const next = timeOfDay === "day" ? "sunset" : timeOfDay === "sunset" ? "night" : "day";
                setTimeOfDay(next);
              }}
              id="vr-time-toggle-btn"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title={`Lighting: ${timeOfDay.toUpperCase()}`}
            >
              {timeOfDay === "day" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : timeOfDay === "sunset" ? (
                <Sunset className="w-4 h-4 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Zoom In */}
            <button
              onClick={() => handleZoom(0.15)}
              id="vr-zoom-in-btn"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={() => handleZoom(-0.15)}
              id="vr-zoom-out-btn"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Reset view */}
            <button
              onClick={resetView}
              id="vr-reset-btn"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Snapshot */}
            <button
              onClick={takeSnapshot}
              id="vr-snapshot-btn"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Capture 3D Snapshot"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 360 Panorama Stage Viewport (Handles mouse drag & touch) */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative h-[480px] sm:h-[560px] w-full overflow-hidden select-none cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          } ${isVrHeadsetMode ? "grid grid-cols-2 gap-1 bg-black" : ""}`}
        >
          {/* Renders single viewport or Stereoscopic SBS side-by-side view */}
          {[0, ...(isVrHeadsetMode ? [1] : [])].map((eyeIndex) => {
            // Calculate parallax yaw offset for 3D stereoscopic depth
            const eyeYaw = eyeIndex === 1 ? (yaw + 1.8) % 360 : yaw;
            const bgPositionX = `${(eyeYaw / 360) * 100}%`;
            const bgPositionY = `${50 + pitch}%`;

            return (
              <div
                key={eyeIndex}
                className="relative w-full h-full overflow-hidden border-r border-slate-900"
              >
                {/* 360 Panorama Photographic Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-75"
                  style={{
                    backgroundImage: `url(${activeDestination.thumbnail})`,
                    backgroundPosition: `${bgPositionX} ${bgPositionY}`,
                    transform: `scale(${zoomLevel})`,
                    filter:
                      timeOfDay === "sunset"
                        ? "sepia(0.2) saturate(1.25) contrast(1.05)"
                        : timeOfDay === "night"
                        ? "brightness(0.65) contrast(1.2) hue-rotate(200deg)"
                        : "none",
                  }}
                />

                {/* Lighting Atmosphere Gradients */}
                {timeOfDay === "sunset" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-amber-900/20 pointer-events-none" />
                )}
                {timeOfDay === "night" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-transparent to-black/70 pointer-events-none" />
                )}

                {/* Crosshair / Reticle for VR Headset Mode */}
                {isVrHeadsetMode && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    </div>
                  </div>
                )}

                {/* Interactive Hotspot Pins on the 360 scene */}
                {activeDestination.hotspots.map((hs) => {
                  // Project hotspot coordinates based on current yaw and pitch
                  const offsetX = ((hs.x - (eyeYaw / 3.6) + 200) % 100);
                  const offsetY = Math.max(10, Math.min(90, hs.y + pitch * 0.5));

                  return (
                    <div
                      key={hs.id}
                      style={{
                        left: `${offsetX}%`,
                        top: `${offsetY}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute z-10"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playInteractionChime("bell");
                          setActiveHotspot(hs);
                        }}
                        id={`hotspot-${hs.id}-${eyeIndex}`}
                        className={`group p-2 rounded-full cursor-pointer transition transform hover:scale-125 shadow-2xl flex items-center gap-1.5 ${
                          activeHotspot?.id === hs.id
                            ? "bg-orange-500 text-white ring-4 ring-orange-400/50"
                            : "bg-white/90 text-slate-900 hover:bg-white ring-2 ring-white/50"
                        }`}
                        title={t(hs.label, hs.labelHi)}
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold pr-1 hidden group-hover:inline max-w-[120px] truncate">
                          {t(hs.label, hs.labelHi)}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Compass Angle & Telemetry Readout */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-white flex items-center gap-2 text-xs font-mono">
            <Compass
              className="w-4 h-4 text-orange-400 transition-transform duration-75"
              style={{ transform: `rotate(${yaw}deg)` }}
            />
            <span>
              {Math.round(yaw)}° {yaw < 45 || yaw >= 315 ? "N" : yaw < 135 ? "E" : yaw < 225 ? "S" : "W"} · Elev {Math.round(pitch)}°
            </span>
          </div>

          {/* Drag instruction pill */}
          <div className="absolute bottom-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-slate-300 text-[11px] font-medium hidden sm:flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Drag mouse / swipe to look 360°", "360° देखने के लिए ड्रैग करें")}</span>
          </div>
        </div>

        {/* Hotspot Detailed Information Drawer Overlay */}
        {activeHotspot && (
          <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 text-white animate-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {t("3D Spatial Hotspot Telemetry", "3D हॉटस्पॉट विवरण")}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {t(activeHotspot.label, activeHotspot.labelHi)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(activeHotspot.details, activeHotspot.detailsHi)}
                </p>
              </div>

              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Destination Selector Carousel Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>{t("Choose VR Experience", "वीआर स्थल का चयन करें")}</span>
          </h2>
          <span className="text-xs text-slate-500">
            {t("Click any card to enter 360° environment", "किसी भी कार्ड पर क्लिक करके 360° वातावरण में प्रवेश करें")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.map((dest) => {
            const isSelected = activeDestination.id === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => {
                  setActiveDestination(dest);
                  resetView();
                }}
                id={`vr-card-${dest.id}`}
                className={`group rounded-2xl border overflow-hidden cursor-pointer transition transform hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-orange-500 ring-2 ring-orange-400/40 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Card Thumbnail */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={dest.thumbnail}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>360° VR</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-orange-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                    {dest.category}
                  </div>
                </div>

                {/* Card Text & Facts */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-orange-600 transition">
                      {t(dest.title, dest.titleHi)}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t(dest.subtitle, dest.subtitleHi)}
                    </p>
                  </div>

                  {/* Fact Chips */}
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 text-[10px]">
                    {dest.facts.slice(0, 2).map((f: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block">{f.label}</span>
                        <span className="font-bold text-slate-700 truncate block">{f.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-orange-600">
                    <span>{isSelected ? t("Currently Exploring", "वर्तमान में सक्रिय") : t("Enter 360° Scene", "360° दृश्य में जाएं")}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
