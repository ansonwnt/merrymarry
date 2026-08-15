export type User = {
  email: string;
  accountNumber: string;
  phone: string;
  firstName: string;
  lastName: string;
  partnerFirstName: string;
  partnerLastName: string;
  weddingDate: string;
};

export type GiftItem = {
  id: string;
  nameEn: string;
  nameZh: string;
  price: string;
  image: string;
};

export type WeddingConfig = {
  coupleDisplay: string;
  venue: string;
  venueZh: string;
  inviteText: string;
  inviteTextZh: string;
  profilePic: string;
  bgImage: string;
  giftList: GiftItem[];
};

export type RSVP = {
  id: string;
  name: string;
  attending: string;
  count: string;
  side: string;
  wishes: string;
  giftId: string;
  amount: string;
  timestamp: string;
};

const KEYS = {
  user: "mm_user",
  wedding: "mm_wedding",
  rsvps: "mm_rsvps",
};

export const DEFAULT_WEDDING: WeddingConfig = {
  coupleDisplay: "Name & Name",
  venue: "The Peninsula Hong Kong",
  venueZh: "香港半島酒店",
  bgImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
  profilePic: "",
  inviteText:
    "Having you with us on one of the most important days of our lives is truly the greatest gift we could ask for. Thank you for your love, support and friendship throughout our journey. We look forward to celebrating this special occasion with you.",
  inviteTextZh:
    "能有你出席我們最重要的一天，已是我們最大的幸福。感謝你一直以來對我們的關懷與珍惜，我們誠摯地邀請您與我們共同分享我們的喜悅。",
  giftList: [
    { id: "1", nameEn: "Banquet", nameZh: "喜宴", price: "1000", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
    { id: "2", nameEn: "Honeymoon", nameZh: "蜜月旅行", price: "2000", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" },
    { id: "3", nameEn: "Custom 1", nameZh: "自訂 1", price: "500", image: "" },
    { id: "4", nameEn: "Custom 2", nameZh: "自訂 2", price: "500", image: "" },
  ],
};

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.user);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function setUser(user: User): void {
  localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(KEYS.user);
}

export function getWedding(): WeddingConfig | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.wedding);
  return raw ? (JSON.parse(raw) as WeddingConfig) : null;
}

export function setWedding(config: WeddingConfig): void {
  localStorage.setItem(KEYS.wedding, JSON.stringify(config));
}

export function getRSVPs(): RSVP[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEYS.rsvps);
  return raw ? (JSON.parse(raw) as RSVP[]) : [];
}

export function addRSVP(rsvp: Omit<RSVP, "id" | "timestamp">): void {
  const existing = getRSVPs();
  const full: RSVP = {
    ...rsvp,
    id: Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.rsvps, JSON.stringify([...existing, full]));
}

export function generateAccountNumber(): string {
  const num = Math.floor(Math.random() * 999999) + 1;
  return num.toString().padStart(6, "0");
}
