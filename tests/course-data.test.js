// Data integrity tests for course-data.js
// Validates schema, uniqueness, file existence, data attributes, phases, sections, and types.
// Run with: node --test tests/

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";

// Load course-data.js in Node by providing a mock window object
const window = {};
const dataPath = resolve(import.meta.dirname, "..", "course-data.js");
const dataSource = readFileSync(dataPath, "utf8");
const loadData = new Function("window", dataSource);
loadData(window);
const COURSE_DATA = window.COURSE_DATA;

const VALID_RESOURCE_TYPES = new Set(["read", "visual", "interactive", "exercise", "reference"]);
const projectRoot = resolve(import.meta.dirname, "..");

// --- Top-level structure ---

describe("top-level structure", () => {
    test("COURSE_DATA has defaultSubject", () => {
        assert.ok(COURSE_DATA.defaultSubject, "defaultSubject is required");
    });

    test("COURSE_DATA has subjects array", () => {
        assert.ok(Array.isArray(COURSE_DATA.subjects), "subjects must be an array");
        assert.ok(COURSE_DATA.subjects.length > 0, "subjects must not be empty");
    });

    test("defaultSubject refers to an existing subject", () => {
        const slugs = COURSE_DATA.subjects.map(s => s.slug);
        assert.ok(slugs.includes(COURSE_DATA.defaultSubject),
            `defaultSubject "${COURSE_DATA.defaultSubject}" not found in subjects`);
    });
});

// --- Subject-level schema ---

describe("subject schema", () => {
    const requiredFields = ["slug", "title", "progressPrefix", "sections", "modules"];

    for (const subject of COURSE_DATA.subjects) {
        for (const field of requiredFields) {
            test(`${subject.slug}: has required field "${field}"`, () => {
                assert.ok(subject[field] !== undefined && subject[field] !== null,
                    `subject "${subject.slug}" is missing "${field}"`);
            });
        }

        test(`${subject.slug}: modules is a non-empty array`, () => {
            assert.ok(Array.isArray(subject.modules), "modules must be an array");
            assert.ok(subject.modules.length > 0, "modules must not be empty");
        });

        test(`${subject.slug}: sections is a non-empty object`, () => {
            assert.equal(typeof subject.sections, "object");
            assert.ok(Object.keys(subject.sections).length > 0, "sections must not be empty");
        });
    }
});

// --- Subject-level uniqueness ---

describe("subject uniqueness", () => {
    test("subject slugs are globally unique", () => {
        const slugs = COURSE_DATA.subjects.map(s => s.slug);
        assert.equal(new Set(slugs).size, slugs.length,
            `duplicate slugs: ${slugs.filter((s, i) => slugs.indexOf(s) !== i)}`);
    });

    test("progressPrefix values are globally unique", () => {
        const prefixes = COURSE_DATA.subjects.map(s => s.progressPrefix);
        assert.equal(new Set(prefixes).size, prefixes.length,
            `duplicate progressPrefix values: ${prefixes.filter((p, i) => prefixes.indexOf(p) !== i)}`);
    });
});

// --- Module-level schema and uniqueness ---

describe("module schema and uniqueness", () => {
    for (const subject of COURSE_DATA.subjects) {
        test(`${subject.slug}: every module has num, name, section`, () => {
            for (const mod of subject.modules) {
                assert.ok(mod.num !== undefined, `module missing num in ${subject.slug}`);
                assert.ok(mod.name, `module ${mod.num} missing name in ${subject.slug}`);
                assert.ok(mod.section !== undefined, `module ${mod.num} missing section in ${subject.slug}`);
            }
        });

        test(`${subject.slug}: module nums are unique`, () => {
            const nums = subject.modules.map(m => m.num);
            assert.equal(new Set(nums).size, nums.length,
                `duplicate module nums in ${subject.slug}: ${nums.filter((n, i) => nums.indexOf(n) !== i)}`);
        });

        test(`${subject.slug}: every module resources field is an array`, () => {
            for (const mod of subject.modules) {
                assert.ok(Array.isArray(mod.resources),
                    `module ${mod.num} in ${subject.slug}: resources must be an array`);
            }
        });
    }
});

// --- Resource-level schema ---

describe("resource schema", () => {
    for (const subject of COURSE_DATA.subjects) {
        for (const mod of subject.modules) {
            if (mod.resources.length === 0) continue;

            for (const resource of mod.resources) {
                test(`${subject.slug}/m${mod.num}: resource "${resource.name || "(unnamed)"}" has id, name, href, type`, () => {
                    assert.ok(resource.id, `resource missing id`);
                    assert.ok(resource.name, `resource ${resource.id} missing name`);
                    assert.ok(resource.href, `resource ${resource.id} missing href`);
                    assert.ok(resource.type, `resource ${resource.id} missing type`);
                });

                test(`${subject.slug}/m${mod.num}: resource "${resource.id}" has valid type`, () => {
                    assert.ok(VALID_RESOURCE_TYPES.has(resource.type),
                        `resource "${resource.id}" has unknown type "${resource.type}". Valid: ${[...VALID_RESOURCE_TYPES]}`);
                });
            }
        }
    }
});

// --- Resource ID uniqueness within each subject ---

describe("resource ID uniqueness", () => {
    for (const subject of COURSE_DATA.subjects) {
        test(`${subject.slug}: resource IDs are unique across all modules`, () => {
            const ids = subject.modules.flatMap(m => m.resources.map(r => r.id));
            const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
            assert.equal(dupes.length, 0, `duplicate resource IDs in ${subject.slug}: ${dupes}`);
        });
    }
});

// --- File existence ---

describe("resource file existence", () => {
    for (const subject of COURSE_DATA.subjects) {
        for (const mod of subject.modules) {
            for (const resource of mod.resources) {
                test(`${subject.slug}/m${mod.num}: file exists for "${resource.id}" (${resource.href})`, () => {
                    const fullPath = resolve(projectRoot, resource.href);
                    assert.ok(existsSync(fullPath),
                        `file not found: ${resource.href}`);
                });
            }
        }
    }

    // Also check syllabusHref for each subject
    for (const subject of COURSE_DATA.subjects) {
        if (subject.syllabusHref) {
            test(`${subject.slug}: syllabus file exists (${subject.syllabusHref})`, () => {
                const fullPath = resolve(projectRoot, subject.syllabusHref);
                assert.ok(existsSync(fullPath),
                    `syllabus file not found: ${subject.syllabusHref}`);
            });
        }
    }
});

// --- Data attribute consistency (HTML files only) ---

describe("data attribute consistency", () => {
    for (const subject of COURSE_DATA.subjects) {
        for (const mod of subject.modules) {
            for (const resource of mod.resources) {
                const ext = extname(resource.href).toLowerCase();
                if (ext !== ".html") continue;

                test(`${subject.slug}/m${mod.num}: "${resource.id}" has correct data attributes`, () => {
                    const fullPath = resolve(projectRoot, resource.href);
                    const html = readFileSync(fullPath, "utf8");

                    const subjectMatch = html.match(/data-subject-id="([^"]+)"/);
                    assert.ok(subjectMatch,
                        `${resource.href} missing data-subject-id attribute`);
                    assert.equal(subjectMatch[1], subject.slug,
                        `${resource.href} data-subject-id="${subjectMatch[1]}" should be "${subject.slug}"`);

                    const moduleMatch = html.match(/data-module="([^"]+)"/);
                    assert.ok(moduleMatch,
                        `${resource.href} missing data-module attribute`);
                    assert.equal(moduleMatch[1], String(mod.num),
                        `${resource.href} data-module="${moduleMatch[1]}" should be "${mod.num}"`);

                    const resourceMatch = html.match(/data-resource-id="([^"]+)"/);
                    assert.ok(resourceMatch,
                        `${resource.href} missing data-resource-id attribute`);
                    assert.equal(resourceMatch[1], resource.id,
                        `${resource.href} data-resource-id="${resourceMatch[1]}" should be "${resource.id}"`);
                });
            }
        }
    }
});

// --- Section references ---

describe("section references", () => {
    for (const subject of COURSE_DATA.subjects) {
        test(`${subject.slug}: every module section exists in subject.sections`, () => {
            const validSections = new Set(Object.keys(subject.sections).map(String));
            for (const mod of subject.modules) {
                assert.ok(validSections.has(String(mod.section)),
                    `module ${mod.num} references section "${mod.section}" which is not in subject.sections (valid: ${[...validSections]})`);
            }
        });
    }
});

// --- Phase integrity ---

describe("phase integrity", () => {
    for (const subject of COURSE_DATA.subjects) {
        for (const mod of subject.modules) {
            if (!mod.phases || mod.resources.length === 0) continue;

            test(`${subject.slug}/m${mod.num}: all phase item indices are within resource bounds`, () => {
                const maxIdx = mod.resources.length - 1;
                for (const phase of mod.phases) {
                    assert.ok(Array.isArray(phase.items),
                        `phase "${phase.label}" missing items array`);
                    for (const idx of phase.items) {
                        assert.ok(idx >= 0 && idx <= maxIdx,
                            `phase "${phase.label}" references item index ${idx} but module has ${mod.resources.length} resources (0-${maxIdx})`);
                    }
                }
            });

            test(`${subject.slug}/m${mod.num}: phases have required fields`, () => {
                for (const phase of mod.phases) {
                    assert.ok(phase.label, "phase missing label");
                    assert.ok(phase.title, `phase "${phase.label}" missing title`);
                    assert.ok(phase.desc, `phase "${phase.label}" missing desc`);
                }
            });
        }
    }
});
