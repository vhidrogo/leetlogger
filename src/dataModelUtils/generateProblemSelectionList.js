const { getFilteredProblems } = require("./getFilteredProblems");
const { getLatestAttemptsMap } = require("./getLatestAttemptsMap");
const { joinProblemsWithLatestAttempts } = require("./joinProblemsWithLatestAttempts");

/**
 * Generates a list of problem objects joined with their latest attempt data.
 * 
 * Retrieves filtered problems based on control panel criteria, fetches the latest attempts
 * for each problem by 'LC ID', and merges the latest attempt data into the corresponding
 * problem objects.
 * 
 * @returns {Array<Object>} An array of problem objects, each enriched with its latest attempt data.
 *     The array is currently unsorted but prepared for future prioritization logic.
 */
function generateProblemSelectionList() {
    const problems = getFilteredProblems();
    const latestAttemptsMap = getLatestAttemptsMap();

    const problemAttempts = joinProblemsWithLatestAttempts(problems, latestAttemptsMap);

    // TODO: sort problem attempts using selection prioritization logic

    return problemAttempts;
}

module.exports = { generateProblemSelectionList }
