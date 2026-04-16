window.COURSE_DATA = {
  defaultSubject: "claude-code",
  subjects: [
    {
      slug: "claude-code",
      title: "From Concept to Delivery with Claude Code",
      shortTitle: "Claude Code",
      subtitle: "A Practitioner's Course",
      description: "Learn to use Claude Code as a thinking and building partner across the full product lifecycle.",
      syllabusHref: "docs/syllabus/claude-code-course-syllabus.html",
      progressPrefix: "claude-code-course",
      welcomeTitle: "Welcome back, David.",
      welcomeDescription: "Pick up where you left off, or start from the beginning. Choose any module to see its materials. Your progress is saved per subject.",
      startModule: 1,
      sections: {
        1: "Working at Your Desk",
        2: "Working When You're Away",
        3: "Shipping"
      },
      modules: [
        { num: 1, name: "Orientation — What Claude Code Actually Is", section: 1,
          check: "Can you explain to someone else <em>why</em> Claude Code sometimes nails a task and sometimes misses completely? If your answer touches on the jagged frontier, context window limits, and the agentic loop's self-correction boundaries — you're ready for Module 2.",
          phases: [
            { label: "Phase 1", title: "Learn the concepts", desc: "Start here. Read the core lesson, then scan the diagram for a visual anchor.", items: [0, 1] },
            { label: "Phase 2", title: "Explore interactively", desc: "Dig into each concept at your own pace.", items: [2, 3] },
            { label: "Phase 3", title: "Practice with real tools", desc: "Hands-on time. Open Claude Code and work through the guided exercise.", items: [4] },
            { label: "Phase 4", title: "Test your understanding", desc: "See how well the concepts stuck.", items: [5, 6] },
            { label: "Phase 5", title: "Bookmark for later", desc: "Reference materials you'll come back to.", items: [7, 8] }
          ],
          resources: [
            { id: "m1-lesson", name: "Lesson Content", href: "subjects/claude-code/module-1-lesson.html", type: "read" },
            { id: "m1-diagram", name: "Concept Map", href: "subjects/claude-code/module-1-diagram.svg", type: "visual" },
            { id: "m1-explorer", name: "Concept Explorer", href: "subjects/claude-code/module-1-explorer.html", type: "interactive" },
            { id: "m1-slides", name: "Slide Walkthrough", href: "subjects/claude-code/module-1-slides.html", type: "visual" },
            { id: "m1-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-1-exercise.html", type: "exercise" },
            { id: "m1-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-1-quiz.html", type: "interactive" },
            { id: "m1-flashcards", name: "Flashcards", href: "subjects/claude-code/module-1-flashcards.html", type: "interactive" },
            { id: "m1-reference", name: "Quick Reference", href: "subjects/claude-code/module-1-reference.html", type: "reference" },
            { id: "m1-capabilities", name: "Capability Matrix", href: "subjects/claude-code/module-1-capabilities.html", type: "reference" }
          ]},
        { num: 2, name: "CLAUDE.md — Teaching Claude Who You Are", section: 1,
          check: "Does Claude Code follow your conventions without you having to remind it every time? If your CLAUDE.md is working, Claude should apply your framework, follow your coding standards, and respect your preferences — automatically, session after session. If yes, you're ready for Module 3.",
          phases: [
            { label: "Phase 1", title: "Learn the concepts", desc: "Read the core lesson, then study the hierarchy diagram. This gives you the full picture of what CLAUDE.md does and how the three levels work together.", items: [0, 1] },
            { label: "Phase 2", title: "Build interactively", desc: "Use the template builder to construct your own CLAUDE.md step by step. Theory becomes practice.", items: [2] },
            { label: "Phase 3", title: "Practice with real tools", desc: "Open Claude Code and test your CLAUDE.md in the real environment.", items: [3] },
            { label: "Phase 4", title: "Test your understanding", desc: "Check how well the concepts stuck. The quiz tests judgment; the flashcards lock in terminology.", items: [4, 5] },
            { label: "Phase 5", title: "Bookmark for later", desc: "The reference card is a quick cheat sheet for when you're writing or reviewing a CLAUDE.md.", items: [6] }
          ],
          resources: [
            { id: "m2-lesson", name: "Lesson Content", href: "subjects/claude-code/module-2-lesson.html", type: "read" },
            { id: "m2-diagram", name: "Hierarchy Diagram", href: "subjects/claude-code/module-2-diagram.svg", type: "visual" },
            { id: "m2-builder", name: "CLAUDE.md Builder", href: "subjects/claude-code/module-2-builder.html", type: "interactive" },
            { id: "m2-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-2-exercise.html", type: "exercise" },
            { id: "m2-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-2-quiz.html", type: "interactive" },
            { id: "m2-flashcards", name: "Flashcards", href: "subjects/claude-code/module-2-flashcards.html", type: "interactive" },
            { id: "m2-reference", name: "Quick Reference", href: "subjects/claude-code/module-2-reference.html", type: "reference" }
          ]},
        { num: 3, name: "The Art of the Prompt — From Ramble to Precision", section: 1,
          check: "Can you calibrate your prompting style to the complexity of the task — loose for exploration, tight for execution? If yes, you're ready for Module 4.",
          phases: [
            { label: "Phase 1", title: "Learn the concepts", desc: "Start with the core lesson, then scan the prompt spectrum to orient yourself.", items: [0, 1] },
            { label: "Phase 2", title: "Calibrate interactively", desc: "Use the prompt calibrator to turn fuzzy intent into a better prompt shape.", items: [2] },
            { label: "Phase 3", title: "Practice with real tools", desc: "Run the same task through Claude twice: once loose, once structured, then compare.", items: [3] },
            { label: "Phase 4", title: "Test your understanding", desc: "Use the quiz for judgment and the flashcards for terms and heuristics.", items: [4, 5] },
            { label: "Phase 5", title: "Bookmark for later", desc: "Keep the prompt reference nearby when you're switching between exploration and execution.", items: [6] }
          ],
          resources: [
            { id: "m3-lesson", name: "Lesson Content", href: "subjects/claude-code/module-3-lesson.html", type: "read" },
            { id: "m3-spectrum", name: "Prompt Spectrum", href: "subjects/claude-code/module-3-spectrum.html", type: "visual" },
            { id: "m3-calibrator", name: "Prompt Calibrator", href: "subjects/claude-code/module-3-calibrator.html", type: "interactive" },
            { id: "m3-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-3-exercise.html", type: "exercise" },
            { id: "m3-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-3-quiz.html", type: "interactive" },
            { id: "m3-flashcards", name: "Flashcards", href: "subjects/claude-code/module-3-flashcards.html", type: "interactive" },
            { id: "m3-reference", name: "Quick Reference", href: "subjects/claude-code/module-3-reference.html", type: "reference" }
          ]},
        { num: 4, name: "Idea Refinement — Using Claude Code to Think", section: 1,
          check: "Do you have a clear written brief with goals, problems, aligned solutions, risks with mitigations, and explicit scope? If yes, you're ready for Module 5.",
          phases: [
            { label: "Phase 1", title: "Learn the framework", desc: "Read the lesson, then scan the framework map so the relationships are visually clear.", items: [0, 1] },
            { label: "Phase 2", title: "Practice the analysis", desc: "Use the exercise to turn one real idea into a structured brief.", items: [2] },
            { label: "Phase 3", title: "Pressure-test your understanding", desc: "Use the quiz and reference to strengthen judgment before moving into architecture.", items: [3, 4] }
          ],
          resources: [
            { id: "m4-lesson", name: "Lesson Content", href: "subjects/claude-code/module-4-lesson.html", type: "read" },
            { id: "m4-framework", name: "Framework Map", href: "subjects/claude-code/module-4-framework.html", type: "visual" },
            { id: "m4-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-4-exercise.html", type: "exercise" },
            { id: "m4-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-4-quiz.html", type: "interactive" },
            { id: "m4-reference", name: "Quick Reference", href: "subjects/claude-code/module-4-reference.html", type: "reference" }
          ]},
        { num: 5, name: "Architecture — Designing Before Building", section: 1,
          check: "Do you have a proposed structure with named components, clear responsibilities, major interfaces, and explicit tradeoffs before implementation starts? If yes, you're ready for Module 6.",
          phases: [
            { label: "Phase 1", title: "Learn the architecture lens", desc: "Read the lesson and scan the architecture map so you can distinguish structure from implementation detail.", items: [0, 1] },
            { label: "Phase 2", title: "Practice decomposition", desc: "Take one refined idea and turn it into a first-pass architecture with boundaries and tradeoffs.", items: [2] },
            { label: "Phase 3", title: "Pressure-test your structure", desc: "Use the quiz and reference to sharpen your judgment before you start coding.", items: [3, 4] }
          ],
          resources: [
            { id: "m5-lesson", name: "Lesson Content", href: "subjects/claude-code/module-5-lesson.html", type: "read" },
            { id: "m5-architecture", name: "Architecture Map", href: "subjects/claude-code/module-5-architecture.html", type: "visual" },
            { id: "m5-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-5-exercise.html", type: "exercise" },
            { id: "m5-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-5-quiz.html", type: "interactive" },
            { id: "m5-reference", name: "Quick Reference", href: "subjects/claude-code/module-5-reference.html", type: "reference" }
          ]},
        { num: 6, name: "Test-Driven Development with Claude Code", section: 1,
          check: "Can you turn plain-English requirements into failing tests first, catch weak tests before implementation, and use the red-green-refactor loop to drive a real change? If yes, you're ready for Module 7.",
          phases: [
            { label: "Phase 1", title: "Learn the cycle", desc: "Read the lesson and study the red-green-refactor map so you know what TDD is doing beyond ritual.", items: [0, 1] },
            { label: "Phase 2", title: "Design tests before code", desc: "Use the workbench and exercise to turn one real requirement into a test-first implementation flow.", items: [2, 3] },
            { label: "Phase 3", title: "Pressure-test your judgment", desc: "Use the quiz, flashcards, and reference to sharpen your sense of good tests versus empty tests.", items: [4, 5, 6] }
          ],
          resources: [
            { id: "m6-lesson", name: "Lesson Content", href: "subjects/claude-code/module-6-lesson.html", type: "read" },
            { id: "m6-cycle", name: "Red-Green-Refactor Map", href: "subjects/claude-code/module-6-cycle.html", type: "visual" },
            { id: "m6-workbench", name: "Spec-to-Tests Workbench", href: "subjects/claude-code/module-6-workbench.html", type: "interactive" },
            { id: "m6-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-6-exercise.html", type: "exercise" },
            { id: "m6-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-6-quiz.html", type: "interactive" },
            { id: "m6-flashcards", name: "Flashcards", href: "subjects/claude-code/module-6-flashcards.html", type: "interactive" },
            { id: "m6-reference", name: "Quick Reference", href: "subjects/claude-code/module-6-reference.html", type: "reference" }
          ]},
        { num: 7, name: "Skills — Reusable Intelligence", section: 1,
          check: "Can you write a skill, control whether Claude or you invokes it, pass arguments to it, and explain the difference between the description and the body? If yes, you're ready for Module 8.",
          phases: [
            { label: "Phase 1", title: "Understand the mechanism", desc: "Read the lesson to understand what skills are, how they differ from CLAUDE.md, and what the key authoring decisions are.", items: [0] },
            { label: "Phase 2", title: "Write and test your own skill", desc: "Build a skill for a task you repeat. Test manual invocation, then confirm auto-invocation works.", items: [1] },
            { label: "Phase 3", title: "Lock in the concepts", desc: "Use the quiz, flashcards, and reference to sharpen the judgment calls that matter in practice.", items: [2, 3, 4] }
          ],
          resources: [
            { id: "m7-lesson", name: "Lesson Content", href: "subjects/claude-code/module-7-lesson.html", type: "read" },
            { id: "m7-exercise", name: "Guided Exercise", href: "subjects/claude-code/module-7-exercise.html", type: "exercise" },
            { id: "m7-quiz", name: "Scenario Quiz", href: "subjects/claude-code/module-7-quiz.html", type: "interactive" },
            { id: "m7-flashcards", name: "Flashcards", href: "subjects/claude-code/module-7-flashcards.html", type: "interactive" },
            { id: "m7-reference", name: "Quick Reference", href: "subjects/claude-code/module-7-reference.html", type: "reference" }
          ]},
        { num: 8, name: "MCP — Connecting Claude Code to the World", section: 1, resources: [] },
        { num: 9, name: "Multi-Agent Workflows — Orchestration at Scale", section: 1, resources: [] },
        { num: 10, name: "Scheduled Tasks — Putting Claude on Autopilot", section: 2, resources: [] },
        { num: 11, name: "Remote Control — Claude Code from Your Pocket", section: 2, resources: [] },
        { num: 12, name: "Channels — Claude Code Meets You Where You Are", section: 2, resources: [] },
        { num: 13, name: "Delivery — From Working Code to Shipped Product", section: 3, resources: [] },
        { num: "C", name: "Capstone: Build Something Real", section: 3, resources: [] }
      ]
    },
    {
      slug: "openai-codex",
      title: "Working Effectively with OpenAI Codex",
      shortTitle: "OpenAI Codex",
      subtitle: "A Practitioner's Course",
      description: "Learn to work with the Codex app and the VS Code extension using a browser-native, multi-subject course shell.",
      syllabusHref: "subjects/codex/codex-course-syllabus.html",
      progressPrefix: "openai-codex-course",
      welcomeTitle: "OpenAI Codex Prototype",
      welcomeDescription: "This subject is in prototype form. Module 1 is drafted so you can evaluate the second-subject shape before the rest of the course is built.",
      startModule: 1,
      sections: {
        1: "Core Workflow",
        2: "Advanced Workflow",
        3: "Capstone"
      },
      modules: [
        { num: 1, name: "Orientation — What Codex Is and Where It Runs", section: 1,
          check: "Can you explain the difference between local and cloud Codex, between sandboxing and approvals, and between durable setup and one-off prompting? If yes, you're ready for Module 2.",
          phases: [
            { label: "Phase 1", title: "Learn the mental model", desc: "Start with the lesson, then review the subject-level syllabus if you want the broader shape.", items: [0, 1] }
          ],
          resources: [
            { id: "m1-lesson", name: "Lesson Content", href: "subjects/codex/codex-module-1-lesson.html", type: "read" },
            { id: "m1-syllabus", name: "Course Syllabus", href: "subjects/codex/codex-course-syllabus.html", type: "reference" }
          ]},
        { num: 2, name: "AGENTS.md — Teaching Codex How You Work", section: 1,
          check: "Does Codex reliably inherit your repo conventions and verification rules without you restating them in every task? If yes, move on.",
          phases: [
            { label: "Phase 1", title: "Learn the structure", desc: "Read the lesson and review the quick reference so the discovery chain and purpose are clear.", items: [0, 1] },
            { label: "Phase 2", title: "Practice in a repo", desc: "Write and test an AGENTS.md on a real project.", items: [2] },
            { label: "Phase 3", title: "Reinforce", desc: "Use the quiz for judgment and the flashcards to lock in the durable-vs-one-off distinction.", items: [3, 4] }
          ],
          resources: [
            { id: "m2-lesson", name: "Lesson Content", href: "subjects/codex/codex-module-2-lesson.html", type: "read" },
            { id: "m2-reference", name: "Quick Reference", href: "subjects/codex/codex-module-2-reference.html", type: "reference" },
            { id: "m2-exercise", name: "Guided Exercise", href: "subjects/codex/codex-module-2-exercise.html", type: "exercise" },
            { id: "m2-quiz", name: "Scenario Quiz", href: "subjects/codex/codex-module-2-quiz.html", type: "interactive" },
            { id: "m2-flashcards", name: "Flashcards", href: "subjects/codex/codex-module-2-flashcards.html", type: "interactive" }
          ]},
        { num: 3, name: "Prompting and Planning", section: 1,
          check: "Can you tell when to ask Codex to plan first, when to stay direct, and how to define success so the task does not drift? If yes, you're ready for Module 4.",
          phases: [
            { label: "Phase 1", title: "Learn the mental model", desc: "Read the lesson and review the planning ladder so you know when direct prompting stops being enough.", items: [0, 1] },
            { label: "Phase 2", title: "Practice prompt shaping", desc: "Take one real task and rewrite it into a stronger Codex request with plan, constraints, and done-when.", items: [2] },
            { label: "Phase 3", title: "Reinforce", desc: "Use the quiz to distinguish fast-path tasks from plan-first work, then use flashcards to drill the planning ladder.", items: [3, 4] }
          ],
          resources: [
            { id: "m3-lesson", name: "Lesson Content", href: "subjects/codex/codex-module-3-lesson.html", type: "read" },
            { id: "m3-ladder", name: "Planning Ladder", href: "subjects/codex/codex-module-3-ladder.html", type: "visual" },
            { id: "m3-exercise", name: "Guided Exercise", href: "subjects/codex/codex-module-3-exercise.html", type: "exercise" },
            { id: "m3-quiz", name: "Scenario Quiz", href: "subjects/codex/codex-module-3-quiz.html", type: "interactive" },
            { id: "m3-flashcards", name: "Flashcards", href: "subjects/codex/codex-module-3-flashcards.html", type: "interactive" }
          ]},
        { num: 4, name: "Permissions and Sandboxing", section: 1,
          check: "Can you choose the right sandbox mode and approval policy for a task without defaulting straight to full access? If yes, you're ready for Module 5.",
          phases: [
            { label: "Phase 1", title: "Learn the operating model", desc: "Read the lesson and study the sandbox matrix so you can separate technical boundaries from approval behavior.", items: [0, 1] },
            { label: "Phase 2", title: "Choose modes deliberately", desc: "Use the mode chooser and exercise to map real tasks to the right permissions profile.", items: [2, 3] },
            { label: "Phase 3", title: "Reinforce", desc: "Use the quiz, flashcards, and reference to lock in the safe default patterns.", items: [4, 5, 6] }
          ],
          resources: [
            { id: "m4-lesson", name: "Lesson Content", href: "subjects/codex/codex-module-4-lesson.html", type: "read" },
            { id: "m4-matrix", name: "Sandbox Matrix", href: "subjects/codex/codex-module-4-matrix.html", type: "visual" },
            { id: "m4-chooser", name: "Mode Chooser", href: "subjects/codex/codex-module-4-chooser.html", type: "interactive" },
            { id: "m4-exercise", name: "Guided Exercise", href: "subjects/codex/codex-module-4-exercise.html", type: "exercise" },
            { id: "m4-quiz", name: "Scenario Quiz", href: "subjects/codex/codex-module-4-quiz.html", type: "interactive" },
            { id: "m4-flashcards", name: "Flashcards", href: "subjects/codex/codex-module-4-flashcards.html", type: "interactive" },
            { id: "m4-reference", name: "Quick Reference", href: "subjects/codex/codex-module-4-reference.html", type: "reference" }
          ]},
        { num: 5, name: "VS Code Workflows", section: 1, resources: [] },
        { num: 6, name: "Testing, Review, and Git Discipline", section: 1, resources: [] },
        { num: 7, name: "config.toml and Personal Defaults", section: 2, resources: [] },
        { num: 8, name: "MCP — Giving Codex External Context", section: 2, resources: [] },
        { num: 9, name: "Skills — Reusable Workflows", section: 2, resources: [] },
        { num: 10, name: "Automations and Longer-Running Work", section: 2, resources: [] },
        { num: 11, name: "Codex Cloud and Delegated Tasks", section: 2, resources: [] },
        { num: 12, name: "Capstone", section: 3, resources: [] }
      ]
    }
  ]
};
