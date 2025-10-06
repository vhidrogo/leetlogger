const { NoMoreProblemsError, ProblemNotFoundError } = require("../../errors");
const { convert2DArrayToObjects } = require("../../utils/convert2DArrayToObjects");
const { convertArrayToObject } = require("../../utils/convertArrayToObject");

/**
 * Retrieves the first problem in the given ordered list.
 *
 * @param {any[][]} orderedList - The ordered list of problems (including headers).
 * @param {any[][]} problems - The raw problem data from the "Problem" sheet.
 * @throws {ProblemNotFoundError} If the first problem cannot be found in the dataset.
 * @returns {Object} The first problem object.
 */
function getFirstProblem(orderedList, problems) {
    const problemName = orderedList[1][1];
    const matches = filter2DArrayRows(problems, [{ field: 'name', value: problemName, mode: 'equals' }]);

    if (!matches.length) {
        throw new ProblemNotFoundError(`Problem ${problemName} not found`);
    }
    
    return convertArrayToObject(problems[0], matches[1]);
}

/**
 * Determines the next problem to attempt in the list.
 * Selects the first problem that has not been attempted more recently
 * than its predecessor.
 *
 * @param {any[][]} orderedList - The ordered list of problems (including headers).
 * @param {any[][]} problems - The raw problem data from the "Problem" sheet.
 * @param {Object.<string, Object>} latestAttemptsMap - Map of problem lcIds to their latest attempt data.
 * @throws {ProblemNotFoundError} If a problem in the list cannot be found.
 * @throws {NoMoreProblemsError} If all problems have already been attempted.
 * @returns {Object} The next problem object.
 */
function getNextProblem(orderedList, problems, latestAttemptsMap) {
    const [problemHeaders, ...problemData] = problems;
    const problemObjs = convert2DArrayToObjects(problemHeaders, problemData);
    const problemsMap = Object.fromEntries(
        problemObjs.map(problem => [problem.name, problem])
    )

    for (let i = 1; i < orderedList.length; i++) {
        const name = orderedList[i][1];
        const problem = problemsMap[name];
        if (!problem) throw new ProblemNotFoundError(`Problem ${name} not found`);

        const latestAttempt = latestAttemptsMap[problem.lcId];
        
        if (!latestAttempt) return problem;

        if (i === 1) continue;

        const prevOrderLatestAttempt = latestAttemptsMap[problemsMap[orderedList[i - 1][1]].lcId];

        if (latestAttempt.startTime < prevOrderLatestAttempt.startTime) return problem;
    }

    throw new NoMoreProblemsError();
}

module.exports = {
    getFirstProblem,
    getNextProblem,
}