# Module 2: CLAUDE.md — Teaching Claude Who You Are

**From Concept to Delivery with Claude Code — A Practitioner's Course**

---

## Why This Module Matters

In Module 1, we talked about context window constraints and how Claude compresses information to stay in scope. CLAUDE.md solves a fundamental problem: every new session with Claude Code starts fresh. Without explicit instruction, Claude has no way to know your project conventions, your decision-making framework, or what you actually care about.

CLAUDE.md is how you teach Claude who you are, once, so it sticks across every interaction in your project. It's the difference between explaining your approach every time and having Claude already know what you value.

---

## 1. What CLAUDE.md Actually Is

CLAUDE.md is a plain text file that Claude reads at the beginning of every session. It contains instructions, context, and conventions specific to your work. It's not a README, not documentation, not a config file — it's a conversation starter that says "here's how we work."

CLAUDE.md lives in three possible locations, each with different scope:

- **`~/.claude/CLAUDE.md`** — Global instructions for all your projects. Things like "I prefer concise summaries" or "always check this dependency" live here.
- **`project-root/CLAUDE.md`** — Project-level instructions. This is where most of your custom guidance lives.
- **`folder/CLAUDE.md`** — Folder-level instructions for a specific subdirectory. Useful when one part of your project has different rules.

Claude reads all three in order and applies them hierarchically. Folder-level overrides project-level, which overrides global. This lets you set sensible defaults globally and override them where needed.

---

## 2. Hierarchy and Scope

Think of CLAUDE.md as nested instruction sets. You might have a global instruction like "Always suggest tests when proposing code changes," but in your `scripts/` folder, you have a CLAUDE.md that says "Skip test suggestions for one-off utility scripts."

The hierarchy exists because different parts of your codebase have different needs. Your main application and your build scripts don't operate under the same constraints. CLAUDE.md lets you be specific without repeating yourself.

**Pro tip:** Don't abuse the hierarchy. If you find yourself creating CLAUDE.md files in every folder, you're probably being too granular. Use folder-level instructions only when the rules genuinely differ.

---

## 3. CLAUDE.md vs. Your Actual Prompt

Here's a common mistake: putting everything in CLAUDE.md and nothing in your actual prompt.

**CLAUDE.md should contain:**
- Project conventions and standards
- Your decision-making framework (like Goals, Problems, Solutions, Risks, Scope)
- Tools and patterns you always use
- Constraints that apply across most work
- What NOT to do

**Your prompt should contain:**
- The specific task you're asking for right now
- Context that matters for this particular request
- Details about what "done" looks like for this task

If your CLAUDE.md reads like a detailed task description, it's too specific. If your prompt reads like general philosophy, it belongs in CLAUDE.md.

---

## 4. Writing Effective CLAUDE.md

Good CLAUDE.md files are opinionated but not overwhelming. Here's what works:

**Start with your framework.** If you use Goals-Problems-Solutions-Risks-Scope, put that in CLAUDE.md. Explain what each means in your context. When Claude understands your analytical structure, every task benefits.

**State constraints clearly.** "When proposing infrastructure changes, always flag security implications" is better than "be careful about security." Specific constraints are actionable.

**Give examples.** Show Claude a good code comment, a good commit message, a good task breakdown. One concrete example teaches more than five abstract rules.

**List the tools you use.** If you always want Claude to check certain files first, use specific libraries, or follow certain practices — list them. "Always run tests using pytest" is more useful than "make sure it works."

**Say what to ignore.** This is where `.claudeignore` comes in. If you have massive vendor folders, auto-generated files, or logs that clutter the context, tell Claude to skip them. One line in `.claudeignore` saves context window space on every session.

---

## 5. Anti-Patterns

CLAUDE.md files that fail share common traits:

**Too long.** If your CLAUDE.md is longer than your actual codebase documentation, something is wrong. You're using it as a manual when it should be a guide. Aim for 50-200 lines.

**Too vague.** "Be helpful" and "write good code" are not instructions. Vagueness forces Claude to guess what you want, and guessing wastes the session.

**Contradictory.** If your CLAUDE.md says "always ask before making changes" but also says "be autonomous and don't ask for permission," Claude will get confused. Be consistent.

**Updating constantly.** If you're rewriting CLAUDE.md every week, either you haven't found your actual principles yet, or you're using it for task-specific guidance that belongs in prompts. Settle on your conventions and leave them alone.

---

## 6. The Compaction Problem Solved

Remember from Module 1: every session with Claude Code has a limited context window. You can't paste your entire codebase into every conversation.

CLAUDE.md doesn't hold the full codebase, but it holds the *meta* — the rules, patterns, and values that let Claude make good decisions about what to look for and how to approach problems. By the time Claude starts working on your actual task, it already knows how you think.

This is why CLAUDE.md gets re-read at the start of every session. It's the skeleton key that lets you work efficiently across sessions without restating everything.

---

## Tying It Together

CLAUDE.md is your instruction set for how Claude should think and work within your project. It's not documentation, not a task list, and not a replacement for good prompts. It's the connective tissue between you and Claude's understanding of what matters.

Write it once. Update it rarely. Use it to capture what you actually believe about good work, good code, and good thinking. Then, when you start a new session, Claude already knows who you are.

---

## Check

Think about a project you're currently working on. What are three things Claude should know about how you work that you find yourself repeating in almost every interaction? Those three things belong in your CLAUDE.md.

