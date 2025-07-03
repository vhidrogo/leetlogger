const { NAMED_RANGES, SHEET_NAMES, PROBLEM_SELECTORS } = require("./constants");
const { getInputValues } = require("./sheetUtils/getInputValues");
const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { getSheetByName } = require("./sheetUtils/getSheetByName");
const { resetAttemptInputs, restartProblemSelection, clearCurrentProblem } = require("./workflowUtils");

function onLogClick() {
    const optimalInputs = getInputValues(NAMED_RANGES.AttemptInProgress.OPTIMAL_INPUTS);
    if (optimalInputs.every(value => value === false)) {
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert(
            'Confirmation',
            'All optimal inputs are false, are you sure you want to continue?',
            ui.ButtonSet.YES_NO
        );
        if (response === ui.Button.NO) return;
    }

    logAttempt();

    const attemptInitiator = getNamedRangeValue(NAMED_RANGES.AttemptInProgress.INITIATOR);
    if (attemptInitiator === PROBLEM_SELECTORS.GROUP_SELECTION) {
        restartProblemSelection();
    }
    else if (attemptInitiator === PROBLEM_SELECTORS.SINGLE_SELECTION) {
        clearCurrentProblem(PROBLEM_SELECTORS.SINGLE_SELECTION);
    }

    resetAttemptInputs();
    getSheetByName(attemptInitiator).activate();
    getSheetByName(SHEET_NAMES.ATTEMPT_IN_PROGRESS).hideSheet();
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
}
