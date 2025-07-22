// src/utils/formatter.js

/**
 * Format a date string into a locale-based readable format.
 *
 * @param {string} dateString - The date string to format (e.g., "2025-02-04").
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {Object} [options] - Optional formatting options.
 * @returns {string} The formatted date.
 */
export function formatDate(dateString, locale = 'en-US', options) {
    const dateObj = new Date(dateString);

    // Define default formatting options if none provided.
    const defaultOptions = {
        month: 'short', // e.g., "Feb"
        day: 'numeric', // e.g., "4"
        year: 'numeric' // e.g., "2025"
    };

    // Use the provided options if available, otherwise use the default options.
    const formatOptions = options || defaultOptions;

    return dateObj.toLocaleDateString(locale, formatOptions);
}
