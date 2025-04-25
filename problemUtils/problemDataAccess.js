/**
 * Fetches problem data from the Problems sheet.
 * @returns {Array[]} 2D array of problem data including headers.
 */
function getProblemsData() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Problems');
    if (!sheet) throw new Error('Problems sheet not found.');
  
    const range = sheet.getDataRange();
    return range.getValues();
  }

/**
 * Fetches problems from the Problems sheet based on provided filters.
 * Uses the filterProblems utility to apply the filtering.
 *
 * @param {string} dominantTopic
 * @param {string} difficulty
 * @param {string} inputDataStructure
 * @returns {Array[]} Filtered problem rows (excluding header row)
 */
function getFilteredProblemsFromSheet(dominantTopic, difficulty, inputDataStructure) {
    const data = getProblemsData();
    return filterProblems(data, dominantTopic, difficulty, inputDataStructure);
  }