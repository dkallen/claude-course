const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, statSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');

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

describe('feedback widget page contract', () => {
    test('pages that load feedback-widget.js expose page context and Supabase bootstrap', () => {
        const htmlFiles = [
            ...walkHtmlFiles(resolve(projectRoot, 'subjects')),
            ...walkHtmlFiles(resolve(projectRoot, 'docs/syllabus')),
            resolve(projectRoot, 'index.html'),
            resolve(projectRoot, 'course.html')
        ];

        for (const filePath of htmlFiles) {
            const html = readFileSync(filePath, 'utf8');
            if (!html.includes('feedback-widget.js')) continue;

            assert.match(html, /data-subject-id="[^"]+"/, `${filePath} must set data-subject-id`);
            assert.match(html, /data-module="[^"]+"/, `${filePath} must set data-module`);
            assert.match(html, /data-resource-id="[^"]+"/, `${filePath} must set data-resource-id`);
            assert.ok(
                html.includes('@supabase/supabase-js@2'),
                `${filePath} must load the Supabase CDN script before feedback-widget.js`
            );
            assert.ok(
                html.includes('supabase-client.js'),
                `${filePath} must load supabase-client.js before feedback-widget.js`
            );
            assert.ok(
                html.indexOf('supabase-client.js') < html.indexOf('feedback-widget.js'),
                `${filePath} must load supabase-client.js before feedback-widget.js`
            );
        }
    });
});
