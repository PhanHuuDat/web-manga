/**
 * Extracts a user-friendly error message from API error responses.
 * Handles ProblemDetails format (RFC 9457) with errors array or detail string.
 */
export function extractError(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const resp = (err as { response?: { data?: { detail?: string; errors?: string[] } } }).response;
    if (resp?.data?.detail) return resp.data.detail;
    if (resp?.data?.errors) return resp.data.errors.join('; ');
  }
  return 'Something went wrong. Please try again.';
}
