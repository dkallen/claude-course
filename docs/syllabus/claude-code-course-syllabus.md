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

**Goal:** Learn how Claude Code's skill system works and create skills that extend what Claude can do without re-prompting.

### Key Concepts
- What skills are: SKILL.md files that live in `.claude/skills/` and extend Claude Code's vocabulary with new commands and behaviors
- Skill anatomy: the trigger block (regex patterns, slash commands, natural-language phrases), the instruction body, and optional examples — how each part is interpreted
- How Claude discovers and selects skills: trigger matching vs. semantic matching, priority ordering when multiple skills could apply
- Slash commands as skills: creating `/your-command` shortcuts that appear in the command palette — the difference between a slash command and a trigger phrase
- The built-in skill library: what Claude Code ships with, how to browse it with `/skills`, and what the built-in ones reveal about good skill design
- Skill composition: skills that call other skills, and when to split a workflow across multiple focused skills rather than one monolithic one
- Testing skills: probing trigger patterns with phrasings that should fire and phrasings that shouldn't — how to iterate without guessing

### Exercise
Start by browsing Claude Code's built-in skills with `/skills`. Pick one and read its SKILL.md — study the trigger pattern and how the instruction body is written. Then create your own: a slash command that handles something you do repeatedly. Test it with at least five different phrasings, including two or three that should *not* trigger it. Refine the trigger pattern until the boundaries are where you expect them.

### Check
Can you explain how trigger matching works? Does your skill fire on intended inputs and stay quiet on unintended ones? If yes, move on.

---

## Module 8: MCP — Connecting Claude Code to the World

**Goal:** Understand how Model Context Protocol works inside Claude Code and extend it with servers that connect to external tools and data.

### Key Concepts
- What MCP is: an open standard for connecting LLMs to tools — and the key insight that Claude Code's built-in tools (Read, Edit, Bash, Glob, Grep) are already MCP tools; you're extending an existing system, not adding something new
- The MCP tool-use loop: how Claude decides which tool to call, what it passes, what it does with the result, and how this shows up in the session output
- The server ecosystem: official servers (GitHub, filesystem, Postgres, Brave Search, Puppeteer) and community-built ones — where to find them and how to evaluate them
- Installing and configuring MCP servers: `claude mcp add`, the `.mcp.json` config file, and how to scope a server to a specific project vs. globally
- Security model: what permissions you're granting when you install a server, network access implications, and why least-privilege matters for servers that touch production systems
- Watching Claude use tools: how to read the tool-call output in a session to understand Claude's reasoning — which tool it reached for, why, and what it learned from the result
- Building custom MCP servers (overview): the shape of a server, when the ecosystem doesn't have what you need

### Exercise
Install two MCP servers: one official (e.g., the GitHub MCP server) and one from the community that interests you. Give Claude Code a task that requires each one. Watch the tool-call output — pay attention to which tool Claude chose, what arguments it passed, and how it used the result in its next step. Then try giving it a task where the right tool is ambiguous and see which one it reaches for.

### Check
Can you explain what MCP is and how it differs from just writing a prompt? Have you watched Claude's tool-call loop in action and understood what it was doing? If yes, move on.

---

## Module 9: Multi-Agent Workflows — Orchestration at Scale

**Goal:** Learn how Claude Code spawns and coordinates subagents, and when specialized agent types produce better results than a single session.

### Key Concepts
- The Agent tool: how Claude Code spawns subagents — the parameters that matter (`subagent_type`, `model`, `isolation`, `run_in_background`) and what each one controls
- Specialized agent types: what each is optimized for — **Plan** (architecture and implementation strategy), **Explore** (fast codebase research, search, and analysis), **general-purpose** (complex multi-step tasks that don't fit a specialty) — and how to choose
- Context isolation: why subagents start with a fresh context window, what you need to explicitly pass them, and why this is a feature rather than a limitation
- The `isolation: "worktree"` parameter: what it creates (a temporary Git worktree), when to use it (parallel work that modifies files), and how the worktree is cleaned up
- The orchestrator pattern: structuring an orchestrating session to delegate clearly, collect results, and synthesize — the difference between delegating a task and delegating a decision
- Parallel vs. sequential agents: when to fire agents concurrently (`run_in_background: true`) vs. wait for results before proceeding — and what breaks if you parallelize the wrong things
- Reading subagent output: how results surface back in the orchestrating session, what gets preserved, and what gets lost

### Exercise
Give Claude Code a task that benefits from multiple specialized agents — for example, ask it to research a library's API using an Explore agent *and* draft an implementation plan using a Plan agent, running both in parallel. Watch how it breaks the work down, what it passes to each agent, and how it writes the summary. Then ask it to repeat one of those tasks in an isolated worktree — observe what changes.

### Check
Can you name the three specialized agent types and describe what each is optimized for? Can you explain why context isolation is a feature? If yes, move on.

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
- Security and permissions: tasks inherit your environment; permission prompts can stall unattended sessions; `--dangerously-skip-permissions` as an explicit opt-in for fully automated contexts (and when *not* to use it)
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

**Goal:** Use Claude Code's delivery-phase features to document, review, and ship — and know where to trust its output vs. where to review carefully.

### Key Concepts
- **@claude in GitHub PRs**: how the code review bot works, what triggers it, what it can meaningfully comment on vs. what it gets wrong, and how to configure it
- **Claude Code in GitHub Actions**: the `claude-code-action` runner — triggered reviews, automated triage, CI integration patterns, and how to write a workflow file that invokes it
- **Hooks**: Claude Code's pre/post tool-call hook system — how to set up hooks that run automated checks (linting, tests, security scans) before or after Claude edits files, without manual prompting
- **Commit messages and PR descriptions**: how Claude generates these, the prompts that produce good ones vs. generic ones, and when to use `/commit` vs. asking Claude to draft inline
- **Documentation generation**: README, API docs, inline comments — what Claude does well (summarizing structure it can read), where it hallucinates (intent it can't infer from code), and how to guide it toward accuracy
- **Release notes and changelogs**: using `git log` context to anchor Claude's output, what level of detail to ask for, and how to avoid the "improved performance and fixed bugs" trap
- **The handoff checklist**: what Claude Code verifies automatically vs. what still requires human judgment before declaring done

### Exercise
In a project with at least a few commits, run Claude Code through three delivery tasks: (1) generate a README from the codebase, (2) write a commit message for staged changes, and (3) draft a PR description. Review each output critically — note where Claude summarized accurately vs. where it invented intent. Then, if you have a GitHub repo, set up the `claude-code-action` and trigger a review on a real PR.

### Check
Have you used Claude Code for at least two delivery-phase tasks and can you say where you'd trust its output directly vs. where you'd always review it? Do you understand how hooks differ from just asking Claude to run checks? If yes, move on.

---

## Capstone: Build Something Real

Choose a real project — something you actually want to exist in the world. Build it with Claude Code doing as much of the work as possible, and use this as a chance to put its features under real load.

There's no prescribed pipeline. Plan however you want to plan. But as you build, actively reach for the Claude Code capabilities this course covered:

- **CLAUDE.md** to set context once, not repeatedly
- **Skills** to encode any repeated patterns that emerge
- **MCP** to give Claude access to whatever external data or tools it needs
- **Multi-agent workflows** when a task is big enough or parallel enough to benefit from subagents
- **Scheduled tasks** for anything recurring
- **Remote Control or Channels** to stay connected when you step away
- **Delivery features** to close the loop — docs, commit messages, PR review, release notes

When you're done, write a short retrospective: which features you actually used, which ones you didn't reach for (and why), and where Claude Code's capabilities were jagged — where it nailed it and where it needed the most steering from you.

That retrospective is the most valuable artifact from the capstone. It's your personal map of the tool.

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
