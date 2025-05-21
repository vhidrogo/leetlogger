const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { isAttemptDone } = require("./workflowUtils");

function onOptimalClick() {
    if (!isAttemptDone()) {
        SpreadsheetApp.getUi().alert('Finish an attempt first before marking optimal.');
        return;
    }

    const dropdownFields = [
        'Solved',
        'Time Complexity Optimal',
        'Space Complexity Optimal',
        'Quality Code'
    ];

    const inputsRangeName = 'ControlPanel_AttemptInputs';
    const inputsMap = getInputsFromSheetUI(inputsRangeName);

    for (const field of dropdownFields) {
        if (inputsMap.has(field)) {
            inputsMap.set(field, 'Yes');
        }
    }

    setInputsOnSheetUI(inputsRangeName, inputsMap);
}