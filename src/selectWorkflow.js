const { generateProblemSelectionList } = require("./dataModelUtils/generateProblemSelectionList");
const { isAttemptInProgress, displayProblemListProgress, updateCurrentProblem, updateSelectionMetrics } = require("./workflowUtils");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { NAMED_RANGES } = require("./constants");

/**
 * Handles the logic when the "Select" button is clicked in the LeetLogger UI.
 *
 * - Checks if an attempt is already in progress.  
 * - If not, selects the next problem from the generated problem list.  
 * - Displays the selected problem's attributes on the UI.
 */
function onSelectClick() {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Attempt currently in progress!');
        return;
    }

    const problems = generateProblemSelectionList();
    const problemIndex = 0;
    
    updateSelectionMetrics(problems);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SKIP_COUNT, '');
    updateCurrentProblem(problems[problemIndex]);
}
