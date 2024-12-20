// Cache management for API data
export interface CacheState {
  lastFetchTime: number;
  data: any;
}

let cacheState: CacheState = {
  lastFetchTime: 0,
  data: null
};

export function getCacheState(): CacheState {
  return cacheState;
}

export function updateCache(data: any) {
  cacheState = {
    lastFetchTime: Date.now(),
    data
  };
}

export function clearCache() {
  cacheState = {
    lastFetchTime: 0,
    data: null
  };
}