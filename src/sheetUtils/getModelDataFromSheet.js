const { filter2DArrayColumns } = require("../utils/filter2DArrayColumns");
const { normalizeHeaders } = require("../dataModelUtils/normalizeHeaders");

/**
 * Retrieves data from a sheet associated with the given model name, normalizing the header row
 * based on the model's defined field mapping.
 *
 * @param {string} modelName - The name of the model to retrieve data for (e.g., 'Problem').
 * @returns {Array[]} A 2D array where the first row contains normalized field names
 *                    and subsequent rows contain the sheet data.
 * @throws {Error} If the corresponding sheet is not found in the active spreadsheet.
 */
function getModelDataFromSheet(modelName) {
    const sheetName = modelName + 's';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) throw new Error(`${sheetName} sheet not found.`);

    const [headers, ...rows] = sheet.getDataRange().getValues();
    const fields = normalizeHeaders(headers, modelName);  

    return [fields, ...rows];
}

// Manual test to visually inspect results
function getModelDataFromSheetTest() {
    const modelName = 'Problem';
    const data = getModelDataFromSheet(modelName);
  
    Logger.log(`getModelDataFromSheet(modelName='${modelName}'`);
    Logger.log('data.slice(0, 5):');
    Logger.log(data.slice(0, 5));
  }

module.exports = { getModelDataFromSheet }