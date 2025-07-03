const { NAMED_RANGES, SHEET_NAMES, PROBLEM_SELECTORS } = require("./constants");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { getSheetByName } = require("./sheetUtils/getSheetByName");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { isAttemptInProgress } = require("./workflowUtils");

/**
 * Starts a problem attempt from the Group Selection view.
 *
 * Retrieves the problem attributes from the Group Selection control panel section  
 * and initiates the attempt workflow.
 *
 * @returns {void}
 */
function onGroupSelectionStartClick() {
    startWorkflow(NAMED_RANGES.GroupSelection.PROBLEM_ATTRIBUTES, PROBLEM_SELECTORS.GROUP_SELECTION);
}

/**
 * Starts a problem attempt from the Single Selection view.
 *
 * Retrieves the problem attributes from the Single Selection control panel section  
 * and initiates the attempt workflow.
 *
 * @returns {void}
 */
function onSingleSelectionStartClick() {
    startWorkflow(NAMED_RANGES.SingleSelection.PROBLEM_ATTRIBUTES, PROBLEM_SELECTORS.SINGLE_SELECTION);
}

/**
 * Starts a problem attempt workflow by verifying readiness and transitioning to the Attempt In Progress sheet.
 *
 * - Validates that no other attempt is already in progress.
 * - Ensures a problem has been selected (checks for a valid LC ID).
 * - Activates the Attempt In Progress sheet.
 * - Updates the Attempt In Progress UI components with the selected problem's attributes.
 *
 * @param {string} problemAttributesRangeName - The named range for the problem attributes section in the UI.
 * @returns {void}
 */
function startWorkflow(problemAttributesRangeName, initiator) {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Attempt already in progress!');
        return;
    }

    const problemAttributes = getInputsFromSheetUI(problemAttributesRangeName);
    if (!problemAttributes.get('LC ID')) {
        SpreadsheetApp.getUi().alert('Select a problem first.');
        return;
    }

    const attemptInProgressSheet = getSheetByName(SHEET_NAMES.ATTEMPT_IN_PROGRESS);
    attemptInProgressSheet.showSheet();
    attemptInProgressSheet.activate();
    updateAttemptInProgressUI(problemAttributes);
    const optimalSolution = getNamedRangeValue(NAMED_RANGES[initiator].OPTIMAL_SOLUTION);
    setNamedRangeValue(NAMED_RANGES.AttemptInProgress.OPTIMAL_SOLUTION, optimalSolution);
    setNamedRangeValue(NAMED_RANGES.AttemptInProgress.INITIATOR, initiator);
}

/**
 * Updates the Attempt In Progress UI components to reflect the selected problem.
 *
 * - Transfers the problem's attribute values to the Attempt In Progress attributes section.
 * - Sets the current start time in the Attempt In Progress start time field.
 *
 * @param {Map<string, string>} problemAttributes - A map of problem attribute keys and values for the selected problem.
 * @returns {void}
 */
function updateAttemptInProgressUI(problemAttributes) {
    const attemptProblemAttributes = getInputsFromSheetUI(NAMED_RANGES.AttemptInProgress.PROBLEM_ATTRIBUTES);
    for (const key of attemptProblemAttributes.keys()) {
        if (problemAttributes.has(key)) {
            attemptProblemAttributes.set(key, problemAttributes.get(key));
        }
    }
    setInputsOnSheetUI(NAMED_RANGES.AttemptInProgress.PROBLEM_ATTRIBUTES, attemptProblemAttributes);
    setNamedRangeValue(NAMED_RANGES.AttemptInProgress.START_TIME, new Date());
}