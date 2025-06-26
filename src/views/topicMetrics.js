const { NAMED_RANGES, DOMINANT_TOPICS, MODEL_FIELD_MAPPINGS } = require("../constants");
const { getFilteredProblems } = require("../dataModelUtils/getFilteredProblems");
const { getColumnDataFromSheet } = require("../sheetUtils/getColumnDataFromSheet");
const { getInputsFromSheetUI } = require("../sheetUtils/getInputsFromSheetUI");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { getNamedRangeValue } = require("../sheetUtils/getNamedRangeValue");
const { getNamedRangeValues } = require("../sheetUtils/getNamedRangeValues");
const { writeToNamedRangeWithHeaders } = require("../sheetUtils/writeToNamedRangeWithHeaders");
const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");
const { convertArrayToObject } = require("../utils/convertArrayToObject");
const { filter2DArrayRows } = require("../utils/filter2DArrayRows");

function onTopicMetricsUpdateClick() {
    const excludeDominantTopics = getNamedRangeValue(NAMED_RANGES.TopicMetrics.EXCLUDE_DOMINANT_TOPICS)
        .split(',')
        .map(topic => topic.trim());
    const dominantTopics = new Set(
        getNamedRangeValues(NAMED_RANGES.Options.DOMINANT_TOPICS)
            .flat()
            .filter(v => v !== '' && !excludeDominantTopics.includes(v))
    );
    const problems = getFilteredProblems(NAMED_RANGES.TopicMetrics.PROBLEM_FILTERS);
    
    const timeframe = getNamedRangeValue(NAMED_RANGES.TopicMetrics.TIMEFRAME);
    const cutoffDate = getCutoffDate(timeframe);
    const attemptMetricsByLcId = getAttemptMetricsByLcId(cutoffDate);
    const sortMetric = getNamedRangeValue(NAMED_RANGES.TopicMetrics.SORT_METRIC);

    const topN = getNamedRangeValue(NAMED_RANGES.TopicMetrics.TOP_N);
    const topicMetrics = getTopicMetrics(topN, dominantTopics, problems, attemptMetricsByLcId, sortMetric);
    writeToNamedRangeWithHeaders(topicMetrics, NAMED_RANGES.TopicMetrics.TOPIC_METRICS);
}

function getTopicMetrics(topN, dominantTopics, problems, attemptMetricsByLcId, sortMetric) {
    const metricsByDominantTopic = {};
    for (const problem of problems) {
        if (dominantTopics.has(problem.dominantTopic)) {
            if (!metricsByDominantTopic.hasOwnProperty(problem.dominantTopic)) {
                metricsByDominantTopic[problem.dominantTopic] = { dominantTopic: problem.dominantTopic };
            }
            const topicMetrics = metricsByDominantTopic[problem.dominantTopic];
            topicMetrics.totalProblems = (topicMetrics.totalProblems || 0) + 1;
            if (attemptMetricsByLcId.hasOwnProperty(problem.lcId)) {
                for (const metric in attemptMetricsByLcId[problem.lcId]) {
                    topicMetrics[metric] = (topicMetrics[metric] || 0) + attemptMetricsByLcId[problem.lcId][metric];
                }
            } else {
                topicMetrics.unattempted = (topicMetrics.unattempted || 0) + 1;
            }
        }
    }

    const metrics = Object.values(metricsByDominantTopic);

    if (sortMetric === 'Unattempted') {
        metrics.sort((a, b) => b.unattempted - a.unattempted);
    } else if (sortMetric === 'Total Problems') {
        metrics.sort((a, b) => a.totalProblems - b.totalProblems);
    } else if (sortMetric === 'Total Attempts') {
        metrics.sort((a, b) => a.totalAttempts - b.totalAttempts);
    } else {
        metrics.sort((a, b) => {
            const aMetric = a.totalAttempts > 0 ? a[MODEL_FIELD_MAPPINGS.Attempt[sortMetric]] / a.totalAttempts : 0;
            const bMetric = b.totalAttempts > 0 ? b[MODEL_FIELD_MAPPINGS.Attempt[sortMetric]] / b.totalAttempts : 0;
            return aMetric - bMetric;
        })
    }

    const topNMetrics = metrics.slice(0, topN);
    const allOther = metrics.slice(topN);

    const allOtherCombined = allOther.reduce((acc, obj) => {
        for (const key in obj) {
            if (key !== 'dominantTopic') {
                acc[key] = (acc[key] || 0) + obj[key];
            }
        }
        return acc;
    }, {});
    allOtherCombined.dominantTopic = 'All Other';

    const outputMetrics = [...topNMetrics, allOtherCombined];
    const percentFields = ['solved', 'timeComplexityOptimal', 'spaceComplexityOptimal', 'qualityCode'];
    
    outputMetrics.forEach(obj => {
        const total = obj.totalAttempts;
        percentFields.forEach(field => {
            if (obj[field] !== undefined) {
            obj[field] = total ? (obj[field] / total) : 0;
            }
        });
    });

    return outputMetrics;
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

function getAttemptMetricsByLcId(cutoffDate) {
    const [headers, ...attemptsData] = getModelDataFromSheet('Attempt');
    const attemptsObjects = convert2DArrayToObjects(headers, attemptsData);
    const mapping = {};
    for (const attempt of attemptsObjects) {
        if (!cutoffDate || attempt.startTime >= cutoffDate) {
            if (!mapping.hasOwnProperty(attempt.lcId)) {
                mapping[attempt.lcId] = {
                    totalAttempts: 0,
                    solved: 0,
                    timeComplexityOptimal: 0,
                    spaceComplexityOptimal: 0,
                    qualityCode: 0,
                }
            }
            mapping[attempt.lcId].totalAttempts += 1;
            if (attempt.solved === true) mapping[attempt.lcId].solved += 1;
            if (attempt.timeComplexityOptimal === true) mapping[attempt.lcId].timeComplexityOptimal += 1;
            if (attempt.spaceComplexityOptimal === true) mapping[attempt.lcId].spaceComplexityOptimal += 1;
            if (attempt.qualityCode === true) mapping[attempt.lcId].qualityCode += 1;
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
