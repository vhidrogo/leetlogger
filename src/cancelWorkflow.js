const { resetAttemptInputs, isAttemptInProgress } = require("./workflowUtils");

function onCancelClick() {
    if (!isAttemptInProgress()) return;
    
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
        'Confirmation',
        'Are you sure you want to cancel logging this attempt?',
        ui.ButtonSet.YES_NO
    );

    if (response == ui.Button.NO) return;

    resetAttemptInputs();
}