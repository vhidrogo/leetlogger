/**
 * Retrieves attempts data from the 'Attempts' sheet, excluding specified columns,
 * and returns a map of the latest attempts by 'LC ID'.
 *
 * @returns {Object.<string, Object>} An object mapping 'LC ID' values to the latest attempt objects.
 */
function getLatestAttemptsMap() {
    const excludeColumns = ['Notes'];
    const attempts = getSheetData('Attempts', excludeColumns);

    return mapLatestAttemptsByLcId(attempts);
}

function getLatestAttemptsMapLogTest() {
    const attemptsObj = getLatestAttemptsMap();
    Object.entries(attemptsObj).slice(0, 5).forEach(row => Logger.log(row));
}

module.exports = { getLatestAttemptsMap }
