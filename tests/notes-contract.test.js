const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync, readdirSync, statSync } = require("node:fs");
const { resolve } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const notesWidgetSource = readFileSync(resolve(projectRoot, "notes-widget.js"), "utf8");
const feedbackWidgetSource = readFileSync(resolve(projectRoot, "feedback-widget.js"), "utf8");
const courseHtmlSource = readFileSync(resolve(projectRoot, "course.html"), "utf8");
const dataSource = readFileSync(resolve(projectRoot, "course-data.js"), "utf8");

function walkHtmlFiles(dirPath, results = []) {
    for (const entry of readdirSync(dirPath)) {
        const fullPath = resolve(dirPath, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            walkHtmlFiles(fullPath, results);
        } else if (fullPath.endsWith(".html")) {
            results.push(fullPath);
        }
    }
    return results;
}

describe("notes persistence contract", () => {
    test("notes-widget.js uses Supabase identifiers from data attributes", () => {
        assert.ok(
            notesWidgetSource.includes("data-subject-id"),
            "notes-widget.js must read data-subject-id"
        );
        assert.ok(
            notesWidgetSource.includes("data-resource-id"),
            "notes-widget.js must read data-resource-id"
        );
        assert.ok(
            notesWidgetSource.includes("from('user_notes')") || notesWidgetSource.includes('from("user_notes")'),
            "notes-widget.js must query the user_notes table"
        );
    });

    test("note persistence no longer depends on note-specific localStorage keys", () => {
        assert.ok(
            !notesWidgetSource.includes("localStorage.getItem('course-notes-") &&
            !notesWidgetSource.includes('localStorage.getItem("course-notes-') &&
            !notesWidgetSource.includes("localStorage.setItem('course-notes-") &&
            !notesWidgetSource.includes('localStorage.setItem("course-notes-') &&
            !courseHtmlSource.includes("localStorage.getItem('course-notes-") &&
            !courseHtmlSource.includes('localStorage.getItem("course-notes-') &&
            !courseHtmlSource.includes("localStorage.setItem('course-notes-") &&
            !courseHtmlSource.includes('localStorage.setItem("course-notes-'),
            "note persistence should not depend on note-related localStorage keys"
        );
    });

    test("notes live refresh uses BroadcastChannel as a same-browser enhancement", () => {
        assert.ok(
            notesWidgetSource.includes("BroadcastChannel"),
            "notes-widget.js should publish a BroadcastChannel message after successful saves"
        );
        assert.ok(
            courseHtmlSource.includes("BroadcastChannel"),
            "course.html should listen for BroadcastChannel note refresh messages"
        );
        assert.ok(
            courseHtmlSource.includes("refreshNotesFromSource"),
            "course.html should refresh note data from Supabase after a live-refresh message"
        );
    });
});

describe("module overview notes contract", () => {
    test("course.html does not expose editable note textareas in the overview surfaces", () => {
        assert.ok(
            !courseHtmlSource.includes("scheduleNoteSave("),
            "course.html should not wire overview note editing"
        );
        assert.ok(
            !courseHtmlSource.includes("notes-view-textarea") && !courseHtmlSource.includes("mc-note-textarea"),
            "course.html should render read-only note displays instead of note textareas"
        );
    });

    test("course.html uses the exact empty-state text for missing notes", () => {
        assert.ok(
            courseHtmlSource.includes("No notes available"),
            "course.html must render the exact empty-state text 'No notes available'"
        );
    });
});

describe("widget tooltip contract", () => {
    test("notes and feedback affordances expose wrapping helper tooltips", () => {
        assert.ok(
            notesWidgetSource.includes("Jot down personal notes about this page. Click to toggle."),
            "notes-widget.js should expose the notes helper tooltip copy"
        );
        assert.ok(
            feedbackWidgetSource.includes("Share quick feedback about this page. Click to toggle."),
            "feedback-widget.js should expose the feedback helper tooltip copy"
        );
        assert.ok(
            notesWidgetSource.includes("white-space: normal") && !notesWidgetSource.includes("white-space: nowrap"),
            "notes-widget.js should allow tooltip copy to wrap on smaller screens"
        );
        assert.ok(
            feedbackWidgetSource.includes("white-space: normal") && !feedbackWidgetSource.includes("white-space: nowrap"),
            "feedback-widget.js should allow tooltip copy to wrap on smaller screens"
        );
    });
});

describe("resource page data attributes", () => {
    test("resource pages set data-subject-id and data-resource-id from course-data.js", () => {
        const window = {};
        const loadData = new Function("window", dataSource);
        loadData(window);

        for (const subject of window.COURSE_DATA.subjects) {
            for (const module of subject.modules) {
                for (const resource of module.resources) {
                    if (!resource.href.endsWith(".html")) continue;
                    const html = readFileSync(resolve(projectRoot, resource.href), "utf8");
                    const subjectMatch = html.match(/data-subject-id="([^"]+)"/);
                    const resourceMatch = html.match(/data-resource-id="([^"]+)"/);
                    assert.ok(subjectMatch, `${resource.href} must set data-subject-id`);
                    assert.ok(resourceMatch, `${resource.href} must set data-resource-id`);
                    assert.equal(subjectMatch[1], subject.slug, `${resource.href} must use subject.slug for data-subject-id`);
                    assert.equal(resourceMatch[1], resource.id, `${resource.href} must use resource.id for data-resource-id`);
                }
            }
        }
    });
});

describe("widget bootstrap contract", () => {
    test("pages with notes widgets load the Supabase bootstrap before notes-widget.js", () => {
        const htmlFiles = [
            ...walkHtmlFiles(resolve(projectRoot, "subjects")),
            ...walkHtmlFiles(resolve(projectRoot, "docs/syllabus"))
        ];

        for (const filePath of htmlFiles) {
            const html = readFileSync(filePath, "utf8");
            if (!html.includes("notes-widget.js")) continue;

            assert.ok(
                html.includes("@supabase/supabase-js@2"),
                `${filePath} must load the Supabase CDN script before notes-widget.js`
            );
            assert.ok(
                html.includes("supabase-client.js"),
                `${filePath} must load supabase-client.js before notes-widget.js`
            );
            assert.ok(
                html.indexOf("supabase-client.js") < html.indexOf("notes-widget.js"),
                `${filePath} must load supabase-client.js before notes-widget.js`
            );
        }
    });
});
