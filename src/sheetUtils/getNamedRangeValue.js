const { getNamedRange } = require("./getNamedRange");

/**
 * Retrieves the value of a named range from the active spreadsheet.
 *
 * Throws an error if the specified named range does not exist.
 *
 * @param {string} name - The name of the named range to retrieve.
 * @returns {*} The value of the named range.
 */
function getNamedRangeValue(name) {
    return getNamedRange(name).getValue();
}

module.exports = { getNamedRangeValue }
