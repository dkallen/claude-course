# Module 2 Exercise: CLAUDE.md — Teaching Claude Who You Are

## Overview

This exercise has three parts. You'll create a CLAUDE.md file in a real project, test how Claude reads and respects it, and then deliberately push it into territory where vagueness breaks down. The goal isn't to perfect your documentation — it's to build intuition about how Claude uses context to make better decisions.

**Time estimate:** 25–35 minutes

---

## Before You Start

You'll need:
- Claude Code installed and working (verify with `claude --version`)
- A project folder you care about (can be something you're actively working on, or a practice repo)
- A text editor to write CLAUDE.md

---

## Part 1: Write Your First CLAUDE.md

Open your project root and create a file called `CLAUDE.md`. This is your instruction manual for Claude.

Start with the basics:

```markdown
# Project: [Your Project Name]

## What This Is
[One sentence describing the project purpose]

## Tech Stack
- Language: [e.g., Python, TypeScript, Rust]
- Framework: [e.g., React, Django, Actix]
- Key Libraries: [list 2–3]

## Key Conventions
- Naming: [e.g., "kebab-case for files, camelCase for functions"]
- Structure: [e.g., "src/ contains all code, tests/ contains tests"]
- Style: [e.g., "Prefer functional patterns, keep functions under 50 lines"]

## Business Analysis Framework (SOP)
When analyzing any new idea or feature request, apply this framework in order:
1. **Goals** — What are we trying to achieve?
2. **Problems** — What's blocking us or could go wrong?
3. **Solutions** — What are the options?
4. **Risks** — What could break? What's the cost?
5. **Scope** — What's in bounds? What's out?

Use this framework for every task where direction matters.
```

Save it and run a simple task:

> "Take a look at my project structure and summarize what you see."

**Checkpoint:** Did Claude mention the CLAUDE.md file? Did it reflect any of your conventions in its response?

---

## Part 2: Test the Hierarchy

Create a global Claude configuration at `~/.claude/CLAUDE.md`:

```markdown
# Global Preferences

- Always use TypeScript for new code
- Prefer functional programming patterns
- Keep functions under 50 lines where possible
```

Now create a subfolder in your project and add a folder-level override:

```
my-project/
├── CLAUDE.md
└── experimental/
    └── CLAUDE.md
```

In `experimental/CLAUDE.md`:

```markdown
# Experimental Folder

Override: Use Python for this folder only.
Style: Imperative, step-by-step clarity over cleverness.
```

Give Claude a cross-boundary task:

> "Create a new utility function in both the main project and the experimental/ folder. Make them do the same thing."

**Reflection:**
- Did Claude use TypeScript in the main project?
- Did it switch to Python in experimental/?
- Which CLAUDE.md took precedence: global or project-level? Why do you think that is?

---

## Part 3: The Vague Task Test

**Step 1: Task Without CLAUDE.md**

Temporarily rename your CLAUDE.md to CLAUDE.md.bak and ask Claude:

> "Help me plan a new feature for this project."

Notice what happens. Claude will likely ask clarifying questions or make generic suggestions. Observe the output — is it specific to your project, or could it apply to any codebase?

**Step 2: Task With CLAUDE.md**

Restore CLAUDE.md and ask the exact same question:

> "Help me plan a new feature for this project."

**Reflection:**
- Did Claude follow the business analysis framework unprompted?
- Did it reference your specific tech stack or conventions?
- Did the output quality differ? How?
- What would you improve about your CLAUDE.md to make Claude even more helpful?

---

## Part 4: Reflection and Self-Assessment

Before moving on, ask yourself:

- **What surprised you** about how Claude read and used CLAUDE.md?
- **Where did it fall short?** (Claude will still have questions sometimes — that's normal.)
- **How would you change your CLAUDE.md** after this exercise?

---

## Optional: Going Further

- Add domain-specific vocabulary or acronyms to your CLAUDE.md and test if Claude uses them naturally.
- Create a CLAUDE.md for a different project and compare how differently Claude behaves.
- Write a CLAUDE.md for a hypothetical project and give Claude a task in it — how much scaffolding does it need before Claude acts like an expert?

---

**Module Check:** What is the main purpose of a CLAUDE.md file?
