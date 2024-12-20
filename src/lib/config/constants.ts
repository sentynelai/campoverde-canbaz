// Cache duration
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Google Sheets configuration
export const SHEETS_CONFIG = {
  spreadsheetId: '1yWXM53omNjeNQaVfb3vyodvTVUOldEhKkcTZrvmlWjM',
  sheetId: '284679544',
  sheetName: 'walmart-stores-tiers'
} as const;

// Map configuration
export const MAP_CONFIG = {
  defaultZoom: 4,
  defaultCenter: { lat: 39.8283, lng: -98.5795 }
} as const;