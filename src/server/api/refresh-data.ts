import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const csvContent = await req.text();
    
    if (!csvContent?.trim()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No CSV content provided' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Write to public/data directory
    const filePath = join(process.cwd(), 'public', 'data', 'stores.csv');
    await writeFile(filePath, csvContent, 'utf-8');

    return new Response(
      JSON.stringify({ success: true }), 
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error saving CSV:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}