const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { isAttemptInProgress } = require("./workflowUtils");

/**
 * Handles the click event for starting a new problem attempt.
 * 
 * - Checks if an attempt is already in progress and alerts the user if so.
 * - Validates that a problem is selected before starting an attempt.
 * - Sets the attempt's LeetCode ID and start time in the appropriate named ranges.
 * - Updates the UI to indicate an active attempt.
 * - TODO: Integrate live timer display.
 *
 * @returns {void}
 */
function onStartClick() {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Attempt already in progress!');
        return;
    }
    
    let lcId;
    try {
        lcId = getCurrentProblemLcId();
    } catch (e) {
        SpreadsheetApp.getUi().alert('Select a problem first.');
        return;
    }
    
    // TODO: Dynamically show Attempt in Progress UI
    updateAttemptInProgressUI(lcId);

    // TODO: Show live timer
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
 * Updates the Control Panel UI components to indicate an active attempt.
 * 
 * - Sets the attempt's LeetCode ID in the 'ControlPanel_Attempt_LC_ID' named range.
 * - Sets the start time in the 'ControlPanel_StartTime' named range.
 *
 * @param {string} lcId - The LeetCode ID of the problem being attempted.
 * @returns {void}
 */
function updateAttemptInProgressUI(lcId) {
    setNamedRangeValue('ControlPanel_Attempt_LC_ID', lcId);
    setNamedRangeValue('ControlPanel_StartTime', new Date());
}