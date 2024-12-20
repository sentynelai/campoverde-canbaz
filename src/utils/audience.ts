/**
 * Calculates total digital audience by summing all digital audience metrics
 */
export function calculateTotalDigitalAudience(stores: any[]): number {
  return stores.reduce((total, store) => {
    const facebook = store.digital_audience_facebook || 0;
    const instagram = store.digital_audience_instagram || 0;
    const twitter = store.digital_audience_twitter || 0;
    const linkedin = store.digital_audience_linkedin || 0;
    
    return total + facebook + instagram + twitter + linkedin;
  }, 0);
}