function joinProblemsWithLatestAttempts(problems, latestAttemptsMap) {
    for (const problemObj of problems) {
        const attemptObj = latestAttemptsMap[problemObj['LC ID']];
        if (attemptObj) {
            Object.assign(problemObj, attemptObj);
        }
    }

    return problems;
}

module.exports = { joinProblemsWithLatestAttempts }
