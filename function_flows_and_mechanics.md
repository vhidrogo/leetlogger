# Function Flows and Mechanics – LeetLogger

## Purpose

This document defines the functional flows and operational mechanics that power the **problem selection, attempt logging, and progression features** within the LeetLogger system. These flows are managed via a dedicated Google Sheets tab (previously referred to as the *Picker*) and its associated Apps Script backend.

The intent is to establish a reliable, scalable, and intuitive workflow for practicing LeetCode problems while capturing structured attempt data for performance tracking.

---

## Scope

This doc covers the following mechanics:
- Problem selection workflow
- Attempt start process
- Logging attempt completions
- Selecting the next problem
- Planned future integration for a live sidebar timer

---

## Core Components

### 📄 Google Sheets UI
- **Control Panel**: Embedded within a dedicated sheet for triggering problem selection, starting attempts, logging, and moving to the next problem.
- **Problem Details Display**: Displays selected problem details (link, target time, latest attempt data, etc.)

### 📝 Apps Script Backend Modules
- **getProblem()**: Filters and selects the next appropriate problem based on user-defined criteria.
- **startAttempt()**: Records the current date and start time, and prepares the UI for an active attempt.
- **logAttempt()**: Captures the end time, calculates duration, logs attempt data to the Attempts Sheet.
- **nextProblem()**: Fetches and displays the next problem from a cached list or triggers a fresh filter pass if the cache is exhausted.

---

## Functional Flows

### 📌 Problem Selection Flow
1. **User sets filter criteria** (Dominant Topic, Difficulty, etc.)
2. **Click 'Get Problem'**
3. Apps Script:
   - Filters Problems Sheet based on selected criteria
   - Prioritizes unsolved problems, or selects least recently attempted
   - Caches filtered list for sequential navigation
4. Displays problem details on the control panel

---

### 📌 Start Attempt Flow
1. **User clicks 'Start'**
2. Apps Script:
   - Captures current date and start time
   - Updates UI state (enables solve status fields, disables 'Get Problem')
   - Optionally triggers a live timer sidebar (planned)

---

### 📌 Log Attempt Flow
1. **User finishes attempt and logs status**
2. **Click 'Log'**
3. Apps Script:
   - Captures end time
   - Calculates solve duration
   - Appends record to Attempts Sheet
   - Resets relevant UI fields

---

### 📌 Next Problem Flow
1. **User clicks 'Next'**
2. Apps Script:
   - Fetches next problem from cached list
   - If cache is empty, runs a fresh problem selection pass
   - Displays problem details on control panel

---

## Planned: Sidebar Timer Integration

A future enhancement will introduce a live timer sidebar, launched via the **Start** action.  
It will:
- Pull target time from a reference table based on selected problem’s **Dominant Topic** and **Difficulty**
- Display a countdown alongside elapsed time
- Auto-log time on completion (optional)

---

## Process Flow Diagram

```mermaid
flowchart TD
  A[User clicks 'Get Problem'] --> B[getProblem()]
  B --> C[Cache Filtered List]
  C --> D[Display Problem Details]

  D -->|User clicks 'Start'| E[startAttempt()]
  E --> F[Record Start Time]
  F --> G[Enable Log Fields]

  G -->|User clicks 'Log'| H[logAttempt()]
  H --> I[Capture End Time & Calculate Duration]
  I --> J[Append to Attempts Sheet]

  J -->|User clicks 'Next'| K[nextProblem()]
  K --> D
  ```

## Design Considerations

- **Cache Optimization**: Avoid redundant problem selection queries by caching filtered lists.
- **State Management**: Maintain clean UI state transitions between actions.
- **Data Integrity**: Enforce required fields and prevent invalid or duplicate entries.
- **Extensibility**: Sidebar timer and custom tracking metrics are intentionally decoupled from core flows for modular future development.

---

## Future Enhancements

Planned improvements and features to extend the functionality and value of the LeetLogger system:

- **Live Sidebar Timer**: Integrate a real-time timer in the Apps Script sidebar, launched via the `Start` button. The timer will dynamically pull the target solve time from a lookup table based on problem topic and difficulty, providing live countdown feedback during a coding attempt.
- **Performance Analytics Dashboards**: Develop Google Sheets dashboards to visualize attempt history, solve rates, solve times, and topic proficiency trends over time.

---

## Conclusion

This document formalizes the operational flows and mechanics for LeetLogger’s central problem selection, attempt logging, and upcoming auxiliary features. It establishes a scalable, maintainable foundation for structured, data-driven LeetCode practice sessions with a strong emphasis on optimal solution mastery and transferable algorithmic patterns.

The outlined structure is intentionally modular, enabling future enhancements like the live timer and performance analytics to integrate cleanly without disrupting core functionality.

---
