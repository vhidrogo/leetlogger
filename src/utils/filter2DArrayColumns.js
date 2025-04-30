/**
 * Filters columns of a 2D array based on a subset array of headers.
 * 
 * @param {Array[]} data - 2D array including headers in the first row.
 * @param {Array} excludeColumns - Array of subset columns to exclude.
 * @returns {Array[]} Filtered array including only the given columns.
 */
function filter2DArrayColumns(data, excludeColumns) {
    if (data.length === 0) return [];

    const headers = data[0];

    const filterIndices = headers.map((header, idx) =>
        excludeColumns.includes(header) ? -1 : idx
    ).filter(idx => idx !== -1);

    return data.map(row => filterIndices.map(i => row[i]));
}

module.exports = { filter2DArrayColumns }