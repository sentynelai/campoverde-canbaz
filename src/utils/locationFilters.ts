// Coordinate boundaries for continental US
const CONTINENTAL_US_BOUNDS = {
  north: 49.384358,  // Northern border
  south: 24.396308,  // Southern Florida
  east: -66.934570,  // Eastern Maine
  west: -124.848974  // Western Washington
};

export function isInContinentalUS(latitude: number, longitude: number): boolean {
  return (
    latitude >= CONTINENTAL_US_BOUNDS.south &&
    latitude <= CONTINENTAL_US_BOUNDS.north &&
    longitude >= CONTINENTAL_US_BOUNDS.west &&
    longitude <= CONTINENTAL_US_BOUNDS.east
  );
}