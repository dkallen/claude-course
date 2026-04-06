const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const feedbackWidget = require('../feedback-widget.js');

describe('feedback widget helpers', () => {
    test('normalizeFeedbackComment returns null for blank input', () => {
        assert.equal(feedbackWidget.normalizeFeedbackComment(''), null);
        assert.equal(feedbackWidget.normalizeFeedbackComment('   '), null);
    });

    test('normalizeFeedbackComment preserves meaningful text', () => {
        assert.equal(feedbackWidget.normalizeFeedbackComment('Helpful page'), 'Helpful page');
    });

    test('resolveFeedbackDisplayName prefers user metadata then email', () => {
        assert.equal(
            feedbackWidget.resolveFeedbackDisplayName({
                id: 'user-1',
                email: 'learner@example.com',
                user_metadata: { full_name: 'Learner Name' }
            }),
            'Learner Name'
        );
        assert.equal(
            feedbackWidget.resolveFeedbackDisplayName({ id: 'user-2', email: 'fallback@example.com', user_metadata: {} }),
            'fallback@example.com'
        );
    });

    test('buildFeedbackPayload uses normalized comment and full page context', () => {
        assert.deepEqual(
            feedbackWidget.buildFeedbackPayload({
                user: {
                    id: 'user-123',
                    email: 'learner@example.com',
                    user_metadata: { full_name: 'Learner Example' }
                },
                subjectId: 'claude-code',
                module: '4',
                resourceId: 'm4-exercise',
                rating: -1,
                comment: '   '
            }),
            {
                user_id: 'user-123',
                author_display_name: 'Learner Example',
                subject_id: 'claude-code',
                module: '4',
                resource_id: 'm4-exercise',
                rating: -1,
                comment: null
            }
        );
    });
});
