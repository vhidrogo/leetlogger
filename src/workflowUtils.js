const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");

/**
 * Updates the UI with the selected problem's attributes.
 *
 * Retrieves the input fields map from the UI, maps problem attributes to the corresponding keys,  
 * and writes the updated values back to the UI.
 *
 * @param {Object} problemAttributes - An object containing attribute key-value pairs for the selected problem.
 */
function displayCurrentProblem(problemAttributes) {
    const inputsMap = getInputsFromSheetUI('ControlPanel_CurrentProblemInputs');
    for (const key of inputsMap.keys()) {
        if (problemAttributes.hasOwnProperty(key)) {
            inputsMap.set(key, problemAttributes[key]);
        }
    }

    setInputsOnSheetUI('ControlPanel_CurrentProblemInputs', inputsMap);
}

/**
 * Retrieves the current problem's LeetCode ID from the named range.
 * 
 * @throws {Error} If no LC ID is found in the named range.
 * @returns {string} The LeetCode ID of the currently selected problem.
 */
function getCurrentProblemLcId() {
    const lcId = getNamedRangeValue('ControlPanel_CurrentProblem_LC_ID');
    if (!lcId) {
        throw new Error('Missing LC ID.');
    }

    return lcId;
}

/**
 * Checks whether a LeetLogger problem attempt is currently in progress.
 *
 * This is determined by checking if the 'ControlPanel_StartTime' named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if an attempt is in progress, false otherwise.
 */
function isAttemptInProgress() {
    return getNamedRangeValue('ControlPanel_StartTime') != '';
}

/**
 * Checks whether the current LeetLogger problem attempt has been completed.
 *
 * This is determined by checking if the 'ControlPanel_EndTime' named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if the attempt is complete, false otherwise.
 */
function isAttemptDone() {
    return getNamedRangeValue('ControlPanel_EndTime') != '';
}

module.exports = { displayCurrentProblem, getCurrentProblemLcId, isAttemptInProgress, isAttemptDone }