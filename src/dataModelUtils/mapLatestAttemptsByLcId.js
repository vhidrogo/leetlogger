const { convertArrayToObject } = require("../utils/convertArrayToObject");

/**
 * Maps the latest attempt for each problem by 'LC ID' from a 2D array of attempts data.
 * It identifies the latest attempt based on the 'Start Time' column and converts each row
 * into an object keyed by its headers.
 *
 * @param {Array<Array<string>>} attempts - A 2D array where the first row contains headers,
 *     and subsequent rows contain attempt data. Must include 'LC ID' and 'Start Time' columns.
 * @returns {Object.<string, Object>} An object mapping 'LC ID' values (as strings) to the latest attempt objects.
 *     Each attempt object is constructed from its corresponding row, keyed by the headers.
 * @throws {Error} If 'LC ID' or 'Start Time' columns are missing from the headers.
 */
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

    for (const lcId in latestAttemptsMap) {
        latestAttemptsMap[lcId] = convertArrayToObject(headers, latestAttemptsMap[lcId]);
    }

    return latestAttemptsMap;
}

module.exports = { mapLatestAttemptsByLcId }