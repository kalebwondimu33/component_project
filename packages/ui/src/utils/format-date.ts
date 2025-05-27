import { format, isValid, parseISO } from 'date-fns';

/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string to format
 * @param formatStr Format string to use (default: 'MMM dd, yyyy')
 * @returns Formatted date string or empty string if invalid
 */
export function formatDate(dateString: string | null | undefined, formatStr = 'MMM dd, yyyy'): string {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return '';
    
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Convert a date to ISO string format
 * @param date Date object to convert
 * @returns ISO string or null if invalid
 */
export function toISOString(date: Date | null | undefined): string | null {
  if (!date || !isValid(date)) return null;
  return date.toISOString();
}
