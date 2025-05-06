/**
 * Writes the provided input values back to the sheet UI range.
 *
 * @param {string} rangeName - The name of the named range to update.
 * @param {Map<string, string|number>} inputsMap - A Map containing label-value pairs to write to the sheet.
 */
function setInputsOnSheetUI(rangeName, inputsMap) {
    const range = getNamedRange(rangeName);
    const updatedValues = Array.from(inputsMap, ([label, value]) => [label, value]);

    range.setValues(updatedValues);
}