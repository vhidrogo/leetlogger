const { NAMED_RANGES, SHEET_NAMES } = require("./constants");
const { appendRowToSheet } = require("./sheetUtils/appendRowToSheet");
const { getInputValues } = require("./sheetUtils/getInputValues");
const { resetInputValues } = require("./sheetUtils/resetInputValues");

function onAddClick() {
    logProblem();
    resetProblemInputs();
}

function logProblem() {
    const requiredFields = [
        'LC ID',
        'Dominant Topic',
        'Difficulty',
        'Input Data Structure',
        'Name',
        'Link',
    ]
    const inputValues = getInputValues(NAMED_RANGES.AddProblem.INPUTS, requiredFields);
    // Set soft deleted field to false
    inputValues.push(false);
    appendRowToSheet(SHEET_NAMES.PROBLEMS, inputValues);
}

function resetProblemInputs() {
    const clearFields = [
        'LC ID',
        'Subdominant Topic',
        'Input Data Structure',
        'Name',
        'Link',
        'Optimal Solution',
    ]

    const defaults = {
        'Link': '="https://leetcode.com/problems/"&lower(substitute(C3," ","-"))',
        'Premium': false,
    }

    resetInputValues(NAMED_RANGES.AddProblem.INPUTS, defaults, clearFields);
}
