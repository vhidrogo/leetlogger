const { joinProblemsWithLatestAttempts } = require("../../src/dataModelUtils/joinProblemsWithLatestAttempts");

function getProblems() {
    return [
        {
            'LC ID': 1,
            'Name': 'Problem one'
        },
        {
            'LC ID': 2,
            'Name': 'Problem two'
        }
    ];
}

describe('joinProblemsWithLatestAttempts', () => {
    it('Joins problems with correct latest attempts', () => {
        const latestAttemptsMap = {
            '1': {
                'Date': '1/1',
                'Solved': 'Yes'
            },
            '2': {
                'Date': '1/1',
                'Solved': 'No'
            }
        };

        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);

        expect(result.length).toBe(2);
        const [obj1, obj2] = result;
        expect(Object.keys(obj1).length).toBe(4);
        expect(Object.keys(obj2).length).toBe(4);
        expect(obj1['Name']).toEqual('Problem one');
        expect(obj1['Solved']).toEqual('Yes');
        expect(obj2['Name']).toEqual('Problem two');
        expect(obj2['Solved']).toEqual('No');
    });

    it('Returns problems without attempts', () => {
        const latestAttemptsMap = {
            '1': {
                'Date': '1/1',
                'Solved': 'Yes'
            }
        };

        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);

        expect(result.length).toBe(2);
        const [obj1, obj2] = result;
        expect(Object.keys(obj1).length).toBe(4);
        expect(Object.keys(obj2).length).toBe(2);
    });

    // Should allow merging even when LC ID key is present in both
    it('Handles duplicate keys', () => {
        const latestAttemptsMap = {
            '1': {
                'Date': '1/1',
                'Solved': 'Yes',
                'LC ID': 1 // Key also exists in problems
            }
        };

        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);

        expect(result.length).toBe(2);
        const [obj1, obj2] = result;
        expect(Object.keys(obj1).length).toBe(4);
        expect(Object.keys(obj2).length).toBe(2);
    });

    it('Excludes attempts for problems not in list', () => {
        const latestAttemptsMap = {
            '3': {
                'Date': '1/1',
                'Solved': 'Yes'
            },
            '4': {
                'Date': '1/1',
                'Solved': 'No'
            }
        };

        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);

        expect(result.length).toBe(2);
        const [obj1, obj2] = result;
        expect(Object.keys(obj1).length).toBe(2);
        expect(Object.keys(obj2).length).toBe(2);
    });

    it('Handles empty problems list', () => {
        const latestAttemptsMap = {
            '1': {
                'Date': '1/1',
                'Solved': 'Yes'
            }
        };
        const result = joinProblemsWithLatestAttempts([], latestAttemptsMap);
        expect(result.length).toBe(0); 
    });

    it('Handles empty attempts map', () => {
        const latestAttemptsMap = {};
        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);
        expect(result.length).toBe(2); 
    });
});