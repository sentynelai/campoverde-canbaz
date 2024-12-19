import { useMemo } from 'react';
import { PRODUCTS } from '../constants';
import type { StoreData } from '../../../types';

export function useBusinessMetrics(selectedStore: StoreData | null) {
  return useMemo(() => {
    if (!selectedStore) return { totalRevenue: 0, totalTarget: 0 };

    const revenue = PRODUCTS.reduce((acc, product) => {
      return acc + (selectedStore[product.salesColumn] || 0);
    }, 0);

    const target = PRODUCTS.reduce((acc, product) => acc + product.target, 0);

    return { totalRevenue: revenue, totalTarget: target };
  }, [selectedStore]);
}