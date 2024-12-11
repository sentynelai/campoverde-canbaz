import useSWR from 'swr';
import { fetchStoreData, refreshData } from '../lib/api';
import type { StoreData } from '../types';
import { atom, useAtom } from 'jotai';
import { useState, useCallback, useMemo } from 'react';

const lastUpdateAtom = atom<Date>(new Date());
const isRefreshingAtom = atom<boolean>(false);
export const errorMessageAtom = atom<string | null>(null);

const CACHE_KEY = 'store-data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const hasProductSales = (store: StoreData): boolean => {
  const productSalesFields = [
    'CV ENERGY BOOST Sales',
    'CV EXOTIC INDULGENCE Sales',
    'CV ACAI ENERGIZE PWR Sales',
    'CV PASSION BLISS Sales',
    'CV FIT & WELLNESS Sales',
    'CV CHIA SUPREMACY Sales'
  ];

  return productSalesFields.some(field => (store[field] || 0) > 0);
};

export function useStoreData() {
  const [lastUpdate, setLastUpdate] = useAtom(lastUpdateAtom);
  const [isRefreshing, setIsRefreshing] = useAtom(isRefreshingAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<{ data: StoreData[]; error?: string }>(
    CACHE_KEY,
    fetchStoreData,
    {
      refreshInterval: CACHE_DURATION,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      dedupingInterval: 60000,
      fallbackData: { data: [] },
      suspense: false
    }
  );

  // Stores with product sales (for map markers)
  const stores = useMemo(() => {
    const allStores = data?.data || [];
    return allStores.filter(hasProductSales);
  }, [data]);

  // All stores (for summary data)
  const allStores = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleRefreshData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setErrorMessage(null);
      
      const success = await refreshData();
      if (success) {
        const result = await mutate(undefined, { revalidate: true });
        
        if (result?.error) {
          setErrorMessage(result.error);
          setShowErrorModal(true);
        }
      } else {
        setErrorMessage('Failed to refresh data');
        setShowErrorModal(true);
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to refresh data';
      console.error('Error refreshing data:', message);
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [mutate, setIsRefreshing, setErrorMessage, setLastUpdate]);

  return {
    stores, // Filtered stores for map
    allStores, // All stores for summary data
    isLoading,
    isError: error,
    refreshData: handleRefreshData,
    lastUpdate,
    isRefreshing,
    errorMessage,
    showErrorModal,
    setShowErrorModal
  };
}