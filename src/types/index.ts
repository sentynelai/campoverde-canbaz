export interface StoreData {
  id: number;
  lat: number;
  lng: number;
  sales: number;
  customers: number;
  digitalAudience: number;
  region: 'West' | 'East' | 'Central';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}