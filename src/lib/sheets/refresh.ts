import { SHEETS_CONFIG } from '../config/constants';
import { clearCache } from '../api/cache';
import { logError } from '../utils/logger';

export async function refreshStoreData(): Promise<boolean> {
  try {
    console.log('Starting store data refresh...');
    
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

    // Save to server
    const saveResponse = await fetch('/api/refresh-data', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: content
    });

    const result = await saveResponse.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to save data');
    }

    // Clear cache to force reload
    clearCache();
    console.log('Data refresh completed successfully');
    
    return true;
  } catch (error) {
    logError('Store data refresh failed', error);
    return false;
  }
}