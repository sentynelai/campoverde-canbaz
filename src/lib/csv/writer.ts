import { logError } from '../utils/logger';
import { CSV_ENDPOINTS } from './config';

export async function saveCSV(content: string): Promise<void> {
  try {
    const response = await fetch(CSV_ENDPOINTS.local, {
      method: 'POST',
      headers: { 
        'Content-Type': 'text/plain',
        'Accept': 'application/json'
      },
      body: content
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: `Server error: ${response.status}` 
      }));
      throw new Error(error.message || 'Failed to save CSV');
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Server reported failure saving CSV');
    }
  } catch (error) {
    logError('CSV save failed', error);
    throw error;
  }
}