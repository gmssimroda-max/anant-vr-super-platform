export type AppModuleType =
  | "home"
  | "vr"
  | "ai"
  | "search"
  | "video"
  | "apps"
  | "shop"
  | "mail"
  | "drive"
  | "maps"
  | "news"
  | "dashboard"
  | "admin";

export type Language = "hi" | "en";

export interface VRDestination {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  category: "space" | "heritage" | "metaverse" | "culture";
  thumbnail: string;
  backgroundSky: string;
  ambientAudioType: "space" | "temple" | "river" | "cosmic";
  description: string;
  descriptionHi: string;
  hotspots: {
    id: string;
    label: string;
    labelHi: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    details: string;
    detailsHi: string;
  }[];
  facts: { label: string; value: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user" | "moderator";
  joinedDate: string;
  phone?: string;
  bio?: string;
  storageUsedMB: number;
  storageLimitMB: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  model?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  category: "all" | "news" | "images" | "videos" | "apps";
  badge?: string;
  date?: string;
  imageUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleHi: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  category: "trending" | "tech" | "cinema" | "news" | "education";
  likes: number;
  uploadedAt: string;
  description: string;
  isShort?: boolean;
}

export interface AppItem {
  id: string;
  name: string;
  nameHi: string;
  category: "productivity" | "utilities" | "finance" | "social" | "tools";
  rating: number;
  downloads: string;
  size: string;
  iconBg: string;
  iconName: string;
  description: string;
  descriptionHi: string;
  developer: string;
  isInstalled?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  nameHi: string;
  category: "electronics" | "wearables" | "home" | "crafts";
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  tag?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface MailAttachment {
  id: string;
  name: string;
  sizeMB: number;
  type: "folder" | "doc" | "sheet" | "image" | "video" | "pdf" | "zip";
  url?: string;
}

export interface MailItem {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  subjectHi?: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "sent" | "drafts" | "trash";
  hasAttachment?: boolean;
  attachments?: MailAttachment[];
}

export interface DriveFile {
  id: string;
  name: string;
  type: "folder" | "doc" | "sheet" | "image" | "video" | "pdf" | "zip";
  sizeMB: number;
  updatedAt: string;
  shared?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  source: string;
  category: "headlines" | "india" | "business" | "tech" | "sports";
  publishedAt: string;
  imageUrl: string;
  readTime: string;
}

export interface MapPOI {
  id: string;
  name: string;
  type: "fuel" | "ev" | "metro" | "hospital" | "atm" | "food";
  distanceKm: number;
  rating: number;
  address: string;
  lat: number;
  lng: number;
}

export type AIProviderId = "gemini" | "openai" | "anthropic" | "groq" | "deepseek" | "custom";

export interface AIModelConfig {
  id: string;
  name: string;
  provider: AIProviderId;
  modelKey: string;
  isDefault?: boolean;
  description: string;
  descriptionHi: string;
  requiresKey: boolean;
  endpoint?: string;
  badge?: string;
}
