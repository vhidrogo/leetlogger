# LeetLogger

LeetLogger is a Google Sheets + Apps Script project designed to streamline and automate the process of LeetCode practice tracking. It provides a structured way to log problem attempts, measure progress over time, and reduce manual effort in problem selection and data entry.

This project was built to address the friction points in traditional LeetCode prep workflows — especially around repeat problem attempts, performance tracking, and focused skill development.

---

## Project Motivation

The typical coding interview prep process can become tedious and inconsistent when tracking practice manually. This system was developed to:

- Automate repetitive tasks like logging start/end times and solve status
- Maintain a historical record of all problem attempts, not just the latest
- Reduce friction in selecting problems aligned to a target skill area
- Visualize performance trends over time (e.g. solve time, consistency)
- Eliminate errors caused by manual data entry

The goal was not just to practice more, but to practice with better data and fewer distractions.

---

## Features

- **Problem Selection Interface**  
  A simple filtering tool (based on topic, difficulty, and optional input structure) selects the oldest unsolved problem matching criteria — or the oldest solved problem if all have been attempted. Problem metadata is curated manually to ensure high relevance.

- **Automated Attempt Logging**  
  Logs date, start time, end time, solve status, and calculates duration. Logging is tied to the selected problem to prevent misattribution.

- **Historical Attempts Archive**  
  All problem attempts are recorded on a dedicated sheet to support analysis of solve times over time and repeated exposure to specific problem types.

- **Error Reduction**  
  By replacing manual cell edits with scripted logging, the system prevents inconsistencies and data entry mistakes.

---

## Tech Stack

- **Google Apps Script** — for automation, and backend logic
- **Google Sheets** — as the primary data and UI interface
- **GitHub** — for version control, issue tracking

---

## Engineering Highlights

- **Modular Design:** Clear separation between metadata (problems list) and event data (attempts).
- **Data Validation:** Logging interface enforces timestamp and problem context validity.
- **Maintainability:** Designed with extensibility in mind (e.g., future dashboards or LeetCode API integrations).
- **Automation-Driven Workflow:** Reduces reliance on manual steps without overengineering.

---

## Potential Extensions

- Generate performance summaries per topic/difficulty over time
- Visual dashboards for tracking progress and weak areas
- Integration with LeetCode APIs (if publicly accessible)
- Custom visualization tools (e.g. time-to-solve charts)

---

## Author

**Victor Hidrogo**  
Software Engineer focused on automation, developer tools, and system design.  
This project reflects a mindset of reducing friction and increasing signal in technical growth.

