const { joinProblemsWithLatestAttempts } = require("../../src/dataModelUtils/joinProblemsWithLatestAttempts");

function getProblems() {
    return [
        {
            lcId: 1,
            name: 'Problem one'
        },
        {
            lcId: 2,
            name: 'Problem two'
        }
    ];
}

describe('joinProblemsWithLatestAttempts', () => {
    it('Joins problems with correct latest attempts', () => {
        const latestAttemptsMap = {
            '1': {
                date: '1/1',
                solved: true
            },
            '2': {
                date: '1/1',
                solved: false
            }
        };

        const result = joinProblemsWithLatestAttempts(getProblems(), latestAttemptsMap);

        expect(result.length).toBe(2);
        const [obj1, obj2] = result;
        expect(Object.keys(obj1).length).toBe(4);
        expect(Object.keys(obj2).length).toBe(4);
        expect(obj1.name).toEqual('Problem one');
        expect(obj1.solved).toBe(true);
        expect(obj2.name).toEqual('Problem two');
        expect(obj2.solved).toBe(false);
    });

    it('Returns problems without attempts', () => {
        const latestAttemptsMap = {
            '1': {
                date: '1/1',
                solved: true
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
                date: '1/1',
                solved: true,
                lcId: 1 // Key also exists in problems
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
                date: '1/1',
                solved: true
            },
            '4': {
                date: '1/1',
                solved: false
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
                date: '1/1',
                solved: true
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