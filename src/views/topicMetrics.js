const { NAMED_RANGES, MODEL_FIELD_MAPPINGS } = require("../constants");
const { getFilteredProblems } = require("../dataModelUtils/getFilteredProblems");
const { getModelDataFromSheet } = require("../sheetUtils/getModelDataFromSheet");
const { getNamedRangeValue } = require("../sheetUtils/getNamedRangeValue");
const { getNamedRangeValues } = require("../sheetUtils/getNamedRangeValues");
const { writeToNamedRangeWithHeaders } = require("../sheetUtils/writeToNamedRangeWithHeaders");
const { convert2DArrayToObjects } = require("../utils/convert2DArrayToObjects");

function onMetricsDashboardUpdateClick() {
    const keyFields = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.GROUP_KEYS)
        .split(',')
        .map(key => MODEL_FIELD_MAPPINGS.Problem[key.trim()]);
    const excludeDominantTopics = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.EXCLUDE_DOMINANT_TOPICS)
        .split(',')
        .map(topic => topic.trim());
    const dominantTopics = new Set(
        getNamedRangeValues(NAMED_RANGES.Options.DOMINANT_TOPICS)
            .flat()
            .filter(v => v !== '' && !excludeDominantTopics.includes(v))
    );
    const timeframe = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.TIMEFRAME);
    const sortMetric = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.SORT_METRIC);
    const sortWeakToStrong = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.SORT_WEAK_TO_STRONG);
    const topN = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.TOP_N);
    const minTotalAttempts = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.MIN_TOTAL_ATTEMPTS);
    const includeAllOther = getNamedRangeValue(NAMED_RANGES.MetricsDashboard.INCLUDE_ALL_OTHER);
    
    const cutoffDate = getCutoffDate(timeframe);
    const attemptMetricsByLcId = getAttemptMetricsByLcId(cutoffDate);
    const problems = getFilteredProblems(NAMED_RANGES.MetricsDashboard.PROBLEM_FILTERS);

    let metrics = summarizeMetricsByCustomKey(dominantTopics, problems, attemptMetricsByLcId, keyFields);
    
    if (minTotalAttempts > 0) {
        metrics = metrics.filter(obj => obj.totalAttempts >= minTotalAttempts);
    }
    sortMetrics(metrics, sortMetric, sortWeakToStrong);

    metrics = includeAllOther? splitAllOther(metrics, topN) : metrics.slice(0, topN);
    calculatePercents(metrics);
    
    writeToNamedRangeWithHeaders(metrics, NAMED_RANGES.MetricsDashboard.METRICS);
}

function calculatePercents(metrics) {
    const percentFields = ['solved', 'timeComplexityOptimal', 'spaceComplexityOptimal', 'qualityCode'];
    
    metrics.forEach(obj => {
        const total = obj.totalAttempts;
        percentFields.forEach(field => {
            if (obj[field] !== undefined) {
            obj[field] = total ? (obj[field] / total) : 0;
            }
        });
    });
}

function splitAllOther(metrics, topN) {
    const topNMetrics = metrics.slice(0, topN);
    const allOther = metrics.slice(topN);

    const allOtherCombined = allOther.reduce((acc, obj) => {
        for (const key in obj) {
            if (key !== 'groupKey') {
                acc[key] = (acc[key] || 0) + obj[key];
            }
        }
        return acc;
    }, {});
    allOtherCombined.groupKey = 'All Other';

    return [...topNMetrics, allOtherCombined];
}

function sortMetrics(metrics, sortMetric, sortWeakToStrong) {
    if (sortMetric === 'Unattempted') {
        metrics.sort((a, b) => sortWeakToStrong? b.unattempted - a.unattempted : a.unattempted - b.unattempted);
    } else if (sortMetric === 'Total Problems') {
        metrics.sort((a, b) => sortWeakToStrong? a.totalProblems - b.totalProblems : b.totalProblems - a.totalProblems);
    } else if (sortMetric === 'Total Attempts') {
        metrics.sort((a, b) => sortWeakToStrong? a.totalAttempts - b.totalAttempts : b.totalAttempts - a.totalAttempts);
    } else {
        metrics.sort((a, b) => {
            const aMetric = a.totalAttempts > 0 ? a[MODEL_FIELD_MAPPINGS.Attempt[sortMetric]] / a.totalAttempts : 0;
            const bMetric = b.totalAttempts > 0 ? b[MODEL_FIELD_MAPPINGS.Attempt[sortMetric]] / b.totalAttempts : 0;
            return sortWeakToStrong? aMetric - bMetric : bMetric - aMetric;
        })
    }
}

function summarizeMetricsByCustomKey(dominantTopics, problems, attemptMetricsByLcId, keyFields) {
    const keyFn = p => keyFields.map(field => p[field]).join(' | ');

    const metricsByKey = {};

    for (const problem of problems) {
        if (dominantTopics.has(problem.dominantTopic)) {
            const key = keyFn(problem);
            if (!metricsByKey.hasOwnProperty(key)) {
                metricsByKey[key] = {
                    groupKey: key,
                    unattempted: 0,
                }
            }

            const summary = metricsByKey[key];
            summary.totalProblems = (summary.totalProblems || 0) + 1;

            if (attemptMetricsByLcId.hasOwnProperty(problem.lcId)) {
                for (const metric in attemptMetricsByLcId[problem.lcId]) {
                    summary[metric] = (summary[metric] || 0) + attemptMetricsByLcId[problem.lcId][metric];
                }
            } else {
                summary.unattempted = (summary.unattempted || 0) + 1;
            }
        }
    }

    return Object.values(metricsByKey);
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
