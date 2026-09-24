import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AppModuleType,
  Language,
  UserProfile,
  ProductItem,
  CartItem,
  DriveFile,
  MailItem,
  VideoItem,
  AIModelConfig,
} from "../types";
import {
  initialUser,
  sampleDriveFiles,
  sampleMails,
  sampleVideos,
  sampleApps,
} from "../data/mockData";
import { AVAILABLE_AI_MODELS } from "../data/aiModels";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

interface AppContextType {
  currentModule: AppModuleType;
  setCurrentModule: (mod: AppModuleType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAppLauncherOpen: boolean;
  setIsAppLauncherOpen: (open: boolean) => void;
  isAISettingsModalOpen: boolean;
  setIsAISettingsModalOpen: (open: boolean) => void;
  selectedAIModel: string;
  setSelectedAIModel: (modelId: string) => void;
  aiApiKeys: Record<string, string>;
  setAiApiKey: (provider: string, key: string) => void;
  customAiEndpoint: string;
  setCustomAiEndpoint: (url: string) => void;
  cart: CartItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  driveFiles: DriveFile[];
  addDriveFile: (file: DriveFile) => void;
  deleteDriveFile: (id: string) => void;
  mails: MailItem[];
  sendMail: (to: string, subject: string, body: string) => void;
  markMailRead: (id: string) => void;
  starMail: (id: string) => void;
  installedAppIds: string[];
  toggleInstallApp: (id: string) => void;
  activeVideo: VideoItem | null;
  setActiveVideo: (vid: VideoItem | null) => void;
  notifications: NotificationItem[];
  addNotification: (title: string) => void;
  logout: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  t: (en: string, hi: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentModule, setCurrentModule] = useState<AppModuleType>("home");
  const [language, setLanguage] = useState<Language>("hi");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>(sampleDriveFiles);
  const [mails, setMails] = useState<MailItem[]>(sampleMails);
  const [installedAppIds, setInstalledAppIds] = useState<string[]>(
    sampleApps.filter((a) => a.isInstalled).map((a) => a.id)
  );
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAISettingsModalOpen, setIsAISettingsModalOpen] = useState<boolean>(false);

  // AI Model Selection & API Keys (Google Gemini is default; other models activate when keys are provided)
  const [selectedAIModel, setSelectedAIModel] = useState<string>("gemini-3.8-flash");
  const [aiApiKeys, setAiApiKeys] = useState<Record<string, string>>({});
  const [customAiEndpoint, setCustomAiEndpoint] = useState<string>("https://api.openai.com/v1");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "notif_1", title: "ANANT Super Platform V1 is live & active", time: "Just now", read: false },
    { id: "notif_2", title: "ANANT AI upgraded to Gemini 3.8 Flash Engine", time: "10m ago", read: false },
    { id: "notif_3", title: "Drive storage verified (15 GB available)", time: "1h ago", read: true },
  ]);

  // Load saved language and AI keys if available
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("anant_lang") as Language;
      if (savedLang === "hi" || savedLang === "en") {
        setLanguage(savedLang);
      }
      const savedModel = localStorage.getItem("anant_ai_model");
      if (savedModel) {
        setSelectedAIModel(savedModel);
      }
      const savedKeys = localStorage.getItem("anant_ai_keys");
      if (savedKeys) {
        setAiApiKeys(JSON.parse(savedKeys));
      }
      const savedEndpoint = localStorage.getItem("anant_ai_custom_endpoint");
      if (savedEndpoint) {
        setCustomAiEndpoint(savedEndpoint);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const changeAIModel = (modelId: string) => {
    setSelectedAIModel(modelId);
    try {
      localStorage.setItem("anant_ai_model", modelId);
    } catch {}
  };

  const updateAIApiKey = (provider: string, key: string) => {
    setAiApiKeys((prev) => {
      const updated = { ...prev, [provider]: key.trim() };
      try {
        localStorage.setItem("anant_ai_keys", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateCustomEndpoint = (url: string) => {
    setCustomAiEndpoint(url);
    try {
      localStorage.setItem("anant_ai_custom_endpoint", url);
    } catch {}
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("anant_lang", lang);
    } catch {
      // ignore
    }
  };

  const t = (en: string, hi: string): string => {
    return language === "hi" ? hi : en;
  };

  // Cart operations
  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Drive operations
  const addDriveFile = (file: DriveFile) => {
    setDriveFiles((prev) => [file, ...prev]);
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              storageUsedMB: prev.storageUsedMB + Math.round(file.sizeMB),
            }
          : prev
      );
    }
  };

  const deleteDriveFile = (id: string) => {
    setDriveFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Mail operations
  const sendMail = (to: string, subject: string, body: string) => {
    const newMail: MailItem = {
      id: `mail_${Date.now()}`,
      fromName: currentUser?.name || "Me",
      fromEmail: currentUser?.email || "user@anant.in",
      subject,
      preview: body.slice(0, 80) + "...",
      body,
      date: "Just now",
      isRead: true,
      isStarred: false,
      folder: "sent",
    };
    setMails((prev) => [newMail, ...prev]);
  };

  const markMailRead = (id: string) => {
    setMails((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const starMail = (id: string) => {
    setMails((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  // App store operations
  const toggleInstallApp = (id: string) => {
    setInstalledAppIds((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const addNotification = (title: string) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        language,
        setLanguage: changeLanguage,
        currentUser,
        setCurrentUser,
        searchQuery,
        setSearchQuery,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAppLauncherOpen,
        setIsAppLauncherOpen,
        isAISettingsModalOpen,
        setIsAISettingsModalOpen,
        selectedAIModel,
        setSelectedAIModel: changeAIModel,
        aiApiKeys,
        setAiApiKey: updateAIApiKey,
        customAiEndpoint,
        setCustomAiEndpoint: updateCustomEndpoint,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        driveFiles,
        addDriveFile,
        deleteDriveFile,
        mails,
        sendMail,
        markMailRead,
        starMail,
        installedAppIds,
        toggleInstallApp,
        activeVideo,
        setActiveVideo,
        notifications,
        addNotification,
        logout,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
