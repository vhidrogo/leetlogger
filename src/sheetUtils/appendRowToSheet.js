/**
 * Appends a row of values to the specified sheet in the active spreadsheet.
 * Optionally prepends a generated UUID as an insert ID.
 *
 * @param {string} sheetName - The name of the sheet to append the row to.
 * @param {Array<any>} rowValues - An array of values to append as a new row.
 * @param {boolean} [insertId=false] - Whether to prepend a UUID to the row as an insert ID.
 * @throws {Error} If the specified sheet is not found.
 */
function appendRowToSheet(sheetName, rowValues) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
        throw new Error(`Sheet "${sheetName}" not found.`);
    }
    
    sheet.appendRow(rowValues);
}

module.exports = { appendRowToSheet }
