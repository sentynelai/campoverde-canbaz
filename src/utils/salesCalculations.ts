export const PRODUCT_FIELDS = [
  'CV ENERGY BOOST Sales',
  'CV EXOTIC INDULGENCE Sales',
  'CV ACAI ENERGIZE PWR Sales',
  'CV PASSION BLISS Sales',
  'CV FIT & WELLNESS Sales',
  'CV CHIA SUPREMACY Sales'
];

export function calculateTotalProductSales(store: any): number {
  return PRODUCT_FIELDS.reduce((total, field) => {
    return total + (store[field] || 0);
  }, 0);
}