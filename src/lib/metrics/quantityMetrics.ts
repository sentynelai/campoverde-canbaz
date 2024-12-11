import type { StoreData } from '../../types';

export interface QuantityMetrics {
  totalQtyTY: number;
  totalQtyLY: number;
  variation: number;
}

export function calculateQuantityMetrics(stores: StoreData[]): QuantityMetrics {
  const totalQtyTY = stores.reduce((sum, store) => sum + (store['Qty TY'] || 0), 0);
  const totalQtyLY = stores.reduce((sum, store) => sum + (store['Qty LY'] || 0), 0);
  const variation = totalQtyLY > 0 ? ((totalQtyTY - totalQtyLY) / totalQtyLY) * 100 : 0;

  return {
    totalQtyTY,
    totalQtyLY,
    variation
  };
}