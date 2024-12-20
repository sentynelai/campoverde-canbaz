import Papa from 'papaparse';
import { CACHE_DURATION } from '../config/constants';

export async function loadCSVData(filename: string): Promise<any[]> {
  try {
    // Try to get data from localStorage first
    const cachedData = localStorage.getItem(`${filename}-csv`);
    const timestamp = localStorage.getItem(`${filename}-csv-timestamp`);
    
    // Check if cache is valid
    if (cachedData && timestamp && (Date.now() - parseInt(timestamp)) < CACHE_DURATION) {
      return parseCSVData(cachedData);
    }
    
    // Fetch fresh data
    const response = await fetch(`/data/${filename}.csv`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}.csv: ${response.statusText}`);
    }

    const csvText = await response.text();
    if (!csvText.trim()) {
      throw new Error('Empty CSV data received');
    }
    
    // Cache the response
    localStorage.setItem(`${filename}-csv`, csvText);
    localStorage.setItem(`${filename}-csv-timestamp`, Date.now().toString());
    
    return parseCSVData(csvText);
  } catch (error) {
    console.error(`Error loading CSV data:`, error);
    
    // Try to use cached data as fallback
    const cachedData = localStorage.getItem(`${filename}-csv`);
    if (cachedData) {
      console.log('Using cached CSV data');
      return parseCSVData(cachedData);
    }
    
    // If no cached data, return empty array
    return [];
  }
}

function parseCSVData(csvText: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => {
        if (typeof value === 'string') {
          value = value.trim();
          if (value === '') return null;
          // Try to parse numbers that might be formatted with commas
          if (/^-?\d+(?:,\d+)*(?:\.\d+)?$/.test(value)) {
            return parseFloat(value.replace(/,/g, ''));
          }
        }
        return value;
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }
        if (!results.data.length) {
          reject(new Error('No data found in CSV'));
          return;
        }
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}