const { MODEL_FIELD_MAPPINGS } = require("../constants");

/**
 * Normalizes an array of header strings based on the provided model's field mapping.
 *
 * @param {string[]} headers - The array of header strings to normalize.
 * @param {string} modelName - The name of the model whose mapping should be used.
 * @returns {string[]} The normalized array of headers, replacing any mapped values while leaving unmapped values as-is.
 */
function normalizeHeaders(headers, modelName) {
    const mapping = MODEL_FIELD_MAPPINGS[modelName];
    return headers.map(header => mapping[header] ?? header);
}

module.exports = { normalizeHeaders }