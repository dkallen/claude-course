(function () {
    var VERSION = "2026-04-06 b7e1f40 dirty";
    var BADGE_ID = 'course-version-badge';

    window.COURSE_FRONTEND_VERSION = VERSION;

    if (typeof console !== 'undefined' && console.info) {
        console.info('[course-version]', VERSION, window.location.pathname);
    }

    if (typeof document === 'undefined') return;
    if (document.getElementById(BADGE_ID)) return;

    var style = document.createElement('style');
    style.textContent =
        '#' + BADGE_ID + ' {' +
        '  position: fixed;' +
        '  top: 10px;' +
        '  right: 10px;' +
        '  z-index: 9997;' +
        '  padding: 0.22rem 0.45rem;' +
        '  border-radius: 999px;' +
        '  background: rgba(26, 26, 26, 0.72);' +
        '  color: #fff;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;' +
        '  font-size: 0.65rem;' +
        '  font-weight: 700;' +
        '  letter-spacing: 0.04em;' +
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.12);' +
        '  pointer-events: none;' +
        '  user-select: text;' +
        '}' +
        '@media (max-width: 480px) {' +
        '  #' + BADGE_ID + ' {' +
        '    top: 8px;' +
        '    right: 8px;' +
        '    font-size: 0.6rem;' +
        '    padding: 0.2rem 0.4rem;' +
        '  }' +
        '}';
    document.head.appendChild(style);

    var badge = document.createElement('div');
    badge.id = BADGE_ID;
    badge.textContent = VERSION;
    badge.setAttribute('aria-label', 'Frontend version ' + VERSION);
    document.body.appendChild(badge);
}());
