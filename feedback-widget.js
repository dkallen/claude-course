(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    }
    if (typeof window !== 'undefined') {
        window.feedbackWidget = factory();
        window.feedbackWidget.init();
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function normalizeFeedbackComment(text) {
        var trimmed = (text || '').trim();
        return trimmed ? trimmed : null;
    }

    function resolveFeedbackDisplayName(user) {
        if (!user) return 'Learner';
        var metadata = user.user_metadata || {};
        return metadata.full_name || metadata.name || user.email || user.id || 'Learner';
    }

    function buildFeedbackPayload(options) {
        var user = options.user || {};
        return {
            user_id: user.id,
            author_display_name: resolveFeedbackDisplayName(user),
            subject_id: options.subjectId,
            module: options.module,
            resource_id: options.resourceId,
            rating: options.rating,
            comment: normalizeFeedbackComment(options.comment)
        };
    }

    function init() {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        var body = document.body;
        var subjectId = body.getAttribute('data-subject-id');
        var moduleId = body.getAttribute('data-module');
        var resourceId = body.getAttribute('data-resource-id');

        if (!subjectId || !moduleId || !resourceId) return;

        var style = document.createElement('style');
        style.textContent =
            '#fw-btn { position: fixed; bottom: 20px; left: 20px; z-index: 9999;' +
            '  background: #1a1a1a; color: #fff; border: none; border-radius: 8px;' +
            '  padding: 0.5rem 0.95rem; cursor: pointer; font-size: 0.8rem; font-weight: 700;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;' +
            '  box-shadow: 0 2px 10px rgba(0,0,0,0.18); }' +
            '#fw-panel { position: fixed; bottom: 62px; left: 20px; z-index: 9998; width: 320px;' +
            '  max-width: calc(100vw - 40px); background: #fff; border: 1px solid #ddd;' +
            '  border-radius: 12px; padding: 0.9rem; box-shadow: 0 6px 24px rgba(0,0,0,0.14); display: none; }' +
            '#fw-panel.open { display: block; }' +
            '#fw-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #777; margin-bottom: 0.3rem;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '#fw-copy { font-size: 0.84rem; color: #444; line-height: 1.45; margin-bottom: 0.75rem;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '#fw-thumbs { display: flex; gap: 0.55rem; margin-bottom: 0.75rem; }' +
            '.fw-thumb { flex: 1; border: 1px solid #ddd; background: #fafafa; color: #222; border-radius: 10px; padding: 0.65rem 0.8rem; cursor: pointer; font-size: 0.92rem; font-weight: 600;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '.fw-thumb.selected { border-color: #1a1a1a; background: #1a1a1a; color: #fff; }' +
            '.fw-thumb:disabled { cursor: not-allowed; opacity: 0.55; }' +
            '#fw-comment { width: 100%; min-height: 92px; border: 1px solid #ddd; border-radius: 8px; padding: 0.65rem; resize: vertical; font-size: 0.82rem; line-height: 1.45; color: #333; box-sizing: border-box;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '#fw-comment:disabled { background: #f7f7f7; color: #888; }' +
            '#fw-actions { display: flex; justify-content: flex-end; align-items: center; gap: 0.65rem; margin-top: 0.7rem; }' +
            '#fw-submit { border: none; background: #1a1a1a; color: #fff; border-radius: 8px; padding: 0.55rem 0.85rem; font-size: 0.8rem; font-weight: 700; cursor: pointer;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '#fw-submit:disabled { opacity: 0.5; cursor: not-allowed; }' +
            '#fw-status { min-height: 1rem; font-size: 0.72rem; color: #777; text-align: left;' +
            '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '[data-tooltip] { position: relative; }' +
            '[data-tooltip]::after { content: attr(data-tooltip); position: absolute; bottom: calc(100% + 8px);' +
            '  width: max-content; max-width: min(16rem, calc(100vw - 32px));' +
            '  padding: 0.45rem 0.6rem; background: rgba(51, 51, 51, 0.96);' +
            '  color: #fff; font-size: 0.72rem; font-weight: 400; line-height: 1.4; text-align: left;' +
            '  border-radius: 8px; white-space: normal; word-break: break-word; pointer-events: none;' +
            '  opacity: 0; transform: translateY(4px); transition: opacity 0.15s, transform 0.15s;' +
            '  box-shadow: 0 4px 14px rgba(0,0,0,0.18); }' +
            '[data-tooltip][data-tooltip-position="start"]::after { left: 0; right: auto; }' +
            '[data-tooltip][data-tooltip-position="end"]::after { right: 0; left: auto; }' +
            '[data-tooltip]:hover::after, [data-tooltip]:focus-visible::after { opacity: 1; transform: translateY(0); }' +
            '@media (max-width: 480px) {' +
            '  [data-tooltip]::after { font-size: 0.68rem; max-width: min(13rem, calc(100vw - 24px)); }' +
            '}';
        document.head.appendChild(style);

        var btn = document.createElement('button');
        btn.id = 'fw-btn';
        btn.type = 'button';
        btn.textContent = 'Feedback';
        btn.setAttribute('data-tooltip', 'Share quick feedback about this page. Click to toggle.');
        btn.setAttribute('data-tooltip-position', 'start');

        var panel = document.createElement('div');
        panel.id = 'fw-panel';
        panel.innerHTML =
            '<div id="fw-title">Share quick feedback</div>' +
            '<div id="fw-copy">Tell us whether this page was useful. You can optionally add a note before submitting.</div>' +
            '<div id="fw-thumbs">' +
            '  <button type="button" class="fw-thumb" id="fw-up" data-rating="1">Thumbs up</button>' +
            '  <button type="button" class="fw-thumb" id="fw-down" data-rating="-1">Thumbs down</button>' +
            '</div>' +
            '<textarea id="fw-comment" placeholder="Optional comment"></textarea>' +
            '<div id="fw-actions">' +
            '  <div id="fw-status"></div>' +
            '  <button type="button" id="fw-submit" disabled>Submit</button>' +
            '</div>';

        document.body.appendChild(panel);
        document.body.appendChild(btn);

        var upButton = document.getElementById('fw-up');
        var downButton = document.getElementById('fw-down');
        var comment = document.getElementById('fw-comment');
        var submit = document.getElementById('fw-submit');
        var status = document.getElementById('fw-status');
        var selectedRating = null;
        var currentUser = null;
        var isReady = false;

        function setStatus(text) {
            status.textContent = text || '';
        }

        function setInteractiveState(enabled) {
            upButton.disabled = !enabled;
            downButton.disabled = !enabled;
            comment.disabled = !enabled;
            submit.disabled = !enabled || selectedRating === null;
        }

        function updateSelection(nextRating) {
            selectedRating = nextRating;
            upButton.classList.toggle('selected', nextRating === 1);
            downButton.classList.toggle('selected', nextRating === -1);
            submit.disabled = !isReady || selectedRating === null;
        }

        function resetForm(message) {
            updateSelection(null);
            comment.value = '';
            setStatus(message || '');
        }

        async function initialize() {
            if (!window.supabaseClient || !window.supabaseReady) {
                setStatus('Feedback unavailable.');
                setInteractiveState(false);
                comment.placeholder = 'Feedback unavailable.';
                return;
            }

            setStatus('Loading...');
            setInteractiveState(false);

            try {
                currentUser = await window.supabaseReady;
            } catch (error) {
                currentUser = null;
            }

            if (!currentUser) {
                setStatus('Sign in to leave feedback.');
                setInteractiveState(false);
                comment.placeholder = 'Sign in to leave feedback.';
                return;
            }

            isReady = true;
            comment.placeholder = 'Optional comment';
            setStatus('');
            setInteractiveState(true);
        }

        async function submitFeedback() {
            if (!isReady || !currentUser || selectedRating === null) return;

            setInteractiveState(false);
            setStatus('Submitting...');

            try {
                var payload = buildFeedbackPayload({
                    user: currentUser,
                    subjectId: subjectId,
                    module: moduleId,
                    resourceId: resourceId,
                    rating: selectedRating,
                    comment: comment.value
                });

                var result = await window.supabaseClient
                    .from('user_feedback')
                    .insert(payload);

                if (result && result.error) throw result.error;
                resetForm('Thanks for the feedback.');
                setInteractiveState(true);
            } catch (error) {
                setStatus('Could not submit feedback.');
                setInteractiveState(true);
            }
        }

        btn.addEventListener('click', function () {
            panel.classList.toggle('open');
        });

        upButton.addEventListener('click', function () {
            updateSelection(1);
            comment.focus();
        });

        downButton.addEventListener('click', function () {
            updateSelection(-1);
            comment.focus();
        });

        submit.addEventListener('click', submitFeedback);

        initialize();
    }

    return {
        normalizeFeedbackComment: normalizeFeedbackComment,
        resolveFeedbackDisplayName: resolveFeedbackDisplayName,
        buildFeedbackPayload: buildFeedbackPayload,
        init: init
    };
}));
