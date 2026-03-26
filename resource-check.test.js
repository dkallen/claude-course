// Unit tests for resource checkbox logic
// Run with: node resource-check.test.js

import { test } from "node:test";
import assert from "node:assert/strict";

// Pure logic extracted from course.html / course-mobile.html

function resourceKey(moduleNum, idx) {
    return "r" + moduleNum + "-" + idx;
}

function toggleResourceInProgress(progress, moduleNum, idx) {
    const key = resourceKey(moduleNum, idx);
    progress[key] = !progress[key];
    return key;
}

// --- resourceKey ---

test("resourceKey: numeric module and index", () => {
    assert.equal(resourceKey(1, 0), "r1-0");
    assert.equal(resourceKey(1, 8), "r1-8");
    assert.equal(resourceKey(3, 4), "r3-4");
});

test("resourceKey: string module num (e.g. capstone 'C')", () => {
    assert.equal(resourceKey("C", 0), "rC-0");
    assert.equal(resourceKey("C", 2), "rC-2");
});

test("resourceKey: does not collide with module keys", () => {
    // Module keys are "m1", "m2", etc. Resource keys are "r1-0"
    assert.notEqual(resourceKey(1, 0), "m1");
    assert.notEqual(resourceKey(1, 0), "m10");
});

test("resourceKey: distinct resources in same module produce distinct keys", () => {
    const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => resourceKey(1, idx));
    assert.equal(new Set(keys).size, keys.length);
});

test("resourceKey: same index in different modules produces distinct keys", () => {
    assert.notEqual(resourceKey(1, 0), resourceKey(2, 0));
    assert.notEqual(resourceKey(1, 0), resourceKey("C", 0));
});

// --- toggleResourceInProgress ---

test("toggle: unchecked resource becomes checked", () => {
    const progress = {};
    toggleResourceInProgress(progress, 1, 0);
    assert.equal(progress["r1-0"], true);
});

test("toggle: checked resource becomes unchecked", () => {
    const progress = { "r1-0": true };
    toggleResourceInProgress(progress, 1, 0);
    assert.equal(progress["r1-0"], false);
});

test("toggle: toggling once then again returns to original state", () => {
    const progress = {};
    toggleResourceInProgress(progress, 2, 3);
    toggleResourceInProgress(progress, 2, 3);
    assert.equal(!!progress["r2-3"], false);
});

test("toggle: does not affect other resources in same module", () => {
    const progress = { "r1-1": true };
    toggleResourceInProgress(progress, 1, 0);
    assert.equal(progress["r1-1"], true);
});

test("toggle: does not affect module-level progress keys", () => {
    const progress = { "m1": true };
    toggleResourceInProgress(progress, 1, 0);
    assert.equal(progress["m1"], true);
});

test("toggle: returns the key that was toggled", () => {
    const progress = {};
    const key = toggleResourceInProgress(progress, 3, 5);
    assert.equal(key, "r3-5");
});

test("toggle: multiple resources can be checked independently", () => {
    const progress = {};
    toggleResourceInProgress(progress, 1, 0);
    toggleResourceInProgress(progress, 1, 2);
    toggleResourceInProgress(progress, 2, 0);
    assert.equal(progress["r1-0"], true);
    assert.equal(progress["r1-2"], true);
    assert.equal(progress["r2-0"], true);
    assert.equal(progress["r1-1"], undefined); // untouched
});
