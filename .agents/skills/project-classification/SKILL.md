---
name: project-classification
description: Use this at the start of a new project or major change to determine the required level of rigor and planning.
---
# Stage 0: Project Classification

## Action: Classify the Project
Ask the human to select the project type to determine the "Rigor Gate" for Discovery, Analysis, and Design:

| Type | Description | Rigor Level |
|:---|:---|:---|
| **(a) Learning** | Exploring a new tech or concept. | Skip Discovery; Minimal Design. |
| **(b) Tool for self** | Internal utility or personal automation. | Moderate GPSR; Pragmatic Design. |
| **(c) For others** | Shared tool or team-level feature. | Full GPSR; Collaborative Design. |
| **(d) Commercial** | External product or high-stakes system. | Full GPSR + Market Context; Rigorous Design. |

## The Predictability Dial
Assess the current scope to determine the planning posture:
- **High Certainty:** Stable domain. Favor heavier upfront design.
- **Low Certainty:** Unclear workflow. Favor rapid prototyping and light upfront design.

**Outcome:** Record the selected Type (a-d) and Predictability in the project's `.agents/STATE.md` or local `CLAUDE.md`.