import { SHEETS_CONFIG } from '../config/constants';

// Direct download URL for Google Sheets CSV export
const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SHEETS_CONFIG.spreadsheetId}/export`;

export const CSV_ENDPOINTS = {
  // Primary endpoint - direct CSV export with sheet ID
  primary: `${SHEETS_URL}?format=csv&gid=${SHEETS_CONFIG.sheetId}`,
  
  // Backup endpoint - using tq parameter
  backup: `${SHEETS_URL}/gviz/tq?tqx=out:csv&gid=${SHEETS_CONFIG.sheetId}`,
  
  // Local endpoint for saving
  local: '/server/api/refresh-data'
} as const;

export const CSV_CONFIG = {
  requiredColumns: ['Store Number', 'latitude', 'longitude', 'sales_52w'],
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000 // 10 seconds
} as const;