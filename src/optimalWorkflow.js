const { NAMED_RANGES } = require("./constants");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { isAttemptDone } = require("./workflowUtils");

/**
 * Marks key attempt evaluation fields as TRUE in the UI checkboxes if the attempt is complete.
 * 
 * If no attempt is marked as done, displays an alert and exits.
 * Otherwise, sets relevant optimal fields in the control panel inputs range to TRUE.
 *
 * @returns {void}
 */
function onOptimalClick() {
    if (!isAttemptDone()) {
        SpreadsheetApp.getUi().alert('Finish an attempt first before marking optimal.');
        return;
    }
    
    const inputsMap = getInputsFromSheetUI(NAMED_RANGES.AttemptInProgress.OPTIMAL_INPUTS);

    for (const [key] of inputsMap) {
        inputsMap.set(key, true);
    }

    setInputsOnSheetUI(NAMED_RANGES.AttemptInProgress.OPTIMAL_INPUTS, inputsMap);
}