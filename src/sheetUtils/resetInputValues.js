/**
 * Resets input values in a specified named range in the sheet UI.
 * Fields are either reset to their default values from `defaultsMap`, cleared to an empty string,
 * or left unchanged if neither applies.
 *
 * @param {string} rangeName - The name of the range in the sheet containing the input fields.
 * @param {Object.<string, string>} defaultsMap - An object mapping field names to their default values.
 * @param {string[]} clearFields - An array of field names to be cleared (set to an empty string).
 * @returns {void}
 */
function resetInputValues(rangeName, defaultsMap, clearFields) {
    const inputsMap = getInputsFromSheetUI(rangeName);

    for (const key of inputsMap.keys()) {
        if (defaultsMap.hasOwnProperty(key)) {
            inputsMap.set(key, defaultsMap[key]);
      } else if (clearFields.includes(key)) {
        inputsMap.set(key, '');
      }
    }

    setInputsOnSheetUI(rangeName, inputsMap);
}