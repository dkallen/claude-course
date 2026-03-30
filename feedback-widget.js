(function () {
    var FEEDBACK_KEY = 'course-feedback';
    var AUTHOR_KEY = 'feedback-author';
    var parts = window.location.pathname.split('/').filter(Boolean);
    var page = parts.length >= 2 ? parts.slice(-2).join('/') : (parts[0] || 'index.html');

    function loadFeedback() {
        try {
            var stored = localStorage.getItem(FEEDBACK_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveFeedback(entry) {
        var items = loadFeedback();
        items.push(entry);
        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(items));
    }

    function exportFeedback() {
        var items = loadFeedback();
        if (items.length === 0) return;
        var blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'course-feedback.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    var style = document.createElement('style');
    style.textContent =
        '#fb-btn { position: fixed; bottom: 20px; left: 20px; z-index: 9999;' +
        '  background: #1a1a1a; color: #fff; border: none; border-radius: 6px;' +
        '  padding: 0.45rem 0.85rem; cursor: pointer; font-size: 0.8rem; font-weight: 600;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;' +
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.18); transition: background 0.15s; }' +
        '#fb-btn:hover { background: #333; }' +
        '#fb-panel { position: fixed; bottom: 60px; left: 20px; z-index: 9998;' +
        '  width: 320px; background: #fff; border: 1px solid #ddd; border-radius: 10px;' +
        '  padding: 0.85rem; box-shadow: 0 4px 20px rgba(0,0,0,0.12); display: none; }' +
        '#fb-panel.open { display: block; }' +
        '#fb-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase;' +
        '  letter-spacing: 0.05em; color: #aaa; margin-bottom: 0.5rem;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#fb-textarea { width: 100%; min-height: 100px; border: 1px solid #e0e0e0;' +
        '  border-radius: 4px; padding: 0.5rem; font-size: 0.82rem; resize: vertical;' +
        '  line-height: 1.5; color: #333; box-sizing: border-box;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#fb-textarea:focus { outline: none; border-color: #999; }' +
        '#fb-author { width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;' +
        '  padding: 0.4rem 0.5rem; font-size: 0.82rem; color: #333; box-sizing: border-box;' +
        '  margin-bottom: 0.5rem;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#fb-author:focus { outline: none; border-color: #999; }' +
        '#fb-actions { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }' +
        '#fb-submit { background: #1a1a1a; color: #fff; border: none; border-radius: 4px;' +
        '  padding: 0.35rem 0.75rem; cursor: pointer; font-size: 0.78rem; font-weight: 600;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#fb-submit:hover { background: #333; }' +
        '#fb-export { background: none; border: none; color: #999; cursor: pointer;' +
        '  font-size: 0.72rem; text-decoration: underline; margin-left: auto;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#fb-export:hover { color: #666; }' +
        '[data-tooltip] { position: relative; }' +
        '[data-tooltip]::after { content: attr(data-tooltip); position: absolute; bottom: 100%;' +
        '  left: 0; padding: 0.35rem 0.55rem; background: #333;' +
        '  color: #fff; font-size: 0.72rem; font-weight: 400; line-height: 1.4;' +
        '  border-radius: 4px; white-space: nowrap; pointer-events: none;' +
        '  opacity: 0; transition: opacity 0.15s; margin-bottom: 6px; }' +
        '[data-tooltip]:hover::after { opacity: 1; transition-delay: 0.2s; }';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'fb-btn';
    btn.textContent = 'Feedback';
    btn.setAttribute('data-tooltip', 'Submit a suggestion to improve this page. Click to toggle.');

    var cachedAuthor = localStorage.getItem(AUTHOR_KEY) || '';
    var authorHTML = cachedAuthor
        ? ''
        : '<input id="fb-author" type="text" placeholder="Your name (saved for future use)">';

    var panel = document.createElement('div');
    panel.id = 'fb-panel';
    panel.innerHTML =
        '<div id="fb-label">Suggestion for this page</div>' +
        authorHTML +
        '<textarea id="fb-textarea" placeholder="What could be improved?"></textarea>' +
        '<div id="fb-actions">' +
        '  <button id="fb-submit">Submit</button>' +
        '  <button id="fb-export">Export all</button>' +
        '</div>';

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) {
            var authorInput = document.getElementById('fb-author');
            if (authorInput) {
                authorInput.focus();
            } else {
                document.getElementById('fb-textarea').focus();
            }
        }
    });

    document.getElementById('fb-submit').addEventListener('click', function () {
        var textarea = document.getElementById('fb-textarea');
        var comment = textarea.value.trim();
        if (!comment) return;

        var authorInput = document.getElementById('fb-author');
        var author = cachedAuthor;
        if (authorInput) {
            author = authorInput.value.trim();
            if (!author) return;
            localStorage.setItem(AUTHOR_KEY, author);
            cachedAuthor = author;
            authorInput.remove();
        }

        saveFeedback({
            id: crypto.randomUUID(),
            author: author,
            page: page,
            timestamp: new Date().toISOString(),
            comment: comment
        });

        textarea.value = '';
    });

    document.getElementById('fb-export').addEventListener('click', exportFeedback);
}());
