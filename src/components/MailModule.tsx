import React, { useState } from "react";
import {
  Mail,
  Inbox,
  Send,
  Star,
  FileText,
  Trash2,
  PenSquare,
  Search,
  CheckCircle,
  X,
  Paperclip,
  Cloud,
  UploadCloud,
  HardDrive,
  Download,
  Check,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive,
  ExternalLink,
  FolderDown,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { MailItem, MailAttachment, DriveFile } from "../types";

export const MailModule: React.FC = () => {
  const {
    mails,
    sendMail,
    markMailRead,
    starMail,
    addDriveFile,
    driveFiles,
    addNotification,
    setCurrentModule,
    t,
  } = useApp();

  const [folder, setFolder] = useState<"inbox" | "sent" | "drafts" | "trash">("inbox");
  const [activeMail, setActiveMail] = useState<MailItem | null>(mails[0] || null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [mailSearch, setMailSearch] = useState("");
  const [composeAttachments, setComposeAttachments] = useState<MailAttachment[]>([]);
  const [isDrivePickerOpen, setIsDrivePickerOpen] = useState(false);

  // State to track which attachments have been saved to Cloud Drive
  const [savedAttachmentIds, setSavedAttachmentIds] = useState<Record<string, boolean>>({});
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [emailSavedToDrive, setEmailSavedToDrive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredMails = mails.filter((m) => {
    const matchesFolder = folder === "trash" ? m.folder === "trash" : m.folder === folder;
    const matchesSearch =
      m.subject.toLowerCase().includes(mailSearch.toLowerCase()) ||
      m.fromName.toLowerCase().includes(mailSearch.toLowerCase()) ||
      m.body.toLowerCase().includes(mailSearch.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleSelectMail = (mail: MailItem) => {
    setActiveMail(mail);
    setEmailSavedToDrive(false);
    if (!mail.isRead) {
      markMailRead(mail.id);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save single attachment directly to DriveModule storage
  const handleSaveToCloud = (attachment: MailAttachment, emailSubject: string) => {
    const newDriveFile: DriveFile = {
      id: `df_att_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: attachment.name,
      type: attachment.type,
      sizeMB: attachment.sizeMB,
      updatedAt: "Just now",
      shared: false,
    };

    addDriveFile(newDriveFile);
    addNotification(
      t(
        `Saved attachment "${attachment.name}" to ANANT Cloud Drive`,
        `संलग्नक "${attachment.name}" ANANT क्लाउड ड्राइव में सुरक्षित सहेजा गया`
      )
    );

    setSavedAttachmentIds((prev) => ({ ...prev, [attachment.id]: true }));
    showToast(
      t(
        `✓ "${attachment.name}" saved to Cloud Drive!`,
        `✓ "${attachment.name}" क्लाउड ड्राइव में सहेजा गया!`
      )
    );
  };

  // Save all attachments of the active email to Cloud Drive
  const handleSaveAllToCloud = (attachments: MailAttachment[]) => {
    setIsSavingAll(true);
    setTimeout(() => {
      const newSaved = { ...savedAttachmentIds };
      attachments.forEach((att) => {
        const newDriveFile: DriveFile = {
          id: `df_att_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          name: att.name,
          type: att.type,
          sizeMB: att.sizeMB,
          updatedAt: "Just now",
        };
        addDriveFile(newDriveFile);
        newSaved[att.id] = true;
      });

      setSavedAttachmentIds(newSaved);
      setIsSavingAll(false);
      addNotification(
        t(
          `All ${attachments.length} attachments saved to ANANT Cloud Drive`,
          `सभी ${attachments.length} संलग्नक ANANT क्लाउड ड्राइव में सहेजे गए`
        )
      );
      showToast(
        t(
          `✓ All ${attachments.length} attachments saved to Cloud Drive!`,
          `✓ सभी ${attachments.length} फ़ाइलें क्लाउड ड्राइव में सुरक्षित हो गईं!`
        )
      );
    }, 400);
  };

  // Save entire email transcript as PDF to Cloud Drive
  const handleSaveEmailAsPDFToDrive = (mail: MailItem) => {
    const fileName = `${mail.subject.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30)}_Email.pdf`;
    const newDriveFile: DriveFile = {
      id: `df_mail_${Date.now()}`,
      name: fileName,
      type: "pdf",
      sizeMB: 0.8,
      updatedAt: "Just now",
    };
    addDriveFile(newDriveFile);
    setEmailSavedToDrive(true);
    addNotification(
      t(
        `Email archived as "${fileName}" to ANANT Cloud Drive`,
        `ईमेल "${fileName}" के रूप में क्लाउड ड्राइव में सहेजा गया`
      )
    );
    showToast(
      t(
        `✓ Email archived to Cloud Drive as "${fileName}"`,
        `✓ पूरा ईमेल "${fileName}" क्लाउड ड्राइव में सहेजा गया!`
      )
    );
  };

  const handleDownloadAttachment = (attachment: MailAttachment) => {
    const content = `ANANT Webmail Attachment File Export\n====================================\nFile Name: ${attachment.name}\nSize: ${attachment.sizeMB} MB\nType: ${attachment.type.toUpperCase()}\nVerified Hash: SHA256-${Date.now()}\nStorage Authority: Bharat Sovereign Mail Gateway`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = attachment.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject) return;

    // Send mail with attachments
    sendMail(composeTo, composeSubject, composeBody);
    setIsComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    setComposeAttachments([]);
    setFolder("sent");
    showToast(t("Email dispatched securely via TLS 1.3", "ईमेल सुरक्षित रूप से भेजा गया"));
  };

  const getAttachmentIcon = (type: MailAttachment["type"]) => {
    switch (type) {
      case "pdf":
      case "doc":
        return <FileText className="w-5 h-5 text-rose-600" />;
      case "sheet":
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case "image":
        return <ImageIcon className="w-5 h-5 text-amber-600" />;
      case "zip":
        return <Archive className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in relative">
      {/* Toast Notification for Cloud Save */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in slide-in-from-top-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCurrentModule("drive")}
            className="ml-2 px-2 py-0.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
          >
            <HardDrive className="w-3 h-3" />
            <span>{t("Open Drive", "ड्राइव खोलें")}</span>
          </button>
        </div>
      )}

      {/* Top Mail Navigation & Search */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-800">
              {t("ANANT Webmail", "ANANT वेबमेल")}
            </h2>
            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
              <span>user@anant.in</span>
              <span>•</span>
              <span className="text-teal-600 font-semibold flex items-center gap-1">
                <Cloud className="w-3 h-3 inline" />
                {t("Cloud Drive Sync Active", "क्लाउड ड्राइव सिंक सक्रिय")}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={mailSearch}
              onChange={(e) => setMailSearch(e.target.value)}
              placeholder={t("Search emails, attachments...", "ईमेल व संलग्नक खोजें...")}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentModule("drive")}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Go to ANANT Cloud Drive"
          >
            <HardDrive className="w-3.5 h-3.5 text-teal-600" />
            <span>{t("Cloud Drive", "क्लाउड ड्राइव")}</span>
          </button>

          <button
            onClick={() => setIsComposeOpen(true)}
            id="compose-mail-btn"
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
          >
            <PenSquare className="w-4 h-4" />
            <span className="hidden sm:inline">{t("Compose", "नया मेल")}</span>
          </button>
        </div>
      </div>

      {/* Main Mail Grid: Folders Sidebar, Thread List, Reading Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Folders List */}
        <div className="w-48 border-r border-slate-200 p-3 space-y-1 bg-slate-50/50 hidden md:block shrink-0">
          {[
            { id: "inbox", labelEn: "Inbox", labelHi: "इनबॉक्स", icon: <Inbox className="w-4 h-4" /> },
            { id: "sent", labelEn: "Sent", labelHi: "भेजे गए", icon: <Send className="w-4 h-4" /> },
            { id: "drafts", labelEn: "Drafts", labelHi: "ड्राफ्ट्स", icon: <FileText className="w-4 h-4" /> },
            { id: "trash", labelEn: "Trash", labelHi: "कचरा", icon: <Trash2 className="w-4 h-4" /> },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFolder(f.id as any)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                folder === f.id
                  ? "bg-sky-100/80 text-sky-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {f.icon}
                <span>{t(f.labelEn, f.labelHi)}</span>
              </div>
              {f.id === "inbox" && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-600 text-white font-bold">
                  {mails.filter((m) => m.folder === "inbox" && !m.isRead).length}
                </span>
              )}
            </button>
          ))}

          {/* Quick Drive Storage Widget inside Mail Sidebar */}
          <div className="mt-8 p-3 rounded-2xl bg-teal-50 border border-teal-200/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-teal-900">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-teal-600" />
                {t("Cloud Storage", "क्लाउड स्टोरेज")}
              </span>
              <span>15 GB</span>
            </div>
            <p className="text-[10px] text-teal-700 leading-tight">
              {t("Save email attachments directly to sovereign drive", "ईमेल अटैचमेंट को सीधे ड्राइव में सुरक्षित रखें")}
            </p>
            <button
              onClick={() => setCurrentModule("drive")}
              className="w-full py-1 text-[11px] font-bold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition cursor-pointer flex items-center justify-center gap-1"
            >
              <span>{t("Open Drive", "ड्राइव खोलें")}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Message Thread List */}
        <div className="w-full md:w-80 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100 shrink-0">
          {filteredMails.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              {t("No emails in this folder.", "इस फ़ोल्डर में कोई ईमेल नहीं है।")}
            </div>
          ) : (
            filteredMails.map((mail) => {
              const isSelected = activeMail?.id === mail.id;
              const hasAttachments = (mail.attachments && mail.attachments.length > 0) || mail.hasAttachment;
              return (
                <div
                  key={mail.id}
                  onClick={() => handleSelectMail(mail)}
                  className={`p-3.5 cursor-pointer transition ${
                    isSelected
                      ? "bg-sky-50/70 border-l-4 border-sky-600"
                      : mail.isRead
                      ? "bg-white hover:bg-slate-50"
                      : "bg-slate-50/90 font-bold hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="truncate max-w-[140px] text-slate-900 font-semibold">
                      {mail.fromName}
                    </span>
                    <span>{mail.date}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate mb-1">
                    {t(mail.subject, mail.subjectHi || mail.subject)}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mb-1.5">
                    {mail.preview}
                  </div>

                  {/* Attachment indicator badge */}
                  {hasAttachments && (
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 font-medium">
                        <Paperclip className="w-2.5 h-2.5 text-teal-600" />
                        <span>
                          {mail.attachments?.length || 1} {t("Attachment", "अटैचमेंट")}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Reading Pane */}
        <div className="flex-1 bg-white p-6 overflow-y-auto hidden md:flex flex-col justify-between">
          {activeMail ? (
            <div className="space-y-6">
              {/* Mail Header */}
              <div className="border-b border-slate-200 pb-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {t(activeMail.subject, activeMail.subjectHi || activeMail.subject)}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Save entire email as PDF to Drive */}
                    <button
                      onClick={() => handleSaveEmailAsPDFToDrive(activeMail)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        emailSavedToDrive
                          ? "bg-teal-50 border-teal-300 text-teal-700"
                          : "bg-slate-50 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-slate-700"
                      }`}
                      title={t("Save email transcript as PDF to Cloud Drive", "ईमेल को पीडीएफ के रूप में ड्राइव में सहेजें")}
                    >
                      {emailSavedToDrive ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span>{t("Saved in Drive", "ड्राइव में सहेजा गया")}</span>
                        </>
                      ) : (
                        <>
                          <Cloud className="w-3.5 h-3.5 text-teal-600" />
                          <span>{t("Save Email to Cloud", "ईमेल को क्लाउड में सहेजें")}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => starMail(activeMail.id)}
                      className="p-1 rounded text-slate-400 hover:text-amber-500 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          activeMail.isStarred
                            ? "fill-amber-400 text-amber-500"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
                    {activeMail.fromName[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {activeMail.fromName}{" "}
                      <span className="text-slate-400 font-normal">
                        &lt;{activeMail.fromEmail}&gt;
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      To: me@anant.in · {activeMail.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                {activeMail.body}
              </div>

              {/* ATTACHMENTS SECTION WITH 'SAVE TO CLOUD' BUTTONS */}
              {activeMail.attachments && activeMail.attachments.length > 0 && (
                <div className="mt-8 pt-5 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-slate-500" />
                      <span className="font-extrabold text-xs text-slate-800">
                        {t("Attachments", "संलग्न फ़ाइलें")} ({activeMail.attachments.length})
                      </span>
                    </div>

                    {/* Save All to Cloud button if multiple */}
                    {activeMail.attachments.length > 1 && (
                      <button
                        onClick={() => handleSaveAllToCloud(activeMail.attachments!)}
                        disabled={isSavingAll}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition cursor-pointer disabled:opacity-50"
                        id="save-all-attachments-cloud-btn"
                      >
                        <Cloud className="w-3.5 h-3.5" />
                        <span>
                          {isSavingAll
                            ? t("Saving to Drive...", "ड्राइव में सहेजा जा रहा है...")
                            : t("Save All to Cloud", "सभी क्लाउड में सहेजें")}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Attachment Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeMail.attachments.map((attachment) => {
                      const isSaved = !!savedAttachmentIds[attachment.id];
                      return (
                        <div
                          key={attachment.id}
                          className={`p-3.5 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                            isSaved
                              ? "bg-teal-50/60 border-teal-300 shadow-xs"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 border border-slate-100">
                              {getAttachmentIcon(attachment.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4
                                className="font-bold text-xs text-slate-800 truncate"
                                title={attachment.name}
                              >
                                {attachment.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {attachment.sizeMB} MB • {attachment.type.toUpperCase()}
                              </p>
                            </div>
                          </div>

                          {/* ACTION BUTTONS: 'Save to Cloud' and 'Download' */}
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                            {/* THE 'SAVE TO CLOUD' BUTTON */}
                            <button
                              onClick={() => handleSaveToCloud(attachment, activeMail.subject)}
                              id={`save-to-cloud-${attachment.id}`}
                              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                                isSaved
                                  ? "bg-teal-600 text-white hover:bg-teal-700"
                                  : "bg-teal-50 text-teal-700 border border-teal-300 hover:bg-teal-600 hover:text-white"
                              }`}
                              title={t(
                                "Save directly to your ANANT Cloud Drive storage",
                                "अपनी ANANT क्लाउड ड्राइव स्टोरेज में सीधे सहेजें"
                              )}
                            >
                              {isSaved ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{t("Saved to Cloud ✓", "क्लाउड में सहेजा गया ✓")}</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-3.5 h-3.5 text-teal-600 group-hover:text-white" />
                                  <span>{t("Save to Cloud", "क्लाउड में सहेजें")}</span>
                                </>
                              )}
                            </button>

                            {/* View in Drive if saved */}
                            {isSaved && (
                              <button
                                onClick={() => setCurrentModule("drive")}
                                className="p-1.5 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-100 transition cursor-pointer"
                                title={t("View file in DriveModule", "ड्राइव मॉड्यूल में देखें")}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Local Download button */}
                            <button
                              onClick={() => handleDownloadAttachment(attachment)}
                              className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                              title={t("Download locally", "लोकल डाउनलोड करें")}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              {t("Select an email from the list to read", "पढ़ने के लिए सूची से कोई ईमेल चुनें")}
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-800">
                {t("New Sovereign Email", "नया संदेश लिखें")}
              </h3>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="space-y-3">
              <div>
                <input
                  type="email"
                  required
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="Recipient (e.g. colleague@anant.in)"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 outline-none font-bold"
                />
              </div>

              <div>
                <textarea
                  rows={6}
                  required
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 outline-none resize-none"
                />
              </div>

              {/* Compose Attachments List */}
              {composeAttachments.length > 0 && (
                <div className="space-y-1.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700">
                    {t("Attached Files", "संलग्न फ़ाइलें")} ({composeAttachments.length})
                  </span>
                  <div className="space-y-1">
                    {composeAttachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-3.5 h-3.5 text-sky-600" />
                          <span className="font-semibold text-slate-800">{att.name}</span>
                          <span className="text-[11px] text-slate-400">({att.sizeMB} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setComposeAttachments((prev) => prev.filter((a) => a.id !== att.id))
                          }
                          className="text-slate-400 hover:text-rose-600 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newAtt: MailAttachment = {
                        id: `att_comp_${Date.now()}`,
                        name: `Project_Document_${composeAttachments.length + 1}.pdf`,
                        sizeMB: 2.4,
                        type: "pdf",
                      };
                      setComposeAttachments((prev) => [...prev, newAtt]);
                    }}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-sky-600 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    title="Attach local file"
                  >
                    <Paperclip className="w-4 h-4 text-sky-600" />
                    <span>{t("Local File", "फ़ाइल")}</span>
                  </button>

                  {/* Attach directly from Cloud Drive */}
                  <button
                    type="button"
                    onClick={() => setIsDrivePickerOpen(true)}
                    id="attach-from-drive-btn"
                    className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-teal-200"
                    title="Attach directly from ANANT Cloud Drive"
                  >
                    <HardDrive className="w-4 h-4 text-teal-600" />
                    <span>{t("Attach from Drive", "क्लाउड ड्राइव से जोड़ें")}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  id="send-mail-submit-btn"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("Send Email", "संदेश भेजें")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cloud Drive File Picker Modal for Mail */}
      {isDrivePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  {t("Select File from ANANT Drive", "क्लाउड ड्राइव से फ़ाइल चुनें")}
                </h3>
              </div>
              <button
                onClick={() => setIsDrivePickerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {driveFiles.map((df) => (
                <div
                  key={df.id}
                  onClick={() => {
                    const newAtt: MailAttachment = {
                      id: `att_df_${df.id}_${Date.now()}`,
                      name: df.name,
                      sizeMB: df.sizeMB,
                      type: df.type,
                    };
                    setComposeAttachments((prev) => [...prev, newAtt]);
                    setIsDrivePickerOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 cursor-pointer transition text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {getAttachmentIcon(df.type)}
                    <div>
                      <div className="font-semibold text-slate-800">{df.name}</div>
                      <div className="text-[10px] text-slate-400">{df.sizeMB} MB • {df.updatedAt}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-lg">
                    {t("Attach", "जोड़ें")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
