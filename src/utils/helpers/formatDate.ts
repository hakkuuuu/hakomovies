// src/utils/formatter.js

interface DateFormatOptions {
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  year?: 'numeric' | '2-digit';
}

/**
 * Format a date string into a locale-based readable format.
 *
 * @param {string} dateString - The date string to format (e.g., "2025-02-04").
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {Object} [options] - Optional formatting options.
 * @returns {string} The formatted date.
 */
export function formatDate(
  dateString: string,
  locale: string = 'en-US',
  options?: DateFormatOptions
): string {
  const dateObj = new Date(dateString);

  const defaultOptions: DateFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };

  const formatOptions = options || defaultOptions;

  return dateObj.toLocaleDateString(locale, formatOptions);
}
