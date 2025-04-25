const { filterProblems } = require('../problemUtils/filterProblems');

const dummyData = [
    ['LC ID', 'Dominant Topic', 'Difficulty', 'Input Data Structure', 'Name', 'Link', 'Subdominant Topic'],
    [26, 'Two-Pointer', 'Easy', 'Array', 'Remove Duplicates', 'link1', ''],
    [27, 'Two-Pointer', 'Easy', 'Array', 'Remove Element', 'link2', ''],
    [28, 'Two-Pointer', 'Easy', 'String', 'Find First Occurrence', 'link3', ''],
    [29, 'Binary Search', 'Easy', 'Array', 'Search Insert Position', 'link4', ''],
    [30, 'Binary Search', 'Medium', 'Array', 'Search Insert Position 2', 'link4', '']
];

test('Filters No Wildcards', () => {
    const result = filterProblems(dummyData, 'Two-Pointer', 'Easy', 'Array');
    expect(result.length).toBe(2);
});

test('Filters All Wildcards', () => {
    const result = filterProblems(dummyData, 'All', 'All', 'All');
    expect(result.length).toBe(5);
});

test('Filters with one wildcard (dominantTopic)', () => {
    const result = filterProblems(dummyData, 'All', 'Easy', 'Array');
    expect(result.length).toBe(3);
});

test('Filters with one wildcard (difficulty)', () => {
    const result = filterProblems(dummyData, 'Binary Search', 'All', 'Array');
    expect(result.length).toBe(2);
});

test('Filters with one wildcard (inputDataStructure)', () => {
    const result = filterProblems(dummyData, 'Two-Pointer', 'Easy', 'All');
    expect(result.length).toBe(3);
});

test('Filters no matching results', () => {
    const result = filterProblems(dummyData, 'Two-Pointer', 'Hard', 'Array');
    expect(result.length).toBe(0);
});

test('Throws error when required columns are missing', () => {
    const invalidData = [
        ['LC ID', 'Topic', 'Level', 'Structure'], // invalid headers
        [26, 'Two-Pointer', 'Easy', 'Array']
    ];

    expect(() => {
        filterProblems(invalidData, 'Two-Pointer', 'Easy', 'Array');
    }).toThrow('One or more required columns are missing from the data.');
});