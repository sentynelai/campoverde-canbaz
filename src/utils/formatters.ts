/**
 * Formats a number as currency without decimals and with thousand separators
 */
export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

/**
 * Formats a number with thousand separators and no decimals
 */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString();
}