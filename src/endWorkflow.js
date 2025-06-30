const { isAttemptDone, isAttemptInProgress } = require("./workflowUtils");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { NAMED_RANGES } = require("./constants");

function onEndClick() {
    if (!isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('No attempt currently in progress.');
        return;
    }

    if (isAttemptDone()) {
        SpreadsheetApp.getUi().alert('An attempt has already been marked done and needs to be logged.');
        return;
    }

    setNamedRangeValue(NAMED_RANGES.AttemptInProgress.END_TIME, new Date());

    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
        'Solve Status',
        'Did you solve the problem?',
        ui.ButtonSet.YES_NO
    );
    const solved = response === ui.Button.YES ? true : false;

    setNamedRangeValue(NAMED_RANGES.AttemptInProgress.SOLVED, solved);
}