(function () {
    var body = document.body;
    var subjectId = body.getAttribute('data-subject-id');
    var resourceId = body.getAttribute('data-resource-id');
    var canUseSupabase = !!(window.supabaseClient && subjectId && resourceId);
    var noteHelpers = window.courseNotes || {};
    var notesLiveChannelName = noteHelpers.NOTES_LIVE_CHANNEL_NAME || 'course-notes-live';
    var liveChannel = typeof window.BroadcastChannel === 'function'
        ? new window.BroadcastChannel(notesLiveChannelName)
        : null;
    var currentUserId = null;
    var lastSavedText = '';
    var savedTimer;
    var saveTimer;
    var saveRequestId = 0;

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
        '#nw-textarea:disabled { background: #f7f7f7; color: #888; cursor: not-allowed; }' +
        '#nw-saved { font-size: 0.7rem; color: #aaa; margin-top: 0.3rem; min-height: 1rem;' +
        '  text-align: right;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
        '[data-tooltip] { position: relative; }' +
        '[data-tooltip]::after { content: attr(data-tooltip); position: absolute; bottom: calc(100% + 8px);' +
        '  right: 0; width: max-content; max-width: min(16rem, calc(100vw - 32px));' +
        '  padding: 0.45rem 0.6rem; background: rgba(51, 51, 51, 0.96);' +
        '  color: #fff; font-size: 0.72rem; font-weight: 400; line-height: 1.4; text-align: left;' +
        '  border-radius: 8px; white-space: normal; word-break: break-word; pointer-events: none;' +
        '  opacity: 0; transform: translateY(4px); transition: opacity 0.15s, transform 0.15s;' +
        '  box-shadow: 0 4px 14px rgba(0,0,0,0.18); }' +
        '[data-tooltip][data-tooltip-position="start"]::after { left: 0; right: auto; }' +
        '[data-tooltip]:hover::after, [data-tooltip]:focus-visible::after { opacity: 1; transform: translateY(0); }' +
        '@media (max-width: 480px) {' +
        '  [data-tooltip]::after { font-size: 0.68rem; max-width: min(13rem, calc(100vw - 24px)); }' +
        '}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'nw-btn';
    btn.textContent = 'Notes';
    btn.setAttribute('data-tooltip', 'Jot down personal notes about this page. Click to toggle.');
    btn.setAttribute('data-tooltip-position', 'end');

    var panel = document.createElement('div');
    panel.id = 'nw-panel';
    panel.innerHTML =
        '<div id="nw-label">Notes for this page</div>' +
        '<textarea id="nw-textarea" placeholder="Loading notes..." disabled></textarea>' +
        '<div id="nw-saved"></div>';

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    var textarea = document.getElementById('nw-textarea');
    var saved = document.getElementById('nw-saved');

    function setStatus(text, clearAfter) {
        saved.textContent = text || '';
        clearTimeout(savedTimer);
        if (clearAfter) {
            savedTimer = setTimeout(function () {
                saved.textContent = '';
            }, clearAfter);
        }
    }

    function setEditorAvailability(enabled, statusText, placeholder) {
        textarea.disabled = !enabled;
        if (placeholder) textarea.placeholder = placeholder;
        setStatus(statusText || '');
    }

    function publishLiveNoteUpdate(text) {
        if (!liveChannel) return;
        liveChannel.postMessage({
            type: 'note-saved',
            subjectId: subjectId,
            resourceId: resourceId,
            content: text
        });
    }

    async function loadSupabaseNote() {
        var result = await window.supabaseClient
            .from('user_notes')
            .select('content')
            .eq('subject_id', subjectId)
            .eq('resource_id', resourceId)
            .maybeSingle();
        return result.data || null;
    }

    async function saveSupabaseNote(text) {
        if (!currentUserId) throw new Error('No authenticated user');

        if (text.trim() === '') {
            await window.supabaseClient
                .from('user_notes')
                .delete()
                .eq('user_id', currentUserId)
                .eq('subject_id', subjectId)
                .eq('resource_id', resourceId);
            return;
        }

        await window.supabaseClient
            .from('user_notes')
            .upsert({
                user_id: currentUserId,
                subject_id: subjectId,
                resource_id: resourceId,
                content: text,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,subject_id,resource_id' });
    }

    async function initializeNotes() {
        if (!canUseSupabase) {
            setEditorAvailability(false, 'Notes unavailable.', 'Notes unavailable.');
            return;
        }

        var user = null;
        try {
            user = await window.supabaseReady;
        } catch (error) {
            user = null;
        }

        if (!user) {
            setEditorAvailability(false, 'Sign in to use notes.', 'Sign in to use notes.');
            return;
        }

        currentUserId = user.id;
        textarea.disabled = false;
        textarea.placeholder = 'Type your notes here...';
        setStatus('Loading notes...');

        try {
            var row = await loadSupabaseNote();
            textarea.value = row && typeof row.content === 'string' ? row.content : '';
            lastSavedText = textarea.value;
            btn.classList.toggle('has-note', !!textarea.value.trim());
            setStatus('');
        } catch (error) {
            textarea.value = '';
            lastSavedText = '';
            setEditorAvailability(false, 'Notes unavailable.', 'Notes unavailable.');
        }
    }

    async function persistNote(text, showSavedStatus) {
        if (textarea.disabled) return;

        var requestId = ++saveRequestId;
        setStatus('Saving...');

        try {
            await saveSupabaseNote(text);
            if (requestId !== saveRequestId) return;
            lastSavedText = text;
            btn.classList.toggle('has-note', !!text.trim());
            publishLiveNoteUpdate(text);
            setStatus(showSavedStatus ? 'Saved' : '', showSavedStatus ? 1500 : 0);
        } catch (error) {
            if (requestId !== saveRequestId) return;
            setStatus('Could not save.');
        }
    }

    function flushPendingSave() {
        clearTimeout(saveTimer);
        if (textarea.disabled) return;
        if (textarea.value === lastSavedText) return;
        persistNote(textarea.value, false);
    }

    btn.addEventListener('click', function () {
        panel.classList.toggle('open');
        if (panel.classList.contains('open') && !textarea.disabled) textarea.focus();
    });

    textarea.addEventListener('input', function () {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
            persistNote(textarea.value, true);
        }, 600);
    });

    textarea.addEventListener('blur', flushPendingSave);
    window.addEventListener('pagehide', flushPendingSave);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') flushPendingSave();
    });

    initializeNotes();
}());
