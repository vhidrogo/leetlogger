const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");

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