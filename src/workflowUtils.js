const { getNamedRangeValue } = require("./sheetUtils/getNamedRangeValue");
const { setNamedRangeValue } = require("./sheetUtils/setNamedRangeValue");
const { getInputsFromSheetUI } = require("./sheetUtils/getInputsFromSheetUI");
const { setInputsOnSheetUI } = require("./sheetUtils/setInputsOnSheetUI");
const { MODEL_FIELD_MAPPINGS, NAMED_RANGES } = require("./constants");
const { calculateSelectionMetrics } = require("./dataModelUtils/calculateSelectionMetrics");
const { formatTimeSince } = require("./utils/formatTimeSince");

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
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SKIP_COUNT, '');

    if (problems.length) {
        updateCurrentProblem(
            problems[0],
            NAMED_RANGES.ControlPanel.CURRENT_PROBLEM_ATTRIBUTES,
            NAMED_RANGES.ControlPanel.CURRENT_PROBLEM_LATEST_ATTEMPT_ATTRIBUTES,
            NAMED_RANGES.ControlPanel.TIME_SINCE_CURRENT_PROBLEM
        );
    } else {
        clearCurrentProblem(
            NAMED_RANGES.ControlPanel.CURRENT_PROBLEM_ATTRIBUTES,
            NAMED_RANGES.ControlPanel.CURRENT_PROBLEM_LATEST_ATTEMPT_ATTRIBUTES,
            NAMED_RANGES.ControlPanel.TIME_SINCE_CURRENT_PROBLEM
        );
    }
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
 * Retrieves the input fields map from the UI for both problem attributes and latest attempt attributes  
 * using the provided named ranges, then maps the provided attribute values to their corresponding keys  
 * and writes the updated values back to the UI.
 *
 * For the latest attempt attributes section, if a given attribute key does not exist in the provided  
 * problemAttemptAttributes object, the corresponding input field is set to an empty string.
 *
 * Also updates the "time since current problem" value using the provided range name.
 *
 * @param {Object} problemAttemptAttributes - An object containing attribute key-value pairs for the selected problem and its latest attempt.
 *                                            Keys should match the input field names in the UI control panel ranges.
 * @param {string} problemAttributesRangeName - The named range for the problem attributes section in the UI.
 * @param {string} latestAttemptsRangeName - The named range for the latest attempt attributes section in the UI.
 * @param {string} timeSinceRangeName - The named range for displaying the time since the current problem was started.
 */
function updateCurrentProblem(problemAttemptAttributes, problemAttributesRangeName, latestAttemptsRangeName, timeSinceRangeName) {
    const problemAttributes = getInputsFromSheetUI(problemAttributesRangeName);
    for (const key of problemAttributes.keys()) {
        const fieldKey = MODEL_FIELD_MAPPINGS.Problem[key];
        if (problemAttemptAttributes.hasOwnProperty(fieldKey)) {
            problemAttributes.set(key, problemAttemptAttributes[fieldKey]);
        }
    }
    setInputsOnSheetUI(problemAttributesRangeName, problemAttributes);

    const latestAttemptAttributes = getInputsFromSheetUI(latestAttemptsRangeName);
    for (const key of latestAttemptAttributes.keys()) {
        const fieldKey = MODEL_FIELD_MAPPINGS.Attempt[key];
        const newValue = problemAttemptAttributes[fieldKey] ?? '';
        latestAttemptAttributes.set(key, newValue);
    }
    setInputsOnSheetUI(latestAttemptsRangeName, latestAttemptAttributes);

    if (problemAttemptAttributes.startTime) {
        const timeSince = formatTimeSince(problemAttemptAttributes.startTime);
        setNamedRangeValue(timeSinceRangeName, timeSince);
    } else {
        setNamedRangeValue(timeSinceRangeName, 'Unattempted');
    }
}

/**
 * Clears the currently selected problem's attributes and latest attempt details from the UI.
 *
 * Resets all input fields in both the problem attributes and latest attempt attributes sections  
 * of the control panel to their default (empty) state, using the provided named ranges.  
 * Additionally, clears the value displayed for the "time since current problem" field.
 *
 * This is typically used when no problem is actively selected or when transitioning between problems  
 * to ensure no residual data is displayed.
 *
 * @param {string} problemAttributesRangeName - The named range for the problem attributes section in the UI.
 * @param {string} latestAttemptsRangeName - The named range for the latest attempt attributes section in the UI.
 * @param {string} timeSinceRangeName - The named range for the "time since current problem" field in the UI.
 */
function clearCurrentProblem(problemAttributesRangeName, latestAttemptsRangeName, timeSinceRangeName) {
    resetInputValues(problemAttributesRangeName);
    resetInputValues(latestAttemptsRangeName);
    setNamedRangeValue(timeSinceRangeName, '');
}

function updateSelectionMetrics(problemAttempts) {
    const metrics = calculateSelectionMetrics(problemAttempts);

    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_PROBLEMS, metrics.totalProblems);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_UNATTEMPTED, metrics.unattempted);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NOT_SOLVED, metrics.notSolved);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_TIME_NOT_OPTIMAL, metrics.timeNotOptimal);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_SPACE_NOT_OPTIMAL, metrics.spaceNotOptimal);
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NOT_QUALITY_CODE, metrics.notQualityCode);
    const oldestAttempt = metrics.oldestAttemptDate ? formatTimeSince(metrics.oldestAttemptDate) : 'None';
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_OLDEST_ATTEMPT, oldestAttempt);
    const newestAttempt = metrics.newestAttemptDate ? formatTimeSince(metrics.newestAttemptDate) : 'None';
    setNamedRangeValue(NAMED_RANGES.ControlPanel.SELECTION_METRICS_NEWEST_ATTEMPT, newestAttempt);
}

/**
 * Retrieves the current problem's LeetCode ID from the named range.
 * 
 * @throws {Error} If no LC ID is found in the named range.
 * @returns {string} The LeetCode ID of the currently selected problem.
 */
function getCurrentProblemLcId(rangeName) {
    const lcId = getNamedRangeValue(rangeName);
    if (!lcId) {
        throw new Error('Missing LC ID.');
    }

    return lcId;
}

/**
 * Checks whether a LeetLogger problem attempt is currently in progress.
 *
 * This is determined by checking if the progress value named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if an attempt is in progress, false otherwise.
 */
function isAttemptInProgress() {
    return getNamedRangeValue(NAMED_RANGES.AttemptInProgress.PROGRESS) != '';
}

/**
 * Checks whether the current LeetLogger problem attempt has been completed.
 *
 * This is determined by checking if the end time value named range
 * in the sheet has a non-empty value.
 *
 * @returns {boolean} True if the attempt is complete, false otherwise.
 */
function isAttemptDone() {
    return getNamedRangeValue(NAMED_RANGES.AttemptInProgress.END_TIME) != '';
}

/**
 * Resets the Attempt In Progress UI input fields to their default state.
 *
 * - Clears specified fields (`Start Time`, `End Time`, `Notes`) from the Attempt In Progress inputs.
 * - Sets default values for calculated fields:
 *   - `Duration Minutes` is set as the difference between `END_TIME` and `START_TIME` in minutes.
 *   - `Cap Minutes` is dynamically calculated based on the selected dominant topic and difficulty.
 *   - Boolean fields (`Solved`, `Time Complexity Optimal`, `Space Complexity Optimal`, `Quality Code`) are reset to `false`.
 * - Resets all problem attribute fields in the Attempt In Progress section.
 *
 * @returns {void}
 */
function resetAttemptInputs() {
    const clearFields = [
        'Start Time',
        'End Time',
        'Notes'
    ]

    const defaults = {
        'Duration Minutes': `=if(
            ${NAMED_RANGES.AttemptInProgress.END_TIME}="","",
            (${NAMED_RANGES.AttemptInProgress.END_TIME}-${NAMED_RANGES.AttemptInProgress.START_TIME})*1440
            )`,
        'Cap Minutes': `=iferror(index(
            ${NAMED_RANGES.TargetTimes.MAX_MINUTES},
            match(
                ${NAMED_RANGES.AttemptInProgress.DOMINANT_TOPIC}&${NAMED_RANGES.AttemptInProgress.DIFFICULTY},
                ${NAMED_RANGES.TargetTimes.TOPIC}&${NAMED_RANGES.TargetTimes.DIFFICULTY},
                0
            ),
            1
        ),"")`,
        'Solved': false,
        'Time Complexity Optimal': false,
        'Space Complexity Optimal': false,
        'Quality Code': false,
    }

    resetInputValues(NAMED_RANGES.AttemptInProgress.INPUTS, defaults, clearFields);
    resetInputValues(NAMED_RANGES.AttemptInProgress.PROBLEM_ATTRIBUTES);
}

module.exports = {
    clearCurrentProblem,
    updateSelectionMetrics,
    updateCurrentProblem,
    updateSkipCount,
    getCurrentProblemLcId,
    isAttemptInProgress,
    isAttemptDone,
    resetAttemptInputs,
    restartProblemSelection
}