# From Concept to Delivery with Claude Code
### A Practitioner's Course

**Author:** David (with Claude)  
**Version:** Draft 1.2 — March 2026  
**Format:** Self-paced, exercise-driven, interactive

---

## Course Philosophy

This is not a software development course. It's a course about using Claude Code as a **thinking and building partner** across the full lifecycle — from a loosely-formed idea to a working, delivered product. Every module is grounded in a structured business analysis framework built on five interconnected concepts: **Goals** (the desired state), **Problems** (obstacles blocking those goals), **Solutions** (actions that resolve problems or advance goals directly), **Risks** (forecasted problems arising from solutions), and **Scope** (the boundaries that determine what's in and what's out). Solutions that target Risks are Mitigations — they aren't a separate category, just Solutions pointed at a different kind of problem.

Claude Code's capabilities are jagged. This course teaches you where they're strong, where they're weak, and how to work *with* the grain of the tool rather than against it.

---

## Prerequisites

- A Claude subscription (Pro or Max) with Claude Code access
- Basic comfort with a terminal or VS Code
- No prior Claude Code experience required — we start from zero

---

## Table of Contents

| # | Module | Focus |
|---|--------|-------|
| 1 | Orientation — What Claude Code Actually Is | Mental model, environments, jagged capabilities |
| 2 | CLAUDE.md — Teaching Claude Who You Are | Persistent context, project conventions |
| 3 | The Art of the Prompt — From Ramble to Precision | Prompt calibration, Director Mode, effort levels |
| 4 | Idea Refinement — Using Claude Code to Think | Full business analysis framework, scope, alignment checks, diagramming |
| 5 | Architecture — Designing Before Building | Trade-off analysis, scaffolding, ADRs |
| 6 | Test-Driven Development with Claude Code | Tests as specification, red-green-refactor |
| 7 | Skills — Reusable Intelligence | SKILL.md files, triggers, testing, composition |
| 8 | MCP — Connecting Claude Code to the World | External tools, data sources, security |
| 9 | Multi-Agent Workflows — Orchestration at Scale | Subagents, worktrees, parallel development |
| **10** | **Scheduled Tasks — Putting Claude on Autopilot** | **/loop, Desktop scheduling, recurring automation** |
| **11** | **Remote Control — Claude Code from Your Pocket** | **`claude rc`, mobile control, local execution** |
| **12** | **Channels — Claude Code Meets You Where You Are** | **Telegram, Discord, event-driven workflows** |
| 13 | Delivery — From Working Code to Shipped Product | Docs, release notes, CI/CD, shipping |
| — | Capstone: Build Something Real | Full pipeline on a real project |

*Modules 1–9: Working with Claude Code at your desk.*
*Modules 10–12: Claude Code working for you when you're not.*
*Module 13: Shipping.*

---

## Module 1: Orientation — What Claude Code Actually Is

**Goal:** Build an accurate mental model of how Claude Code works so you stop being surprised by what it can and can't do.

### Key Concepts
- The agentic loop: how Claude Code reads, plans, acts, and verifies
- Environments: terminal CLI, VS Code extension, desktop app, web, and how they differ
- Context windows and compaction — why Claude "forgets" and what to do about it
- The jagged capability frontier: what Claude Code excels at vs. where it falls flat

### Exercise
Install Claude Code (or confirm your existing setup). Run it against a small project folder. Ask it to explain what it sees. Then ask it a question it can't answer from the codebase alone. Notice the difference.

### Check
Can you explain to someone else *why* Claude Code sometimes nails a task and sometimes misses completely? If yes, move on.

---

## Module 2: CLAUDE.md — Teaching Claude Who You Are

**Goal:** Learn to give Claude Code persistent context about your project, your standards, and your way of working.

### Key Concepts
- What CLAUDE.md is and where it lives (project root, ~/.claude/, folder-level)
- The hierarchy: global → project → folder instructions
- What belongs in CLAUDE.md vs. what belongs in a prompt
- Writing effective instructions: constraints, conventions, and examples
- Anti-patterns: CLAUDE.md files that are too long, too vague, or contradictory

### Exercise
Write a CLAUDE.md for a real or practice project. Include your business analysis framework (Goals, Problems, Solutions, Risks, Scope) as a standard operating procedure. Test it by giving Claude a vague task and seeing whether it follows your framework unprompted.

### Check
Does Claude Code follow your conventions without you having to remind it every time? If yes, move on.

---

## Module 3: The Art of the Prompt — From Ramble to Precision

**Goal:** Learn to translate loosely-formed ideas into prompts that get Claude Code to do what you actually mean.

### Key Concepts
- Why Claude Code is exceptionally good at interpreting rambly, well-intentioned instructions — and why that's both a strength and a trap
- The spectrum from "do exactly this" to "figure out what I need"
- Director Mode: describing outcomes instead of steps
- Structured prompting: when to add constraints, examples, and anti-examples
- The "ultrathink" keyword and effort levels (/effort command)

### Exercise
Take a real problem you're facing. First, describe it to Claude Code the way you'd describe it to a colleague over coffee. Note what it does. Then refine the prompt with explicit constraints and success criteria. Compare the outputs. Which approach worked better, and why?

### Check
Can you calibrate your prompting style to the complexity of the task — loose for exploration, tight for execution? If yes, move on.

---

## Module 4: Idea Refinement — Using Claude Code to Think

**Goal:** Use Claude Code as a thinking partner to apply the structured business analysis framework — clarifying goals, surfacing problems, proposing solutions, identifying risks, and defining scope — before writing any code.

### Key Concepts
- **Goal hierarchies:** Goals exist in a strict hierarchy where lower-level goals contribute directly to higher-level ones. Use Claude Code to help articulate and structure this hierarchy from vision down to actionable targets
- **Problems as obstacles:** Problems are the current undesirable conditions blocking specific goals. They have their own causal hierarchy — root cause problems trigger effect problems. Use Claude to trace causality rather than just listing symptoms
- **The dual purpose of Solutions:** Solutions both *resolve identified problems* and *advance goals directly* even when no explicit problem has been identified (e.g., proactive innovation). The syllabus shorthand "find a problem, then solve it" misses half the picture
- **The Solution Alignment Check:** Every proposed solution must pass a test — is it resolving an identified problem that obstructs a goal? Is it furthering a goal directly? If neither, the framework becomes a *thinking tool* to reveal an unexpressed goal or problem the stakeholder believes is important, or the solution should be discarded
- **Risks as forecasted problems:** Risks are potential unintended consequences of implementing a specific solution. Mitigations are just solutions that target risks
- **Scope as the critical boundary:** Scope defines which goals, problems, and solutions are relevant to the current initiative. Many important goals and problems exist outside the boundaries and must be explicitly declared out of scope. Defining scope is the stakeholder's responsibility — Claude can help surface the question, but a human must answer it
- **Diagramming as a diagnostic tool:** Visualizing the connections between goals, problems, solutions, and risks as a directed graph (goals at top, solutions at bottom, arrows pointing upward) reveals confusion, validates alignment, and ensures strategic focus
- Using Claude to challenge your assumptions (adversarial prompting)
- When to use Chat vs. Claude Code for thinking work

### Exercise
Pick an idea you've been sitting on — something you want to build but haven't started. Walk Claude Code through the full framework: Start with the goal hierarchy (what's the top-level goal, what are the contributing goals?). Identify the problems obstructing each goal and trace their causal relationships. Propose solutions — some that resolve problems, some that advance goals directly. Run the Solution Alignment Check on each one. Identify risks for the solutions you're keeping, and propose mitigations. Define the scope explicitly — what's in, what's out, and why. Finally, have Claude generate a directed graph diagram of the whole structure. Capture the output as a structured brief.

### Check
Do you have a clear, written brief with a goal hierarchy, identified problems, aligned solutions, risks with mitigations, and an explicit scope boundary — one you'd be comfortable handing to a developer (or to Claude Code in the next module)? If yes, move on.

---

## Module 5: Architecture — Designing Before Building

**Goal:** Use Claude Code to make architectural decisions before committing to code.

### Key Concepts
- Describing the system you want: components, data flow, boundaries
- Having Claude Code generate architectural options and trade-off analyses
- File and folder structure decisions
- Technology selection with Claude's help (and awareness of its biases)
- Creating an architecture decision record (ADR)

### Exercise
Using the brief from Module 4, ask Claude Code to propose two or three architectural approaches. For each, ask it to identify risks and trade-offs. Pick one. Have Claude generate a project scaffold (folder structure, placeholder files, README). Review it critically — does the structure make sense?

### Check
Do you have a project scaffold that reflects deliberate architectural choices, not just whatever Claude defaulted to? If yes, move on.

---

## Module 6: Test-Driven Development with Claude Code

**Goal:** Use Claude Code to write tests *first*, then implement code that passes them.

### Key Concepts
- Why TDD matters more with AI: tests are your specification, not just verification
- Having Claude Code write tests from your requirements
- The red-green-refactor cycle with Claude as the implementer
- When Claude writes tests that pass trivially (and how to catch it)
- Integration tests vs. unit tests: what to ask Claude for when

### Exercise
Take one feature from your project. Write the requirements in plain English. Have Claude Code generate tests for those requirements *before* any implementation exists. Review the tests — do they actually test what matters? Then have Claude implement the code to make them pass.

### Check
Did the tests catch a real issue during implementation? If yes, you're experiencing the value. Move on.

---

## Module 7: Skills — Reusable Intelligence

**Goal:** Create custom skills that encode your domain knowledge and workflows for Claude Code to use repeatedly.

### Key Concepts
- What skills are: SKILL.md files that teach Claude Code how to do specific things
- Skill anatomy: description, triggers, instructions, examples
- When to write a skill vs. when to just prompt
- Skill composition: skills that reference other skills
- Testing and iterating on skills

### Exercise
Identify a task you do repeatedly (e.g., writing a certain kind of document, setting up a certain kind of component, running a specific analysis). Write a skill for it. Test it three times with different inputs. Refine based on what Claude gets wrong.

### Check
Does your skill produce consistent, high-quality output across different inputs without you having to re-explain things? If yes, move on.

---

## Module 8: MCP — Connecting Claude Code to the World

**Goal:** Extend Claude Code's reach by connecting it to external tools and data sources.

### Key Concepts
- What MCP (Model Context Protocol) is and why it matters
- Installing and configuring MCP servers (GitHub, filesystem, databases, etc.)
- Using MCP to give Claude Code access to your actual tools and data
- Security considerations: what you're granting access to
- Building custom MCP servers (overview — not a deep dive)

### Exercise
Install one MCP server that's relevant to your work (e.g., GitHub if you use Git, or a filesystem server for a specific data source). Give Claude Code a task that requires that external data. Observe how it uses the MCP connection vs. how it would have handled the task without it.

### Check
Has Claude Code successfully used external data through MCP to complete a task it couldn't have done from the codebase alone? If yes, move on.

---

## Module 9: Multi-Agent Workflows — Orchestration at Scale

**Goal:** Understand how to use subagents and agent teams for complex, multi-step work.

### Key Concepts
- When a single Claude Code session isn't enough
- Subagents: what they are and when to spawn them
- Worktrees: isolated Git environments for parallel work
- Coordinating multiple agents on different aspects of a project
- Context management across agents

### Exercise
Take your project and identify two features that could be developed in parallel. Set up worktrees for each. Have Claude Code work on both simultaneously. Merge the results. Reflect on what went smoothly and what was awkward.

### Check
Can you articulate when multi-agent workflows help vs. when a single session is more efficient? If yes, move on.

---

## Module 10: Scheduled Tasks — Putting Claude on Autopilot

**Goal:** Learn to set up recurring and one-shot tasks so Claude Code works on your behalf without you sitting at the terminal.

### Key Concepts
- Two flavors of scheduling: CLI session-scoped (/loop) vs. Desktop persistent (Cowork /schedule)
- The /loop command: syntax, intervals, and when to use it (e.g., `/loop 5m check if the deployment finished`)
- Underlying cron tools: CronCreate, CronList, CronDelete — and the 5-field cron expression format
- Desktop scheduled tasks: creating durable tasks via the Cowork sidebar or `/schedule` that survive restarts
- Session-scoped limits: tasks only fire while Claude Code is running and idle; 3-day auto-expiry on recurring tasks; no catch-up for missed fires
- Practical patterns: deployment monitoring, daily PR summaries, weekly documentation updates, morning briefings
- Security and permissions: tasks inherit your environment but permission prompts can stall unattended sessions
- When to use /loop vs. Desktop scheduled tasks vs. GitHub Actions for CI/CD automation

### Exercise
Set up two scheduled tasks for your project. First, use `/loop` in the CLI to monitor something in real time (e.g., poll a build status every 5 minutes). Second, create a persistent Desktop scheduled task that runs weekly (e.g., summarize open PRs every Monday morning, or update documentation based on recent code changes). Compare the experience — which felt more useful, and why?

### Check
Can you set up a recurring task that runs without your intervention and delivers useful output when you come back? If yes, move on.

---

## Module 11: Remote Control — Claude Code from Your Pocket

**Goal:** Learn to start a Claude Code session at your desk, then continue controlling it from your phone, tablet, or any browser.

### Key Concepts
- What Remote Control is: a secure bridge between your local terminal session and claude.ai/code or the Claude mobile app
- The key architectural distinction: your code never leaves your machine — the phone is just a window into the local session
- Starting a session: `claude remote-control` (or `claude rc`) from a fresh terminal, or `/rc` mid-session to preserve conversation history
- Connecting: session URL, QR code scanning, or the session list in the Claude app
- What stays available remotely: your filesystem, MCP servers, tools, project configuration, full conversation context
- Auto-reconnect: if your laptop sleeps or the network drops, the session reconnects when your machine comes back
- Current limitations: one session per Claude Code instance, terminal must stay running, ~10-minute network timeout, permission prompts still require approval
- Remote Control vs. Claude Code on the web: local execution vs. cloud execution — why this distinction matters for security and environment access

### Exercise
Start a non-trivial Claude Code task at your desk — something that takes a few minutes (e.g., a refactor or a test suite run). Run `/rc`, scan the QR code with your phone, and walk away from your desk. Monitor progress from your phone. Send a follow-up instruction from mobile. Notice what works well and where the experience is rough.

### Check
Did you successfully control a Claude Code session from a device other than the one running it? Did your local environment (files, MCP, skills) remain fully available? If yes, move on.

---

## Module 12: Channels — Claude Code Meets You Where You Are

**Goal:** Control your Claude Code sessions through messaging platforms like Telegram and Discord, turning Claude into an async, event-driven partner.

### Key Concepts
- What channels are: MCP servers that push events *into* your running Claude Code session — not tools Claude calls, but bridges that let the outside world reach Claude
- The two-way flow: you message the bot, the event arrives in your session, Claude processes it using your full local environment, and replies back through the same channel
- Supported platforms: Telegram and Discord (research preview), with a plugin architecture designed for community expansion
- Setup flow: install the plugin, configure your bot token, launch with `--channels`, pair via DM with a pairing code
- Security model: sender allowlists (only paired user IDs can push events), the `--channels` flag as an explicit opt-in per session
- Telegram vs. Discord: Telegram is faster to set up (no server invite needed); Discord adds message history, guild channels, and attachment downloads
- The Fakechat quickstart: a local demo channel for testing the flow before connecting a real platform
- Channels vs. Remote Control: Remote Control gives you the full claude.ai interface with rich formatting; Channels gives you a hackable, extensible system through messaging apps you already use
- The "always-on" caveat: events only arrive while the session is open — for persistent operation, run Claude in a background process or persistent terminal (tmux/screen)
- Known limitation: permission prompts stall sessions silently — Claude can't be unblocked remotely

### Exercise
Pick either Telegram or Discord (whichever you use more). Follow the setup: create a bot, install the plugin, configure the token, launch with `--channels`, and pair your account. Send your bot a real task — something that uses your project files. Watch the reply come back through the messaging app. Then try the Fakechat demo to understand the underlying flow without external dependencies.

### Check
Did you successfully send a task to Claude Code through a messaging platform and receive a useful reply? Do you understand when you'd use Channels vs. Remote Control vs. just sitting at your terminal? If yes, move on.

---

## Module 13: Delivery — From Working Code to Shipped Product

**Goal:** Use Claude Code to handle the "last mile" — documentation, deployment prep, release notes, and handoff.

### Key Concepts
- Generating documentation from code (README, API docs, user guides)
- Writing release notes and changelogs with Claude
- Git workflows: branching, committing, PR creation with Claude Code
- CI/CD integration: using Claude in GitHub Actions or GitLab CI
- Code review automation with @claude on GitHub
- The handoff: what to check before declaring "done"

### Exercise
Take your project to a shippable state. Have Claude Code generate a README, write release notes, create a PR with a meaningful description, and run any automated checks. Review everything critically. Ship it (even if "shipping" means merging to main on a personal repo).

### Check
Did you go from working code to a shipped, documented deliverable with Claude Code handling the tedious parts? If yes, congratulations — you've completed the pipeline.

---

## Capstone: Build Something Real

Put it all together. Choose a real project — something you actually want to exist in the world. Walk the entire pipeline:

1. **Idea refinement** (Module 4): Clarify the goal, problems, solutions, risks
2. **Architecture** (Module 5): Design before building
3. **TDD** (Module 6): Write tests first
4. **Skills** (Module 7): Create reusable skills for repeated patterns
5. **MCP** (Module 8): Connect to external tools you need
6. **Multi-agent** (Module 9): Parallelize where it makes sense
7. **Scheduled tasks** (Module 10): Automate recurring work
8. **Remote Control + Channels** (Modules 11–12): Stay connected on the go
9. **Delivery** (Module 13): Document, review, ship

Document your experience — what worked, what didn't, where Claude Code's jagged capabilities showed up, and how you adapted.

---

## Appendices

### A: Common Claude Code Commands
Quick reference for /commands, slash commands, and keyboard shortcuts.

### B: Troubleshooting Jagged Capabilities
A growing list of known weak spots and workarounds, populated as you discover them throughout the course.

### C: Your Personal CLAUDE.md Library
A collection of the CLAUDE.md files and skills you build during the course, organized for reuse.

### D: Resources
- Official Claude Code docs: https://code.claude.com/docs/en/overview
- Anthropic Academy (free courses)
- Community resources: r/ClaudeAI, ClaudeLog, roadmap.sh/claude-code
