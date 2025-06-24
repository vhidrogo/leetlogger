const { NAMED_RANGES, MODEL_FIELD_MAPPINGS, PROBLEM_SELECTORS } = require("./constants");
const { getLatestAttemptsMap } = require("./dataModelUtils/getLatestAttemptsMap");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { getModelDataFromSheet } = require("./sheetUtils/getModelDataFromSheet");
const { convertArrayToObject } = require("./utils/convertArrayToObject");
const { filter2DArrayRows } = require("./utils/filter2DArrayRows");
const { isAttemptInProgress, restartProblemSelection, clearCurrentProblem, updateCurrentProblem } = require("./workflowUtils");

function onFindClick() {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Attempt currently in progress!');
        return;
    }

    let problem;
    try {
        problem = findProblem();
    } catch (e) {
        clearCurrentProblem(PROBLEM_SELECTORS.SINGLE_SELECTION);
        SpreadsheetApp.getUi().alert(e.message);
        return;
    }

    updateCurrentProblem(problem, PROBLEM_SELECTORS.SINGLE_SELECTION)
}

function findProblem() {
    const problemSearchInputs = getInputsFromSheetUI(NAMED_RANGES.SingleSelection.PROBLEM_SEARCH_INPUTS);
    const field = MODEL_FIELD_MAPPINGS.Problem[problemSearchInputs.get('Field')];
    const mode = problemSearchInputs.get('Mode');
    const value = problemSearchInputs.get('Value');

    const problems = getModelDataFromSheet('Problem');
    const matches = filter2DArrayRows(problems, [{ field: field, value: value, mode: mode }]);

    if (!matches.length) throw new Error('No problem matches search criteria.');
    if (matches.length > 2) throw new Error('Multiple problems matching criteria.');

    const problemAttributes = convertArrayToObject(...matches);
    const latestAttemptsMap = getLatestAttemptsMap();
    if (latestAttemptsMap.hasOwnProperty(problemAttributes.lcId)) {
        Object.assign(problemAttributes, latestAttemptsMap[problemAttributes.lcId]);
    }

    return problemAttributes;
}
