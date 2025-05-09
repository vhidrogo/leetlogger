const CONFIG = {
    INPUTS_RANGE_NAME: 'ControlPanel_AttemptInputs',
    SHEET_NAME: 'Attempts',
  };

function onLogClick() {
    logAttempt();
    resetAttemptInputs();
}

function logAttempt() {
    const requiredFields = [
        'LC ID',
        'Start Time',
        'End Time',
        'Duration Minutes',
        'Solved',
        'Time Complexity Optimal',
        'Space Complexity Optimal',
        'Quality Code'
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
        'Duration Minutes': '=(ControlPanel_EndTime-ControlPanel_StartTime)*1440',
    }

    resetInputValues(CONFIG.INPUTS_RANGE_NAME, defaults, clearFields)
}