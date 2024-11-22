import { useStoreData } from './useStoreData';
import { useAtom } from 'jotai';
import { errorMessageAtom } from './useStoreData';
import { useEffect } from 'react';

const PRODUCT_TARGETS = {
  'CV ENERGY BOOST Sales': 2500000,
  'CV EXOTIC INDULGENCE Sales': 2300000,
  'CV ACAI ENERGIZE PWR Sales': 3000000,
  'CV PASSION BLISS Sales': 2000000,
  'CV FIT & WELLNESS Sales': 2800000,
  'CV CHIA SUPREMACY Sales': 1800000
};

export function useProductKPIs() {
  const [, setErrorMessage] = useAtom(errorMessageAtom);
  const { stores, isLoading } = useStoreData();

  const products = Object.entries(PRODUCT_TARGETS).map(([name, target]) => ({
    id: name,
    name: name.replace(' Sales', ''),
    current: stores.reduce((sum, store) => sum + (store[name] || 0), 0),
    target
  }));

  useEffect(() => {
    if (!stores.length) {
      setErrorMessage('No store data available');
    }
  }, [stores, setErrorMessage]);

  return {
    products,
    isError: !stores.length,
    isLoading,
    refreshData: () => {} // No-op since data is derived from stores
  };
}