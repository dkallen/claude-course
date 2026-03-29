# Module 1: Guided Exercise Walkthrough

**Orientation — What Claude Code Actually Is**

---

## Overview

This exercise has three parts. You'll install (or verify) Claude Code, let it explore a real project, and then deliberately push it into territory where it struggles. The goal isn't to complete a deliverable — it's to build intuition about the four concepts from this module.

**Time estimate:** 20–30 minutes

---

## Before You Start

You need:

- A Claude subscription (Pro or Max) with Claude Code access
- A terminal, VS Code, or the Claude desktop app
- A small project folder to point Claude Code at — ideally something with at least a few files. If you don't have one handy, clone any small open-source project. Something like a to-do app, a personal site, or a utility library works well. Complexity doesn't matter; we just need files for Claude to read.

---

## Part 1: Setup Verification

**Goal:** Confirm Claude Code is working and you can interact with it.

**Step 1.** Open your chosen environment:

- **Terminal:** Open a terminal and type `claude`. You should see a conversational prompt.
- **VS Code:** Open the Claude Code sidebar panel.
- **Desktop (Cowork):** Open Claude desktop, select your project folder as the workspace.

**Step 2.** Give Claude a simple greeting. Something like:

> Hi, what can you see in this project?

**Step 3.** Observe the response.

**Checkpoint:** Did Claude Code read your project files and describe what it found? If yes, you're set up and the agentic loop is running — it just completed a Read → Plan → Act cycle right in front of you.

If something went wrong (Claude can't see your files, the command isn't found, etc.), troubleshoot now before moving on. The rest of the exercise requires a working setup.

---

## Part 2: Exploring the Agentic Loop

**Goal:** Watch Claude Code go through the full read-plan-act-verify loop on a real task.

**Step 1.** Give Claude Code a task that requires understanding your codebase and making a change. For example:

> Add a code comment at the top of each file explaining what that file does.

Or, if you prefer something slightly more involved:

> Create a README.md that describes this project based on the code you can see.

**Step 2.** Watch what happens. Pay attention to:

- **Read:** Does it examine multiple files before acting? Can you see it gathering context?
- **Plan:** Does it describe its approach before diving in, or does it jump straight to action?
- **Act:** What actions does it take? File edits? File creation? Terminal commands?
- **Verify:** Does it check its own work? Does it run any tests or re-read files after editing?

**Step 3.** If Claude makes an error during the task, don't intervene immediately. Watch whether it self-corrects. If it does, note how the loop works: it reads the error, plans a fix, acts on it, and verifies again.

**Reflection questions:**

- Could you identify each phase of the loop as it happened?
- Did the self-correction loop kick in? What triggered it?
- Was there a point where you felt Claude was refining a bad approach rather than stepping back? (This is common — note it for future reference.)

---

## Part 3: Finding the Jagged Edge

**Goal:** Deliberately ask Claude Code something it can't do well, and notice the contrast with Part 2.

**Step 1.** Ask Claude Code a question that requires knowledge *beyond* what's in your codebase. Choose one of these (or make up your own):

> What do our customers think about this feature?

> Is this architecture the right choice for our scale requirements next year?

> What's the business case for building this?

**Step 2.** Observe how Claude Code responds. It will probably give you *an* answer — but notice the quality. Is it making things up? Is it hedging? Is it giving generic advice that could apply to any project?

**Step 3.** Now ask something that requires judgment or taste:

> Is this code well-written? Not "does it work" — is it *good*?

> If you were redesigning this from scratch, what would you change?

**Step 4.** Compare Claude's response here to what it did in Part 2. In Part 2, it was working with concrete files, clear patterns, and verifiable outputs. Here, it's operating near — or beyond — the jagged capability frontier.

**Reflection questions:**

- What was the quality difference between the code-exploration task (Part 2) and the knowledge/judgment task (Part 3)?
- Did Claude Code signal uncertainty, or did it respond with the same confidence level regardless?
- Can you start to feel where the "jagged edge" is for your specific use case?

---

## Part 4: Reflection and Self-Assessment

Take a few minutes to write down (in your own words, not Claude's) your answers to these questions:

1. **The Agentic Loop:** In your own words, what are the four phases? When does the self-correction loop help, and when does it not?

2. **Environments:** Which environment did you use for this exercise? What context did Claude have access to? What would have been different in another environment?

3. **Context Windows:** You did this exercise in one session. If you'd done a much longer session — say, an hour of back-and-forth — what would you expect to start happening? Why?

4. **The Jagged Frontier:** Based on what you saw, name one thing Claude Code was clearly good at and one thing it clearly wasn't. How would you know the difference in advance next time?

---

## Module 1 Check

Can you explain to someone else *why* Claude Code sometimes nails a task and sometimes misses completely?

If your answer includes:

- The jagged capability frontier (pattern-matched tasks vs. novel/judgment tasks)
- Context window limitations (compaction and forgetting in long sessions)
- The agentic loop (self-correction has limits — it refines within its approach, not across approaches)

Then you're ready for Module 2: CLAUDE.md — Teaching Claude Who You Are.

---

## Optional: Going Further

If you want to deepen your understanding before moving on:

- Try the same task in **two different environments** (e.g., terminal and desktop). Notice what's the same and what's different about Claude's behavior.
- Start a **long conversation** with Claude Code (15+ back-and-forth exchanges). Watch for signs of compaction — does it start forgetting or contradicting earlier instructions?
- Ask Claude Code to **explain its own limitations.** Compare what it says to what you experienced. Does it have good self-awareness about the jagged frontier?
