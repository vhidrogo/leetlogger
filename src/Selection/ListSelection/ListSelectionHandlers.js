const { getLatestAttemptsMap } = require("../../dataModelUtils/getLatestAttemptsMap");
const { ProblemNotFoundError, NoMoreProblemsError } = require("../../errors");
const { convertArrayToObject } = require("../../utils/convertArrayToObject");
const { filter2DArrayRows } = require("../../utils/filter2DArrayRows");
const { getFirstProblem, getNextProblem } = require("./ListSelectionLogic");

function onRestartClick() {
    handleListSelection(getFirstProblem);
}

function onNextClick() {
    handleListSelection(getNextProblem);
}

/**
 * Core handler that manages problem selection flow.
 *
 * Validates attempt state, retrieves relevant list data,
 * and delegates problem selection logic to the provided selector function.
 *
 * @param {(orderedList: any[][], problems: any[][], latestAttemptsMap: Object) => Object} selectFn
 *        The function to determine the next problem (e.g., getNextProblem or getFirstProblem).
 * @returns {void}
 */
function handleListSelection(selectFn) {
    const ui = SpreadsheetApp.getUi();
    if (isAttemptInProgress()) {
        ui.alert('Attempt currently in progress!');
        return;
    }

    clearCurrentProblem(PROBLEM_SELECTORS.LIST_SELECTION);

    const listName = getNamedRangeValue(NAMED_RANGES.ListSelection.LIST);
    const orderedList = getOrderedList(listName);
    const problems = getModelDataFromSheet('Problem');

    const latestAttemptsMap = getLatestAttemptsMap();

    let nextProblem;
    try {
        nextProblem = selectFn(orderedList, problems, latestAttemptsMap);
    } catch(e) {
        if (e instanceof ProblemNotFoundError) {
            ui.alert(`${e.message} Either add it using AddProblem or set Skip = true in ${listName}.`);
            return;
        }
        if (e instanceof NoMoreProblemsError) {
            const response = ui.alert(
                'Restart?',
                'All problems in list have been attempted, would you like to restart the list?',
                ui.ButtonSet.YES_NO
            );
            if (response === ui.Button.NO) return;
            nextProblem = getFirstProblem(orderedList, problems);
        } else {
            ui.alert(e.message);
        }
    }

    const problemAttemptAtributes = Object.assign(nextProblem, latestAttemptsMap[nextProblem.lcId]);
    updateCurrentProblem(problemAttemptAtributes, PROBLEM_SELECTORS.LIST_SELECTION);
}

/**
 * Retrieves the ordered list of problems for the given list name.
 * Filters out rows marked as "Skip".
 *
 * @param {string} listName - The name of the list sheet.
 * @returns {any[][]} The filtered list of problems.
 */
function getOrderedList(listName) {
    const data = getSheetByName(listName).getDataRange().getValues();
    
    return filter2DArrayRows(data, [{ field: 'Skip', value: false, mode: 'equals' }]);
}

module.exports = { handleListSelection }