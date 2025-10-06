/**
 * Represents an error when a problem cannot be found in the dataset.
 */
class ProblemNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProblemNotFoundError';
    }
}

/**
 * Represents an error when all problems in a list have been attempted.
 */
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