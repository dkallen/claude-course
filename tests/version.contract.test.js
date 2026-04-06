const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, statSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');
const versionSource = readFileSync(resolve(projectRoot, 'version.js'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'));
const writeVersionSource = readFileSync(resolve(projectRoot, 'scripts', 'write-version.js'), 'utf8');

function walkHtmlFiles(dirPath, results = []) {
    for (const entry of readdirSync(dirPath)) {
        const fullPath = resolve(dirPath, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            walkHtmlFiles(fullPath, results);
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

describe('frontend version stamp contract', () => {
    test('version.js exposes a single shared frontend version identifier', () => {
        assert.match(versionSource, /COURSE_FRONTEND_VERSION/);
        assert.match(versionSource, /\d{4}-\d{2}-\d{2} [0-9a-f]{7,}( dirty)?/);
    });

    test('version automation is driven from git metadata before start and test commands', () => {
        assert.match(writeVersionSource, /git show -s --format=%cs HEAD/);
        assert.match(writeVersionSource, /git rev-parse --short HEAD/);
        assert.equal(packageJson.scripts['write:version'], 'node scripts/write-version.js');
        assert.ok(packageJson.scripts.start.includes('npm run write:version'));
        assert.ok(packageJson.scripts['test:node'].includes('npm run write:version'));
        assert.ok(packageJson.scripts['test:smoke'].includes('npm run write:version'));
    });

    test('learner-facing html entry points load version.js', () => {
        const htmlFiles = [
            resolve(projectRoot, 'index.html'),
            resolve(projectRoot, 'course.html'),
            ...walkHtmlFiles(resolve(projectRoot, 'subjects')),
            ...walkHtmlFiles(resolve(projectRoot, 'docs/syllabus'))
        ];

        for (const filePath of htmlFiles) {
            const html = readFileSync(filePath, 'utf8');
            assert.ok(
                html.includes('version.js'),
                `${filePath} must include version.js so the running frontend version is visible`
            );
        }
    });
});
