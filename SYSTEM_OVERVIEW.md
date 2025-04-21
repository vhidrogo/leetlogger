# System Overview – LeetLogger

## Purpose

LeetLogger is a Google Sheets–based system enhanced with Apps Script to streamline LeetCode practice tracking. It automates problem selection, logging of attempts, and performance tracking, aiming to reduce manual overhead and improve the consistency and quality of coding interview preparation.

---

## Architecture Overview

LeetLogger is composed of three core components:

1. **Problems Sheet**  
   - **Role**: Serves as the curated problem repository.
   - **Key Fields**: `LC ID`, `Problem Name`, `Link`, `Dominant Topic`, `Subdominant Topic`, `Difficulty`, `Input Data Structure`, `Target Time`.

2. **Attempts Sheet**  
   - **Role**: Records all problem-solving attempts.
   - **Key Fields**: `LC ID`, `Date`, `Start Time`, `End Time`, `Duration Minutes` (calculated), `Solved` (boolean), `Notes`.

3. **Apps Script Backend**  
   - **Modules**:
     - **Problem Picker**: Filters problems based on selected criteria (e.g., topic, difficulty) and selects the oldest unsolved or least recently attempted problem.
     - **Attempt Logger**: Automates the logging of new attempts, capturing timestamps and solve status.
     - **UI Components**: Google Sheets based UI for development speed and seamless interaction.

---

## Core Flows

### Problem Selection

- **Inputs**: User-selected filters such as Dominant Topic, Difficulty, and optionally Input Data Structure.
- **Process**:
  - Filter the Problems Sheet based on selected criteria.
  - Prioritize unsolved problems; if all are solved, select the one least recently attempted.
- **Output**: Display problem details including latest attempt date, solve status, solve minutes (if solved), target time, and solved ratio. Provide easy access to the problem link.

### Attempt Logging

- **Trigger**: Initiated when a user starts working on a selected problem.
- **Process**:
  - Record the current date and start time.
  - Upon completion, capture the end time and calculate solve minutes.
  - Update the Attempts Sheet with the new attempt data.
- **Validation**: Ensure data consistency and prevent duplicate entries.

---

## Design Considerations

- **Separation of Concerns**: Distinct separation between problem metadata and attempt logs for clarity and maintainability.
- **Data Integrity**: Automated logging reduces manual errors and ensures consistent data capture.
- **Extensibility**: Modular design allows for future enhancements such as performance analytics dashboards or integration with external APIs.
- **User Experience**: Embedded UI components within Google Sheets provide an intuitive interface without requiring external tools.

---

## Future Enhancements

- **Performance Analytics**: Develop dashboards to visualize solve times, success rates, and topic-wise proficiency over time.
- **Enhanced Backfilling**: Implement scripts to parse cell edit history for more accurate reconstruction of past attempts.
- **API Integrations**: Explore integration with LeetCode's API for real-time problem data and submission tracking.
- **User Customization**: Allow users to define custom filters and tracking metrics based on personal learning goals.

---

## Conclusion

LeetLogger exemplifies a thoughtful approach to automating and enhancing the coding interview preparation process. By leveraging familiar tools like Google Sheets and extending their capabilities with Apps Script, it offers a practical solution that balances functionality with ease of use, all while maintaining a focus on data integrity and extensibility.

