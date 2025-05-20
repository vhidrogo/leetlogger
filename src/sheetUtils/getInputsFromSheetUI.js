/**
 * Retrieves input values from a two-column named range in the active spreadsheet UI,
 * and returns them as a Map with the first column as keys and the second column as values.
 *
 * @param {string} rangeName - The name of the named range containing the input labels and values.
 * @returns {Map<string, any>} A Map where keys are input labels and values are the corresponding input values.
 * @throws {Error} If the named range is not found.
 */
function getInputsFromSheetUI(rangeName) {
    const range = getNamedRange(rangeName);
    if (range.getWidth() !== 2) {
        throw new Error(`Expected a two-column range for ${rangeName}, but got ${range.getWidth()}.`);
    }

    return new Map(range.getValues());
}

module.exports = { getInputsFromSheetUI }
