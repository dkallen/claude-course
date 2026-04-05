const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const {
    mapNoteRows,
    getResourceNote,
    buildModuleNoteGroups,
    buildAllModuleNoteGroups
} = require("../course-notes.js");

describe("mapNoteRows", () => {
    test("maps Supabase note rows by resource_id", () => {
        const result = mapNoteRows([
            { resource_id: "m4-exercise", content: "Exercise note" },
            { resource_id: "m4-reference", content: "Reference note" }
        ]);

        assert.deepEqual(result, {
            "m4-exercise": "Exercise note",
            "m4-reference": "Reference note"
        });
    });

    test("returns an empty object when rows are missing", () => {
        assert.deepEqual(mapNoteRows(null), {});
        assert.deepEqual(mapNoteRows([]), {});
    });
});

describe("getResourceNote", () => {
    test("looks up notes by resource.id", () => {
        const notes = {
            "m4-exercise": "Visible note",
            "subjects/claude-code/module-4-exercise.html": "Wrong key"
        };
        const resource = {
            id: "m4-exercise",
            href: "subjects/claude-code/module-4-exercise.html"
        };

        assert.equal(getResourceNote(notes, resource), "Visible note");
    });

    test("returns an empty string when the resource has no note", () => {
        assert.equal(getResourceNote({}, { id: "m4-exercise" }), "");
    });
});

describe("buildModuleNoteGroups", () => {
    const module = {
        num: 4,
        name: "Idea Refinement",
        resources: [
            { id: "m4-lesson", name: "Lesson Content" },
            { id: "m4-framework", name: "Framework Map" },
            { id: "m4-exercise", name: "Guided Exercise" }
        ]
    };

    test("preserves module resource order and fills note text where present", () => {
        const result = buildModuleNoteGroups(module, {
            "m4-exercise": "Exercise note"
        }, "No notes available");

        assert.deepEqual(result.map(item => item.resource.id), [
            "m4-lesson",
            "m4-framework",
            "m4-exercise"
        ]);
        assert.equal(result[2].text, "Exercise note");
        assert.equal(result[2].isEmpty, false);
    });

    test("uses the exact empty-state text for resources without notes", () => {
        const result = buildModuleNoteGroups(module, {}, "No notes available");

        assert.equal(result[0].text, "No notes available");
        assert.equal(result[0].isEmpty, true);
        assert.equal(result[1].text, "No notes available");
        assert.equal(result[1].isEmpty, true);
    });
});

describe("buildAllModuleNoteGroups", () => {
    test("builds grouped notes for each module with resources", () => {
        const modules = [
            {
                num: 4,
                name: "Idea Refinement",
                resources: [
                    { id: "m4-exercise", name: "Guided Exercise" }
                ]
            },
            {
                num: 7,
                name: "Coming Soon",
                resources: []
            },
            {
                num: 5,
                name: "Architecture",
                resources: [
                    { id: "m5-exercise", name: "Guided Exercise" }
                ]
            }
        ];

        const result = buildAllModuleNoteGroups(modules, {
            "m4-exercise": "Module 4 note"
        }, "No notes available");

        assert.deepEqual(result.map(group => group.module.num), [4, 5]);
        assert.equal(result[0].items[0].text, "Module 4 note");
        assert.equal(result[1].items[0].text, "No notes available");
    });
});
