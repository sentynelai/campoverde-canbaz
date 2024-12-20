/**
 * Safely parses a string or number to a float value, handling comma separators
 */
export function parseNumericValue(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === '') return 0;
  
  // If it's a string, remove commas before parsing
  if (typeof value === 'string') {
    value = value.replace(/,/g, '');
  }
  
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : parsed;
}