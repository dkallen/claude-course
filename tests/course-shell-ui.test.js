const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');
const courseHtmlSource = readFileSync(resolve(projectRoot, 'course.html'), 'utf8');

describe('course shell feedback UI', () => {
    test('legacy feedback panel path is removed from course.html', () => {
        assert.ok(!courseHtmlSource.includes('showFeedbackPanel'), 'course.html should not define showFeedbackPanel');
        assert.ok(!courseHtmlSource.includes('course-feedback'), 'course.html should not read localStorage course-feedback');
        assert.ok(!courseHtmlSource.includes('>Feedback</button>'), 'course.html should not render the old Feedback sidebar button');
        assert.ok(!courseHtmlSource.includes('feedback-widget.js'), 'course.html should not load feedback-widget.js');
    });
});
