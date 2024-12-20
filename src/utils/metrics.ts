import { parseNumericValue } from '../lib/utils/numbers';

const MAX_EXPECTED_VELOCITY = 1000; // Adjust this based on your data

/**
 * Calculates the sales growth percentage by comparing current year sales with previous year
 */
export function calculateSalesGrowth(stores: any[]): number {
  const currentYearSales = stores.reduce((sum, store) => {
    return sum + parseNumericValue(store.sales_52w);
  }, 0);

  const previousYearSales = stores.reduce((sum, store) => {
    return sum + parseNumericValue(store.sales_52w_py);
  }, 0);

  if (!previousYearSales) return 0;
  return ((currentYearSales - previousYearSales) / previousYearSales) * 100;
}

/**
 * Calculates velocity as total sales over stores with sales > 0, divided by 52
 */
export function calculateVelocity(stores: any[]): number {
  // Filter stores with sales > 0
  const activeStores = stores.filter(store => parseNumericValue(store.sales_52w) > 0);
  
  if (activeStores.length === 0) return 0;

  // Calculate total sales
  const totalSales = activeStores.reduce((sum, store) => {
    return sum + parseNumericValue(store.sales_52w);
  }, 0);

  // Calculate velocity (total sales / number of active stores / 52 weeks)
  return (totalSales / activeStores.length / 52);
}

/**
 * Converts velocity value to a percentage for gauge display
 */
export function getVelocityPercentage(velocity: number): number {
  return Math.min((velocity / MAX_EXPECTED_VELOCITY) * 100, 100);
}