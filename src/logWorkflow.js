const { NAMED_RANGES, SHEET_NAMES, PROBLEM_SELECTORS } = require("./constants");
const { getInputValues } = require("./sheetUtils/getInputValues");
const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { getSheetByName } = require("./sheetUtils/getSheetByName");
const { resetAttemptInputs, restartProblemSelection, clearCurrentProblem } = require("./workflowUtils");

function onLogClick() {
    logAttempt();
    resetAttemptInputs();
    restartProblemSelection();
}

function logAttempt() {
    const requiredFields = [
        'LC ID',
        'Start Time',
        'End Time',
        'Duration Minutes',
    ];

    const inputValues = getInputValues(NAMED_RANGES.AttemptInProgress.INPUTS, requiredFields);

    appendRowToSheet(SHEET_NAMES.ATTEMPTS, inputValues);

    const attemptInitiator = getNamedRangeValue(NAMED_RANGES.AttemptInProgress.INITIATOR);
    try {
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName(attemptInitiator).activate();
    } catch (e) {
        return;
    }
    if (attemptInitiator == PROBLEM_SELECTORS.SINGLE_SELECTION) {
        clearCurrentProblem(PROBLEM_SELECTORS.SINGLE_SELECTION);
    }

    getSheetByName(SHEET_NAMES.ATTEMPT_IN_PROGRESS).hideSheet();
}
