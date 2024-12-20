export const SHEETS_CONFIG = {
  spreadsheetId: '1yWXM53omNjeNQaVfb3vyodvTVUOldEhKkcTZrvmlWjM',
  sheetId: '284679544',
  baseUrl: 'https://docs.google.com/spreadsheets/d',
  exportFormats: {
    csv: 'format=csv',
    tq: 'tqx=out:csv'
  }
} as const;

export const ENDPOINTS = {
  // Direct CSV export
  primary: `${SHEETS_CONFIG.baseUrl}/${SHEETS_CONFIG.spreadsheetId}/export?${SHEETS_CONFIG.exportFormats.csv}&gid=${SHEETS_CONFIG.sheetId}`,
  
  // Alternative export using tq parameter
  backup: `${SHEETS_CONFIG.baseUrl}/${SHEETS_CONFIG.spreadsheetId}/gviz/tq?${SHEETS_CONFIG.exportFormats.tq}&gid=${SHEETS_CONFIG.sheetId}`
} as const;