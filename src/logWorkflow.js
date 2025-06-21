const { NAMED_RANGES, SHEET_NAMES } = require("./constants");
const { getInputValues } = require("./sheetUtils/getInputValues");
const { resetAttemptInputs, restartProblemSelection } = require("./workflowUtils");

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
}
