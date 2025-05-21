const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");

/**
 * Checks whether a LeetLogger problem attempt is currently in progress.
 *
 * This is determined by checking if the 'ControlPanel_StartTime' named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if an attempt is in progress, false otherwise.
 */
function isAttemptInProgress() {
    return getNamedRangeValue('ControlPanel_StartTime') != '';
}

/**
 * Checks whether the current LeetLogger problem attempt has been completed.
 *
 * This is determined by checking if the 'ControlPanel_EndTime' named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if the attempt is complete, false otherwise.
 */
function isAttemptDone() {
    return getNamedRangeValue('ControlPanel_EndTime') != '';
}

module.exports = { isAttemptInProgress, isAttemptDone }