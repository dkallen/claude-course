(function () {
    var NOTES_KEY = 'course-notes';
    var filename = window.location.pathname.split('/').pop() || 'index.html';

    function loadNotes() {
        try {
            var stored = localStorage.getItem(NOTES_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) { return {}; }
    }

    function saveNote(text) {
        var notes = loadNotes();
        if (text.trim() === '') {
            delete notes[filename];
        } else {
            notes[filename] = text;
        }
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }

    var style = document.createElement('style');
    style.textContent =
        '#nw-btn { position: fixed; bottom: 20px; right: 20px; z-index: 9999;' +
        '  background: #1a1a1a; color: #fff; border: none; border-radius: 6px;' +
        '  padding: 0.45rem 0.85rem; cursor: pointer; font-size: 0.8rem; font-weight: 600;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;' +
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.18); transition: background 0.15s; }' +
        '#nw-btn:hover { background: #333; }' +
        '#nw-btn.has-note { background: #444; }' +
        '#nw-panel { position: fixed; bottom: 60px; right: 20px; z-index: 9998;' +
        '  width: 300px; background: #fff; border: 1px solid #ddd; border-radius: 10px;' +
        '  padding: 0.85rem; box-shadow: 0 4px 20px rgba(0,0,0,0.12); display: none; }' +
        '#nw-panel.open { display: block; }' +
        '#nw-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase;' +
        '  letter-spacing: 0.05em; color: #aaa; margin-bottom: 0.5rem;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#nw-textarea { width: 100%; min-height: 130px; border: 1px solid #e0e0e0;' +
        '  border-radius: 4px; padding: 0.5rem; font-size: 0.82rem; resize: vertical;' +
        '  line-height: 1.5; color: #333; box-sizing: border-box;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '#nw-textarea:focus { outline: none; border-color: #999; }' +
        '#nw-saved { font-size: 0.7rem; color: #aaa; margin-top: 0.3rem; min-height: 1rem;' +
        '  text-align: right;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'nw-btn';
    btn.textContent = 'Notes';

    var panel = document.createElement('div');
    panel.id = 'nw-panel';
    panel.innerHTML =
        '<div id="nw-label">Notes for this page</div>' +
        '<textarea id="nw-textarea" placeholder="Type your notes here..."></textarea>' +
        '<div id="nw-saved"></div>';

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    var notes = loadNotes();
    var textarea = document.getElementById('nw-textarea');
    textarea.value = notes[filename] || '';
    if (textarea.value.trim()) btn.classList.add('has-note');

    btn.addEventListener('click', function () {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) textarea.focus();
    });

    var saveTimer;
    textarea.addEventListener('input', function () {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
            saveNote(textarea.value);
            var saved = document.getElementById('nw-saved');
            saved.textContent = 'Saved';
            if (textarea.value.trim()) {
                btn.classList.add('has-note');
            } else {
                btn.classList.remove('has-note');
            }
            setTimeout(function () { saved.textContent = ''; }, 1500);
        }, 600);
    });
}());
