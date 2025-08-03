/**
 * Retrieves a named range from the active spreadsheet.
 *
 * @param {string} rangeName - The name of the named range to retrieve.
 * @returns {GoogleAppsScript.Spreadsheet.Range} The named range object.
 * @throws {Error} If the named range is not found.
 */
function getNamedRange(rangeName) {
    if (!rangeName) throw new Error('Range name required!');
    const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(rangeName);
    if (!range) {
        throw new Error(`Named range "${rangeName}" not found.`);
    }
    
    return range;
}

module.exports = { getNamedRange }
