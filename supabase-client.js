// supabase-client.js
// Initializes the Supabase client and exposes it globally.
// Load this after the Supabase CDN script, before any component that needs auth or DB access.
//
// Exposes:
//   window.supabaseClient  — initialized Supabase client instance
//   window.supabaseReady   — Promise that resolves with the user object (or null if not signed in)

(function () {
    var SUPABASE_URL = 'https://gvqwyldixlrcaciipexe.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_fMpfsER3onCeWvuO0emblA_Tqc31sqQ';

    var client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.supabaseClient = client;

    window.supabaseReady = client.auth.getSession().then(function (result) {
        var session = result.data && result.data.session;
        return session ? session.user : null;
    });
}());
