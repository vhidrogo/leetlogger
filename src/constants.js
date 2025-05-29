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
    ControlPanel: {
        ATTEMPT_OPTIMAL_INPUTS: 'ControlPanel_AttemptOptimalInputs',
        DOMINANT_TOPIC: 'ControlPanel_DominantTopic',
        DIFFICULTY: 'ControlPanel_Difficulty',
        PRIORITIZE_NOT_QUALITY_CODE: 'ControlPanel_PrioritizeNotQualityCode',
        PRIORITIZE_SPACE_NOT_OPTIMAL: 'ControlPanel_PrioritizeSpaceNotOptimal',
        PRIORITIZE_TIME_NOT_OPTIMAL: 'ControlPanel_PrioritizeTimeNotOptimal',
        PRIORITIZE_UNATTEMPTED: 'ControlPanel_PrioritizeUnattempted',
        PRIORITIZE_UNSOLVED: 'ControlPanel_PrioritizeUnsolved',
        PROBLEM_LIST_PROGRESS: 'ControlPanel_ProblemListProgress',
        SELECTION_METRICS_NEWEST_ATTEMPT_DATE: 'ControlPanel_SelectionMetricsNewestAttemptDate',
        SELECTION_METRICS_NOT_QUALITY_CODE: 'ControlPanel_SelectionMetricsNotQualityCode',
        SELECTION_METRICS_NOT_SOLVED: 'ControlPanel_SelectionMetricsNotSolved',
        SELECTION_METRICS_OLDEST_ATTEMPT_DATE: 'ControlPanel_SelectionMetricsOldestAttemptDate',
        SELECTION_METRICS_PROBLEMS: 'ControlPanel_SelectionMetricsProblems',
        SELECTION_METRICS_SPACE_NOT_OPTIMAL: 'ControlPanel_SelectionMetricsSpaceNotOptimal',
        SELECTION_METRICS_TIME_NOT_OPTIMAL: 'ControlPanel_SelectionMetricsTimeNotOptimal',
        SELECTION_METRICS_UNATTEMPTED: 'ControlPanel_SelectionMetricsUnattempted',
    },
    TargetTimes: {
        DIFFICULTY: 'TargetTimesDifficulty',
        MAX_MINUTES: 'TargetTimesMaxMinutes',
        TOPIC: 'TargetTimesTopic'
    }
}

module.exports = { MODEL_FIELD_MAPPINGS, NAMED_RANGES }
