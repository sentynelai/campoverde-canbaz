import { ENDPOINTS } from './config';
import { logError } from '../utils/logger';

const FETCH_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchSheetData(): Promise<string> {
  let lastError: Error | null = null;

  // Try each endpoint with retries
  for (const [name, url] of Object.entries(ENDPOINTS)) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Fetching from ${name} (attempt ${attempt})`);
        const response = await fetchWithTimeout(url);
        const content = await response.text();
        
        if (!content.trim()) {
          throw new Error('Received empty content');
        }

        console.log(`Successfully fetched from ${name}`);
        return content;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        logError(`Sheet fetch failed from ${name} (attempt ${attempt})`, error);
        
        if (attempt < MAX_RETRIES) {
          await delay(RETRY_DELAY);
        }
      }
    }
  }

  throw lastError || new Error('Failed to fetch sheet data from all endpoints');
}