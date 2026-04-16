(function () {
    function defaultRedirectPath() {
        return '/index.html';
    }

    function sanitizeRedirect(rawRedirect) {
        if (!rawRedirect) return defaultRedirectPath();

        try {
            var url = new URL(rawRedirect, window.location.origin);
            if (url.origin !== window.location.origin) return defaultRedirectPath();
            if (url.pathname === '/login.html') return defaultRedirectPath();
            return url.pathname + url.search + url.hash;
        } catch (error) {
            return defaultRedirectPath();
        }
    }

    function buildLoginCallbackUrl(mode) {
        var callbackUrl = new URL('/login.html', window.location.origin);
        var redirect = sanitizeRedirect(new URLSearchParams(window.location.search).get('redirect'));

        callbackUrl.searchParams.set('redirect', redirect);
        if (mode) callbackUrl.searchParams.set('mode', mode);

        return callbackUrl.toString();
    }

    function resolveNextPath() {
        var params = new URLSearchParams(window.location.search);
        return sanitizeRedirect(params.get('redirect'));
    }

    function setMessage(text, type) {
        var el = document.getElementById('auth-msg');
        el.textContent = text || '';
        el.className = 'auth-msg' + (type ? ' ' + type : '');
    }

    function setFormDisabled(formId, disabled) {
        var form = document.getElementById(formId);
        if (!form) return;
        Array.prototype.forEach.call(form.querySelectorAll('input, button'), function (field) {
            field.disabled = !!disabled;
        });
    }

    function switchTab(tab) {
        var resetTabButton = document.querySelector('[data-auth-tab="reset"]');
        if (resetTabButton) {
            resetTabButton.style.display = tab === 'reset' ? '' : 'none';
        }

        ['signin', 'signup', 'magic', 'forgot', 'reset'].forEach(function (name) {
            var panel = document.getElementById('auth-panel-' + name);
            var button = document.querySelector('[data-auth-tab="' + name + '"]');
            var isActive = name === tab;

            if (panel) panel.style.display = isActive ? '' : 'none';
            if (button) button.classList.toggle('active', isActive);
        });

        setMessage('');
    }

    async function signIn() {
        var email = document.getElementById('auth-email-si').value.trim();
        var password = document.getElementById('auth-password-si').value;

        if (!email || !password) {
            setMessage('Email and password required.', 'error');
            return;
        }

        setFormDisabled('auth-panel-signin', true);
        setMessage('Signing in...');

        try {
            var result = await window.supabaseClient.auth.signInWithPassword({ email: email, password: password });
            if (result.error) throw result.error;
            window.location.replace(resolveNextPath());
        } catch (error) {
            setMessage(error.message || 'Could not sign in.', 'error');
            setFormDisabled('auth-panel-signin', false);
        }
    }

    async function signUp() {
        var email = document.getElementById('auth-email-su').value.trim();
        var password = document.getElementById('auth-password-su').value;

        if (!email || !password) {
            setMessage('Email and password required.', 'error');
            return;
        }

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters.', 'error');
            return;
        }

        setFormDisabled('auth-panel-signup', true);
        setMessage('Creating account...');

        try {
            var result = await window.supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: buildLoginCallbackUrl()
                }
            });
            if (result.error) throw result.error;
            setMessage('Check your email to confirm your account.', 'success');
        } catch (error) {
            setMessage(error.message || 'Could not create account.', 'error');
        } finally {
            setFormDisabled('auth-panel-signup', false);
        }
    }

    async function sendMagicLink() {
        var email = document.getElementById('auth-email-ml').value.trim();

        if (!email) {
            setMessage('Email required.', 'error');
            return;
        }

        setFormDisabled('auth-panel-magic', true);
        setMessage('Sending magic link...');

        try {
            var result = await window.supabaseClient.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: buildLoginCallbackUrl()
                }
            });
            if (result.error) throw result.error;
            setMessage('Magic link sent. Check your email.', 'success');
        } catch (error) {
            setMessage(error.message || 'Could not send magic link.', 'error');
        } finally {
            setFormDisabled('auth-panel-magic', false);
        }
    }

    async function sendPasswordReset() {
        var email = document.getElementById('auth-email-forgot').value.trim();

        if (!email) {
            setMessage('Email required.', 'error');
            return;
        }

        setFormDisabled('auth-panel-forgot', true);
        setMessage('Sending password reset...');

        try {
            var result = await window.supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: buildLoginCallbackUrl('reset')
            });
            if (result.error) throw result.error;
            setMessage('Password reset email sent.', 'success');
        } catch (error) {
            setMessage(error.message || 'Could not send password reset.', 'error');
        } finally {
            setFormDisabled('auth-panel-forgot', false);
        }
    }

    async function updatePassword() {
        var password = document.getElementById('auth-password-reset').value;
        var confirm = document.getElementById('auth-password-reset-confirm').value;

        if (!password || !confirm) {
            setMessage('Enter and confirm your new password.', 'error');
            return;
        }

        if (password !== confirm) {
            setMessage('Passwords do not match.', 'error');
            return;
        }

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters.', 'error');
            return;
        }

        setFormDisabled('auth-panel-reset', true);
        setMessage('Updating password...');

        try {
            var result = await window.supabaseClient.auth.updateUser({ password: password });
            if (result.error) throw result.error;
            setMessage('Password updated. Redirecting...', 'success');
            window.setTimeout(function () {
                window.location.replace(resolveNextPath());
            }, 700);
        } catch (error) {
            setMessage(error.message || 'Could not update password.', 'error');
            setFormDisabled('auth-panel-reset', false);
        }
    }

    async function bootstrap() {
        var params = new URLSearchParams(window.location.search);
        var initialMode = params.get('mode') || 'signin';
        var isResetMode = initialMode === 'reset';
        switchTab(initialMode === 'reset' ? 'reset' : initialMode);

        document.getElementById('auth-panel-signin').addEventListener('submit', function (event) {
            event.preventDefault();
            signIn();
        });
        document.getElementById('auth-panel-signup').addEventListener('submit', function (event) {
            event.preventDefault();
            signUp();
        });
        document.getElementById('auth-panel-magic').addEventListener('submit', function (event) {
            event.preventDefault();
            sendMagicLink();
        });
        document.getElementById('auth-panel-forgot').addEventListener('submit', function (event) {
            event.preventDefault();
            sendPasswordReset();
        });
        document.getElementById('auth-panel-reset').addEventListener('submit', function (event) {
            event.preventDefault();
            updatePassword();
        });

        Array.prototype.forEach.call(document.querySelectorAll('[data-auth-tab]'), function (button) {
            button.addEventListener('click', function () {
                switchTab(button.getAttribute('data-auth-tab'));
            });
        });

        window.supabaseClient.auth.onAuthStateChange(function (event, session) {
            if (event === 'PASSWORD_RECOVERY') {
                switchTab('reset');
                setMessage('Choose a new password for your account.');
                return;
            }

            if (session && !isResetMode) {
                window.location.replace(resolveNextPath());
            }
        });

        try {
            var user = await window.supabaseReady;
            if (user && !isResetMode) {
                window.location.replace(resolveNextPath());
            } else if (isResetMode) {
                switchTab('reset');
            }
        } catch (error) {
            setMessage('Authentication is unavailable right now.', 'error');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
    } else {
        bootstrap();
    }
}());
