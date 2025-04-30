function getNamedRangeValue(name) {
    const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name);
    if (!range) {
        throw new Error(`Named range "${name}" does not exist.`);
    }
    return range.getValue();
}
