const { NAMED_RANGES, MODEL_FIELD_MAPPINGS } = require("../constants");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { getNamedRangeValue } = require("../sheetUtils/getNamedRangeValue");
const { writeToNamedRangeWithHeaders } = require("../sheetUtils/writeToNamedRangeWithHeaders");
const { convertArrayToObject } = require("../utils/convertArrayToObject");

function onLatestAttemptsUpdateClick() {
    const count = getNamedRangeValue(NAMED_RANGES.LatestAttempts.COUNT);
    if (!count) {
        SpreadsheetApp.getUi().alert('Count required.');
        return;
    }

    const topAttempts = getTopAttempts(count);
    const problemIds = topAttempts.map(obj => obj.lcId);
    const problemsById = getProblemsDataById(new Set(problemIds));

    for (const attemptObj of topAttempts) {
        const problemObj = problemsById[attemptObj.lcId];
        if (problemObj) {
            Object.assign(attemptObj, problemObj);
        }
    }

    writeToNamedRangeWithHeaders(topAttempts, NAMED_RANGES.LatestAttempts.ATTEMPTS);
}

function getProblemsDataById(problemIdSet) {
    const [problemHeaders, ...problemsData] = getModelDataFromSheet('Problem');
    const lcIdIndex = problemHeaders.indexOf('lcId');
    const problemsDataById = {};
    
    for (const row of problemsData) {
        const lcId = row[lcIdIndex]
        if (problemIdSet.has(lcId)) {
            problemsDataById[lcId] = convertArrayToObject(problemHeaders, row);
        }
    }

    return problemsDataById;
}

function getTopAttempts(count) {
    const [attemptHeaders, ...attemptsData] = getModelDataFromSheet('Attempt');
    const startTimeIndex = attemptHeaders.indexOf('startTime');

    attemptsData.sort((a, b) => {
        const aDate = new Date(a[startTimeIndex]);
        const bDate = new Date(b[startTimeIndex]);
        return bDate - aDate;
    });

    return attemptsData.slice(0, count).map(row => convertArrayToObject(attemptHeaders, row));
}