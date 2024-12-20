import { CSV_ENDPOINTS, CSV_CONFIG } from './config';
import { logError } from '../utils/logger';
import { delay } from '../utils/timing';

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function attemptDownload(url: string): Promise<string> {
  const response = await fetchWithTimeout(url, CSV_CONFIG.timeout);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const content = await response.text();
  if (!content.trim()) {
    throw new Error('Received empty CSV content');
  }
  
  return content;
}

export async function downloadCSV(): Promise<string> {
  let lastError: Error | null = null;
  
  // Try each endpoint with retries
  for (const [name, url] of Object.entries(CSV_ENDPOINTS)) {
    if (url === CSV_ENDPOINTS.local) continue; // Skip local endpoint for downloads
    
    for (let attempt = 1; attempt <= CSV_CONFIG.retryAttempts; attempt++) {
      try {
        console.log(`Attempting download from ${name} (attempt ${attempt})`);
        const content = await attemptDownload(url);
        console.log(`Successfully downloaded CSV from ${name}`);
        return content;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        logError(`CSV download failed from ${name} (attempt ${attempt})`, error);
        
        if (attempt < CSV_CONFIG.retryAttempts) {
          await delay(CSV_CONFIG.retryDelay);
        }
      }
    }
  }
  
  throw lastError || new Error('Failed to download CSV from all endpoints');
}