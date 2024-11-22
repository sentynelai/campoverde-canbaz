import Papa from 'papaparse';

export async function loadCSVData(filename: string): Promise<any[]> {
  try {
    // Try to get data from localStorage first
    const cachedData = localStorage.getItem('stores-csv');
    const timestamp = localStorage.getItem('stores-csv-timestamp');
    
    let csvText: string;
    
    if (cachedData && timestamp && (Date.now() - parseInt(timestamp)) < 300000) {
      csvText = cachedData;
    } else {
      const response = await fetch(`/data/${filename}.csv?t=${Date.now()}`);
      csvText = await response.text();
      
      // Cache the response
      localStorage.setItem('stores-csv', csvText);
      localStorage.setItem('stores-csv-timestamp', Date.now().toString());
    }
    
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
          }
          return value;
        },
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error(`Error loading ${filename}.csv:`, error);
    return [];
  }
}