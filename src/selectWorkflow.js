const { generateProblemSelectionList } = require("./dataModelUtils/generateProblemSelectionList");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { isAttemptInProgress } = require("./workflowUtils");

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
    const selectedProblem = problems[0];
    displayCurrentProblem(selectedProblem);
}

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