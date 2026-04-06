const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const courseHtmlSource = readFileSync(resolve(projectRoot, "course.html"), "utf8");
const courseDataSource = readFileSync(resolve(projectRoot, "course-data.js"), "utf8");

describe("gist removal contract", () => {
    test("course shell no longer contains learner-facing Gist UI or helper functions", () => {
        const blockedStrings = [
            "Connect GitHub Gist Sync",
            "GitHub Personal Access Token",
            "showTokenModal",
            "disconnectGist",
            "loadFromGist",
            "saveToGist",
            "createGist",
            "gistFetch",
            "gistTokenKey",
            "gistIdKey",
            "gistFilename",
            "sync-dot",
            "sync-text"
        ];

        for (const blocked of blockedStrings) {
            assert.ok(
                !courseHtmlSource.includes(blocked),
                `course.html must not include legacy Gist artifact: ${blocked}`
            );
        }
    });

    test("course data no longer carries Gist-specific subject metadata", () => {
        assert.ok(
            !courseDataSource.includes("gistDescription"),
            "course-data.js should not keep gistDescription metadata after Gist removal"
        );
    });
});
