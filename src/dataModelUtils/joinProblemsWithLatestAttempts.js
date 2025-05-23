/**
 * Joins each problem object in the problems array with its corresponding latest attempt data,
 * based on matching 'lcId' in the problem object and keys in the latestAttemptsMap.
 * If an attempt exists for a problem, its properties are merged into the problem object.
 *
 * Both problems and latestAttemptsMap are expected to use normalized model field names.
 *
 * @param {Array<Object>} problems - Array of problem objects, each containing at least an 'lcId' property.
 * @param {Object.<string, Object>} latestAttemptsMap - An object mapping 'lcId' values (as strings) to attempt data objects.
 * @returns {Array<Object>} The updated array of problem objects, each merged with its latest attempt data if available.
 */
function joinProblemsWithLatestAttempts(problems, latestAttemptsMap) {
    for (const problemObj of problems) {
        const attemptObj = latestAttemptsMap[problemObj.lcId];
        if (attemptObj) {
            Object.assign(problemObj, attemptObj);
        }
    }

    return problems;
}

module.exports = { joinProblemsWithLatestAttempts }
