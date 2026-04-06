# This is a backlog of ideas. 

Ideas are initially placed at the bottom of [# Open Ideas](#open-ideas) Once an idea is implemented, it is moved to the bottom of the section [# Resolved Ideas](#resolved-ideas) along with the date & time it was moved.

Each idea starts with ###.

## Open ideas

### full user identity and authentication

### more durable personalized notes and feedback

Currently, notes and feedback are personalized but depend upon github Gist which is awkward. Establish a more robust soluton that is still affordable.

### AI-enabled review of exercises
  {
    "id": "6248557c-f94b-4214-a629-c08f10e0cb7d",
    "author": "David Allen",
    "page": "modules/module-4-exercise.html",
    "timestamp": "2026-03-30T02:49:15.937Z",
    "comment": "when you offer a guided exercise, it would be cool to design them so the user could do them and submit artifacts for review to meet criteria relevant to the module."
  }

### WAF and hardened security posture

Internet-facing auth and data storage opens attack surface. Evaluate Cloudflare free tier or similar WAF. Review CAPTCHA on signup (Supabase supports hCaptcha). Ensure Supabase RLS policies are thorough. Defer detailed implementation until core IAM and persistence are live.

### Published privacy policy

Needed to support user identity, authentication, and feedback collection. Must be in place before launching IAM and feedback features.

### add pre-commit hook for running tests 

### automate frontend version stamp generation from git metadata

The visible version stamp is useful, but it should not rely on manual bumps. Generate it automatically from Git metadata whenever the frontend starts or tests run.

Desired outcome:
- version stamp is regenerated before `npm start` and `npm test`
- displayed version includes enough information to identify the running code quickly
- local uncommitted changes can be surfaced clearly, such as with a `dirty` marker

## Resolved ideas

### feedback tooltip truncates and misaligns on mobile

Resolved on 2026-04-05 21:52 CDT.

On smaller screens, the feedback tooltip text was clipped and the tooltip positioning did not align cleanly with the `Feedback` button. Tooltip behavior now wraps helper text, stays anchored to the button, and avoids the viewport-edge clipping seen earlier.

### notes tooltip truncates and misaligns on mobile

Resolved on 2026-04-05 21:52 CDT.

On smaller screens, the notes tooltip text was clipped and the tooltip positioning did not align cleanly with the `Notes` button. Tooltip behavior now wraps helper text, stays anchored to the button, and avoids the viewport-edge clipping seen earlier.

### visible build/version stamp for browser verification

Resolved on 2026-04-05 21:52 CDT.

Added a visible frontend version badge and console stamp so it is immediately clearer which frontend version a browser tab is running during localhost verification.

### dev cache-busting and verification guidance for localhost testing

Resolved on 2026-04-05 21:52 CDT.

README and testing strategy guidance now explain the localhost verification workflow, including disabling cache in DevTools and using cache-busting fetch checks when a browser tab appears stale.
