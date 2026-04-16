# Claude Course Platform

This repository contains the source code and assets for a browser-first, multi-subject interactive learning platform. The platform is currently being prototyped with "From Concept to Delivery with Claude Code" and expanding to include "OpenAI Codex" and other AI-assisted engineering topics.

## Table of Contents
- [Features](#features)
- [Prerequisites / Requirements](#prerequisites--requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Multi-subject Architecture:** Hosts multiple subjects in a single repository, sharing a common course shell.
- **Browser-Native Delivery:** All learner-facing material uses HTML/SVG for seamless desktop and mobile rendering without external plugins.
- **Interactive Resources:** Includes quizzes, flashcards, interactive explorers, and builders.
- **Automated Testing:** Node.js unit/contract testing and Playwright-based smoke testing.
- **Course Shell:** Responsive user interface (`course.html`) adaptable to different subjects via URL parameters.

## Prerequisites / Requirements
- **Node.js:** v18 or higher (recommended)
- **npm:** v9 or higher
- A modern web browser for running the application.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd claude-course
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers (for testing):
   ```bash
   npx playwright install
   ```

## Usage

### Local Development

To serve the course locally, use the provided script or standard local HTTP servers:

```bash
# Example if a serve script is configured in package.json
npm run start
```

*Alternatively, use `npx serve` or any local server:*
```bash
npx serve .
```

Access the application in your browser:
- Login and account recovery: `http://localhost:8080/login.html`
- Protected library landing page: `http://localhost:8080/index.html`
- Claude Code Course: `http://localhost:8080/course.html?subject=claude-code`
- OpenAI Codex Course: `http://localhost:8080/course.html?subject=codex`

All learner-facing pages are protected behind authentication. `login.html` is the only public entry point, and password recovery returns there before redirecting back to the protected page you requested.

## Testing

The project uses a combination of Node.js test runners and Playwright.

Run all tests:
```bash
npm test
```

Run Node-based unit and contract tests only:
```bash
npm run test:node
```

Run Playwright smoke tests against the local dev server:
```bash
npm run test:smoke
```

*Note: Smoke tests use Playwright's bundled Chromium, not the installed Google Chrome application.*

### Localhost Verification
When testing frontend JavaScript changes on `localhost`, ensure caching doesn't mask updates:
1. Open browser DevTools and enable **Disable cache**.
2. Hard refresh the page.
3. If issues persist, verify updates by appending a cache-busting query string (e.g., `?v=123`) to the resource URL.

## Project Structure

- `index.html` / `course.html` - Main application shells.
- `subjects/` - Subject-specific content (HTML, SVG, MD).
  - `claude-code/` - Materials for the Claude Code course.
  - `codex/` - Materials for the OpenAI Codex course.
- `docs/` - Architectural Design Records (ADRs), plans, design specs, and session notes.
- `tests/` - Unit, contract, and Playwright smoke tests.
- `scripts/` - Utility scripts (e.g., version management).
- `*.js` - Core application logic, widget definitions, and data models.

## Contributing

For course learners, please refer to the [User Manual](USER_MANUAL.md) for how to use the course content.

For developers contributing to the platform:
1. Ensure new features are accompanied by appropriate tests in the `tests/` directory.
2. Review design decisions in `docs/03-design/`.
3. Adhere to the testing strategy outlined in `docs/03-design/05-testing-strategy.md`.

## License

See the [LICENSE](LICENSE) file for usage terms.

---
*For learners looking for the course content, please see the [User Manual](USER_MANUAL.md).*
