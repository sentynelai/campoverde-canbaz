import { writeFile } from 'fs/promises';
import { join } from 'path';

const SPREADSHEET_ID = '1yWXM53omNjeNQaVfb3vyodvTVUOldEhKkcTZrvmlWjM';
const SHEET_NAME = 'walmart-stores-tiers';

export async function POST(req: Request) {
  try {
    // Download CSV from Google Sheets
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get CSV content
    const csvContent = await response.text();

    // Write to local file
    const filePath = join(process.cwd(), 'public/data/stores.csv');
    await writeFile(filePath, csvContent, 'utf-8');

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error refreshing data:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}