const { NAMED_RANGES, DOMINANT_TOPICS } = require("../constants");
const { getColumnDataFromSheet } = require("../sheetUtils/getColumnDataFromSheet");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { getNamedRangeValue } = require("../sheetUtils/getNamedRangeValue");
const { writeToNamedRangeWithHeaders } = require("../sheetUtils/writeToNamedRangeWithHeaders");
const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");
const { convertArrayToObject } = require("../utils/convertArrayToObject");
const { filter2DArrayRows } = require("../utils/filter2DArrayRows");

function onDifficultyCountsUpdateClick() {
    const difficulty = getNamedRangeValue(NAMED_RANGES.DifficultyCounts.DIFFICULTY);
    const timeframe = getNamedRangeValue(NAMED_RANGES.DifficultyCounts.TIMEFRAME);
    const order = getNamedRangeValue(NAMED_RANGES.DifficultyCounts.ORDER);

    const metrics = getTopicDifficultyMetrics(difficulty, timeframe);

    if (order === 'Attempts') {
        metrics.sort((a, b) => a.attempts - b.attempts);
    } else if (order === 'Unattempted') {
        metrics.sort((a, b) => b.unattempted - a.unattempted);
    }

    writeToNamedRangeWithHeaders(metrics, NAMED_RANGES.DifficultyCounts.COUNTS);
}

function getTopicDifficultyMetrics(difficulty, timeframe) {
    const dominantTopicMetrics = {};
    for (const topic of DOMINANT_TOPICS) {
        dominantTopicMetrics[topic] = {
            dominantTopic: topic,
            totalProblems: 0,
            unattempted: 0,
            attempts: 0,
        }
    }

    const problemTopicMap = getProblemAndTopicMap(difficulty);
    const attemptCountsByLcId = getAttemptCountsByLcId(getCutoffDate(timeframe));

    for (const [lcId, topic] of problemTopicMap) {
        if (dominantTopicMetrics.hasOwnProperty(topic)) {
            if (dominantTopicMetrics.hasOwnProperty(topic)) dominantTopicMetrics[topic].totalProblems++;
            if (attemptCountsByLcId.hasOwnProperty(lcId)) {
                dominantTopicMetrics[topic].attempts += attemptCountsByLcId[lcId];
            } else {
                dominantTopicMetrics[topic].unattempted++;
            }
        }
    }

    return Object.values(dominantTopicMetrics);
}

function getAttemptCountsByLcId(cutoffDate) {
    const [headers, ...attemptsData] = getModelDataFromSheet('Attempt');
    const attemptsObjects = convert2DArrayToObjects(headers, attemptsData);
    const mapping = {};
    for (const attempt of attemptsObjects) {
        if (!cutoffDate || attempt.startTime >= cutoffDate) {
            mapping[attempt.lcId] = (mapping[attempt.lcId] || 0) + 1;
        }
    }
    
    return mapping;
}

function getCutoffDate(option) {
    const now = new Date();
    const date = new Date(now);
  
    switch (option) {
        case 'All':
            return null; // no cutoff
        case '1 month':
            date.setMonth(date.getMonth() - 1);
            break;
        case '3 months':
            date.setMonth(date.getMonth() - 3);
            break;
        case '6 months':
            date.setMonth(date.getMonth() - 6);
            break;
        case '1 year':
            date.setFullYear(date.getFullYear() - 1);
            break;
        default:
            throw new Error('Invalid timeframe option: ' + option);
    }
    
    return date;
}

function getProblemAndTopicMap(difficulty) {
    const problems = getModelDataFromSheet('Problem');
    const difficultyProblems = filter2DArrayRows(problems, { difficulty: difficulty });

    const map = new Map();

    const [headers, ...data] = difficultyProblems;
    for (const row of data) {
        const obj = convertArrayToObject(headers, row);
        map.set(obj.lcId, obj.dominantTopic);
    }
    
    return map;
}