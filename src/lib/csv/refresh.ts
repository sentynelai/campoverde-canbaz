import { downloadCSV } from './downloader';
import { saveCSV } from './writer';
import { validateCSVContent } from './validation';
import { clearCache } from '../api/cache';
import { logError } from '../utils/logger';

export async function refreshCSVData(): Promise<boolean> {
  try {
    console.log('Starting CSV refresh...');
    
    // Download fresh CSV data
    const csvContent = await downloadCSV();
    console.log('CSV downloaded successfully');
    
    // Validate CSV content
    const validation = validateCSVContent(csvContent);
    if (!validation.valid) {
      throw new Error(`Invalid CSV content: ${validation.error}`);
    }
    console.log('CSV validation passed');

    // Save CSV to data directory
    await saveCSV(csvContent);
    console.log('CSV saved successfully');
    
    // Clear cache to force reload
    clearCache();
    console.log('Cache cleared');
    
    return true;
  } catch (error) {
    logError('CSV refresh failed', error);
    return false;
  }
}