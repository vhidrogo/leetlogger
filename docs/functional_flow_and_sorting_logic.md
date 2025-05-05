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
2. **User configures "Selection Prioritization Criteria"** checkboxes:
   - Solved
   - Time Complexity Optimal
   - Space Complexity Optimal
   - Code Quality
3. **Click 'Select'**
4. Apps Script:
   - Filters Problems Sheet based on selected criteria
   - Joins the filtered problems with their latest attempt data
   - Sorts the combined dataset by **Selection Prioritization Criteria**
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

## Selection Prioritization Criteria & Sorting Logic

The problem selection workflow sorts filtered problems based on enabled prioritization criteria:

**User-Configurable Checkboxes:**
- ✅ Solved (default checked)
- ✅ Time Optimal (default checked)
- ✅ Space Optimal (default checked)
- ⬜ Code Quality (default unchecked)

**Sorting Priority:**

1. **Unattempted Problems** (Solved = null)
   - Sorted by ascending LC ID.

2. **Unsolved Problems** (Solved = false)
   - Sorted by earliest start time.

3. **Problems Failing Any Checked Optimization Criteria**
   - If `Time Optimal` is checked → problems where `time_optimal = false`
   - If `Space Optimal` is checked → problems where `space_optimal = false`
   - If `Code Quality` is checked → problems where `code_quality = false`
   - Sorted by earliest start time.

4. **Solved and Fully Optimized Problems**
   - Solved = true and all checked criteria fields = true
   - Sorted by earliest start time.

---

## Process Flow Diagram

```mermaid
flowchart TD
  A[User clicks 'Select'] --> B[getProblem()]
  B --> C[Filter Problems by Criteria]
  C --> D[Join with Latest Attempt Data]
  D --> E[Sort by Selection Prioritization Criteria]
  E --> F[Display Problem Details]

  F -->|User clicks 'Start'| G[startAttempt()]
  G --> H[Record Start Time]
  H --> I[Enable Log Fields]

  I -->|User clicks 'Log'| J[logAttempt()]
  J --> K[Capture End Time & Calculate Duration]
  K --> L[Append to Attempts Sheet]

  L -->|User clicks 'Next'| M[nextProblem()]
  M --> E
```

## Design Considerations

- **State Management:**  
  Maintain reliable, predictable UI state transitions between actions (`Select`, `Start`, `Log`, `Next`). Disable and enable controls contextually to prevent invalid actions or duplicate entries.

- **Data Integrity:**  
  Enforce required field validation and prevent duplicate attempt logs. Guarantee accurate solve duration calculations and ensure attempt statuses reflect the latest action.

- **Extensibility**: Sidebar timer and custom tracking metrics are intentionally decoupled from core flows for modular future development.

- **Attempt Quality Metrics:**  
  Incorporate qualitative fields like "Optimal Time Complexity", "Optimal Space Complexity", or "Quality Code" notes into each attempt log for deeper performance analysis.

- **Custom Sort Logic**: Centralized comparator ensures consistent problem ordering for fair problem rotation and spaced review.

---

## Future Enhancements

Planned improvements and features to extend the functionality and value of the LeetLogger system:

- **Live Sidebar Timer**: Integrate a real-time timer in the Apps Script sidebar, launched via the `Start` button. The timer will dynamically pull the target solve time from a lookup table based on problem topic and difficulty, providing live countdown feedback during a coding attempt and auto-log behavior.

- **Performance Analytics Dashboards:**  
  Google Sheets dashboards to visualize:
  - Attempt history
  - Solve rates
  - Average solve times
  - Topic proficiency trends  

  Powered by Apps Script-driven queries and Google Sheets charting.

- **Custom Filters:**  
  User-defined tags and categories beyond topic and difficulty to enable more flexible practice regimens.
  
- **Enhanced Selection Prioritization Rules:**  
  Expand queue logic to optionally prioritize by:
  - Problems with most failed attempts
  - Problems with highest average solve times
  - Problems with notes included in latest attempts
  - Performance-based rotation logic (weaker topics first)
  - Custom tags

---

## Conclusion

This document defines LeetLogger’s operational workflows, sorting rules, and supporting modules. It emphasizes a structured, scalable, and data-driven approach to LeetCode practice, intentionally prioritizing optimal solutions and transferable patterns through a curated, algorithm-first problem list to maximize learning efficiency and pattern recognition.

With modular designs for both the selection workflows and problem prioritization strategies, the system accommodates ongoing enhancements like live timers, analytics dashboards, qualitative attempt metrics, and custom filtering without disrupting existing functionality.

The Selection Prioritization Criteria feature strengthens user control over their problem queues — enabling focused, adaptable, and performance-aware practice regimens.

---
