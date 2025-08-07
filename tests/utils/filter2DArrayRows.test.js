const { filter2DArrayRows } = require('../../src/utils/filter2DArrayRows');

const dummyData = [
  ['LC ID', 'Dominant Topic', 'Difficulty',],
  [1, 'Two-Pointer', 'Easy'],
  [2, 'Two-Pointer', 'Medium'],
];

describe('filter2DArrayRows', () => {
  it('filters with equals', () => {
    const criteria = [{ field: 'LC ID', value: 1, mode: 'equals' }]
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
    ]);
  });

  it('filters with includes', () => {
    const criteria = [{ field: 'Dominant Topic', value: 'Two', mode: 'includes' }]
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
      [2, 'Two-Pointer', 'Medium'],
    ]);
  });

  it('filters with multiple criteria', () => {
    const criteria = [
      { field: 'Dominant Topic', value: 'Two', mode: 'includes' },
      { field: 'Difficulty', value: 'Easy', mode: 'equals' },
    ]
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
    ]);
  });

  it('handles case-insensitive matches', () => {
    const criteria = [{ field: 'Dominant Topic', value: 'two-pointer', mode: 'equals' }]
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
      [2, 'Two-Pointer', 'Medium'],
    ]);
  });

  it('returns empty array when no match', () => {
    const criteria = [{ field: 'LC ID', value: 9, mode: 'equals' }]
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result.length).toBe(0);
  });

  it('throws error if a required column is missing', () => {
    const invalidData = [
      ['ID', 'Topic'],
      [1, 'Array']
    ];
    const criteria = [{ field: 'Dominant Topic', value: 1, mode: 'equals' }]

    expect(() => {
      filter2DArrayRows(invalidData, criteria);
    }).toThrow("Required column 'Dominant Topic' is missing from the data.");
  });

  it('filters with multi-select equals', () => {
    const criteria = [{field: 'Difficulty', value: 'Easy, Medium', mode: 'equals'}];
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
      [2, 'Two-Pointer', 'Medium'],
    ]);
  });

  it('filters with multi-select includes', () => {
    const criteria = [{field: 'Difficulty', value: 'Eas, Med', mode: 'includes'}];
    const result = filter2DArrayRows(dummyData, criteria);
    expect(result).toEqual([
      ['LC ID', 'Dominant Topic', 'Difficulty'],
      [1, 'Two-Pointer', 'Easy'],
      [2, 'Two-Pointer', 'Medium'],
    ]);
  });
});
