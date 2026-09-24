import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  Copy,
  Check,
  RefreshCw,
  Code2,
  BookOpen,
  FileText,
  HelpCircle,
  Trash2,
  Terminal,
  Mic,
  MicOff,
  Settings,
  Key,
  Cpu,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ChatMessage } from "../types";
import { AVAILABLE_AI_MODELS } from "../data/aiModels";

export const AIModule: React.FC = () => {
  const {
    language,
    searchQuery,
    setSearchQuery,
    selectedAIModel,
    setSelectedAIModel,
    aiApiKeys,
    customAiEndpoint,
    setIsAISettingsModalOpen,
    t,
  } = useApp();

  const activeModelConfig = AVAILABLE_AI_MODELS.find((m) => m.id === selectedAIModel) || AVAILABLE_AI_MODELS[0];
  const activeKey = aiApiKeys[activeModelConfig.provider] || "";
  const isKeyActive = activeModelConfig.requiresKey ? Boolean(activeKey) : true;

  const [aiStatus, setAiStatus] = useState<{ hasKey: boolean; mode: string; model: string }>({
    hasKey: false,
    mode: "demo",
    model: "gemini-3.8-flash",
  });
  const [showDemoInfo, setShowDemoInfo] = useState(true);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasKey === "boolean") {
          setAiStatus(data);
        }
      })
      .catch(() => {});
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      role: "assistant",
      text:
        language === "hi"
          ? "नमस्ते! मैं **ANANT AI** (अनंत एआई) हूँ — ANANT VR Super Platform V1 का बुद्धिमान मस्तिष्क, जो **Google Gemini 3.8 Flash** से संचालित है।\n\n**डेमो मोड सक्रिय:** आप सामान्य ज्ञान, कोडिंग, विज्ञान, पत्र प्रारूप, या किसी भी कार्य के संबंध में पूछ सकते हैं। बाद में आप सेटिंग्स या `.env` में अपनी `GEMINI_API_KEY` लगाकर इसे वास्तविक लाइव प्रोडक्शन मोड में बदल सकते हैं।"
          : "Hello! I am **ANANT AI**, the cognitive engine powering ANANT VR Super Platform V1, integrated with **Google Gemini 3.8 Flash**.\n\n**Demo Mode Active:** I can write code, explain scientific concepts, draft formal letters, and solve complex queries. You can add your personal `GEMINI_API_KEY` anytime in `.env` or Settings for full live production inference.",
      timestamp: "Just now",
      model: "gemini-3.8-flash (Demo Mode)",
    },
  ]);
  const [input, setInput] = useState(searchQuery || "");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"general" | "code" | "creative" | "summary">("general");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t("Voice recognition is not supported in this browser.", "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।"));
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const speechText = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${speechText}` : speechText));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // If redirected with a search query, send automatically
  useEffect(() => {
    if (searchQuery && messages.length === 1) {
      sendMessage(searchQuery);
      setSearchQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          mode,
          language,
          provider: activeModelConfig.provider,
          modelKey: activeModelConfig.modelKey,
          apiKey: activeKey || undefined,
          customEndpoint: customAiEndpoint || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Server response error");
      }

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        text: data.reply || "उत्तर प्राप्त करने में असमर्थ।",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        model: data.model || activeModelConfig.name,
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      const fallbackReply: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        role: "assistant",
        text:
          language === "hi"
            ? `ANANT AI: उत्तर प्राप्त नहीं हुआ। ${err.message || "कृपया सेटिंग्स में API Key जांचें या डिफ़ॉल्ट Google Gemini मॉडल चुनें।"}`
            : `ANANT AI error: ${err.message || "Please check API keys in AI Settings or use default Gemini."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSpeak = (id: string, text: string) => {
    if ("speechSynthesis" in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`_]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === "hi" ? "hi-IN" : "en-US";
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg_reset_${Date.now()}`,
        role: "assistant",
        text: t("Chat history refreshed. How may I assist you today?", "चैट इतिहास रीफ्रेश कर दिया गया है। आज मैं आपकी क्या सहायता कर सकता हूँ?"),
        timestamp: "Just now",
      },
    ]);
  };

  const promptSuggestions = [
    {
      titleEn: "ISRO Gaganyaan Update",
      titleHi: "गगनयान अंतरिक्ष मिशन",
      prompt: language === "hi" ? "इसरो के गगनयान मिशन और भारतीय अंतरिक्ष स्टेशन के बारे में बताएं।" : "Explain ISRO Gaganyaan mission objectives and timeline.",
    },
    {
      titleEn: "Python Fast API Example",
      titleHi: "पायथन API कोड",
      prompt: language === "hi" ? "पायथन में एक सरल REST API उदाहरण कोड सहित समझाएं।" : "Write a complete clean Python FastAPI boilerplate with endpoints.",
    },
    {
      titleEn: "Draft Formal Leave Letter",
      titleHi: "कार्यालय अवकाश प्रार्थना पत्र",
      prompt: language === "hi" ? "कार्यालय में दो दिन के अवकाश हेतु एक औपचारिक प्रार्थना पत्र लिखें।" : "Draft a professional formal leave email to manager.",
    },
    {
      titleEn: "Quantum Computing in simple terms",
      titleHi: "क्वांटम कंप्यूटिंग सरल शब्दों में",
      prompt: language === "hi" ? "क्वांटम कंप्यूटिंग और क्यूबिट्स को एकदम सरल उदाहरण देकर समझाएं।" : "Explain Quantum Superposition and Qubits with a simple real-world analogy.",
    },
    {
      titleEn: "Summarize Long Document / Email",
      titleHi: "दस्तावेज़ या ईमेल का संक्षिप्त सारांश",
      prompt: language === "hi" ? "कृपया इस लंबे दस्तावेज़/ईमेल का 3 मुख्य बिंदुओं में संक्षिप्त सारांश और एक्शन आइटम प्रदान करें:" : "Please provide a concise 3-bullet summary and action items for this document/email:",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in">
      {/* Top AI Bar */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-800">
                {t("ANANT AI Assistant", "ANANT एआई सहायक")}
              </span>
              {/* Active Model Badge */}
              <button
                onClick={() => setIsAISettingsModalOpen(true)}
                id="ai-model-selector-badge"
                className={`text-[10px] px-2.5 py-0.5 font-bold rounded-full border transition flex items-center gap-1 cursor-pointer hover:shadow-sm ${
                  isKeyActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                }`}
                title={t("Click to change model or add API keys", "मॉडल बदलने या एपीआई की जोड़ने के लिए क्लिक करें")}
              >
                <Cpu className="w-3 h-3 text-indigo-600" />
                <span>{activeModelConfig.name}</span>
                <span className="text-[9px] px-1 rounded bg-black/5 font-mono">
                  {activeModelConfig.provider === "gemini" ? "Default" : isKeyActive ? "Key Active" : "Key Needed"}
                </span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              {t("Bilingual Intelligence with Multi-Agent Support", "द्विभाषी एआई (मल्टी-एजेंट व एपीआई की विकल्प सहित)")}
            </div>
          </div>
        </div>

        {/* Modes, Model Settings & Actions */}
        <div className="flex items-center gap-2">
          {/* AI Settings & Keys Button */}
          <button
            onClick={() => setIsAISettingsModalOpen(true)}
            id="open-ai-settings-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition shadow-xs cursor-pointer"
            title={t("Configure AI Models & API Keys", "एआई मॉडल और एपीआई की कॉन्फ़िगर करें")}
          >
            <Settings className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
            <span className="hidden sm:inline">{t("Model & Keys", "मॉडल व Keys")}</span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setMode("general")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                mode === "general" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t("General", "सामान्य")}
            </button>
            <button
              onClick={() => setMode("code")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                mode === "code" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t("Coding", "कोडिंग")}
            </button>
            <button
              onClick={() => setMode("creative")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                mode === "creative" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t("Writing", "रचनात्मक")}
            </button>
            <button
              onClick={() => setMode("summary")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                mode === "summary" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t("Summarizer", "सारांशकर्ता")}
            </button>
          </div>

          <button
            onClick={clearChat}
            id="clear-chat-btn"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Demo Guidance Notice Banner */}
      {showDemoInfo && !aiStatus.hasKey && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              {language === "hi"
                ? "💡 डेमो मोड: Google Gemini 3.8 Flash मॉडल जुड़ा हुआ है। आप बाद में .env या Settings में अपनी GEMINI_API_KEY जोड़कर इसे लाइव कर सकते हैं।"
                : "💡 Demo Mode: Connected with Google Gemini 3.8 Flash. You can plug in your personal GEMINI_API_KEY in .env anytime."}
            </span>
          </div>
          <button
            onClick={() => setShowDemoInfo(false)}
            className="text-amber-700 hover:text-amber-950 font-bold px-1.5 py-0.5 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${
                  isUser
                    ? "bg-orange-600 text-white"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {isUser ? "U" : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border shadow-sm ${
                  isUser
                    ? "bg-orange-600 text-white border-orange-500 rounded-tr-none"
                    : "bg-white text-slate-800 border-slate-200 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                {/* Assistant footer with Copy & Audio Voice Read */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px]">
                      {msg.model || "ANANT AI"} · {msg.timestamp}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`p-1 rounded hover:bg-slate-100 cursor-pointer transition ${
                          speakingId === msg.id ? "text-indigo-600 animate-pulse" : "text-slate-400"
                        }`}
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-xl mr-auto animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>{t("ANANT AI is thinking...", "ANANT एआई उत्तर तैयार कर रहा है...")}</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompts (when few messages) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-100 bg-white">
          <div className="text-[11px] font-bold text-slate-400 mb-1.5">
            {t("Suggested topics:", "सुझाए गए विषय:")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {promptSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(item.prompt)}
                className="text-left p-2 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition cursor-pointer text-xs group"
              >
                <div className="font-semibold text-slate-700 group-hover:text-indigo-600">
                  {t(item.titleEn, item.titleHi)}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {item.prompt}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
          id="ai-chat-form"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(
              "Ask in Hindi, English or Hinglish (e.g. Write code, explain science)...",
              "हिंदी या अंग्रेज़ी में पूछें (उदा. कोडिंग, विज्ञान, पत्र लेखन)..."
            )}
            disabled={loading}
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition disabled:bg-slate-100"
          />

          {/* Voice Speech-to-Text Input Trigger */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            id="ai-voice-input-btn"
            className={`p-3 rounded-xl border transition cursor-pointer shrink-0 ${
              isListening
                ? "bg-rose-500 text-white border-rose-600 animate-pulse ring-4 ring-rose-400/40"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
            title={isListening ? "Listening... Click to stop" : "Speak to ANANT AI"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            id="ai-send-btn"
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition disabled:opacity-50 cursor-pointer shadow-md shadow-indigo-600/20 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
