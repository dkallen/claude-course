const test = require("node:test");
const assert = require("node:assert/strict");
const { readdirSync, readFileSync } = require("node:fs");
const { resolve, join, relative } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const protectedHtmlFiles = [];

function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;

        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
            continue;
        }

        if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

        const relPath = relative(projectRoot, fullPath).replace(/\\/g, "/");
        if (relPath === "login.html") continue;
        protectedHtmlFiles.push(relPath);
    }
}

walk(projectRoot);

test("protected html pages load the shared auth guard", () => {
    for (const relPath of protectedHtmlFiles) {
        const source = readFileSync(resolve(projectRoot, relPath), "utf8");
        assert.match(source, /auth-guard\.js/, `${relPath} should include auth-guard.js`);
        assert.match(source, /auth-account\.js/, `${relPath} should include auth-account.js`);
    }
});
