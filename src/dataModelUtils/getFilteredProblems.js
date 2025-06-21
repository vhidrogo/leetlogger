const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");

/**
 * Retrieves problem data from the 'Problems' sheet via the model-centric utility,
 * applies filter criteria based on selected control panel values, and returns
 * the filtered problems as an array of normalized problem objects.
 *
 * The criteria used for filtering are taken from the following named ranges:
 * - 'ControlPanel_DominantTopic'
 * - 'ControlPanel_Difficulty'
 * - 'ControlPanel_InputDataStructure'
 *
 * Filtering is performed against the original (non-normalized) UI label keys,
 * as the sheet headers are normalized during retrieval.
 *
 * @returns {Array<Object>} An array of normalized problem objects matching the selected criteria.
 */
function getFilteredProblems() {
    const problems = getModelDataFromSheet('Problem');

    const selectedDominantTopic = getNamedRangeValue('ControlPanel_DominantTopic');
    const selectedDifficulty = getNamedRangeValue('ControlPanel_Difficulty');
    const selectedInputDataStructure = getNamedRangeValue('ControlPanel_InputDataStructure');

    const criteria = [];
    if (selectedDominantTopic != 'All') {
        criteria.push({
            field: 'dominantTopic',
            value: selectedDominantTopic,
            mode: 'equals'
        })
    }
    if (selectedDifficulty != 'All') {
        criteria.push({
            field: 'difficulty',
            value: selectedDifficulty,
            mode: 'equals'
        })
    }
    if (selectedInputDataStructure != 'All') {
        criteria.push({
            field: 'inputDataStructure',
            value: selectedInputDataStructure,
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
