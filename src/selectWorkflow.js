const { isAttemptInProgress, restartProblemSelection } = require("./workflowUtils");

/**
 * Handles the logic when the "Select" button is clicked in the LeetLogger UI.
 *
 * - Checks if an attempt is already in progress.  
 * - If not, regenerates the problem selection list, updates selection metrics, 
 *   clears the skip count display, and displays the next problem.
 * 
 * This initializes a fresh problem selection session and should be used
 * when starting a new selection workflow.
 */
function onSelectClick() {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Attempt currently in progress!');
        return;
    }

    restartProblemSelection();
}
