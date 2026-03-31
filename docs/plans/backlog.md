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

## Resolved ideas