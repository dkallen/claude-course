# Module 1: Orientation — What Claude Code Actually Is

**From Concept to Delivery with Claude Code — A Practitioner's Course**

---

## Why This Module Matters

Before you can use Claude Code well, you need an accurate mental model of what it is. Not the marketing pitch, not the vibes — the actual mechanics. Most frustration with Claude Code comes from expecting it to be something it isn't. This module fixes that.

By the end, you'll understand how Claude Code thinks, where it runs, why it sometimes forgets what you told it five minutes ago, and — crucially — why it crushes some tasks and fumbles others.

---

## 1. The Agentic Loop

Claude Code isn't a chatbot that happens to write code. It's an **agent** — a system that can read its environment, make a plan, take action, observe the results, and adjust. This is the agentic loop, and understanding it changes how you interact with the tool.

### The Four Phases

**Read → Plan → Act → Verify**

Here's what's actually happening when you give Claude Code a task:

**Read.** Claude Code starts by gathering context. It looks at the files you've pointed it at, reads your CLAUDE.md (if you have one — that's Module 2), examines relevant code, and processes your prompt. It's building a picture of the situation before doing anything.

**Plan.** Based on what it's read, Claude Code forms an approach. For simple tasks, this is nearly instantaneous. For complex ones, you might see it reason through options, consider trade-offs, or ask clarifying questions. This is where the "thinking" happens.

**Act.** Claude Code executes — writing code, editing files, running terminal commands, calling external tools. These are real actions on your real filesystem. It's not simulating; it's doing.

**Verify.** After acting, Claude Code checks its work. Did the code compile? Did the tests pass? Does the output match what was expected? If something's off, it loops back — re-reading, re-planning, and trying again.

### Why This Matters in Practice

The loop means Claude Code is **self-correcting** — to a degree. When you give it a task and it hits an error, it doesn't just throw up its hands. It reads the error, adjusts its plan, and retries. This is powerful, but it's not magic. If the underlying approach is wrong, it'll keep refining a bad idea rather than stepping back and rethinking from scratch. That's where you come in — as the director.

The loop also means Claude Code **accumulates context as it works**. Each read-plan-act-verify cycle adds to what it knows about the current session. Early in a session, it might be feeling around in the dark. After a few cycles, it's built up a rich picture of your project.

### A Practical Example

Say you ask Claude Code: *"Add input validation to the signup form."*

1. **Read**: It scans your project, finds the signup form component, reads the existing code, checks for validation libraries already in use.
2. **Plan**: It decides to use the validation library you already have (say, Zod), identifies which fields need validation, and plans the validation rules.
3. **Act**: It writes the validation schema, integrates it into the form, updates error message handling.
4. **Verify**: It checks for syntax errors, runs any existing tests, maybe even runs the app to check for import issues.

If step 4 reveals a problem — say, a missing import — it loops back: reads the error, plans the fix, acts on it, verifies again.

---

## 2. Environments: Where Claude Code Lives

Claude Code isn't a single experience. It runs in several environments, and they're not all the same. Knowing the differences saves you from confusion when something works in one place but not another.

### Terminal CLI

This is Claude Code in its purest form. You open a terminal, type `claude`, and you're in a conversational interface with full access to your filesystem, shell commands, and any MCP servers you've configured.

**Strengths:** Maximum control. You see exactly what Claude is doing. You can pipe input, script interactions, and integrate it into existing terminal workflows. It's the fastest way to work if you're comfortable in a terminal.

**Limitations:** No visual rendering. You're reading text output only. If Claude generates a React component, you won't see it rendered — you'll see the code.

### VS Code Extension

Claude Code integrated into your editor. It appears as a sidebar panel, and it can see your open files, your workspace, and your terminal.

**Strengths:** Context is richer — Claude can see what file you're looking at, where your cursor is, and what you've recently edited. The feedback loop is tighter because you can see changes reflected in your editor in real time.

**Limitations:** It's still the same underlying model and agentic loop, just with a different input surface. Don't expect it to be smarter in VS Code — it has the same capabilities, just better-integrated context.

### Desktop App (Cowork)

The Claude desktop application includes a "Cowork" mode that gives Claude Code access to a sandboxed Linux environment. You select a folder from your computer, and Claude can read and write files in it.

**Strengths:** Accessible to people who don't live in a terminal. Good for document creation, file management, and tasks that benefit from a visual interface. Supports MCP connections to external services (Slack, Google Calendar, etc.).

**Limitations:** Runs in a lightweight VM, so some system-level operations aren't available. The sandboxed environment is reset between sessions (though your workspace folder persists).

### Web (claude.ai)

Claude Code is available on the web at claude.ai, where it can write and execute code in a cloud environment.

**Strengths:** No local setup required. Good for quick tasks or when you're away from your primary machine.

**Limitations:** The code runs in a cloud sandbox, not on your machine. It doesn't have access to your local filesystem, your MCP servers, or your project configuration. It's Claude Code, but without *your* context.

### The Key Insight

The model behind all these environments is the same. What changes is the **context surface** — what Claude can see and act on. Terminal and VS Code give it your full local environment. Desktop gives it a controlled slice. Web gives it a generic sandbox. Choose the environment that gives Claude the context it needs for the task at hand.

---

## 3. Context Windows and Compaction

This is where most people's mental model breaks. Claude Code seems like it has a great memory — until suddenly it doesn't. Understanding why requires understanding the context window.

### What the Context Window Is

Every interaction with Claude Code happens within a **context window** — a fixed-size buffer that holds everything Claude can "see" at once. This includes your prompt, the conversation history, any files it's read, tool outputs, and its own responses. Think of it as Claude's working memory.

The context window is large (up to 200,000 tokens for current models), but it's not infinite. A single large codebase can fill it up. A long conversation will eventually hit the limit.

### What Happens When It Fills Up: Compaction

When the context window approaches its limit, Claude Code performs **compaction** — it summarizes older parts of the conversation to make room for new content. This is automatic, and it's mostly invisible to you.

The problem? Compaction is lossy. Details get dropped. Specific instructions you gave early in a conversation might get summarized into vague generalities — or lost entirely. This is why Claude Code sometimes "forgets" things you told it earlier.

### What This Means for You

**Short, focused sessions work better than marathon sessions.** If you're working on a complex task, it's often better to break it into smaller sessions rather than trying to do everything in one long conversation. Each new session starts with a fresh context window.

**Front-load the important stuff.** Instructions at the beginning of a very long conversation are the most vulnerable to compaction. If something is critical, put it in your CLAUDE.md file (Module 2) rather than relying on conversation history — CLAUDE.md gets re-read at the start of every session.

**If Claude seems to have forgotten something, it probably has.** Don't get frustrated — just re-state the important context. It's not being careless; it literally can't see the earlier part of the conversation anymore.

**Watch for the signs.** If Claude starts contradicting earlier decisions, repeating work it already did, or asking questions you already answered — compaction has likely kicked in. That's your cue to start a fresh session or re-provide key context.

### A Mental Model for Context

Think of it like a whiteboard. Claude can write and read everything on the whiteboard. But the whiteboard has a fixed size. When it runs out of space, it erases the oldest stuff — keeping a brief note about what was there, but losing the details. Your job is to make sure the most important information is written somewhere it won't get erased (like CLAUDE.md).

---

## 4. The Jagged Capability Frontier

This is the most important concept in this module. Get this right, and you'll save yourself hours of frustration.

Claude Code's capabilities aren't uniformly good or uniformly bad. They're **jagged** — spectacularly good at some things, surprisingly poor at others, with the boundary between "good" and "bad" being unintuitive and irregular.

### Where Claude Code Excels

**Understanding and explaining existing code.** Point it at a codebase and ask "what does this do?" and you'll get a clear, accurate explanation. This is one of its strongest capabilities.

**Writing boilerplate and standard patterns.** CRUD operations, API endpoints, React components, test scaffolding, configuration files — anything that follows well-established patterns, Claude Code handles efficiently and accurately.

**Refactoring with clear intent.** "Rename this variable across the project," "extract this function," "convert this class component to a functional component" — tasks with clear, mechanical transformation rules.

**Multi-file coordination.** Claude Code can understand how files relate to each other and make coordinated changes across a codebase. This is something it's genuinely better at than doing manually, because it doesn't lose track of which files need updating.

**Generating documentation.** README files, API docs, code comments, changelogs — Claude Code is excellent at synthesizing information from code into human-readable documentation.

**Debugging from error messages.** Give it a stack trace and access to the code, and it's remarkably good at tracing the issue to its root cause and proposing a fix.

### Where Claude Code Struggles

**Novel algorithms and complex logic.** If the solution requires genuine mathematical or algorithmic insight — something that can't be pattern-matched from training data — Claude Code will often produce something that looks right but has subtle bugs.

**Maintaining consistency over long sessions.** Due to compaction (see above), Claude Code can contradict its own earlier decisions in a long session. It might refactor code in a direction that conflicts with architectural choices it made earlier.

**Knowing what it doesn't know.** Claude Code will rarely say "I'm not sure about this." It'll produce confident-looking output even when it's guessing. This is arguably its most dangerous trait — the output quality is inconsistent, but the confidence level is always high.

**UI/UX judgment.** It can write UI code, but its design instincts are mediocre. It'll produce something functional but rarely beautiful. It optimizes for "works" not "feels right."

**Domain-specific knowledge gaps.** Claude Code's training data skews toward popular technologies and common patterns. If you're working with a niche framework, an unusual architecture, or domain-specific conventions, it'll fall back on generic patterns that may not fit.

**Security-sensitive code.** It can write authentication flows and handle encryption, but it may miss edge cases or use outdated practices. Always have security-critical code reviewed by a specialist.

### The "Jagged" Part

What makes the frontier jagged — rather than just "good at X, bad at Y" — is that the boundary is unpredictable. Claude Code might handle 90% of a complex task flawlessly and then make a bizarre error on the simplest part. Or it might struggle with the setup but nail the hard logic. You can't predict in advance exactly where it'll stumble.

This is why the course philosophy emphasizes **working with the grain of the tool.** Instead of trusting Claude Code blindly or refusing to trust it at all, you learn to:

1. **Give it tasks where it's strong** and handle the weak spots yourself.
2. **Verify its output**, especially in areas near the jagged edge.
3. **Break complex tasks into pieces** so you can catch errors at each step rather than discovering them after a long chain of work.
4. **Use tests as a safety net** (Module 6) — tests don't care whether the code was written by a human or an AI. They catch bugs either way.

### A Framework for Deciding When to Trust Claude Code

Ask yourself:

- **Is this a common pattern?** If yes, trust is high.
- **Does this require judgment or taste?** If yes, trust is lower — verify carefully.
- **Can I easily verify the output?** If yes, let Claude try and check the result. If verification is hard, proceed more cautiously.
- **What's the cost of an error?** Low-stakes work (internal tools, prototypes) → let Claude run. High-stakes work (production security, financial calculations) → verify everything.

---

## Tying It Together

These four concepts — the agentic loop, environments, context windows, and jagged capabilities — form your mental model for working with Claude Code effectively.

The agentic loop tells you **how** it works: read, plan, act, verify, repeat.
The environments tell you **where** it works and what context it has.
Context windows tell you **what it remembers** — and what it forgets.
The jagged frontier tells you **what to trust** — and what to double-check.

With this model in your head, you're ready to start working with Claude Code as a genuine partner rather than a magic box. Module 2 will show you how to give it persistent context about who you are and how you work.

---

## Check

Can you explain to someone else *why* Claude Code sometimes nails a task and sometimes misses completely?

If your answer touches on the jagged capability frontier (pattern-matched vs. novel tasks), context window limitations (compaction and forgetting), and the agentic loop (self-correction has limits) — you're ready for Module 2.
