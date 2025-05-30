const { formatTimeSince } = require("../../src/utils/formatTimeSince");

describe('formatTimeSince', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    })

    it('handles same day', () => {
        jest.setSystemTime(new Date('2025-05-02'));
        const sinceDate = '2025-05-02';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('0 days ago');
    });

    it('handles single day', () => {
        jest.setSystemTime(new Date('2025-05-02'));
        const sinceDate = '2025-05-01';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('1 day ago');
    });

    it('handles full day regardless of time', () => {
        jest.setSystemTime(new Date('2025-05-02T01:00:00Z'));
        const sinceDate = '2025-05-01T23:00:00Z';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('1 day ago');
    });

    it('handles multiple days', () => {
        jest.setSystemTime(new Date('2025-05-04'));
        const sinceDate = '2025-05-01';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('3 days ago');
    });

    it('handles single month', () => {
        jest.setSystemTime(new Date('2025-05-02'));
        const sinceDate = '2025-04-01';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('1 month and 1 day ago');
    });

    it('handles multiple months', () => {
        jest.setSystemTime(new Date('2025-05-02'));
        const sinceDate = '2025-01-01';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('4 months and 1 day ago');
    });

    it('handles full year', () => {
        jest.setSystemTime(new Date('2025-04-01'));
        const sinceDate = '2024-04-01';
        const result = formatTimeSince(sinceDate);
        expect(result).toBe('12 months and 0 days ago');
    });
});