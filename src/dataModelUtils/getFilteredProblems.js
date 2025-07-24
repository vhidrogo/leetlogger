const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { NAMED_RANGES, MODEL_FIELD_MAPPINGS, PREMIUM_SUBSCRIPTION } = require("../constants");
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
function getFilteredProblems(filtersRangeName) {
    const problems = getModelDataFromSheet('Problem');

    const filters = getInputsFromSheetUI(filtersRangeName);

    const criteria = [{ field: 'deleted', value: false, mode: 'equals' }];
    for (const [field, value] of filters) {
        if (value != 'All') {
            criteria.push({
                field: MODEL_FIELD_MAPPINGS.Problem[field],
                value: value,
                mode: 'includes'
            })
        }
    }

    if (PREMIUM_SUBSCRIPTION === false) {
        criteria.push({ field: 'premium', value: false, mode: 'equals' });
    }
    
    const [problemHeaders, ...problemData] = filter2DArrayRows(problems, criteria);

    return convert2DArrayToObjects(problemHeaders, problemData);
}

function getFilteredProblemsLogTest() {
    getFilteredProblems(NAMED_RANGES.GroupSelection.FILTERS).forEach(row => Logger.log(row));
}

module.exports = { getFilteredProblems }
