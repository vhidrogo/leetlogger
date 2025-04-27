# Functional Flow and Sorting Logic – LeetLogger

## Purpose

This document defines the operational flows and sorting mechanics that power the **problem selection, attempt logging, and progression features** within the LeetLogger system. These flows are managed via a dedicated Google Sheets tab and its associated Apps Script backend.

The intent is to establish a reliable, scalable, and intuitive workflow for practicing LeetCode problems while capturing structured attempt data for performance tracking.

---

## Scope

This doc covers:
- Problem selection workflow and sorting priorities
- Attempt start and logging processes
- Next problem progression mechanics
- Planned future integration for a live sidebar timer

---

## Core Components

### 📄 Google Sheets UI
- **Control Panel**: Embedded within a dedicated sheet for triggering problem selection, starting attempts, logging, and moving to the next problem.
- **Problem Details Display**: Displays selected problem details (link, target time, latest attempt data, etc.)

### 📝 Apps Script Backend Modules
- **getProblem()**: Filters and selects the next appropriate problem based on user-defined criteria and sorting rules.
- **startAttempt()**: Records the current start time, and prepares the UI for an active attempt.
- **logAttempt()**: Captures the end time, calculates duration, and logs attempt data to the Attempts Sheet.
- **nextProblem()**: Generates a fresh selection list via `generateProblemSelectionList()` and returns the next problem in sequence based on the current LC ID.
- **Helper Functions**: Includes modules like `getLatestAttempts()`, `joinProblemsWithLatestAttempts()`, and a custom sort comparator.

---

## Functional Flows

### 📌 Problem Selection Flow
1. **User sets filter criteria** (Dominant Topic, Difficulty, etc.)
2. **Click 'Select'**
3. Apps Script:
   - Filters Problems Sheet based on selected criteria
   - Joins the filtered problems with their latest attempt data
   - Sorts the combined dataset by:
     1. **Unattempted problems** first (ascending LC ID)
     2. Then **unsolved problems**, ordered by date and start time (oldest first)
     3. Finally **solved problems**, ordered similarly by most recent attempt
   - Displays problem details on the control panel

---

### 📌 Start Attempt Flow
1. **User clicks 'Start'**
2. Apps Script:
   - Captures current start time
   - Updates UI state (enables solve status fields, disables 'Select')
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
   - Regenerates a sorted problem list using `generateProblemSelectionList()`
   - Determines the next problem in the list relative to the current LC ID
   - Displays problem details on control panel

---

## Sorting Logic

The problem selection workflow sorts filtered problems with the following priority:

1. **Unattempted Problems**  
   Sorted by ascending LeetCode ID (LC ID).

2. **Unsolved Problems**  
   Problems with one or more past attempts, none marked as `Solved = TRUE`.  
   Sorted by:
   - Earliest start time

3. **Solved Problems**  
   Problems where at least one attempt has `Solved = TRUE`.  
   Sorted by:
   - Earliest start time

This ensures new problems surface first, followed by unsolved problems that haven’t been revisited in a while, and finally solved problems for spaced repetition or review.

---

## Planned: Sidebar Timer Integration

A future enhancement will introduce a live timer sidebar, launched via the **Start** action.  
It will:
- Pull target time from a reference table based on selected problem’s **Dominant Topic** and **Difficulty**
- Display a countdown alongside elapsed time
- Optionally auto-log time on completion

---

## Process Flow Diagram

```mermaid
flowchart TD
  A[User clicks 'Select'] --> B[getProblem()]
  B --> C[Filter Problems by Criteria]
  C --> D[Join with Latest Attempt Data]
  D --> E[Sort by Selection Priorities]
  E --> F[Display Problem Details]

  F -->|User clicks 'Start'| G[startAttempt()]
  G --> H[Record Start Time]
  H --> I[Enable Log Fields]

  I -->|User clicks 'Log'| J[logAttempt()]
  J --> K[Capture End Time & Calculate Duration]
  K --> L[Append to Attempts Sheet]

  L -->|User clicks 'Next'| M[nextProblem()]
  M --> F
  ```

## Design Considerations

- **State Management**: Maintain clean UI state transitions between actions.
- **Data Integrity**: Enforce required fields and prevent invalid or duplicate entries.
- **Extensibility**: Sidebar timer and custom tracking metrics are intentionally decoupled from core flows for modular future development.
- **Attempt Quality Metrics:**  
  Incorporate qualitative fields like "Optimized", "Redundant Checks", or "Missed Edge Case" notes into each attempt log for deeper performance analysis.
- **Custom Sort Logic**: Centralized comparator ensures consistent problem ordering for fair problem rotation and spaced review.

---

## Future Enhancements

Planned improvements and features to extend the functionality and value of the LeetLogger system:

- **Live Sidebar Timer**: Integrate a real-time timer in the Apps Script sidebar, launched via the `Start` button. The timer will dynamically pull the target solve time from a lookup table based on problem topic and difficulty, providing live countdown feedback during a coding attempt.
- **Performance Analytics Dashboards**: Develop Google Sheets dashboards to visualize attempt history, solve rates, solve times, and topic proficiency trends over time.
- **Custom Filters:**  
  User-defined tags and categories beyond topic and difficulty to enable more flexible practice regimens.

---

## Conclusion

This document formalizes LeetLogger’s functional workflows, sorting rules, and auxiliary modules. The system emphasizes a structured, data-driven approach to LeetCode practice, prioritizing optimal solutions and transferable patterns through an intentionally curated, algorithm-first problem list.

Its modular, scalable design supports ongoing enhancements like live timers and analytics dashboards without disrupting core mechanics.

---
