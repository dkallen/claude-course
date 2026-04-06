const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, statSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');
const versionSource = readFileSync(resolve(projectRoot, 'version.js'), 'utf8');

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
        assert.match(versionSource, /v\d{4}\.\d{2}\.\d{2}\.\d+/);
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
