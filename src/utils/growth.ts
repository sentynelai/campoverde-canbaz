/**
 * Calculates growth percentage between current and previous values
 */
export function calculateGrowthPercentage(current: number, previous: number): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Calculates total sales growth using current (sales_52w) and previous year sales
 */
export function calculateTotalSalesGrowth(stores: any[]): {
  currentSales: number;
  previousSales: number;
  growthPercentage: number;
} {
  const currentSales = stores.reduce((sum, store) => sum + (store.sales_52w || 0), 0);
  const previousSales = stores.reduce((sum, store) => sum + (store.sales_52w_py || 0), 0);
  
  return {
    currentSales,
    previousSales,
    growthPercentage: calculateGrowthPercentage(currentSales, previousSales)
  };
}

/**
 * Calculates total units growth using current and previous year quantities
 */
export function calculateTotalUnitsGrowth(stores: any[]): {
  currentUnits: number;
  previousUnits: number;
  growthPercentage: number;
} {
  const currentUnits = stores.reduce((sum, store) => sum + (store['Qty TY'] || 0), 0);
  const previousUnits = stores.reduce((sum, store) => sum + (store['Qty LY'] || 0), 0);

  return {
    currentUnits,
    previousUnits,
    growthPercentage: calculateGrowthPercentage(currentUnits, previousUnits)
  };
}