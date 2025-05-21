const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { isAttemptDone } = require("./workflowUtils");

/**
 * Marks key attempt evaluation fields as 'Yes' in the UI if the attempt is complete.
 * 
 * If no attempt is marked as done, displays an alert and exits.
 * Otherwise, sets relevant dropdown fields in the control panel inputs range to 'Yes'.
 *
 * @returns {void}
 */
function onOptimalClick() {
    if (!isAttemptDone()) {
        SpreadsheetApp.getUi().alert('Finish an attempt first before marking optimal.');
        return;
    }

    const dropdownFields = [
        'Solved',
        'Time Complexity Optimal',
        'Space Complexity Optimal',
        'Quality Code'
    ];

    const inputsRangeName = 'ControlPanel_AttemptInputs';
    const inputsMap = getInputsFromSheetUI(inputsRangeName);

    for (const field of dropdownFields) {
        if (inputsMap.has(field)) {
            inputsMap.set(field, 'Yes');
        }
    }

    setInputsOnSheetUI(inputsRangeName, inputsMap);
}