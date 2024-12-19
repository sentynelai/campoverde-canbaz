export interface StoreData {
  id: number;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  sales: number;
  sales_52w: number;
  velocity_ty_cv: number;
  campoverde_sales: number;
  customers: number;
  reviews: number;
  positive: number;
  negative: number;
  digitalAudience: number;
  trend: number;
  tier: TierType;
  'Qty TY': number;
  'Qty LY': number;
  total_sales: number;
  socialMedia: {
    facebook: number;
    instagram: number;
    twitter: number;
    tiktok: number;
  };
  [key: string]: any;
}

export type TierType = 'Diamond' | 'Emerald' | 'Amethyst' | 'Quartz' | 'Topaz' | string;

export interface TierColors {
  [key: string]: string;
  Diamond: string;
  Emerald: string;
  Amethyst: string;
  Quartz: string;
  Topaz: string;
}