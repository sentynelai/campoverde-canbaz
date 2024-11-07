export interface StoreData {
  id: number;
  lat: number;
  lng: number;
  sales: number;
  customers: number;
  digitalAudience: number;
  region: 'West' | 'East' | 'Central';
  trend: number;
}

export const STORE_DATA: StoreData[] = [
  {
    id: 1001,
    lat: 34.0522,
    lng: -118.2437,
    sales: 3100000,
    customers: 18500,
    digitalAudience: 45000,
    region: 'West',
    trend: 12.5
  },
  {
    id: 1002,
    lat: 40.7128,
    lng: -74.0060,
    sales: 2800000,
    customers: 16800,
    digitalAudience: 38000,
    region: 'East',
    trend: 8.3
  },
  {
    id: 1003,
    lat: 41.8781,
    lng: -87.6298,
    sales: 2500000,
    customers: 15000,
    digitalAudience: 32000,
    region: 'Central',
    trend: -2.1
  },
  {
    id: 1004,
    lat: 29.7604,
    lng: -95.3698,
    sales: 2900000,
    customers: 17200,
    digitalAudience: 41000,
    region: 'Central',
    trend: 15.7
  },
  {
    id: 1005,
    lat: 33.7490,
    lng: -84.3880,
    sales: 2600000,
    customers: 15500,
    digitalAudience: 35000,
    region: 'East',
    trend: 5.2
  },
  {
    id: 1006,
    lat: 39.9526,
    lng: -75.1652,
    sales: 2700000,
    customers: 16000,
    digitalAudience: 37000,
    region: 'East',
    trend: -1.8
  },
  {
    id: 1007,
    lat: 47.6062,
    lng: -122.3321,
    sales: 2400000,
    customers: 14300,
    digitalAudience: 31000,
    region: 'West',
    trend: 9.4
  },
  {
    id: 1008,
    lat: 36.1699,
    lng: -115.1398,
    sales: 2200000,
    customers: 13100,
    digitalAudience: 28000,
    region: 'West',
    trend: 6.8
  }
];