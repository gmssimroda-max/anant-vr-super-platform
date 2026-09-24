import React, { useState } from "react";
import {
  Download,
  Github,
  Globe,
  CheckCircle,
  Copy,
  Check,
  X,
  FileArchive,
  Terminal,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { downloadProjectZip } from "../utils/zipExport";
import { useApp } from "../context/AppContext";

export const GithubVercelModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadProgress(10);
    setDownloadStatus("Preparing files...");
    setDownloadSuccess(false);

    try {
      await downloadProjectZip((percent, status) => {
        setDownloadProgress(percent);
        setDownloadStatus(status);
      });
      setDownloadSuccess(true);
      setDownloading(false);
    } catch (err: any) {
      console.error("ZIP creation failed", err);
      setDownloadStatus("Could not generate ZIP automatically.");
      setDownloading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitSteps = [
    {
      title: t("1. Extract ZIP & Open Terminal", "1. जिप फाइल खोलें और टर्मिनल चलाएँ"),
      cmd: `cd anant-vr-super-platform\nnpm install`,
    },
    {
      title: t("2. Initialize Git & Commit", "2. गिट इनिशियलाइज़ करके कमिट करें"),
      cmd: `git init\ngit add .\ngit commit -m "feat: initial commit ANANT VR Super Platform"`,
    },
    {
      title: t("3. Push to your GitHub Repo", "3. अपने गिटहब रिपॉजिटरी में पुश करें"),
      cmd: `git branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/anant-vr-super-platform.git\ngit push -u origin main`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-orange-500 text-white flex items-center justify-center shadow-lg">
              <FileArchive className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900">
                  {t("Download ZIP for GitHub & Vercel", "गिटहब और Vercel हेतु जिप (ZIP) डाउनलोड")}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t(
                  "Get complete source code, vercel.json, server, and deploy live in 2 minutes.",
                  "संपूर्ण सोर्स कोड, vercel.json, सर्वर फ़ाइलें डाउनलोड करें और 2 मिनट में Vercel पर लाइव करें।"
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button: Download Complete ZIP */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-indigo-50 border border-orange-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>{t("Complete Production Codebase", "संपूर्ण प्रोडक्शन कोडबेस (.ZIP)")}</span>
              </h4>
              <p className="text-xs text-slate-600">
                {t(
                  "Contains React 19, TypeScript, Tailwind, Google Gemini integration, 360° VR & vercel.json.",
                  "इसमें React, TypeScript, Tailwind, Google Gemini, 360° VR और Vercel डिप्लॉयमेंट सेटिंग्स शामिल हैं।"
                )}
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              id="start-download-zip-btn"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 transition cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloading
                  ? t(`Archiving (${downloadProgress}%)...`, `जिप तैयार हो रही है (${downloadProgress}%)...`)
                  : t("Download Project ZIP", "प्रोजेक्ट जिप (ZIP) डाउनलोड करें")}
              </span>
            </button>
          </div>

          {/* Progress Bar when downloading */}
          {downloading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-600">
                <span>{downloadStatus}</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-200 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t(
                  "ZIP downloaded successfully! Check your Downloads folder.",
                  "जिप (ZIP) फाइल सफलतापूर्वक डाउनलोड हो गई है! अपने डाउनलोड फ़ोल्डर में देखें।"
                )}
              </span>
            </div>
          )}
        </div>

        {/* Step-by-Step GitHub & Vercel Guide */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Github className="w-4 h-4 text-slate-800" />
            <span>{t("Steps to Upload on GitHub", "गिटहब पर अपलोड करने के चरण")}</span>
          </h4>

          <div className="space-y-3">
            {gitSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{step.title}</span>
                  <button
                    onClick={() => copyToClipboard(step.cmd, idx)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">{t("Copied", "कॉपी किया")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t("Copy", "कॉपी करें")}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {step.cmd}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Vercel Live Deployment Info Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-extrabold text-xs tracking-wide">
                {t("Deploy on Vercel (1-Click)", "Vercel पर लाइव करें")}
              </span>
            </div>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition"
            >
              <span>{t("Open Vercel", "Vercel खोलें")}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
            <p>
              1. Vercel पर जाकर <strong>"Import Git Repository"</strong> चुनें।
            </p>
            <p>
              2. Framework Preset: <strong>Vite</strong> स्वतः सेट हो जाएगा (vercel.json पहले से शामिल है)।
            </p>
            <p>
              3. Environment Variables में <code>GEMINI_API_KEY</code> जोड़ें और <strong>Deploy</strong> दबाएँ!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
