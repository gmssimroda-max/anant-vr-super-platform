import React, { useState } from "react";
import {
  HardDrive,
  UploadCloud,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive,
  Download,
  Trash2,
  Share2,
  Check,
  FolderPlus,
  Grid,
  List,
  Eye,
  ShieldCheck,
  X,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DriveFile } from "../types";

export const DriveModule: React.FC = () => {
  const { driveFiles, addDriveFile, deleteDriveFile, currentUser, t } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareCopiedId, setShareCopiedId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<DriveFile | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDigiLockerImport = () => {
    const digiDocs: DriveFile[] = [
      { id: `dl_aadhaar_${Date.now()}`, name: "Aadhaar_Card_Verified.pdf", type: "pdf", sizeMB: 1.2, updatedAt: "Verified via UIDAI" },
      { id: `dl_pan_${Date.now()}`, name: "Income_Tax_PAN_Verified.pdf", type: "pdf", sizeMB: 0.8, updatedAt: "Verified via NSDL" },
      { id: `dl_rc_${Date.now()}`, name: "Vehicle_Registration_RC.pdf", type: "pdf", sizeMB: 1.5, updatedAt: "Verified via MoRTH" },
    ];
    digiDocs.forEach((doc) => addDriveFile(doc));
  };

  const totalUsedMB = currentUser?.storageUsedMB || 3420;
  const totalLimitMB = currentUser?.storageLimitMB || 15360;
  const usedPercent = Math.min(100, Math.round((totalUsedMB / totalLimitMB) * 100));

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newFile: DriveFile = {
              id: `df_${Date.now()}`,
              name: `Project_Document_${Math.floor(Math.random() * 100)}.pdf`,
              type: "pdf",
              sizeMB: 3.5,
              updatedAt: "Just now",
            };
            addDriveFile(newFile);
            setIsUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const ext = file.name.split(".").pop()?.toLowerCase();
      let fileType: DriveFile["type"] = "doc";
      if (ext === "pdf") fileType = "pdf";
      else if (["xlsx", "xls", "csv"].includes(ext || "")) fileType = "sheet";
      else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) fileType = "image";
      else if (["zip", "rar", "tar"].includes(ext || "")) fileType = "zip";

      const newFile: DriveFile = {
        id: `df_${Date.now()}`,
        name: file.name,
        type: fileType,
        sizeMB: Number((file.size / (1024 * 1024)).toFixed(2)),
        updatedAt: "Just now",
      };
      addDriveFile(newFile);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownloadFile = (file: DriveFile) => {
    const content = `ANANT Sovereign Cloud Storage File Export\n----------------------------------------\nFile Name: ${file.name}\nFile Size: ${file.sizeMB} MB\nUpdated: ${file.updatedAt}\nEncrypted Storage Hash: SHA-256-${Date.now()}\nVerified by Bharat National Cloud`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.endsWith(".txt") ? file.name : `${file.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const newFolder: DriveFile = {
      id: `df_f_${Date.now()}`,
      name: `📁 ${newFolderName.trim()}`,
      type: "zip",
      sizeMB: 0.1,
      updatedAt: "Just now",
    };
    addDriveFile(newFolder);
    setNewFolderName("");
    setIsFolderModalOpen(false);
  };

  const handleShare = (id: string) => {
    setShareCopiedId(id);
    navigator.clipboard.writeText(`https://drive.anant.in/s/${id}`);
    setTimeout(() => setShareCopiedId(null), 1500);
  };

  const getFileIcon = (type: DriveFile["type"]) => {
    switch (type) {
      case "pdf":
      case "doc":
        return <FileText className="w-6 h-6 text-blue-600" />;
      case "sheet":
        return <FileSpreadsheet className="w-6 h-6 text-emerald-600" />;
      case "image":
        return <ImageIcon className="w-6 h-6 text-amber-600" />;
      case "zip":
        return <Archive className="w-6 h-6 text-purple-600" />;
      default:
        return <FileText className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Drive Storage Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-slate-900">
                {t("ANANT Cloud Drive", "ANANT क्लाउड ड्राइव")}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                15 GB Sovereign Free
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t("Encrypted, fast, geo-replicated across Indian data centers", "सुरक्षित एवं तीव्र गति भारतीय डेटा भंडारण")}
            </p>
          </div>
        </div>

        {/* Storage Bar Meter */}
        <div className="w-full md:w-72 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>{t("Storage Used", "उपयोग")}</span>
            <span>
              {(totalUsedMB / 1024).toFixed(1)} GB / {(totalLimitMB / 1024).toFixed(0)} GB ({usedPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-teal-600 transition-all duration-500 rounded-full"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upload Zone & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleRealFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            id="choose-file-btn"
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{t("Select File", "फ़ाइल चुनें")}</span>
          </button>

          <button
            onClick={handleSimulateUpload}
            disabled={isUploading}
            id="upload-file-btn"
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <HardDrive className="w-4 h-4 text-teal-600" />
            <span>{isUploading ? `${uploadProgress}%...` : t("Demo Upload", "डेमो अपलोड")}</span>
          </button>

          <button
            onClick={() => setIsFolderModalOpen(true)}
            id="new-folder-btn"
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <FolderPlus className="w-4 h-4 text-amber-500" />
            <span>{t("New Folder", "नया फ़ोल्डर")}</span>
          </button>

          {/* DigiLocker Sovereign Import */}
          <button
            onClick={handleDigiLockerImport}
            id="digilocker-sync-btn"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-400 text-blue-800 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
            title="Import official digital documents from DigiLocker"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{t("DigiLocker Sync", "डिजिलॉकर सिंक")}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {driveFiles.length} {t("files saved", "फ़ाइलें")}
          </span>
          <div className="flex border border-slate-200 rounded-xl p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === "grid" ? "bg-white shadow-xs text-teal-700" : "text-slate-400"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === "list" ? "bg-white shadow-xs text-teal-700" : "text-slate-400"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-800">
                {t("Create New Folder", "नया फ़ोल्डर बनाएँ")}
              </h3>
              <button
                onClick={() => setIsFolderModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t("Folder Name", "फ़ोल्डर का नाम")}
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g., Documents 2026"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  {t("Cancel", "रद्द करें")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
                >
                  {t("Create", "बनाएँ")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Explorer Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {driveFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-teal-50 transition">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title={t("Preview", "फ़ाइल देखें")}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownloadFile(file)}
                    className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title={t("Download", "डाउनलोड करें")}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare(file.id)}
                    className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title={t("Share Link", "शेयर करें")}
                  >
                    {shareCopiedId === file.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteDriveFile(file.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title={t("Delete", "हटाएँ")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-800 truncate" title={file.name}>
                  {file.name}
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5 flex justify-between">
                  <span>{file.sizeMB} MB</span>
                  <span>{file.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100 text-xs">
          {driveFiles.map((file) => (
            <div
              key={file.id}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <div className="font-bold text-slate-800">{file.name}</div>
                  <div className="text-[11px] text-slate-400">{file.updatedAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <span>{file.sizeMB} MB</span>
                <button
                  onClick={() => handleDownloadFile(file)}
                  className="p-1 hover:text-teal-600 cursor-pointer"
                  title={t("Download", "डाउनलोड करें")}
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare(file.id)}
                  className="p-1 hover:text-teal-600 cursor-pointer"
                  title={t("Share", "शेयर करें")}
                >
                  {shareCopiedId === file.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => deleteDriveFile(file.id)}
                  className="p-1 hover:text-red-600 cursor-pointer"
                  title={t("Delete", "हटाएँ")}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rich In-Browser File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  {getFileIcon(previewFile.type)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 truncate max-w-sm">
                    {previewFile.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {previewFile.sizeMB} MB • {previewFile.updatedAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Viewer Frame simulation */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3 min-h-[220px]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-sans font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>National Sovereign Cloud Encrypted Viewer</span>
                </span>
                <span>SHA-256 Verified</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans">
                {t(
                  "Official encrypted document archived in ANANT Sovereign Cloud storage. Security clearance verified through Bharat National Identity Trust network.",
                  "ANANT संप्रभु क्लाउड स्टोरेज में सुरक्षित व एन्क्रिप्टेड दस्तावेज़। राष्ट्रीय सुरक्षा प्रोटोकॉल द्वारा सत्यापित।"
                )}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-slate-600">
                <div>Document ID: <code>DOC-{previewFile.id}</code></div>
                <div>Integrity Check: <span className="text-emerald-600 font-bold">Passed (100%)</span></div>
                <div>Replication Factor: 3 Regions (Delhi, Mumbai, Bengaluru)</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleDownloadFile(previewFile)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{t("Download Offline Copy", "ऑफ़लाइन कॉपी डाउनलोड करें")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
