/**
 * Calculates total sales from sales_52w column for multiple stores
 */
export function calculateTotalSales(stores: any[]): number {
  return stores.reduce((total, store) => {
    const sales = parseNumericValue(store.sales_52w);
    return total + sales;
  }, 0);
}

/**
 * Safely parses a string or number to a float value, handling comma separators
 */
function parseNumericValue(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === '') return 0;
  
  // If it's a string, remove commas before parsing
  if (typeof value === 'string') {
    value = value.replace(/,/g, '');
  }
  
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats large currency values with appropriate suffixes (K, M, B)
 */
export function formatLargeCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}