const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { MODEL_FIELD_MAPPINGS, NAMED_RANGES } = require("./constants");
const { calculateSelectionMetrics } = require("./dataModelUtils/calculateSelectionMetrics");

/**
 * Regenerates the problem selection list, updates selection metrics,
 * clears the skip count display, and displays the next problem.
 * 
 * This function is used after workflows where the problem selection 
 * list may have changed — such as after logging a new attempt or 
 * initializing a new selection session. Unlike the skip workflow,
 * this resets skip progress, recalculates metrics based on the 
 * potentially updated list, and displays the problem at index 0.
 *
 * Intended for use in selection workflows where the problem pool 
 * and associated metrics require refreshing before progression.
 */
function restartProblemSelection() {
    const problems = generateProblemSelectionList();
    updateSelectionMetrics(problems);
    updateCurrentProblem(problems[0]);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SKIP_COUNT, '');
}

/**
 * Displays the current problem's position within the problem list in the Control Panel.
 *
 * @param {number} problemIndex - Zero-based index of the current problem in the problem list.
 * @param {number} problemListCount - Total number of problems in the current selection list.
 */
function updateSkipCount(problemIndex, problemListCount) {
    const text = `Skipped ${problemIndex} of ${problemListCount}`;
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SKIP_COUNT, text);
}

/**
 * Updates the UI with the selected problem's attributes and latest attempt details.
 *
 * Retrieves the input fields map from the UI for both problem attributes and latest attempt attributes,  
 * then maps the provided attribute values to their corresponding keys and writes the updated values  
 * back to the UI.
 *
 * For the latest attempt attributes section, if a given attribute key does not exist in the provided  
 * problemAttemptAttributes object, the corresponding input field is set to an empty string.
 *
 * @param {Object} problemAttemptAttributes - An object containing attribute key-value pairs for the selected problem and its latest attempt.
 *                                            Keys should match the input field names in the UI control panel ranges.
 */
function updateCurrentProblem(problemAttemptAttributes) {
    const problemAttributesRangeName = 'ControlPanel_CurrentProblem_ProblemAttributes';
    const latestAttemptAttributesRangeName = 'ControlPanel_CurrentProblem_LatestAttemptAttributes'

    const problemAttributes = getInputsFromSheetUI(problemAttributesRangeName);
    for (const key of problemAttributes.keys()) {
        const fieldKey = MODEL_FIELD_MAPPINGS.Problem[key];
        if (problemAttemptAttributes.hasOwnProperty(fieldKey)) {
            problemAttributes.set(key, problemAttemptAttributes[fieldKey]);
        }
    }
    setInputsOnSheetUI(problemAttributesRangeName, problemAttributes);

    const latestAttemptAttributes = getInputsFromSheetUI(latestAttemptAttributesRangeName);
    for (const key of latestAttemptAttributes.keys()) {
        const fieldKey = MODEL_FIELD_MAPPINGS.Attempt[key];
        const newValue = problemAttemptAttributes[fieldKey] ?? '';
        latestAttemptAttributes.set(key, newValue);
    }
    setInputsOnSheetUI(latestAttemptAttributesRangeName, latestAttemptAttributes);
}

function updateSelectionMetrics(problemAttempts) {
    if (!problemAttempts.length) return;

    const metrics = calculateSelectionMetrics(problemAttempts);

    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_PROBLEMS, metrics.totalProblems);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_UNATTEMPTED, metrics.unattempted);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NOT_SOLVED, metrics.notSolved);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_TIME_NOT_OPTIMAL, metrics.timeNotOptimal);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_SPACE_NOT_OPTIMAL, metrics.spaceNotOptimal);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NOT_QUALITY_CODE, metrics.notQualityCode);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_OLDEST_ATTEMPT_DATE, metrics.oldestAttemptDate);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NEWEST_ATTEMPT_DATE, metrics.newestAttemptDate);
}

/**
 * Retrieves the current problem's LeetCode ID from the named range.
 * 
 * @throws {Error} If no LC ID is found in the named range.
 * @returns {string} The LeetCode ID of the currently selected problem.
 */
function getCurrentProblemLcId() {
    const lcId = getNamedRangeValue('ControlPanel_CurrentProblem_LC_ID');
    if (!lcId) {
        throw new Error('Missing LC ID.');
    }

    return lcId;
}

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

module.exports = {
    updateSelectionMetrics,
    updateCurrentProblem,
    updateSkipCount,
    getCurrentProblemLcId,
    isAttemptInProgress,
    isAttemptDone,
    restartProblemSelection
}