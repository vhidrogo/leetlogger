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

module.exports = { MODEL_FIELD_MAPPINGS }
