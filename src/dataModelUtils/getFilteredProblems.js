const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");

/**
 * Retrieves problems data from the 'Problems' sheet, excluding specified columns,
 * applies filter criteria based on selected control panel values, and returns
 * the filtered problems as an array of objects.
 *
 * The criteria used for filtering are taken from the following named ranges:
 * - 'ControlPanel_DominantTopic'
 * - 'ControlPanel_Difficulty'
 * - 'ControlPanel_InputDataStructure'
 *
 * @returns {Array<Object>} An array of problem objects that match the selected criteria.
 */
function getFilteredProblems() {
    const excludeColumns = ['Subdominant Topic', 'Notes'];
    const problems = getSheetData('Problems', excludeColumns);

    const selectedDominantTopic = getNamedRangeValue('ControlPanel_DominantTopic');
    const selectedDifficulty = getNamedRangeValue('ControlPanel_Difficulty');
    const selectedInputDataStructure = getNamedRangeValue('ControlPanel_InputDataStructure');

    const criteria = {
        'Dominant Topic': selectedDominantTopic,
        'Difficulty': selectedDifficulty,
        'Input Data Structure': selectedInputDataStructure
    }

    const [problemHeaders, ...problemData] = filter2DArrayRows(problems, criteria);

    return convert2DArrayToObjects(problemHeaders, problemData);
}

function getFilteredProblemsLogTest() {
    getFilteredProblems().forEach(row => Logger.log(row));
}

module.exports = { getFilteredProblems }
