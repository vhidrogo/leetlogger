function mapLatestAttemptsByLcId(attempts) {
    const [headers, ...data] = attempts;
    const lcIdIndex = headers.indexOf('LC ID');
    const startTimeIndex = headers.indexOf('Start Time');

    if (lcIdIndex === -1 || startTimeIndex === -1) {
        throw new Error('One or more required columns are missing from attempts data.');
    }

    const latestAttemptsMap = {};

    for (const row of data) {
        const lcId = row[lcIdIndex];
        const startTime = new Date(row[startTimeIndex]);
        if (!latestAttemptsMap[lcId] || new Date(latestAttemptsMap[lcId][startTimeIndex]) < startTime) {
            latestAttemptsMap[lcId] = row;
        }
    }
    
    return latestAttemptsMap;
}

module.exports = { mapLatestAttemptsByLcId }