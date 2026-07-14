// leaderboard.js
// A local top-5 leaderboard persisted in the browser via localStorage.
// No backend needed — scores stay on the device that played them.

function getLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    // localStorage can throw in private/incognito mode in some browsers —
    // fail quietly and just play without a persisted leaderboard.
    return [];
  }
}

function saveLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    // Ignore — same reasoning as above.
  }
}

// Call once, at the moment a run ends, with the final score for that run.
// Returns the updated top-5 list (already sorted, already trimmed).
function submitScore(finalScore) {
  const entries = getLeaderboard();
  entries.push({ score: finalScore, date: new Date().toISOString() });
  entries.sort((a, b) => b.score - a.score);
  const trimmed = entries.slice(0, LEADERBOARD_MAX_ENTRIES);
  saveLeaderboard(trimmed);
  return trimmed;
}

// Checks BEFORE submitting — call this first if you want to show a
// "New High Score!" message, then call submitScore() afterward.
function isNewHighScore(finalScore) {
  const entries = getLeaderboard();
  if (entries.length < LEADERBOARD_MAX_ENTRIES) return true;
  return finalScore > entries[entries.length - 1].score;
}