/**
 * Filters rows of a 2D array based on a criteria map.
 *
 * @param {Array[]} data - 2D array including headers in the first row.
 * @param {Object} criteriaMap - Key-value pairs where keys are header names and values are filter values. Use 'All' to skip filtering on a column.
 * @returns {Array[]} Filtered array of rows.
 */
function filter2DArrayRows(data, criteriaMap) {
    if (data.length === 0) return [];
  
    const headers = data[0];
    const headerIndices = {};
  
    // Map header names to indices, throw if missing any required ones
    Object.keys(criteriaMap).forEach(key => {
      const index = headers.indexOf(key);
      if (index === -1) {
        throw new Error(`Required column '${key}' is missing from the data.`);
      }
      headerIndices[key] = index;
    });

    const filtered = data.slice(1).filter(row =>
      Object.entries(criteriaMap).every(([key, value]) =>
        value === 'All' || row[headerIndices[key]] === value
      )
    );
  
    return filtered.length ? [headers, ...filtered] : []
}

module.exports = { filter2DArrayRows };
