/**
 * Calculates total units by summing the Qty TY column across all stores
 */
export function calculateTotalUnits(stores: any[]): number {
  return stores.reduce((total, store) => {
    const qtyTY = store['Qty TY'] || 0;
    return total + qtyTY;
  }, 0);
}