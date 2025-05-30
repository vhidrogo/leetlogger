/**
 * Returns a human-readable string representing the time elapsed 
 * since the given date until now, in months and days. 
 * The calculation is based on UTC dates at midnight.
 *
 * Examples:
 * - "1 month and 3 days ago"
 * - "0 days ago"
 *
 * @param {string|Date} sinceDate - The starting date to compare against the current date.
 *                                  Can be a date string or Date object.
 * @returns {string} A formatted string describing the elapsed time in months and days.
 */
function formatTimeSince(sinceDate) {
    const from = normalizeToMidnightUTC(new Date(sinceDate));
    const to = normalizeToMidnightUTC(new Date());

    let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12;
    months += to.getUTCMonth() - from.getUTCMonth();

    // If the 'to' day is before 'from' day in the current month, subtract 1 month
    const fromDay = from.getUTCDate();
    const toDay = to.getUTCDate();
    if (toDay < fromDay) {
        months--;
    }

    // Now calculate remaining days after subtracting full months
    const monthAdjustedFrom = new Date(from);
    monthAdjustedFrom.setUTCMonth(monthAdjustedFrom.getUTCMonth() + months);

    let days = Math.floor((to - monthAdjustedFrom) / (1000 * 60 * 60 * 24));

    const dayLabel = `${days} ${days === 1 ? 'day' : 'days'} ago`;

    if (months === 0) return dayLabel;

    const monthLabel = `${months} ${months === 1 ? 'month' : 'months'}`;
    return `${monthLabel} and ${dayLabel}`;
}

/**
 * Normalizes a given Date object to midnight UTC.
 *
 * @param {Date} rawDate - The Date object to normalize.
 * @returns {Date} A new Date object set to midnight UTC on the same calendar day.
 */
function normalizeToMidnightUTC(rawDate) {
    return new Date(Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()));
}

module.exports = { formatTimeSince }