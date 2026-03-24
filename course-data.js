window.COURSE_DATA = {
  defaultSubject: "claude-code",
  subjects: [
    {
      slug: "claude-code",
      title: "From Concept to Delivery with Claude Code",
      shortTitle: "Claude Code",
      subtitle: "A Practitioner's Course",
      description: "Learn to use Claude Code as a thinking and building partner across the full product lifecycle.",
      syllabusHref: "claude-code-course-syllabus.md",
      progressPrefix: "claude-code-course",
      gistDescription: "Claude Code Course Progress",
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
            { name: "Lesson Content", href: "module-1-lesson.html", type: "read" },
            { name: "Concept Map", href: "module-1-diagram.svg", type: "visual" },
            { name: "Concept Explorer", href: "module-1-explorer.html", type: "interactive" },
            { name: "Slide Walkthrough", href: "module-1-slides.html", type: "visual" },
            { name: "Guided Exercise", href: "module-1-exercise.html", type: "exercise" },
            { name: "Scenario Quiz", href: "module-1-quiz.html", type: "interactive" },
            { name: "Flashcards", href: "module-1-flashcards.html", type: "interactive" },
            { name: "Quick Reference", href: "module-1-reference.html", type: "reference" },
            { name: "Capability Matrix", href: "module-1-capabilities.html", type: "reference" }
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
            { name: "Lesson Content", href: "module-2-lesson.html", type: "read" },
            { name: "Hierarchy Diagram", href: "module-2-diagram.svg", type: "visual" },
            { name: "CLAUDE.md Builder", href: "module-2-builder.html", type: "interactive" },
            { name: "Guided Exercise", href: "module-2-exercise.html", type: "exercise" },
            { name: "Scenario Quiz", href: "module-2-quiz.html", type: "interactive" },
            { name: "Flashcards", href: "module-2-flashcards.html", type: "interactive" },
            { name: "Quick Reference", href: "module-2-reference.html", type: "reference" }
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
            { name: "Lesson Content", href: "module-3-lesson.html", type: "read" },
            { name: "Prompt Spectrum", href: "module-3-spectrum.html", type: "visual" },
            { name: "Prompt Calibrator", href: "module-3-calibrator.html", type: "interactive" },
            { name: "Guided Exercise", href: "module-3-exercise.html", type: "exercise" },
            { name: "Scenario Quiz", href: "module-3-quiz.html", type: "interactive" },
            { name: "Flashcards", href: "module-3-flashcards.html", type: "interactive" },
            { name: "Quick Reference", href: "module-3-reference.html", type: "reference" }
          ]},
        { num: 4, name: "Idea Refinement — Using Claude Code to Think", section: 1, resources: [] },
        { num: 5, name: "Architecture — Designing Before Building", section: 1, resources: [] },
        { num: 6, name: "Test-Driven Development with Claude Code", section: 1, resources: [] },
        { num: 7, name: "Skills — Reusable Intelligence", section: 1, resources: [] },
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
      syllabusHref: "codex-course-syllabus.html",
      progressPrefix: "openai-codex-course",
      gistDescription: "OpenAI Codex Course Progress",
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
            { name: "Lesson Content", href: "codex-module-1-lesson.html", type: "read" },
            { name: "Course Syllabus", href: "codex-course-syllabus.html", type: "reference" }
          ]},
        { num: 2, name: "AGENTS.md — Teaching Codex How You Work", section: 1, resources: [] },
        { num: 3, name: "Prompting and Planning", section: 1, resources: [] },
        { num: 4, name: "Permissions and Sandboxing", section: 1, resources: [] },
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
