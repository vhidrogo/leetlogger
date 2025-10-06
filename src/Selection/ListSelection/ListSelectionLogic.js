const { NoMoreProblemsError } = require("../../errors");
const { convert2DArrayToObjects } = require("../../utils/convert2DArrayToObjects");
const { convertArrayToObject } = require("../../utils/convertArrayToObject");

function getFirstProblem(orderedList, problems) {
    const problemName = orderedList[1][1];
    const matches = filter2DArrayRows(problems, [{ field: 'name', value: problemName, mode: 'equals' }]);

    if (!matches.length) {
        throw new Error(`Problem ${problemName} not found`);
    }
    
    return convertArrayToObject(problems[0], matches[1]);
}

function getNextProblem(orderedList, problems, latestAttemptsMap) {
    const [problemHeaders, ...problemData] = problems;
    const problemObjs = convert2DArrayToObjects(problemHeaders, problemData);
    const problemsMap = Object.fromEntries(
        problemObjs.map(problem => [problem.name, problem])
    )

    for (let i = 1; i < orderedList.length; i++) {
        const name = orderedList[i][1];
        const problem = problemsMap[name];
        if (!problem) throw new Error(`Problem ${name} not found`);

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