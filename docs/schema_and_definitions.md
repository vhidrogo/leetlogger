# LeetLogger – Schemas & Field Definitions

## Attempts Sheet

| Field              | Type     | Description                                                       | Example                  |
|:------------------|:---------|:------------------------------------------------------------------|:-------------------------|
| LC ID              | String   | LeetCode problem identifier                                        | `165`                     |
| Approach Pattern   | String   | The algorithmic pattern used for this attempt                      | `Optimal`                 |
| Date               | Date     | Date of attempt                                                    | `2025-05-01`              |
| Start Time         | Time     | Time when attempt started                                          | `08:12 AM`                |
| End Time           | Time     | Time when attempt ended                                            | `08:30 AM`                |
| Duration Minutes   | Number   | End Time - Start Time in minutes                                   | `18`                      |
| Solved             | Boolean  | Whether the problem was solved successfully (LeetCode accepted)   | `TRUE`                    |
| Time Complexity Optimal | Boolean  | Whether the solution met the target time complexity               | `TRUE`                    |
| Space Complexity Optimal | Boolean  | Whether the solution met the target space complexity              | `FALSE`                   |
| Quality Code       | Boolean  | Whether the code was clean, idiomatic, and free of avoidable issues | `FALSE`                   |
| Notes              | String   | Optional freeform notes                                            | `"Solved, but nested loops could be combined"` |

---

## Problems Sheet

| Field                 | Type     | Description                                                     | Example                |
|:---------------------|:---------|:----------------------------------------------------------------|:------------------------|
| LC ID                 | String   | LeetCode problem identifier                                      | `165`                    |
| Problem Name          | String   | Title of the problem                                             | `Compare Version Numbers`|
| Link                  | String   | Direct link to the problem                                       | `https://leetcode.com/problems/compare-version-numbers/` |
| Dominant Topic        | String   | Main algorithmic pattern for optimal solution                    | `Two-pointer`            |
| Subdominant Topics    | String[] | List of secondary patterns involved                              | `["Two-pass", "Parsing"]`|
| Difficulty            | String   | Problem difficulty level                                         | `Medium`                 |
| Input Data Structure  | String   | Data structure used in input                                      | `String`                 |
| Alternate Patterns    | String   | Comma-separated list of other possible patterns for this problem  | `Hash Table, Sorting`    |

