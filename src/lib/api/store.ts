import { CACHE_DURATION } from '../config/constants';
import { loadCSV } from '../csv/loader';
import { parseNumericValue } from '../utils/numbers';
import { getCacheState, updateCache } from './cache';
import type { StoreData } from '../../types';
import type { StoreDataResponse } from './types';

function validateStore(store: any): boolean {
  return (
    store &&
    typeof store.latitude === 'number' &&
    typeof store.longitude === 'number' &&
    !isNaN(store.latitude) &&
    !isNaN(store.longitude) &&
    store.latitude >= -90 &&
    store.latitude <= 90 &&
    store.longitude >= -180 &&
    store.longitude <= 180 &&
    store['Store Number']
  );
}

export async function fetchStoreData(): Promise<StoreDataResponse> {
  try {
    const { lastFetchTime, data: cachedData } = getCacheState();
    
    // Return cached data if valid
    if (cachedData?.stores && (Date.now() - lastFetchTime) < CACHE_DURATION) {
      return { data: cachedData.stores };
    }

    const rawData = await loadCSV({ fallbackToCache: true });
    
    if (!rawData || !rawData.length) {
      throw new Error('No store data available');
    }

    const stores: StoreData[] = rawData
      .filter(validateStore)
      .map(store => ({
        id: parseInt(store['Store Number']) || 0,
        name: store.name || '',
        latitude: parseFloat(store.latitude),
        longitude: parseFloat(store.longitude),
        sales_52w: parseNumericValue(store.sales_52w),
        sales_52w_py: parseNumericValue(store.sales_52w_py),
        campoverde_sales: parseNumericValue(store.campoverde_sales),
        digital_audience: parseNumericValue(store.digital_audience),
        digital_audience_facebook: parseNumericValue(store.digital_audience_facebook),
        digital_audience_instagram: parseNumericValue(store.digital_audience_instagram),
        digital_audience_twitter: parseNumericValue(store.digital_audience_twitter),
        digital_audience_linkedin: parseNumericValue(store.digital_audience_linkedin),
        tier: store.sales_tier || 'Unknown',
        city: store.city || '',
        state: store.state || '',
        reviews: parseNumericValue(store.reviews),
        positive: parseNumericValue(store.positive),
        negative: parseNumericValue(store.negative),
        'Qty TY': parseNumericValue(store['Qty TY']),
        'CV ENERGY BOOST Sales': parseNumericValue(store['CV ENERGY BOOST Sales']),
        'CV EXOTIC INDULGENCE Sales': parseNumericValue(store['CV EXOTIC INDULGENCE Sales']),
        'CV ACAI ENERGIZE PWR Sales': parseNumericValue(store['CV ACAI ENERGIZE PWR Sales']),
        'CV PASSION BLISS Sales': parseNumericValue(store['CV PASSION BLISS Sales']),
        'CV FIT & WELLNESS Sales': parseNumericValue(store['CV FIT & WELLNESS Sales']),
        'CV CHIA SUPREMACY Sales': parseNumericValue(store['CV CHIA SUPREMACY Sales'])
      }));

    updateCache({ stores });
    return { data: stores };

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Store data fetch error:', message);
    
    const { data: cachedData } = getCacheState();
    if (cachedData?.stores) {
      return { 
        data: cachedData.stores,
        error: `Failed to fetch live data: ${message}. Using cached data.`
      };
    }
    
    return { 
      data: [],
      error: `Failed to fetch data: ${message}`
    };
  }
}