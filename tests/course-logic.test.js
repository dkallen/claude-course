// Unit tests for pure logic functions in course-logic.js
// Run with: node --test tests/

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { escapeHtml, resourceKey, moduleKey, storageKey, calculateProgress } = require("../course-logic.js");

// --- escapeHtml ---

describe("escapeHtml", () => {
    test("escapes ampersand", () => {
        assert.equal(escapeHtml("a & b"), "a &amp; b");
    });

    test("escapes angle brackets", () => {
        assert.equal(escapeHtml("<script>"), "&lt;script&gt;");
    });

    test("escapes double quotes", () => {
        assert.equal(escapeHtml('say "hello"'), "say &quot;hello&quot;");
    });

    test("handles all special chars together", () => {
        assert.equal(escapeHtml('<a href="x&y">'), '&lt;a href=&quot;x&amp;y&quot;&gt;');
    });

    test("returns empty string unchanged", () => {
        assert.equal(escapeHtml(""), "");
    });

    test("returns plain text unchanged", () => {
        assert.equal(escapeHtml("hello world"), "hello world");
    });

    test("coerces non-string input to string", () => {
        assert.equal(escapeHtml(42), "42");
        assert.equal(escapeHtml(null), "null");
        assert.equal(escapeHtml(undefined), "undefined");
    });

    test("does not double-escape already-escaped text", () => {
        assert.equal(escapeHtml("&amp;"), "&amp;amp;");
    });
});

// --- resourceKey ---

describe("resourceKey", () => {
    test("numeric module and index", () => {
        assert.equal(resourceKey(1, 0), "r1-0");
        assert.equal(resourceKey(3, 4), "r3-4");
    });

    test("string module num (capstone)", () => {
        assert.equal(resourceKey("C", 0), "rC-0");
    });

    test("does not collide with module keys", () => {
        assert.notEqual(resourceKey(1, 0), moduleKey(1));
    });

    test("distinct resources in same module produce distinct keys", () => {
        const keys = [0, 1, 2, 3, 4, 5].map(idx => resourceKey(1, idx));
        assert.equal(new Set(keys).size, keys.length);
    });

    test("same index in different modules produces distinct keys", () => {
        assert.notEqual(resourceKey(1, 0), resourceKey(2, 0));
    });
});

// --- moduleKey ---

describe("moduleKey", () => {
    test("numeric module", () => {
        assert.equal(moduleKey(1), "m1");
        assert.equal(moduleKey(14), "m14");
    });

    test("string module (capstone)", () => {
        assert.equal(moduleKey("C"), "mC");
    });

    test("does not collide with resource keys", () => {
        assert.notEqual(moduleKey(1), resourceKey(1, 0));
    });
});

// --- storageKey ---

describe("storageKey", () => {
    test("builds key from prefix", () => {
        assert.equal(storageKey("claude-code-course"), "claude-code-course-progress");
    });

    test("different prefixes produce different keys", () => {
        assert.notEqual(storageKey("claude-code-course"), storageKey("openai-codex-course"));
    });
});

// --- calculateProgress ---

describe("calculateProgress", () => {
    const modules = [
        { num: 1, name: "A" },
        { num: 2, name: "B" },
        { num: 3, name: "C" },
        { num: 4, name: "D" },
    ];

    test("zero progress", () => {
        const result = calculateProgress(modules, {});
        assert.equal(result.done, 0);
        assert.equal(result.total, 4);
        assert.equal(result.percent, 0);
    });

    test("partial progress", () => {
        const result = calculateProgress(modules, { m1: true, m3: true });
        assert.equal(result.done, 2);
        assert.equal(result.total, 4);
        assert.equal(result.percent, 50);
    });

    test("full progress", () => {
        const result = calculateProgress(modules, { m1: true, m2: true, m3: true, m4: true });
        assert.equal(result.done, 4);
        assert.equal(result.total, 4);
        assert.equal(result.percent, 100);
    });

    test("false values are not counted as done", () => {
        const result = calculateProgress(modules, { m1: true, m2: false });
        assert.equal(result.done, 1);
    });

    test("resource keys do not affect module progress", () => {
        const result = calculateProgress(modules, { "r1-0": true, "r1-1": true });
        assert.equal(result.done, 0);
    });

    test("empty modules array", () => {
        const result = calculateProgress([], {});
        assert.equal(result.done, 0);
        assert.equal(result.total, 0);
        assert.equal(result.percent, 0);
    });

    test("handles string module num (capstone)", () => {
        const mods = [{ num: 1 }, { num: "C" }];
        const result = calculateProgress(mods, { m1: true, mC: true });
        assert.equal(result.done, 2);
        assert.equal(result.percent, 100);
    });
});
