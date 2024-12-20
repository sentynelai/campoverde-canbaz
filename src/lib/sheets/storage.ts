import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { logError } from '../utils/logger';

const DATA_DIR = join(process.cwd(), 'public', 'data');
const CSV_PATH = join(DATA_DIR, 'stores.csv');

export async function saveToFile(content: string): Promise<void> {
  try {
    // Delete existing file if it exists
    try {
      await unlink(CSV_PATH);
      console.log('Existing CSV file removed');
    } catch (error) {
      // Ignore error if file doesn't exist
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    // Write new file
    await writeFile(CSV_PATH, content, 'utf-8');
    console.log('New CSV file created successfully');
  } catch (error) {
    logError('Failed to save file', error);
    throw new Error('Failed to save CSV file');
  }
}