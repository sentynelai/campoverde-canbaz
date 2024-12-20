import { SHEETS_CONFIG } from '../config/constants';
import { logError } from '../utils/logger';
import { clearCache } from './cache';
import { validateCSVContent } from '../csv/validation';

export async function refreshDataSource(): Promise<boolean> {
  try {
    console.log('Starting data refresh...');
    
    // Fetch from Google Sheets
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_CONFIG.spreadsheetId}/export?format=csv&gid=${SHEETS_CONFIG.sheetId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status}`);
    }

    const content = await response.text();
    if (!content.trim()) {
      throw new Error('Received empty content');
    }

    // Validate content
    const validation = validateCSVContent(content);
    if (!validation.valid) {
      throw new Error(`Invalid CSV content: ${validation.error}`);
    }

    // Save to localStorage
    localStorage.setItem('stores-csv', content);
    localStorage.setItem('stores-csv-timestamp', Date.now().toString());

    // Clear API cache to force reload
    clearCache();
    
    console.log('Data refresh completed successfully');
    return true;
  } catch (error) {
    logError('Data refresh failed', error);
    return false;
  }
}