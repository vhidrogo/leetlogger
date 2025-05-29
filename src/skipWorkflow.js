const { generateProblemSelectionList } = require("./dataModelUtils/generateProblemSelectionList");
const { isAttemptInProgress, getCurrentProblemLcId, updateCurrentProblem, updateSkipCount } = require("./workflowUtils");

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
        if (e instanceof ProblemNotFoundError) {
            SpreadsheetApp.getUi().alert('Current problem does not match selection criteria, select a new problem.');
            return;
        } else if (e instanceof NoMoreProblemsError) {
            SpreadsheetApp.getUi().alert('No more problems in list. You’ve reached the end.');
            return;
        }
    }
    
    updateSkipCount(nextIndex, problems.length);
    updateCurrentProblem(problems[nextIndex]);
}

/**
 * Finds the index of the next problem in the list relative to the current problem.
 *
 * Looks up the index of the problem with the given lcId in the provided problem attributes list.
 * If found, returns the index of the next problem (wrapping to the start if at the end).
 * If the lcId is not found, throws an error.
 *
 * @param {Object[]} problemsAttributes - Array of problem attribute objects, each containing an 'lcId' property.
 * @param {string} currentLcId - The lcId of the currently selected problem.
 * @returns {number} The index of the next problem in the list.
 * @throws Will throw an error if the current lcId is not found in the list.
 */
function findNextProblemIndex(problemsAttributes, currentLcId) {
    const index = problemsAttributes.findIndex(item => item.lcId === currentLcId);
    
    if (index === -1) {
        throw new ProblemNotFoundError('Problem not found in list.');
    }

    const nextIndex = index + 1;

    if (nextIndex >= problemsAttributes.length) {
        throw new NoMoreProblemsError('No more problems in list.');
    }

    return nextIndex;
}

class ProblemNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProblemNotFoundError';
    }
}

class NoMoreProblemsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoMoreProblemsError';
    }
}