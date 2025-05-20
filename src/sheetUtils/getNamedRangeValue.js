/**
 * Retrieves the value of a named range from the active spreadsheet.
 *
 * Throws an error if the specified named range does not exist.
 *
 * @param {string} name - The name of the named range to retrieve.
 * @returns {*} The value of the named range.
 * @throws {Error} If the named range does not exist.
 */
function getNamedRangeValue(name) {
    const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name);
    if (!range) {
        throw new Error(`Named range "${name}" does not exist.`);
    }
    return range.getValue();
}

module.exports = { getNamedRangeValue }
