const { mapLatestAttemptsByLcId } = require("../../src/dataModelUtils/mapLatestAttemptsByLcId");

describe('mapLatestAttemptsByLcId', () => {
    it('Returns latest attempt for each problem', () => {
        const attempts = [
            ['lcId', 'startTime', 'notes'],
            [1, 'Sun Apr 20 09:23:32 GMT-07:00 2025', 'First Try'],
            [1, 'Mon Apr 28 09:23:32 GMT-07:00 2025', 'Second Try'],
            [2, 'Mon Apr 21 09:23:32 GMT-07:00 2025', 'First Try'],
            [2, 'Mon Apr 28 09:23:32 GMT-07:00 2025', 'Second Try'],
            [3, 'Tue Apr 29 09:23:32 GMT-07:00 2025', 'Second Try'],
            [3, 'Mon Apr 21 09:23:32 GMT-07:00 2025', 'First Try'],
        ]

        const result = mapLatestAttemptsByLcId(attempts);

        expect(Object.keys(result).length).toBe(3);
        expect(result['1'].startTime).toBe('Mon Apr 28 09:23:32 GMT-07:00 2025');
        expect(result['2'].startTime).toBe('Mon Apr 28 09:23:32 GMT-07:00 2025');
        expect(result['3'].startTime).toBe('Tue Apr 29 09:23:32 GMT-07:00 2025');
    });

    it('Returns empty object when given only headers and no data rows', () => {
        const attempts = [
            ['lcId', 'startTime',]
        ]
        const result = mapLatestAttemptsByLcId(attempts);
        expect(result).toEqual({});
    });

    it('Throws error if "LC ID" column is missing', () => {
        const attempts = [
            ['startTime'],
            ['Sun Apr 20 09:23:32 GMT-07:00 2025']
        ]
        expect(() => mapLatestAttemptsByLcId(attempts).toThrow('One or more required columns are missing from attempts data.'));
    });

    it('Throws error if "Start Time" column is missing', () => {
        const attempts = [
            ['lcId'],
            [1]
        ]
        expect(() => mapLatestAttemptsByLcId(attempts).toThrow('One or more required columns are missing from attempts data.'));
    });
});