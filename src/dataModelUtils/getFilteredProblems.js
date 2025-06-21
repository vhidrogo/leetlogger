const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { NAMED_RANGES } = require("../constants");
const { getInputsFromSheetUI } = require("../sheetUtils/getInputsFromSheetUI");

/**
 * Retrieves problem data from the 'Problems' sheet via the model-centric utility,
 * applies filter criteria based on selected control panel values, and returns
 * the filtered problems as an array of normalized problem objects.
 *
 * The criteria used for filtering are taken from the GroupSelection UI:
 *
 * Filtering is performed against the original (non-normalized) UI label keys,
 * as the sheet headers are normalized during retrieval.
 *
 * @returns {Array<Object>} An array of normalized problem objects matching the selected criteria.
 */
function getFilteredProblems() {
    const problems = getModelDataFromSheet('Problem');

    const filters = getInputsFromSheetUI(NAMED_RANGES.GroupSelection.FILTERS);

    const criteria = [];
    if (filters.get('Dominant Topic') != 'All') {
        criteria.push({
            field: 'dominantTopic',
            value: filters.get('Dominant Topic'),
            mode: 'equals'
        })
    }
    if (filters.get('Difficulty') != 'All') {
        criteria.push({
            field: 'difficulty',
            value: filters.get('Dominant Topic'),
            mode: 'equals'
        })
    }
    if (filters.get('Input Data Structure') != 'All') {
        criteria.push({
            field: 'inputDataStructure',
            value: filters.get('Dominant Topic'),
            mode: 'equals'
        })
    }
    
    const [problemHeaders, ...problemData] = filter2DArrayRows(problems, criteria);

    return convert2DArrayToObjects(problemHeaders, problemData);
}

function getFilteredProblemsLogTest() {
    getFilteredProblems().forEach(row => Logger.log(row));
}

module.exports = { getFilteredProblems }
