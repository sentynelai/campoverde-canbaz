import { loadCSVData } from './csv';
import type { StoreData } from '../types';

let cachedData: {
  stores: StoreData[];
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let lastFetchTime = 0;

function validateCoordinates(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

export async function fetchStoreData(): Promise<{ data: StoreData[]; error?: string }> {
  try {
    // Return cached data if available and not expired
    if (cachedData?.stores && (Date.now() - lastFetchTime) < CACHE_DURATION) {
      return { data: cachedData.stores };
    }

    const storesData = await loadCSVData('stores');

    if (!storesData.length) {
      throw new Error('No store data available');
    }

    const stores: StoreData[] = storesData
      .filter(store => validateCoordinates(parseFloat(store.latitude), parseFloat(store.longitude)))
      .map(store => ({
        id: parseInt(store['Store Number']) || 0,
        name: store.name || `Store ${store.store_id}`,
        latitude: parseFloat(store.latitude),
        longitude: parseFloat(store.longitude),
        sales: parseFloat(store.total_sales) || 0,
        sales_52w: parseFloat(store.sales_52w) || 0,
        velocity_ty_cv: parseFloat(store.velocity_ty_cv) || 0,
        campoverde_sales: parseFloat(store.campoverde_sales) || 0,
        customers: parseInt(store.customers) || 0,
        region: store.region || 'Unknown',
        trend: parseFloat(store.trend) || 0,
        digitalAudience: parseInt(store.digital_audience) || 0,
        index: parseInt(store.index),
        reviews: parseInt(store.reviews) || 0,
        positive: parseInt(store.positive) || 0,
        negative: parseInt(store.negative) || 0,
        city: store.city,
        state: store.state,
        zip_code: parseInt(store.zip_code),
        phone_number_1: store.phone_number,
        street_address: store.address,
        'poblacion (10km)': parseInt(store['poblacion (10km)']),
        'CV ENERGY BOOST Sales': parseFloat(store['CV ENERGY BOOST Sales']) || 0,
        'CV EXOTIC INDULGENCE Sales': parseFloat(store['CV EXOTIC INDULGENCE Sales']) || 0,
        'CV ACAI ENERGIZE PWR Sales': parseFloat(store['CV ACAI ENERGIZE PWR Sales']) || 0,
        'CV PASSION BLISS Sales': parseFloat(store['CV PASSION BLISS Sales']) || 0,
        'CV FIT & WELLNESS Sales': parseFloat(store['CV FIT & WELLNESS Sales']) || 0,
        'CV CHIA SUPREMACY Sales': parseFloat(store['CV CHIA SUPREMACY Sales']) || 0,
        'Qty TY': parseInt(store['Qty TY']) || 0,
        'Qty LY': parseInt(store['Qty LY']) || 0,
        tier: store.sales_tier || 'Unknown',
        digital_audience_facebook: parseInt(store.digital_audience_facebook) || 0,
        digital_audience_instagram: parseInt(store.digital_audience_instagram) || 0,
        digital_audience_twitter: parseInt(store.digital_audience_twitter) || 0,
        digital_audience_linkedin: parseInt(store.digital_audience_linkedin) || 0,
        socialMedia: {
          facebook: parseInt(store.digital_audience_facebook) || 0,
          instagram: parseInt(store.digital_audience_instagram) || 0,
          twitter: parseInt(store.digital_audience_twitter) || 0,
          tiktok: 0
        }
      }));

    cachedData = { stores };
    lastFetchTime = Date.now();
    
    return { data: stores };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching store data:', errorMessage);
    
    if (cachedData?.stores) {
      return { 
        data: cachedData.stores,
        error: `Failed to fetch live data: ${errorMessage}. Using cached data.`
      };
    }
    
    return { 
      data: [],
      error: `Failed to fetch data: ${errorMessage}`
    };
  }
}

export async function refreshData(): Promise<boolean> {
  try {
    // Clear cache to force reload
    cachedData = null;
    lastFetchTime = 0;
    
    // Fetch fresh data
    const result = await fetchStoreData();
    return result.data.length > 0;
  } catch (error) {
    console.error('Error refreshing data:', error);
    return false;
  }
}