const { isAttemptDone, isAttemptInProgress } = require("./workflowUtils");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");

function onEndClick() {
    if (!isAttemptInProgress()) {
        SpreadsheetApp.getUi().alert('No attempt currently in progress.');
        return;
    }

    if (isAttemptDone()) {
        SpreadsheetApp.getUi().alert('An attempt has already been marked done and needs to be logged.');
        return;
    }

    setNamedRangeValue('ControlPanel_EndTime', new Date());
}