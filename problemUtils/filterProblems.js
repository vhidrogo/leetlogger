/**
 * Filters a 2D array of problem data based on optional filter criteria.
 *
 * @param {Array[]} data 2D array of problems data, including headers in the first row.
 * @param {string} dominantTopic Filter for Dominant Topic (use 'All' to skip filtering).
 * @param {string} difficulty Filter for Difficulty (use 'All' to skip filtering).
 * @param {string} inputDataStructure Filter for Input Data Structure (use 'All' to skip filtering).
 * @returns {Array[]} Filtered array of problem rows (excluding headers).
 */
function filterProblems(data, dominantTopic, difficulty, inputDataStructure) {
    if (data.length === 0) return [];
  
    const headers = data[0];
    const dominantTopicIndex = headers.indexOf('Dominant Topic');
    const difficultyIndex = headers.indexOf('Difficulty');
    const inputDataStructureIndex = headers.indexOf('Input Data Structure');
  
    // Defensive: validate headers exist
    if (dominantTopicIndex === -1 || difficultyIndex === -1 || inputDataStructureIndex === -1) {
      throw new Error('One or more required columns are missing from the data.');
    }

    return data.slice(1).filter(row =>
        (dominantTopic === 'All' || row[dominantTopicIndex] === dominantTopic) &&
        (difficulty === 'All' || row[difficultyIndex] === difficulty) &&
        (inputDataStructure === 'All' || row[inputDataStructureIndex] === inputDataStructure)  
    );
  }
  

module.exports = { filterProblems };