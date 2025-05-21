const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");

/**
 * Updates the UI with the selected problem's attributes and latest attempt details.
 *
 * Retrieves the input fields map from the UI for both problem attributes and latest attempt attributes,  
 * then maps the provided attribute values to their corresponding keys and writes the updated values  
 * back to the UI.
 *
 * For the latest attempt attributes section, if a given attribute key does not exist in the provided  
 * problemAttemptAttributes object, the corresponding input field is set to an empty string.
 *
 * @param {Object} problemAttemptAttributes - An object containing attribute key-value pairs for the selected problem and its latest attempt.
 *                                            Keys should match the input field names in the UI control panel ranges.
 */
function displayCurrentProblem(problemAttemptAttributes) {
    const problemAttributesRangeName = 'ControlPanel_CurrentProblem_ProblemAttributes';
    const latestAttemptAttributesRangeName = 'ControlPanel_CurrentProblem_LatestAttemptAttributes'

    const problemAttributes = getInputsFromSheetUI(problemAttributesRangeName);
    for (const key of problemAttributes.keys()) {
        if (problemAttemptAttributes.hasOwnProperty(key)) {
            problemAttributes.set(key, problemAttemptAttributes[key]);
        }
    }
    setInputsOnSheetUI(problemAttributesRangeName, problemAttributes);

    const latestAttemptAttributes = getInputsFromSheetUI(latestAttemptAttributesRangeName);
    for (const key of latestAttemptAttributes.keys()) {
        const newValue = problemAttemptAttributes[key] ?? '';
        latestAttemptAttributes.set(key, newValue);
    }
    setInputsOnSheetUI(latestAttemptAttributesRangeName, latestAttemptAttributes);
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