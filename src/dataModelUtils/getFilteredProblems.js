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

    return filter2DArrayRows(problems, criteria);
}

function getFilteredProblemsLogTest() {
    Logger.log(getFilteredProblems());
}