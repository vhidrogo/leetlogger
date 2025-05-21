const { generateProblemSelectionList } = require("./dataModelUtils/generateProblemSelectionList");
const { isAttemptInProgress, getCurrentProblemLcId, displayCurrentProblem } = require("./workflowUtils");

/**
 * Handles the skip button click event in the problem control panel.
 *
 * If an attempt is currently in progress, displays an alert and exits.
 * Otherwise, retrieves the current problem's LC ID, generates the current selection list,
 * finds the next problem in sequence, and updates the UI with its attributes.
 *
 * Displays appropriate alerts if no problem is selected or if the current problem
 * is not found in the selection list.
 */
function onSkipClick() {
    if (isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('Cannot skip while attempt in progress.');
        return;
    }

    let lcId;
    try {
        lcId = getCurrentProblemLcId();
    } catch (e) {
        SpreadsheetApp.getUi().alert('Select a problem first.');
        return;
    }

    const problems = generateProblemSelectionList();

    let nextIndex;
    try {
        nextIndex = findNextProblemIndex(problems, lcId);
    } catch (e) {
        SpreadsheetApp.getUi().alert('Current problem does not match selection criteria, select a new problem.');
    }
    
    displayCurrentProblem(problems[nextIndex]);
}

/**
 * Finds the index of the next problem in the list relative to the current problem.
 *
 * Looks up the index of the problem with the given LC ID in the provided problem attributes list.
 * If found, returns the index of the next problem (wrapping to the start if at the end).
 * If the LC ID is not found, throws an error.
 *
 * @param {Object[]} problemsAttributes - Array of problem attribute objects, each containing an 'LC ID' key.
 * @param {string} currentLcId - The LC ID of the currently selected problem.
 * @returns {number} The index of the next problem in the list.
 * @throws Will throw an error if the current LC ID is not found in the list.
 */
function findNextProblemIndex(problemsAttributes, currentLcId) {
    const index = problemsAttributes.findIndex(item => item['LC ID'] === currentLcId);
    
    if (index === -1) {
        throw new Error('Problem not found in list.');
    }

    return (index + 1) % problemsAttributes.length;
}