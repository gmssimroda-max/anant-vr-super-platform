import React, { useState } from "react";
import {
  X,
  Sparkles,
  Key,
  ShieldCheck,
  Check,
  ExternalLink,
  Cpu,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AVAILABLE_AI_MODELS } from "../data/aiModels";

export const AISettingsModal: React.FC = () => {
  const {
    isAISettingsModalOpen,
    setIsAISettingsModalOpen,
    selectedAIModel,
    setSelectedAIModel,
    aiApiKeys,
    setAiApiKey,
    customAiEndpoint,
    setCustomAiEndpoint,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"models" | "keys">("models");
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [tempKeys, setTempKeys] = useState<Record<string, string>>({ ...aiApiKeys });
  const [tempEndpoint, setTempEndpoint] = useState<string>(customAiEndpoint);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  if (!isAISettingsModalOpen) return null;

  const currentModelConfig = AVAILABLE_AI_MODELS.find((m) => m.id === selectedAIModel) || AVAILABLE_AI_MODELS[0];

  const handleSaveKeys = () => {
    Object.entries(tempKeys).forEach(([provider, key]) => {
      setAiApiKey(provider, key);
    });
    setCustomAiEndpoint(tempEndpoint);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const toggleShowKey = (provider: string) => {
    setShowKey((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">
                  {t("AI Model & Engine Settings", "एआई मॉडल एवं इंजन सेटिंग्स")}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Google Gemini Default
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {t(
                  "Google Gemini works by default. Add API keys to unlock other AI agents.",
                  "गूगल Gemini डिफ़ॉल्ट रूप से सक्रिय है। अन्य एजेंट्स के लिए एपीआई की जोड़ें।"
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAISettingsModalOpen(false)}
            id="close-ai-settings-modal"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 pt-3 bg-slate-50 gap-4">
          <button
            onClick={() => setActiveTab("models")}
            id="tab-ai-models"
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 cursor-pointer transition ${
              activeTab === "models"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t("Select Active Model", "सक्रिय मॉडल चुनें")}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
              {AVAILABLE_AI_MODELS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("keys")}
            id="tab-ai-keys"
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 cursor-pointer transition ${
              activeTab === "keys"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{t("API Keys & Custom Agents", "API Keys एवं कस्टम एजेंट्स")}</span>
            {Object.values(aiApiKeys).filter(Boolean).length > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                {Object.values(aiApiKeys).filter(Boolean).length} Active
              </span>
            )}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === "models" ? (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950">
                  <div className="font-bold">
                    {t(
                      "Google Gemini 3.8 Flash is pre-configured and active by default.",
                      "Google Gemini 3.8 Flash पहले से कॉन्फ़िगर है और डिफ़ॉल्ट रूप से काम कर रहा है।"
                    )}
                  </div>
                  <div className="text-indigo-800/80 mt-0.5">
                    {t(
                      "You can switch to any other agent (OpenAI, Claude, DeepSeek, Groq, Ollama) anytime. If an agent requires a key, add it in the 'API Keys' tab.",
                      "आप जब चाहें OpenAI, Claude, DeepSeek, Groq या कस्टम एजेंट चुन सकते हैं। एपीआई की दर्ज करने पर वे सक्रिय हो जाएंगे।"
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {AVAILABLE_AI_MODELS.map((model) => {
                  const isSelected = selectedAIModel === model.id;
                  const hasKey = model.requiresKey ? Boolean(aiApiKeys[model.provider]) : true;

                  return (
                    <div
                      key={model.id}
                      onClick={() => setSelectedAIModel(model.id)}
                      id={`model-card-${model.id}`}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between text-left relative ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20"
                          : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="font-extrabold text-sm text-slate-900 leading-snug">
                            {model.name}
                          </span>
                          {model.isDefault && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {t(model.description, model.descriptionHi)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                        <span
                          className={`font-semibold flex items-center gap-1 ${
                            hasKey ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${hasKey ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                          {hasKey
                            ? model.isDefault
                              ? t("Ready (Built-in)", "तैयार (डिफ़ॉल्ट)")
                              : t("Key Active", "सक्रिय")
                            : t("Key Required", "API Key आवश्यक")}
                        </span>

                        {isSelected && (
                          <div className="flex items-center gap-1 text-indigo-600 font-bold">
                            <Check className="w-4 h-4" />
                            <span>{t("Active", "सक्रिय")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* API Keys Tab */
            <div className="space-y-4">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">
                    {t(
                      "Client-Side Key Vault (Secure & Private)",
                      "सुरक्षित क्लाइंट-साइड वॉल्ट"
                    )}
                  </div>
                  <div className="text-amber-900/80 mt-0.5">
                    {t(
                      "Your API keys are stored locally on your device and transmitted only with your own explicit requests.",
                      "आपकी एपीआई कीज़ आपके डिवाइस पर सुरक्षित रहती हैं और केवल आपके अनुरोधों के साथ ही उपयोग होती हैं।"
                    )}
                  </div>
                </div>
              </div>

              {/* Provider 1: Google Gemini (Optional custom personal key) */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900">
                      Google Gemini API Key (Optional)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t(
                        "Default Google Gemini already works out-of-the-box. Add your own key for higher quotas.",
                        "डिफ़ॉल्ट रूप से चालू है। उच्च कोटा प्राप्त करने के लिए अपनी की भी डाल सकते हैं।"
                      )}
                    </p>
                  </div>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey["gemini"] ? "text" : "password"}
                    placeholder="AIzaSy... (Default server key is already active)"
                    value={tempKeys["gemini"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, gemini: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono pr-10 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("gemini")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey["gemini"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Provider 2: OpenAI */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900">
                      OpenAI API Key (GPT-4o / GPT-4o-mini)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t("Enter key to activate OpenAI models.", "ओपनएआई मॉडल सक्रिय करने हेतु की दर्ज करें।")}
                    </p>
                  </div>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey["openai"] ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={tempKeys["openai"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, openai: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono pr-10 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("openai")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey["openai"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Provider 3: Anthropic Claude */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900">
                      Anthropic API Key (Claude 3.5 Sonnet)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t("Enter key to activate Claude 3.5 Sonnet.", "क्लाउड 3.5 सॉनेट सक्रिय करने हेतु की दर्ज करें।")}
                    </p>
                  </div>
                  <a
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey["anthropic"] ? "text" : "password"}
                    placeholder="sk-ant-api03-..."
                    value={tempKeys["anthropic"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, anthropic: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono pr-10 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("anthropic")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey["anthropic"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Provider 4: DeepSeek */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900">
                      DeepSeek API Key (DeepSeek-V3 / R1)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t("Enter key for DeepSeek reasoning agent.", "डीपसीक रीजनिंग एजेंट हेतु की दर्ज करें।")}
                    </p>
                  </div>
                  <a
                    href="https://platform.deepseek.com/api_keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey["deepseek"] ? "text" : "password"}
                    placeholder="sk-..."
                    value={tempKeys["deepseek"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, deepseek: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono pr-10 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("deepseek")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey["deepseek"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Provider 5: Groq */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900">
                      Groq API Key (LLaMA 3.3 70B Fast)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {t("Ultra fast LPU inferences on Groq cloud.", "ग्रॉक क्लाउड पर सुपर फ़ास्ट इनफ़रेंस हेतु की दर्ज करें।")}
                    </p>
                  </div>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey["groq"] ? "text" : "password"}
                    placeholder="gsk_..."
                    value={tempKeys["groq"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, groq: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono pr-10 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("groq")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey["groq"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Custom Endpoint / Ollama / Local Agent */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div>
                  <span className="font-extrabold text-xs text-slate-900">
                    Custom Agent / Local Ollama Endpoint
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {t(
                      "Any OpenAI-compatible server endpoint (e.g. http://localhost:11434/v1)",
                      "कोई भी कस्टम या स्थानीय ओलामा एंडपॉइंट URL"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Base URL: https://api.myllm.com/v1"
                    value={tempEndpoint}
                    onChange={(e) => setTempEndpoint(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Custom API Key (optional)"
                    value={tempKeys["custom"] || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, custom: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold">{t("Current Active Model:", "सक्रिय मॉडल:")}</span>
            <span className="font-bold text-indigo-600 font-mono px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200">
              {currentModelConfig.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {savedToast && (
              <span className="text-xs font-bold text-emerald-600 animate-in fade-in flex items-center gap-1">
                <Check className="w-4 h-4" />
                {t("Settings Saved!", "सेव हो गया!")}
              </span>
            )}
            <button
              onClick={handleSaveKeys}
              id="save-ai-settings-btn"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t("Save & Apply", "सहेजें और लागू करें")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
