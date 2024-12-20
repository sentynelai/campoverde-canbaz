/**
 * Validates CSV content before saving
 */
export function validateCSVContent(content: string): { valid: boolean; error?: string } {
  if (!content?.trim()) {
    return { valid: false, error: 'CSV content is empty' };
  }

  // Check for header row
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    return { valid: false, error: 'CSV must contain header row and data' };
  }

  // Validate header row contains required columns
  const headers = lines[0].toLowerCase();
  const requiredColumns = [
    'store number',
    'latitude',
    'longitude',
    'sales_52w'
  ];

  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  if (missingColumns.length > 0) {
    return { 
      valid: false, 
      error: `Missing required columns: ${missingColumns.join(', ')}` 
    };
  }

  return { valid: true };
}