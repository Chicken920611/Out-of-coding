# GRID // ARCADE

Five small browser games with a shared, real-time leaderboard, built to run
as a static site on GitHub Pages.

- **GRID // TYPE** — typing speed challenge
- **GRID // XO** — tic-tac-toe (vs computer or 2-player, no leaderboard)
- **GRID // MATCH** — memory pairs
- **GRID // WORD** — Wordle-style word guessing
- **GRID // PULSE** — blind timing challenge

## Files

```
index.html            hub / game picker
typeclimb.html         )
tic-tac-toe.html       )
memory-match.html      ) the five games
wordgrid.html          )
pulse.html             )
firebase-config.js     Firebase project config (you fill this in)
firestore.rules        Firestore security rules (paste into console)
player-name.js         shared per-browser player-name helper
```

## Why Firebase

GitHub Pages only serves static files — there's no server to store scores
on. Four of the five games (everything except tic-tac-toe) keep a shared
leaderboard, so those need *some* place outside the browser to store
scores that every visitor can read and write. Firestore's free tier is
more than enough for a hobby leaderboard like this, and there's no backend
code to write or host — the games talk to it directly from the browser.

## One-time setup

1. Go to the [Firebase console](https://console.firebase.google.com) and
   create a project (the free "Spark" plan is fine).
2. In the project: **Build → Firestore Database → Create database** →
   start in production mode → pick any region.
3. Still in the project: **Project settings** (gear icon) → **General** →
   scroll to "Your apps" → click the `</>` (web) icon → register a web app
   (no need for Firebase Hosting, you're using GitHub Pages). It'll show
   you a `firebaseConfig` object.
4. Open `firebase-config.js` in this repo and paste your values into the
   matching fields (`apiKey`, `authDomain`, `projectId`, etc).
5. In the Firebase console: **Firestore Database → Rules** → replace the
   contents with everything in `firestore.rules` from this repo → **Publish**.
6. Commit and push. `firebase-config.js`'s `apiKey` is safe to commit —
   it identifies your project, it isn't a secret. The Firestore Rules
   from step 5 are what actually control who can read/write.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (all files at the repo root, or in
   a `/docs` folder — either works with GitHub Pages).
2. In the repo: **Settings → Pages** → set Source to the branch/folder
   you pushed to.
3. Wait a minute for it to build, then visit the URL GitHub gives you.
   `index.html` is the hub; every game links back to it.

No build step, no npm install — it's plain HTML/CSS/JS the whole way
through.

## How the shared leaderboard works

- The first time someone plays any game, they're prompted for a display
  name (stored in `localStorage`, not tied to any account). That name is
  attached to every score they post.
- Each game writes to its own Firestore collection (`memory_scores`,
  `typeclimb_scores`, `wordgrid_scores`, `pulse_scores`). Every visitor's
  browser is listening live to that collection, so scores appear for
  everyone within about a second of being posted — no page refresh
  needed.
- The **TOP …** list on each game shows the best scores from *everyone*;
  the small stat row above it (BEST, PLAYED, STREAK, etc.) is scoped to
  *your own* scores only, using the name you picked.
- Scores are **append-only** — nobody can edit or delete a score once
  it's posted (see the "Security" section below for why). There's no
  "Clear history" button anymore for that reason.

## Security notes (read this)

There's no login system here — `firestore.rules` allows anyone to *read*
every collection and *create* new score documents, but nobody can *update*
or *delete* anything. That's a deliberate trade-off for a hobby/friends
leaderboard:

- **Good:** nobody can tamper with or wipe someone else's score, and you
  don't need to build or maintain a login flow.
- **Limitation:** since there's no auth, anyone could technically post a
  score under any name, or spam junk entries (the rules validate field
  *types*, e.g. `moves` must be an integer, but can't verify a score is
  "real"). For a small group of friends this is a non-issue in practice.
  If it ever becomes one, the next step up is adding Firebase Anonymous
  Auth and tying `player` to the auth UID instead of a free-text name —
  that's a bigger change and not covered here.

## Local testing before you push

Since these are plain static files, you can preview locally with
anything that serves a folder over HTTP, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly via `file://` mostly works too, except
Firestore's SDK can be picky about the `file://` origin in some browsers
— a local HTTP server avoids that.)
