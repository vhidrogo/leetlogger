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
    ControlPanel: {
        ATTEMPT_OPTIMAL_INPUTS: 'ControlPanel_AttemptOptimalInputs',
        CURRENT_PROBLEM_ATTRIBUTES: 'ControlPanel_CurrentProblem_ProblemAttributes',
        CURRENT_PROBLEM_LATEST_ATTEMPT_ATTRIBUTES: 'ControlPanel_CurrentProblem_LatestAttemptAttributes',
        DOMINANT_TOPIC: 'ControlPanel_DominantTopic',
        DIFFICULTY: 'ControlPanel_Difficulty',
        PRIORITIZE_NOT_QUALITY_CODE: 'ControlPanel_PrioritizeNotQualityCode',
        PRIORITIZE_SPACE_NOT_OPTIMAL: 'ControlPanel_PrioritizeSpaceNotOptimal',
        PRIORITIZE_TIME_NOT_OPTIMAL: 'ControlPanel_PrioritizeTimeNotOptimal',
        PRIORITIZE_UNATTEMPTED: 'ControlPanel_PrioritizeUnattempted',
        PRIORITIZE_UNSOLVED: 'ControlPanel_PrioritizeUnsolved',
        SELECTION_METRICS_NEWEST_ATTEMPT: 'ControlPanel_SelectionMetricsNewestAttempt',
        SELECTION_METRICS_NOT_QUALITY_CODE: 'ControlPanel_SelectionMetricsNotQualityCode',
        SELECTION_METRICS_NOT_SOLVED: 'ControlPanel_SelectionMetricsNotSolved',
        SELECTION_METRICS_OLDEST_ATTEMPT: 'ControlPanel_SelectionMetricsOldestAttempt',
        SELECTION_METRICS_PROBLEMS: 'ControlPanel_SelectionMetricsProblems',
        SELECTION_METRICS_SPACE_NOT_OPTIMAL: 'ControlPanel_SelectionMetricsSpaceNotOptimal',
        SELECTION_METRICS_TIME_NOT_OPTIMAL: 'ControlPanel_SelectionMetricsTimeNotOptimal',
        SELECTION_METRICS_UNATTEMPTED: 'ControlPanel_SelectionMetricsUnattempted',
        SKIP_COUNT: 'ControlPanel_SkipCount',
        TIME_SINCE_CURRENT_PROBLEM: 'ControlPanel_TimeSinceCurrentProblem',
    },
    DifficultyCounts: {
        COUNTS: 'DifficultyCounts_Counts',
        DIFFICULTY: 'DifficultyCounts_Difficulty',
        ORDER: 'DifficultyCounts_Order',
        TIMEFRAME: 'DifficultyCounts_Timeframe',
    },
    GroupSelection: {
        PROBLEM_ATTRIBUTES: 'GroupSelection_ProblemAttributes',
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
