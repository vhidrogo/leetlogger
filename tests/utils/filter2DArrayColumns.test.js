const { filter2DArrayColumns } = require('../../src/utils/filter2DArrayColumns');

describe('filter2DArrayColumns', () => {
    it('filters 2D array columns based on excludeColumns', () => {
        const data = [
            ['id', 'name', 'difficulty', 'link'],
            [1, 'Two Sum', 'Easy', 'leetcode.com'],
            [1, 'Three Sum', 'Medium', 'leetcode.com'],
        ];
        const excludeColumns = ['difficulty', 'link'];
        const expected = [
            ['id', 'name'],
            [1, 'Two Sum'],
            [1, 'Three Sum'],
        ]

        const result = filter2DArrayColumns(data, excludeColumns);

        expect(result).toEqual(expected);
    });
});