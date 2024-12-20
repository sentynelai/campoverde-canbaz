import Papa from 'papaparse';
import { CACHE_DURATION } from '../config/constants';

interface CSVLoaderOptions {
  fallbackToCache?: boolean;
  throwOnEmpty?: boolean;
}

export async function loadCSV(options: CSVLoaderOptions = {}): Promise<any[]> {
  const { fallbackToCache = true, throwOnEmpty = true } = options;

  try {
    // Try to get data from localStorage first
    const cachedData = localStorage.getItem('stores-csv');
    const timestamp = localStorage.getItem('stores-csv-timestamp');
    
    // Check if cache is valid
    if (cachedData && timestamp && (Date.now() - parseInt(timestamp)) < CACHE_DURATION) {
      return parseCSV(cachedData);
    }

    // If local load fails, try Google Sheets
    const url = `/data/stores.csv?t=${Date.now()}`; // Add cache buster
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    if (!csvText.trim()) {
      throw new Error('Received empty CSV data');
    }

    const data = await parseCSV(csvText);
    if (throwOnEmpty && (!data || !data.length)) {
      throw new Error('No data found in CSV');
    }

    return data;
  } catch (error) {
    console.error('CSV loading error:', error);

    if (fallbackToCache) {
      const cachedData = localStorage.getItem('stores-csv');
      if (cachedData) {
        console.log('Using cached data');
        return parseCSV(cachedData);
      }
    }

    throw error;
  }
}

async function parseCSV(csvText: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => {
        if (typeof value === 'string') {
          value = value.trim();
          return value || null;
        }
        return value;
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }
        resolve(results.data);
      },
      error: reject
    });
  });
}