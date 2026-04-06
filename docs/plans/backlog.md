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


### feedback tooltip truncates and misaligns on mobile

On smaller screens, the feedback tooltip text is clipped and the tooltip positioning does not align cleanly with the `Feedback` button. This makes the hint harder to read and gives the widget a rough feel even though the core feedback flow works.

Desired outcome:
- tooltip text wraps or resizes so the full message is visible
- tooltip positioning stays visually anchored to the button on mobile widths
- feedback affordance remains readable without overlapping the viewport edge


### notes tooltip truncates and misaligns on mobile

On smaller screens, the notes tooltip text is clipped and the tooltip positioning does not align cleanly with the `Notes` button. This makes the affordance harder to understand and gives the notes widget a rougher mobile presentation than intended.

Desired outcome:
- tooltip text wraps or resizes so the full message is visible
- tooltip positioning stays visually anchored to the button on mobile widths
- notes affordance remains readable without overlapping the viewport edge


### visible build/version stamp for browser verification

Add a simple visible build or version stamp so it is immediately obvious which frontend version a browser tab is running. This should help diagnose stale cached assets and reduce ambiguity during localhost testing.

Desired outcome:
- one version source is updated whenever frontend files change
- version is visible in the UI and/or browser console
- version can be checked quickly during manual verification


### dev cache-busting and verification guidance for localhost testing

Localhost testing can appear inconsistent when the browser keeps serving cached JavaScript after a frontend change. Add a lightweight cache-busting or verification approach so manual testing reliably exercises the current code.

Desired outcome:
- local frontend assets can be verified as current without guesswork
- README or testing guidance explains the refresh/disable-cache pattern
- future manual verification is less fragile after JS changes

## Resolved ideas