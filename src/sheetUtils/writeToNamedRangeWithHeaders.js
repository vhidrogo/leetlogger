/**
 * Writes a list of objects to a named range in the active spreadsheet,
 * preserving the first row (headers) of the range. 
 * Each object’s properties are mapped to columns based on the header names.
 * If there are fewer objects than data rows, remaining rows are cleared.
 *
 * @param {Object[]} objects - Array of objects to write. Each key should match a header in the first row of the named range.
 * @param {string} rangeName - The name of the range to write to. Must include headers in the first row.
 */
function writeToNamedRangeWithHeaders(objects, rangeName) {
    const range = getNamedRange(rangeName);
    const numRows = range.getNumRows();
    const numCols = range.getNumColumns();
    const rawHeaders = range.getValues()[0].map(h => h.trim());
    const headers = toCamelCaseHeaders(rawHeaders);

    const dataRows = numRows - 1;
    const dataRange = range.offset(1, 0, dataRows, numCols);

    const values = objects.slice(0, dataRows).map(obj => 
        headers.map(header => obj[header] !== undefined ? obj[header] : '')
    );

    while (values.length < dataRows) {
        values.push(new Array(numCols).fill(''));
    }

    dataRange.setValues(values);
}

function toCamelCaseHeaders(headers) {
  return headers.map(str => {
    const words = str.trim().split(/\s+/);
    return words
      .map((word, index) => {
        const lower = word.toLowerCase();
        if (index === 0) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join('');
  });
}

module.exports = { writeToNamedRangeWithHeaders }
