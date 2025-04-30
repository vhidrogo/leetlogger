const { filter2DArrayRows } = require('../../src/utils/filter2DArrayRows');

const dummyData = [
  ['LC ID', 'Dominant Topic', 'Difficulty', 'Input Data Structure'],
  [1, 'Two-Pointer', 'Easy', 'Array'],
  [2, 'Two-Pointer', 'Easy', 'String'],
  [3, 'Binary Search', 'Easy', 'Array'],
  [4, 'Binary Search', 'Medium', 'Array']
];

describe('filter2DArrayRows', () => {
  it('filters no wildcards', () => {
    const criteria = {
      'Dominant Topic': 'Two-Pointer',
      'Difficulty': 'Easy',
      'Input Data Structure': 'Array'
    };
    const result = filter2DArrayRows(dummyData, criteria);
    console.log(result);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty', 'Input Data Structure'],
      [1, 'Two-Pointer', 'Easy', 'Array']
    ]);
  });

  it('filters all wildcards', () => {
    const criteria = {
      'Dominant Topic': 'All',
      'Difficulty': 'All',
      'Input Data Structure': 'All'
    };
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result.length).toBe(5);
  });

  it('filters with one wildcard', () => {
    const criteria = {
      'Dominant Topic': 'All',
      'Difficulty': 'Easy',
      'Input Data Structure': 'Array'
    };
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result.length).toBe(3);
  });

  it('returns empty array when no match', () => {
    const criteria = {
      'Dominant Topic': 'Graph',
      'Difficulty': 'Hard',
      'Input Data Structure': 'Array'
    };
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result.length).toBe(0);
  });

  it('throws error if a required column is missing', () => {
    const invalidData = [
      ['ID', 'Topic'],
      [1, 'Array']
    ];
    const criteria = {
      'Dominant Topic': 'All',
      'Difficulty': 'All'
    };

    expect(() => {
      filter2DArrayRows(invalidData, criteria);
    }).toThrow("Required column 'Dominant Topic' is missing from the data.");
  });
});
