const { NAMED_RANGES } = require("../constants");
const { getNamedRangeValue } = require("../sheetUtils/getNamedRangeValue");
const { problemAttemptComparator } = require("./problemAttemptComparator");

/**
 * Sorts the given array of problem attempt objects in place based on the current prioritization
 * configuration values from the Control Panel.
 *
 * The sort order is determined by prioritizing problems with unattempted status, unsolved status,
 * or failing optimization criteria according to the enabled config settings.
 *
 * This function mutates the input array directly.
 *
 * @param {Array<Object>} problemAttempts - The array of problem attempt objects to sort. Objects are expected to
 * have normalized model field names and merged latest attempt data.
 */
function sortProblemAttempts(problemAttempts) {
    const config = {
        prioritizeUnattempted: getNamedRangeValue(NAMED_RANGES.GroupSelection.PRIORITIZE_UNATTEMPTED),
        prioritizeUnsolved: getNamedRangeValue(NAMED_RANGES.GroupSelection.PRIORITIZE_UNSOLVED),
        prioritizeTimeNotOptimal: getNamedRangeValue(NAMED_RANGES.GroupSelection.PRIORITIZE_TIME_NOT_OPTIMAL),
        prioritizeSpaceNotOptimal: getNamedRangeValue(NAMED_RANGES.GroupSelection.PRIORITIZE_SPACE_NOT_OPTIMAL),
        prioritizeCodeQualityNotOptimal: getNamedRangeValue(NAMED_RANGES.GroupSelection.PRIORITIZE_NOT_QUALITY_CODE)
    }
    
    problemAttempts.sort((a, b) => problemAttemptComparator(a, b, config));
}

module.exports = { sortProblemAttempts }