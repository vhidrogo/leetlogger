function getLatestAttemptsMap() {
    const excludeColumns = ['Notes'];
    const attempts = getSheetData('Attempts', excludeColumns);

    return mapLatestAttemptsByLcId(attempts);
}

function getLatestAttemptsMapLogTest() {
    const attemptsObj = getLatestAttemptsMap();
    Object.entries(attemptsObj).slice(0, 5).forEach(row => Logger.log(row));
}