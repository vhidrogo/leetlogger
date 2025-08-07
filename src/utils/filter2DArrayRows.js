/**
 * Filters rows of a 2D array based on an array of filter criteria.
 *
 * @param {Array[]} data - 2D array where the first row contains header names.
 * @param {Array<{field: string, value: string|number, mode: 'equals'|'includes'}>} criteria - 
 *   Array of filter objects specifying the target column (field), the value to match, 
 *   and the matching mode ('equals' for exact match, 'includes' for substring match).
 * @returns {Array[]} A new 2D array including the headers and rows that match all provided criteria.
 *   Returns an empty array if no rows match.
 * @throws {Error} If any of the specified fields in criteria are not found in the data headers.
 */
function filter2DArrayRows(data, criteria) {
    if (data.length === 0) return [];
  
    const headers = data[0];
    const headerIndices = {};
  
    // Map header names to indices, throw if missing any required ones
    criteria.forEach(({ field }) => {
      const index = headers.indexOf(field);
      if (index === -1) {
        throw new Error(`Required column '${field}' is missing from the data.`);
      }
      headerIndices[field] = index;
    });

    const filtered = data.slice(1).filter(row =>
      criteria.every(({ field, value, mode }) => {
        const cellValue = row[headerIndices[field]]?.toString().toLowerCase();

        const values = typeof value === 'string' && value.includes(',')
          ? value.split(',').map(v => v.trim().toLowerCase())
          : [value.toString().toLowerCase()];

        if (mode === 'equals') {
          return values.some(val => cellValue === val);
        } else if (mode === 'includes') {
          return values.some(val => cellValue.includes(val));
        }

        return false;
      })
    );
  
    return filtered.length ? [headers, ...filtered] : []
}

module.exports = { filter2DArrayRows };
