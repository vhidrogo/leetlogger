const { calculateSelectionMetrics } = require("../../src/dataModelUtils/calculateSelectionMetrics");

describe('calculateSelectionMetrics', () => {
    it('calculates total problems correctly', () => {
        const problemAttempts = [{}, {}, {}];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.totalProblems).toBe(3);
    });

    it('calculates unattempted correctly when all unattempted', () => {
        const problemAttempts = [{}, {}];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.unattempted).toBe(2);
    });

    it('calculates unattempted correctly when some unattempted', () => {
        const problemAttempts = [
            { startTime: '' },
            {},
            { startTime: '' },
            {},
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.unattempted).toBe(2);
    });

    it('calculates notSolved correctly', () => {
        const problemAttempts = [
            { startTime: '', solved: true },
            { startTime: '', solved: true },
            { startTime: '', solved: true },
            { startTime: '', solved: false },
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.notSolved).toBe(1 / 4);
    });

    it('calculates timeNotOptimal correctly', () => {
        const problemAttempts = [
            { startTime: '', timeComplexityOptimal: true },
            { startTime: '', timeComplexityOptimal: true },
            { startTime: '', timeComplexityOptimal: false },
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.timeNotOptimal).toBe(1 / 3);
    });

    it('calculates spaceNotOptimal correctly', () => {
        const problemAttempts = [
            { startTime: '', spaceComplexityOptimal: true },
            { startTime: '', spaceComplexityOptimal: false },
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.spaceNotOptimal).toBe(1 / 2);
    });

    it('calculates notQualityCode correctly', () => {
        const problemAttempts = [
            { startTime: '', qualityCode: true },
            { startTime: '', qualityCode: true },
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.notQualityCode).toBe(0);
    });

    it('calculates oldestAttemptDate correctly', () => {
        const problemAttempts = [
            { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025' },
            { startTime: 'Wed May 21 18:59:47 GMT-07:00 2025' },
            { startTime: 'Fri May 23 18:59:47 GMT-07:00 2025' },
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.oldestAttemptDate).toEqual(new Date('Tue May 20 18:59:47 GMT-07:00 2025'));
    });

    it('calculates newestAttemptDate correctly', () => {
        const problemAttempts = [
            { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025' },
            { startTime: 'Wed May 21 18:59:47 GMT-07:00 2025' },
            { startTime: 'Fri May 23 18:59:47 GMT-07:00 2025' }
        ];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.newestAttemptDate).toEqual(new Date('Fri May 23 18:59:47 GMT-07:00 2025'));
    });

    it('returns empty metrics when problem list is empty', () => {
        const problemAttempts = [];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.unattempted).toBe(0);
        expect(result.totalProblems).toBe(0);
        expect(result.notSolved).toBe(0);
        expect(result.timeNotOptimal).toBe(0);
        expect(result.spaceNotOptimal).toBe(0);
        expect(result.notQualityCode).toBe(0);
        expect(result.oldestAttemptDate).toBe('');
        expect(result.newestAttemptDate).toBe('');
    });

    it('handles all unattempted problems without divide-by-zero errors', () => {
        const problemAttempts = [{}, {}, {}];
        const result = calculateSelectionMetrics(problemAttempts);
        expect(result.notSolved).toBe(0);
        expect(result.timeNotOptimal).toBe(0);
        expect(result.spaceNotOptimal).toBe(0);
        expect(result.notQualityCode).toBe(0);
    });
});