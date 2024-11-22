import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const SPREADSHEET_ID = '1yWXM53omNjeNQaVfb3vyodvTVUOldEhKkcTZrvmlWjM';
const SHEET_NAME = 'walmart-stores-tiers';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function downloadSheet() {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const dataPath = `${__dirname}/../public/data`;
    await mkdir(dataPath, { recursive: true });
    
    const fileStream = createWriteStream(`${dataPath}/stores.csv`);
    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    
    fileStream.write(uint8Array);
    fileStream.end();
    
    console.log('✓ Downloaded stores.csv');
    return true;
  } catch (error) {
    console.error('✗ Error downloading stores.csv:', error.message);
    throw error;
  }
}