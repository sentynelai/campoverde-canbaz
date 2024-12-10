export interface StoreData {
  id: number;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  sales: number;
  campoverde_sales: number;
  velocity_ly: number;
  customers: number;
  reviews: number;
  positive: number;
  negative: number;
  digitalAudience: number;
  trend: number;
  socialMedia: {
    facebook: number;
    instagram: number;
    twitter: number;
    tiktok: number;
  };
  [key: string]: any;
}

export interface ProductKPI {
  id: string;
  name: string;
  current: number;
  target: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}