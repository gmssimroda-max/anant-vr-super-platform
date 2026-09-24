import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Fuel,
  Zap,
  Train,
  Hospital,
  DollarSign,
  Utensils,
  Car,
  Compass,
  Layers,
  Search,
  CheckCircle,
  CloudSun,
  Wind,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { MapPOI } from "../types";
import { samplePOIs } from "../data/mockData";

export const MapsModule: React.FC = () => {
  const { t } = useApp();
  const [origin, setOrigin] = useState("Connaught Place, New Delhi");
  const [destination, setDestination] = useState("Indira Gandhi International Airport, T3");
  const [poiFilter, setPoiFilter] = useState<string>("all");
  const [selectedPoi, setSelectedPoi] = useState<MapPOI | null>(samplePOIs[0]);
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite" | "traffic">("standard");

  const filteredPois =
    poiFilter === "all"
      ? samplePOIs
      : samplePOIs.filter((p) => p.type === poiFilter);

  const getPoiIcon = (type: MapPOI["type"]) => {
    switch (type) {
      case "fuel":
        return <Fuel className="w-4 h-4 text-amber-600" />;
      case "ev":
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case "metro":
        return <Train className="w-4 h-4 text-indigo-600" />;
      case "hospital":
        return <Hospital className="w-4 h-4 text-red-600" />;
      case "atm":
        return <DollarSign className="w-4 h-4 text-blue-600" />;
      case "food":
        return <Utensils className="w-4 h-4 text-orange-600" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Maps Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900">
              {t("ANANT Maps & Navigational Intelligence", "ANANT मानचित्र व नेविगेशन")}
            </h2>
            <p className="text-xs text-slate-500">
              {t("NavIC sovereign satellite positioning & live transit routes", "नाविक उपग्रह आधारित सटीक मार्ग व जनसुविधाएं")}
            </p>
          </div>
        </div>

        {/* Weather / AQI & Map Layers */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {/* Live Weather & AQI Readout */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span className="font-bold">28°C Sunny</span>
            <span className="text-slate-300">|</span>
            <Wind className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-[11px] font-mono">
              AQI: <strong className="text-emerald-700 font-bold">64 (Good)</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: "standard", label: "Vector" },
              { id: "satellite", label: "Satellite" },
              { id: "traffic", label: "Live Traffic" },
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => setMapStyle(style.id as any)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${
                  mapStyle === style.id
                    ? "bg-emerald-700 text-white font-bold shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Planner Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>{t("Route Planner", "मार्ग योजना")}</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                {t("Starting Point", "प्रारंभिक स्थान")}
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                {t("Destination", "गंतव्य स्थान")}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <Car className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="font-bold text-emerald-900">28 mins</div>
                <div className="text-[10px] text-emerald-600">14.8 km</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Train className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                <div className="font-bold text-slate-800">22 mins</div>
                <div className="text-[10px] text-slate-500">Metro Express</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Zap className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                <div className="font-bold text-slate-800">32 mins</div>
                <div className="text-[10px] text-slate-500">EV Eco Route</div>
              </div>
            </div>
          </div>

          {/* Quick Hub Presets */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 block">
              {t("Popular Routes:", "लोकप्रिय मार्ग:")}
            </span>
            {[
              { from: "Delhi", to: "Jaipur (NH 48 Expressway)" },
              { from: "Mumbai", to: "Pune (Expressway)" },
              { from: "Bengaluru", to: "Mysuru (10-Lane Corridor)" },
            ].map((route, i) => (
              <button
                key={i}
                onClick={() => {
                  setOrigin(route.from);
                  setDestination(route.to);
                }}
                className="w-full text-left p-1.5 rounded-lg text-xs hover:bg-slate-50 text-slate-600 hover:text-emerald-700 transition"
              >
                📍 {route.from} → {route.to}
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas / Simulated Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          {/* POI Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
            {[
              { id: "all", label: "All Nearby" },
              { id: "fuel", label: "Petrol / CNG" },
              { id: "ev", label: "EV Charging" },
              { id: "metro", label: "Metro Stations" },
              { id: "hospital", label: "Hospitals" },
              { id: "atm", label: "ATMs" },
              { id: "food", label: "Dining" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPoiFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                  poiFilter === f.id
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden h-96 shadow-inner flex items-center justify-center p-6">
            {/* Grid Map Vector lines */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Simulated Animated Road Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 60 280 C 180 200, 240 320, 380 160 S 520 80, 680 120"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Map Markers Overlay */}
            <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-around">
              {filteredPois.map((poi, idx) => (
                <button
                  key={poi.id}
                  onClick={() => setSelectedPoi(poi)}
                  className={`p-2.5 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer transition transform hover:scale-110 ${
                    selectedPoi?.id === poi.id
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-400/30"
                      : "bg-white text-slate-800 border border-slate-200"
                  }`}
                >
                  {getPoiIcon(poi.type)}
                  <span className="text-[11px] font-bold truncate max-w-[100px]">
                    {poi.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Compass Rose */}
            <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur p-2 rounded-xl text-white flex items-center gap-1 text-[11px] border border-slate-700">
              <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>NavIC 28.61° N, 77.20° E</span>
            </div>
          </div>

          {/* Selected POI Details */}
          {selectedPoi && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                  {getPoiIcon(selectedPoi.type)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{selectedPoi.name}</h4>
                  <p className="text-[11px] text-slate-500">{selectedPoi.address}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-emerald-600">
                  {selectedPoi.distanceKm} km away
                </div>
                <div className="text-[10px] text-slate-400">★ {selectedPoi.rating} rating</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
