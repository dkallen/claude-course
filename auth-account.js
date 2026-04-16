(function () {
    function buildLoginHref() {
        var loginUrl = new URL('/login.html', window.location.origin);
        loginUrl.searchParams.set('redirect', window.location.pathname + window.location.search + window.location.hash);
        return loginUrl.toString();
    }

    function redirectToLogin() {
        window.location.replace(buildLoginHref());
    }

    function resolveUserLabel(user) {
        if (!user) return 'Account';
        var metadata = user.user_metadata || {};
        return metadata.full_name || metadata.name || user.email || 'Account';
    }

    function createAccountUi(user) {
        var style = document.createElement('style');
        style.textContent =
            '#auth-account { position: fixed; top: 14px; right: 14px; z-index: 900; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; }' +
            '#auth-account-toggle { border: 1px solid #ddd; background: rgba(255,255,255,0.96); color: #222; border-radius: 999px; padding: 0.55rem 0.8rem; font: inherit; font-size: 0.8rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.08); }' +
            '#auth-account-panel { position: absolute; top: calc(100% + 8px); right: 0; width: min(20rem, calc(100vw - 28px)); background: #fff; border: 1px solid #e5e5e5; border-radius: 14px; padding: 0.85rem; box-shadow: 0 14px 34px rgba(0,0,0,0.12); display: none; }' +
            '#auth-account.open #auth-account-panel { display: block; }' +
            '.auth-account-title { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: #888; margin-bottom: 0.2rem; }' +
            '.auth-account-email { font-size: 0.88rem; color: #222; line-height: 1.4; margin-bottom: 0.7rem; word-break: break-word; }' +
            '.auth-account-link, .auth-account-action { display: block; width: 100%; text-align: left; border: 0; background: #f6f6f6; color: #222; border-radius: 10px; padding: 0.65rem 0.75rem; font: inherit; font-size: 0.82rem; cursor: pointer; text-decoration: none; margin-top: 0.45rem; }' +
            '.auth-account-action.primary { background: #1a1a1a; color: #fff; }' +
            '.auth-account-status { font-size: 0.74rem; color: #777; min-height: 1rem; margin-top: 0.55rem; }' +
            '@media (max-width: 900px) { #auth-account { top: 54px; right: 12px; } }';
        document.head.appendChild(style);

        var container = document.createElement('div');
        container.id = 'auth-account';
        container.innerHTML =
            '<button id="auth-account-toggle" type="button">' + resolveUserLabel(user) + '</button>' +
            '<div id="auth-account-panel">' +
            '  <div class="auth-account-title">Signed in</div>' +
            '  <div class="auth-account-email">' + (user.email || 'Authenticated user') + '</div>' +
            '  <a class="auth-account-link" href="/login.html?mode=forgot">Forgot password</a>' +
            '  <button class="auth-account-action primary" id="auth-account-signout" type="button">Sign out</button>' +
            '  <div class="auth-account-status" id="auth-account-status"></div>' +
            '</div>';

        document.body.appendChild(container);

        var toggle = document.getElementById('auth-account-toggle');
        var signout = document.getElementById('auth-account-signout');
        var status = document.getElementById('auth-account-status');

        toggle.addEventListener('click', function () {
            container.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            if (!container.contains(event.target)) {
                container.classList.remove('open');
            }
        });

        signout.addEventListener('click', async function () {
            signout.disabled = true;
            status.textContent = 'Signing out...';
            try {
                var result = await window.supabaseClient.auth.signOut();
                if (result && result.error) throw result.error;
                redirectToLogin();
            } catch (error) {
                status.textContent = 'Could not sign out.';
                signout.disabled = false;
            }
        });
    }

    async function initAccountUi() {
        if (!window.supabaseClient || !window.supabaseReady) return;

        try {
            var user = await window.supabaseReady;
            if (!user) {
                redirectToLogin();
                return;
            }

            createAccountUi(user);
            window.supabaseClient.auth.onAuthStateChange(function (event, session) {
                if (!session) {
                    redirectToLogin();
                }
            });
        } catch (error) {
            redirectToLogin();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccountUi, { once: true });
    } else {
        initAccountUi();
    }
}());
