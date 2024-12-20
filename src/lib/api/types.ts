import type { StoreData } from '../../types';

export interface APIResponse<T> {
  data: T;
  error?: string;
}

export interface StoreDataResponse extends APIResponse<StoreData[]> {}