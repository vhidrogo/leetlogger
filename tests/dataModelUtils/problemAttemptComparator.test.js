const { problemAttemptComparator } = require("../../src/dataModelUtils/problemAttemptComparator");

describe('problemAttemptComparator', () => {
    it('sorts by lcId when both problems are unattempted', () => {
        const a = { lcId: 1 }
        const b = { lcId: 5 }
        const config = {}

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts a before b when a is unattempted and b is attempted with prioritizeUnattempted enabled', () => {
        const a = {}
        const b = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: true }
        const config = { prioritizeUnattempted: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(-1);
    });

    it('sorts b before a when a is unattempted and b is attempted with prioritizeUnattempted disabled', () => {
        const a = {}
        const b = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: true }
        const config = { prioritizeUnattempted: false }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(1);
    });

    it('sorts by startTime when both a and b have been attempted and no other prioritization is enabled', () => {
        const a = { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025' }
        const b = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025' }
        const config = {
            prioritizeUnattempted: true,
            prioritizeUnsolved: false,
            prioritizeTimeNotOptimal: false,
            prioritizeSpaceNotOptimal: false,
            prioritizeCodeQualityNotOptimal: false
        }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts a before b when a is unsolved and b is solved with prioritizeUnsolved enabled', () => {
        const a = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: false }
        const b = { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025', solved: true }
        const config = { prioritizeUnsolved: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(-1);
    });

    it('sorts b before a when b is unsolved and a is solved with prioritizeUnsolved enabled', () => {
        const a = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: true }
        const b = { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025', solved: false }
        const config = { prioritizeUnsolved: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(1);
    });

    it('sorts by startTime when either is unsolved with prioritizeUnsolved disabled', () => {
        const a = { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025', solved: false }
        const b = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: true }
        const config = { prioritizeUnsolved: false }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts by startTime when both a and b are not solved and no other prioritization is enabled', () => {
        const a = { startTime: 'Tue May 20 18:59:47 GMT-07:00 2025', solved: false }
        const b = { startTime: 'Wed May 28 18:59:47 GMT-07:00 2025', solved: false }
        const config = {
            prioritizeUnattempted: true,
            prioritizeUnsolved: true,
            prioritizeTimeNotOptimal: false,
            prioritizeSpaceNotOptimal: false,
            prioritizeCodeQualityNotOptimal: false
        }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts a before b when a time is not optimal and b is optimal with prioritizeTimeNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            timeComplexityOptimal: false,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            timeComplexityOptimal: true
        }
        const config = { prioritizeTimeNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(-1);
    });

    it('sorts b before a when b time is not optimal and a is optimal with prioritizeTimeNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            timeComplexityOptimal: true,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            timeComplexityOptimal: false
        }
        const config = { prioritizeTimeNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(1);
    });

    it('sorts a before b when a time is not optimal and b is optimal with prioritizeSpaceNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: false,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: true
        }
        const config = { prioritizeSpaceNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(-1);
    });

    it('sorts b before a when b time is not optimal and a is optimal with prioritizeSpaceNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: true,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: false
        }
        const config = { prioritizeSpaceNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(1);
    });

    it('sorts a before b when a time is not optimal and b is optimal with prioritizeCodeQualityNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: false,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: true
        }
        const config = { prioritizeCodeQualityNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(-1);
    });

    it('sorts b before a when b time is not optimal and a is optimal with prioritizeCodeQualityNotOptimal enabled', () => {
        const a = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: true,
        }
        const b = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: false
        }
        const config = { prioritizeCodeQualityNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBe(1);
    });

    it('sorts by startTime when both have same not optimal with matching optimal prioritization enabled', () => {
        const a = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: false,
        }
        const b = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: false
        }
        const config = { prioritizeCodeQualityNotOptimal: true }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts by startTime when a and b have different not optimal with matching optimal prioritization enabled', () => {
        const a = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: false,
        }
        const b = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            qualityCode: false
        }
        const config = {
            prioritizeSpaceNotOptimal: true,
            prioritizeCodeQualityNotOptimal: true
        }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });

    it('sorts by startTime when either has any not optimal with no matching optimal prioritization enabled', () => {
        const a = {
            startTime: 'Tue May 20 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: false,
            qualityCode: true,
        }
        const b = {
            startTime: 'Wed May 28 18:59:47 GMT-07:00 2025',
            solved: true,
            spaceComplexityOptimal: true,
            qualityCode: false
        }
        const config = {
            prioritizeSpaceNotOptimal: false,
            prioritizeSpaceNotOptimal: false,
        }

        const result = problemAttemptComparator(a, b, config);

        expect(result).toBeLessThan(0);
    });
});