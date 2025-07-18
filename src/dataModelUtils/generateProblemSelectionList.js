const { NAMED_RANGES } = require("../constants");
const { getFilteredProblems } = require("./getFilteredProblems");
const { getLatestAttemptsMap } = require("./getLatestAttemptsMap");
const { joinProblemsWithLatestAttempts } = require("./joinProblemsWithLatestAttempts");
const { sortProblemAttempts } = require("./sortProblemAttempts");

/**
 * Generates a list of problem objects joined with their latest attempt data.
 * 
 * Retrieves filtered problems based on control panel criteria, fetches the latest attempts
 * for each problem by 'LC ID', and merges the latest attempt data into the corresponding
 * problem objects. Sorts the array of merged problem and attempt objects based on the 
 * prioritization configurations set via UI.
 * 
 * @returns {Array<Object>} An array of problem objects, each enriched with its latest attempt data.
 *     The array is currently unsorted but prepared for future prioritization logic.
 */
function generateProblemSelectionList() {
    const problems = getFilteredProblems(NAMED_RANGES.GroupSelection.FILTERS);
    const latestAttemptsMap = getLatestAttemptsMap();

    const problemAttempts = joinProblemsWithLatestAttempts(problems, latestAttemptsMap);

    sortProblemAttempts(problemAttempts);

    return problemAttempts;
}

function generateProblemSelectionListLogTest() {
    generateProblemSelectionList().forEach(row => Logger.log(row));
}

module.exports = { generateProblemSelectionList }
