const { getNamedRange } = require("./getNamedRange");

/**
 * Sets the value of a named range in the active Google Sheets spreadsheet.
 *
 * @param {string} name - The name of the named range to update.
 * @param {*} value - The value to set for the named range.
 */
function setNamedRangeValue(name, value) {
    getNamedRange(name).setValue(value);
}

module.exports = { setNamedRangeValue }