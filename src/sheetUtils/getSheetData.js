const { filter2DArrayColumns } = require("../utils/filter2DArrayColumns");

/**
 * 
 * @param {string} sheetName - The name of the sheet to retrieve data from.
 * @param {string[]} includeColumns - Optional subset list of columns to include.
 * @returns {Array[]} The sheet data as a 2D array.
 */
function getSheetData(sheetName, includeColumns) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) throw new Error(`${sheetName} sheet not found.`);

    let data = sheet.getDataRange().getValues();
    if (includeColumns && includeColumns.length) {
        data = filter2DArrayColumns(data, includeColumns);
    }

    return data;
}

// Manual test to visually inspect results
function getSheetDataTest() {
    const sheetName = 'Problems';
    const includeColumns = ['LC ID', 'Dominant Topic'];
    const data = getSheetData(sheetName, includeColumns);
  
    Logger.log(`getSheetData(sheetName='${sheetName}', includeColumns=[${includeColumns}]`);
    Logger.log('data.slice(0, 5):')
    Logger.log(data.slice(0, 5));
  }
