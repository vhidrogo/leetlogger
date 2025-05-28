/**
 * Config object specifying which problem attempt attributes should be prioritized.
 *
 * @typedef {Object} PrioritizationConfig
 * @property {boolean} prioritizeUnattempted - Prioritize problems with Solved = null.
 * @property {boolean} prioritizeUnsolved - Prioritize problems with Solved = 'No'.
 * @property {boolean} prioritizeTimeNotOptimal - Prioritize problems with Time Optimal = 'No'.
 * @property {boolean} prioritizeSpaceNotOptimal - Prioritize problems with Space Optimal = 'No'.
 * @property {boolean} prioritizeCodeQualityNotOptimal - Prioritize problems with Code Quality = 'No'.
 */

/**
 * Comparator for problem attempts based on prioritization config.
 *
 * @param {Object} a - First problem attempt.
 * @param {Object} b - Second problem attempt.
 * @param {PrioritizationConfig} config - Config determining which attributes to prioritize.
 * @returns {number} Sort order value.
 */
function problemAttemptComparator(a, b, config) {
  aUnAttempted = a.startTime === undefined;
  bUnAttempted = b.startTime === undefined;
  
  if (aUnAttempted || bUnAttempted) {
    if (aUnAttempted && bUnAttempted) return a.lcId - b.lcId;
    if (aUnAttempted) return config.prioritizeUnattempted ? -1 : 1;
    if (bUnAttempted) return config.prioritizeUnattempted ? 1 : -1;
  }

  if (config.prioritizeUnsolved) {
    if (!a.solved && b.solved) return -1;
    if (!b.solved && a.solved) return 1;
  }

  const aAnyNotOptimalAndPrioritized = hasNotOptimalAndPrioritized(a, config);
  const bAnyNotOptimalAndPrioritized = hasNotOptimalAndPrioritized(b, config);

  if (aAnyNotOptimalAndPrioritized || bAnyNotOptimalAndPrioritized) {
    if (aAnyNotOptimalAndPrioritized && !bAnyNotOptimalAndPrioritized) return -1;
    if (!aAnyNotOptimalAndPrioritized && bAnyNotOptimalAndPrioritized) return 1;
  }

  return new Date(a.startTime) - new Date(b.startTime);
}

/**
 * Determines whether a given problem attempt meets any prioritized "not optimal" criteria
 * based on the provided prioritization configuration.
 *
 * @param {Object} item - The problem attempt to evaluate.
 * @param {boolean} item.timeComplexityOptimal - Whether the problem's time complexity is optimal.
 * @param {boolean} item.spaceComplexityOptimal - Whether the problem's space complexity is optimal.
 * @param {boolean} item.qualityCode - Whether the problem's code quality is considered good.
 * @param {PrioritizationConfig} config - Config determining which "not optimal" attributes should be prioritized.
 *
 * @returns {boolean} True if any prioritized "not optimal" condition is met for the problem attempt, otherwise false.
 */
function hasNotOptimalAndPrioritized(item, config) {
  return [
    !item.timeComplexityOptimal && config.prioritizeTimeNotOptimal,
    !item.spaceComplexityOptimal && config.prioritizeSpaceNotOptimal,
    !item.qualityCode && config.prioritizeCodeQualityNotOptimal
  ].some(Boolean);
}

module.exports = { problemAttemptComparator }