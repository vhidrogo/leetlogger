/**
 * Retrieves input values from a specified named range in the active sheet UI,
 * validates that all required fields are present and non-empty, and returns the values.
 *
 * @param {string} rangeName - The name of the range in the sheet containing the input fields.
 * @param {string[]} requiredFields - An array of field names that are required to have values.
 * @returns {Array<string>} An array of input values in the order they appear in the inputs map.
 * @throws {Error} If any of the required fields are missing or empty.
 */
function getInputValues(rangeName, requiredFields) {
    const inputsMap = getInputsFromSheetUI(rangeName);

    for (const field of requiredFields) {
        if (!inputsMap.has(field) || inputsMap.get(field).toString().trim() === '') {
            throw new Error(`Missing required input ${field}.`);
        }
    }

    return Array.from(inputsMap.values());
}

module.exports = { getInputValues }
