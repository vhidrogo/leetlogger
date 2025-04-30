/**
 * Filters columns of a 2D array based on a subset array of headers.
 * 
 * @param {Array[]} data - 2D array including headers in the first row.
 * @param {Array} filterHeaders - Array of subset headers to keep.
 * @returns {Array[]} Filtered array including only the given headers.
 */
function filter2DArrayColumns(data, filterHeaders) {
    if (data.length === 0) return [];

    const headers = data[0];

    const filterIndices = headers.map((header, idx) =>
        filterHeaders.includes(header) ? idx : -1
    ).filter(idx => idx !== -1);

    return data.map(row => filterIndices.map(i => row[i]));
}

module.exports = { filter2DArrayColumns }