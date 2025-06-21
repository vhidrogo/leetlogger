const DOMINANT_TOPICS = [
    'Backtracking',
    'Binary Search',
    'Breadth-First Search',
    'Depth-First Search',
    'Dynamic Programming',
    'Greedy Algorithms',
    'Prefix Sum',
    'Sliding Window',
    'Two-Pointer',
]

const MODEL_FIELD_MAPPINGS = {
    Problem: {
        'LC ID': 'lcId',
        'Dominant Topic': 'dominantTopic',
        'Difficulty': 'difficulty',
        'Input Data Structure': 'inputDataStructure',
        'Name': 'name',
        'Link': 'link',
        'Subdominant Topic': 'subdominantTopic',
        'Notes': 'notes'
    },
    Attempt: {
        'LC ID': 'lcId',
        'Start Time': 'startTime',
        'End Time': 'endTime',
        'Duration Minutes': 'durationMinutes',
        'Solved': 'solved',
        'Time Complexity Optimal': 'timeComplexityOptimal',
        'Space Complexity Optimal': 'spaceComplexityOptimal',
        'Quality Code': 'qualityCode',
        'Notes': 'notes'
    }
}

const NAMED_RANGES = {
    AttemptInProgress: {
        DIFFICULTY: 'AttemptInprogress_Difficulty',
        DOMINANT_TOPIC: 'AttemptInProgress_DominantTopic',
        END_TIME: 'AttemptInProgress_EndTime',
        INPUTS: 'AttemptInProgress_AttemptInputs',
        OPTIMAL_INPUTS: 'AttemptInProgress_OptimalInputs',
        PROBLEM_ATTRIBUTES: 'AttemptInProgress_ProblemAttributes',
        PROGRESS: 'AttemptInProgress_Progress',
        START_TIME: 'AttemptInProgress_StartTime',
    },
    DifficultyCounts: {
        COUNTS: 'DifficultyCounts_Counts',
        DIFFICULTY: 'DifficultyCounts_Difficulty',
        ORDER: 'DifficultyCounts_Order',
        TIMEFRAME: 'DifficultyCounts_Timeframe',
    },
    GroupSelection: {
        DOMINANT_TOPIC: 'GroupSelection_DominantTopic',
        DIFFICULTY: 'GroupSelection_Difficulty',
        FILTERS: 'GroupSelection_Filters',
        LATEST_ATTEMPT_ATTRIBUTES: 'GroupSelection_LatestAttemptAttributes',
        PRIORITIZE_NOT_QUALITY_CODE: 'GroupSelection_PrioritizeNotQualityCode',
        PRIORITIZE_SPACE_NOT_OPTIMAL: 'GroupSelection_PrioritizeSpaceNotOptimal',
        PRIORITIZE_TIME_NOT_OPTIMAL: 'GroupSelection_PrioritizeTimeNotOptimal',
        PRIORITIZE_UNATTEMPTED: 'GroupSelection_PrioritizeUnattempted',
        PRIORITIZE_UNSOLVED: 'GroupSelection_PrioritizeUnsolved',
        PROBLEM_ATTRIBUTES: 'GroupSelection_ProblemAttributes',
        SELECTION_METRICS_NEWEST_ATTEMPT: 'GroupSelection_SelectionMetricsNewestAttempt',
        SELECTION_METRICS_NOT_QUALITY_CODE: 'GroupSelection_SelectionMetricsNotQualityCode',
        SELECTION_METRICS_NOT_SOLVED: 'GroupSelection_SelectionMetricsNotSolved',
        SELECTION_METRICS_OLDEST_ATTEMPT: 'GroupSelection_SelectionMetricsOldestAttempt',
        SELECTION_METRICS_PROBLEMS: 'GroupSelection_SelectionMetricsProblems',
        SELECTION_METRICS_SPACE_NOT_OPTIMAL: 'GroupSelection_SelectionMetricsSpaceNotOptimal',
        SELECTION_METRICS_TIME_NOT_OPTIMAL: 'GroupSelection_SelectionMetricsTimeNotOptimal',
        SELECTION_METRICS_UNATTEMPTED: 'GroupSelection_SelectionMetricsUnattempted',
        SKIP_COUNT: 'GroupSelection_SkipCount',
        TIME_SINCE_CURRENT_PROBLEM: 'GroupSelection_TimeSinceCurrentProblem',
    },
    LatestAttempts: {
        ATTEMPTS: 'LatestAttempts_Attempts',
        COUNT: 'LatestAttempts_Count',
    },
    SingleSelection: {
        LATEST_ATTEMPT_ATTRIBUTES: 'SingleSelection_LatestAttemptAttributes',
        PROBLEM_ATTRIBUTES: 'SingleSelection_ProblemAttributes',
        PROBLEM_SEARCH_INPUTS: 'SingleSelection_ProblemSearchInputs',
        TIME_SINCE: 'SingleSelection_TimeSince',
    },
    TargetTimes: {
        DIFFICULTY: 'TargetTimesDifficulty',
        MAX_MINUTES: 'TargetTimesMaxMinutes',
        TOPIC: 'TargetTimesTopic'
    }
}

const SHEET_NAMES = {
    ATTEMPTS: 'Attempts',
    ATTEMPT_IN_PROGRESS: 'AttemptInProgress',
}

module.exports = {
    DOMINANT_TOPICS,
    MODEL_FIELD_MAPPINGS,
    NAMED_RANGES,
    SHEET_NAMES,
 }
