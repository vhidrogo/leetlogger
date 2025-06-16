/**
 * Calculates aggregate metrics for a selection of problem attempts.
 *
 * Metrics include:
 * - totalProblems: total number of problems provided
 * - unattempted: number of problems with undefined startTime
 * - notSolved: percentage of attempted problems not solved
 * - timeNotOptimal: percentage of attempted problems with suboptimal time complexity
 * - spaceNotOptimal: percentage of attempted problems with suboptimal space complexity
 * - notQualityCode: percentage of attempted problems not marked as quality code
 * - oldestAttemptDate: earliest startTime among attempted problems, or '' if none
 * - newestAttemptDate: latest startTime among attempted problems, or '' if none
 *
 * @param {Array<Object>} problemAttempts - Array of problem attempt objects.
 * @param {string|undefined} problemAttempts[].startTime - Timestamp string of the attempt start, or undefined if unattempted.
 * @param {boolean} [problemAttempts[].solved] - Whether the problem was solved.
 * @param {boolean} [problemAttempts[].timeComplexityOptimal] - Whether the solution was time complexity optimal.
 * @param {boolean} [problemAttempts[].spaceComplexityOptimal] - Whether the solution was space complexity optimal.
 * @param {boolean} [problemAttempts[].qualityCode] - Whether the code met quality standards.
 * @returns {Object} An object containing calculated metrics.
 * @returns {number} return.totalProblems
 * @returns {number} return.unattempted
 * @returns {number} return.notSolved
 * @returns {number} return.timeNotOptimal
 * @returns {number} return.spaceNotOptimal
 * @returns {number} return.notQualityCode
 * @returns {Date|string} return.oldestAttemptDate
 * @returns {Date|string} return.newestAttemptDate
 */
function calculateSelectionMetrics(problemAttempts) {
    let unattemptedCount = 0;
    let notSolvedCount = 0;
    let timeNotOptimalCount = 0;
    let spaceNotOptimalCount = 0;
    let notQualityCodeCount = 0;
    let oldestAttemptDate = '';
    let newestAttemptDate = '';

    for (const problem of problemAttempts) {
        if (problem.startTime === undefined) {
            unattemptedCount ++;
            continue;
        }
        if (problem.solved === false) notSolvedCount++;
        if (problem.timeComplexityOptimal === false) timeNotOptimalCount++;
        if (problem.spaceComplexityOptimal === false) spaceNotOptimalCount++;
        if (problem.qualityCode === false) notQualityCodeCount++;

        const problemDate = new Date(problem.startTime);

        if (!oldestAttemptDate || problemDate < oldestAttemptDate) oldestAttemptDate = problemDate;
        if (!newestAttemptDate || problemDate > newestAttemptDate) newestAttemptDate = problemDate;
    }

    const attemptedCount = problemAttempts.length - unattemptedCount;

    return {
        totalProblems: problemAttempts.length,
        unattempted: unattemptedCount,
        notSolved: notSolvedCount,
        timeNotOptimal: timeNotOptimalCount,
        spaceNotOptimal: spaceNotOptimalCount,
        notQualityCode: notQualityCodeCount,
        oldestAttemptDate: oldestAttemptDate,
        newestAttemptDate: newestAttemptDate,
    }
}

module.exports = { calculateSelectionMetrics }
