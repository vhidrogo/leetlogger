const { NAMED_RANGES, SHEET_NAMES } = require("./constants");
const { getInputValues } = require("./sheetUtils/getInputValues");
const { resetInputValues } = require("./sheetUtils/resetInputValues");
const { restartProblemSelection } = require("./workflowUtils");

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

function resetAttemptInputs() {
    const clearFields = [
        'LC ID',
        'Start Time',
        'End Time',
        'Notes'
    ]

    const defaults = {
        'Duration Minutes': `=if(
            ${NAMED_RANGES.AttemptInProgress.END_TIME}="","",
            (${NAMED_RANGES.AttemptInProgress.END_TIME}-${NAMED_RANGES.AttemptInProgress.START_TIME})*1440
            )`,
        'Cap Minutes': `=iferror(index(
            ${NAMED_RANGES.TargetTimes.MAX_MINUTES},
            match(
                ${NAMED_RANGES.AttemptInProgress.DOMINANT_TOPIC}&${NAMED_RANGES.AttemptInProgress.DIFFICULTY},
                ${NAMED_RANGES.TargetTimes.TOPIC}&${NAMED_RANGES.TargetTimes.DIFFICULTY},
                0
            ),
            1
        ),"")`,
        'Solved': false,
        'Time Complexity Optimal': false,
        'Space Complexity Optimal': false,
        'Quality Code': false,
    }

    resetInputValues(NAMED_RANGES.AttemptInProgress.INPUTS, defaults, clearFields);
    resetInputValues(NAMED_RANGES.AttemptInProgress.PROBLEM_ATTRIBUTES);
}