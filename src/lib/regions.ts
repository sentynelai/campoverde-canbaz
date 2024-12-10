export interface RegionData {
  name: string;
  totalSales: number;
  totalSKUs: number;
  totalStores: number;
  pySales: number;
  coordinates: [number, number];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export const REGIONS: { [key: string]: RegionData } = {
  northeast: {
    name: 'Northeast',
    totalSales: 12345678,
    totalSKUs: 120,
    totalStores: 25,
    pySales: 11000000,
    coordinates: [43.5, -73],
    bounds: {
      north: 47.5, // Maine
      south: 40.5, // Pennsylvania
      east: -66.9, // Maine
      west: -80.5  // Pennsylvania
    }
  },
  southeast: {
    name: 'Southeast',
    totalSales: 15678910,
    totalSKUs: 150,
    totalStores: 30,
    pySales: 14500000,
    coordinates: [33, -82],
    bounds: {
      north: 39.1, // Virginia
      south: 24.5, // Florida
      east: -75.2, // Eastern coast
      west: -88.1  // Mississippi
    }
  },
  midwest: {
    name: 'Midwest',
    totalSales: 9876543,
    totalSKUs: 110,
    totalStores: 20,
    pySales: 8500000,
    coordinates: [43, -87],
    bounds: {
      north: 49.4, // Minnesota
      south: 36.5, // Missouri
      east: -82.1, // Ohio
      west: -97.2  // North Dakota
    }
  },
  southwest: {
    name: 'Southwest',
    totalSales: 8765432,
    totalSKUs: 70,
    totalStores: 15,
    pySales: 7200000,
    coordinates: [32, -103],
    bounds: {
      north: 37.0, // Oklahoma
      south: 25.8, // Texas
      east: -88.1, // Mississippi
      west: -109.1 // Arizona
    }
  },
  westCoast: {
    name: 'West Coast',
    totalSales: 18987654,
    totalSKUs: 200,
    totalStores: 40,
    pySales: 17500000,
    coordinates: [42, -122],
    bounds: {
      north: 49.0, // Washington
      south: 32.5, // Southern California
      east: -111.0, // Montana/Idaho border
      west: -124.4  // Pacific Coast
    }
  },
  central: {
    name: 'Central Region',
    totalSales: 11234567,
    totalSKUs: 95,
    totalStores: 18,
    pySales: 10000000,
    coordinates: [39, -98],
    bounds: {
      north: 43.0, // South Dakota
      south: 37.0, // Kansas
      east: -90.1, // Missouri border
      west: -104.1 // Colorado
    }
  }
}