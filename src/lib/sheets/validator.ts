interface ValidationResult {
  valid: boolean;
  error?: string;
}

const REQUIRED_COLUMNS = [
  'Store Number',
  'latitude',
  'longitude',
  'sales_52w'
];

export function validateContent(content: string): ValidationResult {
  if (!content?.trim()) {
    return { valid: false, error: 'Content is empty' };
  }

  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    return { valid: false, error: 'Content must have header and data' };
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const missingColumns = REQUIRED_COLUMNS.filter(col => 
    !headers.some(h => h.toLowerCase() === col.toLowerCase())
  );

  if (missingColumns.length > 0) {
    return { 
      valid: false, 
      error: `Missing required columns: ${missingColumns.join(', ')}` 
    };
  }

  return { valid: true };
}