const { execSync } = require('node:child_process');
const { readFileSync, writeFileSync, existsSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');
const versionPath = resolve(projectRoot, 'version.js');
const includeDirty = !process.argv.includes('--clean');

function git(command) {
    return execSync(command, {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
}

function getVersionString() {
    try {
        const commitDate = git('git show -s --format=%cs HEAD');
        const shortHash = git('git rev-parse --short HEAD');
        const dirty = includeDirty && git('git status --porcelain --untracked-files=no');
        return dirty ? `${commitDate} ${shortHash} dirty` : `${commitDate} ${shortHash}`;
    } catch (error) {
        const fallbackDate = new Date().toISOString().slice(0, 10);
        return `${fallbackDate} nogit`;
    }
}

function buildVersionSource(version) {
    return `(function () {\n` +
        `    var VERSION = ${JSON.stringify(version)};\n` +
        `    var BADGE_ID = 'course-version-badge';\n\n` +
        `    window.COURSE_FRONTEND_VERSION = VERSION;\n\n` +
        `    if (typeof console !== 'undefined' && console.info) {\n` +
        `        console.info('[course-version]', VERSION, window.location.pathname);\n` +
        `    }\n\n` +
        `    if (typeof document === 'undefined') return;\n` +
        `    if (document.getElementById(BADGE_ID)) return;\n\n` +
        `    var style = document.createElement('style');\n` +
        `    style.textContent =\n` +
        `        '#' + BADGE_ID + ' {' +\n` +
        `        '  position: fixed;' +\n` +
        `        '  top: 10px;' +\n` +
        `        '  right: 10px;' +\n` +
        `        '  z-index: 9997;' +\n` +
        `        '  padding: 0.22rem 0.45rem;' +\n` +
        `        '  border-radius: 999px;' +\n` +
        `        '  background: rgba(26, 26, 26, 0.72);' +\n` +
        `        '  color: #fff;' +\n` +
        `        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;' +\n` +
        `        '  font-size: 0.65rem;' +\n` +
        `        '  font-weight: 700;' +\n` +
        `        '  letter-spacing: 0.04em;' +\n` +
        `        '  box-shadow: 0 2px 8px rgba(0,0,0,0.12);' +\n` +
        `        '  pointer-events: none;' +\n` +
        `        '  user-select: text;' +\n` +
        `        '}' +\n` +
        `        '@media (max-width: 480px) {' +\n` +
        `        '  #' + BADGE_ID + ' {' +\n` +
        `        '    top: 8px;' +\n` +
        `        '    right: 8px;' +\n` +
        `        '    font-size: 0.6rem;' +\n` +
        `        '    padding: 0.2rem 0.4rem;' +\n` +
        `        '  }' +\n` +
        `        '}';\n` +
        `    document.head.appendChild(style);\n\n` +
        `    var badge = document.createElement('div');\n` +
        `    badge.id = BADGE_ID;\n` +
        `    badge.textContent = VERSION;\n` +
        `    badge.setAttribute('aria-label', 'Frontend version ' + VERSION);\n` +
        `    document.body.appendChild(badge);\n` +
        `}());\n`;
}

const version = getVersionString();
const nextSource = buildVersionSource(version);
const currentSource = existsSync(versionPath) ? readFileSync(versionPath, 'utf8') : null;

if (currentSource !== nextSource) {
    writeFileSync(versionPath, nextSource, 'utf8');
}

process.stdout.write(`${version}\n`);
