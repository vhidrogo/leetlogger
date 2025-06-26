# LeetLogger Dashboard Design Notes

## Overview

This dashboard is intended to identify weak areas in my problem-solving practice by analyzing **dominant algorithmic patterns (dominant topics)** independent of problem difficulty. The focus is placed on **positive outcome percentages** (problems solved, time optimal, space optimal, quality code) to track overall proficiency and continuous improvement opportunities.

---

## Key Principles

- **Pattern-Driven Weakness Identification**  
  Practice is structured around problem-solving patterns, not problem IDs or difficulty levels. Proficiency is expected across all difficulties within each pattern.

- **Positive Percentage Metrics Focus**  
  Since these are ratio-based metrics (% Solved, % Time Optimal, etc.), the goal is to **increase these percentages over time**.  
  Absolute negative counts (e.g. `5 Not Solved`) are tracked elsewhere (in attempt dashboards) where the goal is eventually zero.

- **Proficiency Health Check via Problem Volume**  
  To avoid over or underestimating performance in a pattern:
  - **Total**: Number of problems available for a pattern.
  - **Unattempted**: Ensures weak areas aren’t hidden simply due to lack of attempts.
  Patterns with too few total problems or attempts are excluded from top-five prioritization.

- **Top-Five Prioritization**  
  Only the five patterns with the lowest performance on the selected `Sort Metric` are surfaced to avoid decision fatigue. Remaining patterns are grouped under `All Other`.

- **Contextual Filters**  
  - **Difficulty Filter**: To control for problem difficulty skew (Easy, Medium, Hard)
  - **Attempt Timeframe**: To account for skill rustiness and track recent readiness.
  - **Tags Filter**: To focus metrics on curated lists (e.g., LeetCode 75, Meta tag)

---

## Color & Formatting Conventions

| Metric Group       | Purpose                   | Color/Style                          |
|:------------------|:--------------------------|:-------------------------------------|
| **Problem Metrics** | Measure dataset coverage   | Light gray / light yellow highlights |
| **Attempt Metrics** | Measure performance rates  | Green / Light green backgrounds      |
| **Top 5 Patterns**  | Priority weak areas        | Bold text, thin red border           |
| **All Other**       | Deprioritized patterns     | Muted gray font                      |

### Color Mapping

#### Problem Metrics
- `Total`: `#E0E0E0` (light gray)
- `Unattempted > 0`: `#FFF9C4` (light yellow)

#### Attempt Metrics
- `Solved`: `#C8E6C9` (light green)
- `Time Optimal`: `#DCEDC8` (lighter green)
- `Space Optimal`: `#DCEDC8`
- `Quality Code`: `#F0F4C3` (pale lime)

#### Top 5 Patterns
- Bold text, thin red border `#F44336`

#### All Other
- Muted gray font `#BDBDBD`

---

## Intended Outcomes

- Rapidly surface weakest patterns requiring focused practice.
- Prevent false positives by factoring in attempt volume.
- Provide flexibility to analyze both overall trends and recent data shifts.
- Stay aligned with pattern-driven mastery and continuous improvement targets.

---

## Multi-Metric vs Single-Metric Sorting

Originally considered implementing a single-metric display model, where only one selected performance metric would be shown at a time. This was rejected in favor of showing **all relevant attempt metrics side by side** for each pattern.

**Reasoning:**
- A pattern may not be the worst on any single metric, but consistently mediocre across all metrics. Isolating metrics would hide this valuable insight.
- Solely sorting by a single metric risks over-prioritizing one-off outliers while ignoring patterns with broader weaknesses.
- Providing full metric visibility alongside a selected `Sort Metric` enables better contextual decision-making.

**Example Scenario:**

| Pattern               | Solved | Time Optimal | Space Optimal | Quality Code |
|:---------------------|:------------|:------------------|:--------------------|:-------------------|
| Backtracking          | 75%        | 75%              | 75%                | 75%               |
| Breadth-First Search   | 80%        | 80%              | 80%                | 80%               |

If sorted by `Solved`, Backtracking would appear as the weakest.  
However, **Backtracking** also presents consistent underperformance across all metrics and would be a better focus area than a pattern with a single poor outlier.

---

## Composite Score (Proficiency Index)

As a potential future enhancement, consider adding a **Composite Score** to quantify overall strength across all attempt metrics.

**Formula (equal weight example):**
