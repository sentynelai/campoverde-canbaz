/**
 * Centralized error logging
 */
export function logError(context: string, error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error(`[${context}]:`, {
    message: errorMessage,
    timestamp: new Date().toISOString(),
    error
  });
}