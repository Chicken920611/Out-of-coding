// GRID // ARCADE — shared player name helper.
//
// This is just a per-browser display label stored in localStorage, used
// when posting a score to the shared Firestore leaderboard. It is NOT an
// account or secure identity — anyone can type any name. Good enough for
// a hobby/friends leaderboard; see firestore.rules for what that trade-off
// means for write permissions.

const PLAYER_NAME_KEY = 'grid-arcade-player-name';

function getPlayerName() {
  return localStorage.getItem(PLAYER_NAME_KEY);
}

function setPlayerName(name) {
  name = (name || '').trim().slice(0, 24);
  if (!name) return getPlayerName();
  localStorage.setItem(PLAYER_NAME_KEY, name);
  return name;
}

function randomDefaultName() {
  return 'Player' + Math.floor(1000 + Math.random() * 9000);
}

// Returns a name, prompting the visitor to pick one the first time they
// ever play any game in this arcade (the name is shared across games
// since it's stored under one localStorage key).
function ensurePlayerName() {
  let name = getPlayerName();
  if (!name) {
    const chosen = window.prompt(
      "Pick a name for the shared leaderboard (everyone who plays will see it):",
      randomDefaultName()
    );
    name = setPlayerName(chosen || randomDefaultName());
  }
  return name;
}
