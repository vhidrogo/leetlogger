const { NAMED_RANGES } = require("./constants");
const { restartProblemSelection } = require("./workflowUtils");

const CONFIG = {
    END_TIME_RANGE_NAME: 'ControlPanel_EndTime',
    INPUTS_RANGE_NAME: 'ControlPanel_AttemptInputs',
    SHEET_NAME: 'Attempts',
  };

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

    const inputValues = getInputValues(CONFIG.INPUTS_RANGE_NAME, requiredFields);

    appendRowToSheet(CONFIG.SHEET_NAME, inputValues);
}

function resetAttemptInputs() {
    const clearFields = [
        'LC ID',
        'Start Time',
        'End Time',
        'Solved',
        'Time Complexity Optimal',
        'Space Complexity Optimal',
        'Quality Code',
        'Notes'
    ]

    const defaults = {
        'Duration Minutes': `=if(${CONFIG.END_TIME_RANGE_NAME}="","",(${CONFIG.END_TIME_RANGE_NAME}-ControlPanel_StartTime)*1440)`,
        'Cap Minutes': `=index(
            ${NAMED_RANGES.TargetTimes.MAX_MINUTES},
            match(
                ${NAMED_RANGES.ControlPanel.DOMINANT_TOPIC}&${NAMED_RANGES.ControlPanel.DIFFICULTY},
                ${NAMED_RANGES.TargetTimes.TOPIC}&${NAMED_RANGES.TargetTimes.DIFFICULTY},
                0
            ),
            1
        )`
    }

    resetInputValues(CONFIG.INPUTS_RANGE_NAME, defaults, clearFields)

    // TODO: dynamically hide Attempt in Progress UI
}