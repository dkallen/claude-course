(function () {
    function buildLoginHref() {
        var loginUrl = new URL('/login.html', window.location.origin);
        loginUrl.searchParams.set('redirect', window.location.pathname + window.location.search + window.location.hash);
        return loginUrl.toString();
    }

    function redirectToLogin() {
        window.location.replace(buildLoginHref());
    }

    async function requireAuth() {
        if (!window.supabaseClient || !window.supabaseReady) {
            redirectToLogin();
            return;
        }

        try {
            var user = await window.supabaseReady;
            if (!user) {
                redirectToLogin();
            }
        } catch (error) {
            redirectToLogin();
        }
    }

    requireAuth();
}());
