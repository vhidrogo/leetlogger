class ProblemNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProblemNotFoundError';
    }
}

class NoMoreProblemsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoMoreProblemsError';
    }
}

module.exports = {
    ProblemNotFoundError,
    NoMoreProblemsError,
}