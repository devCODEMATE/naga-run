// constants.js
// Shared configuration values used across the game.
// Kept in one place so tuning the game feel doesn't mean hunting through every file.

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 300;

// Where the "floor" sits on the canvas (used by the player for ground collision)
const GROUND_Y = CANVAS_HEIGHT - 40;

// Physics — expressed in real-world units so the jump feels the same
// regardless of the screen's refresh rate (60Hz, 120Hz, 144Hz, etc.)
// Tuned so total airtime (~0.85s) comfortably exceeds the time it takes the
// widest obstacle to cross the player's position at Level 1 speed (~0.63s) —
// otherwise clearing it is mathematically impossible no matter the timing.
const GRAVITY = 1330;       // px per second^2, pulls the player back down
const JUMP_FORCE = -565;    // px per second, negative = upward velocity when jumping

// Brand colors (kept in sync with css/style.css)
const COLORS = {
  navy: '#073b4c',
  purple: '#5a527a',
  yellow: '#ffd166',
  teal: '#6b9e93',
  white: '#ffffff',
  black: '#000000',
};

// Game states (simple state machine)
const GAME_STATE = {
  START: 'START',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
};

// Sprite sheet layout — must match the exported PNG from Piskel:
// 4 frames, 160x88 each, laid out horizontally (640x88 total)
const SPRITE_FRAME_WIDTH = 160;
const SPRITE_FRAME_HEIGHT = 88;

// Frame index (0-based, left to right in the sheet)
const FRAME_RUN_1 = 0;
const FRAME_RUN_2 = 1;
const FRAME_JUMP = 2;
const FRAME_HURT = 3;

// How many milliseconds between swapping Run 1 <-> Run 2 while on the ground
// (slower = the run cycle reads more clearly to the eye)
const RUN_ANIMATION_SPEED = 190;

// Obstacle system
// Each type has its own silhouette (see obstacles.js drawObstacleShape) and size.
const OBSTACLE_TYPES = [
  { id: 'cucumber', width: 40, height: 22, color: COLORS.teal, spriteSrc: 'assets/obstacle-cucumber.png?v=1' },
  { id: 'bucket', width: 37, height: 43, color: COLORS.white, spriteSrc: 'assets/obstacle-bucket.png?v=1' },
  { id: 'vacuum', width: 52, height: 51, color: COLORS.black, spriteSrc: 'assets/obstacle-vacuum.png?v=1' },
  { id: 'cone', width: 41, height: 44, color: COLORS.yellow, spriteSrc: 'assets/obstacle-cone.png?v=1' },
];

// Shrinks the player's collision box slightly so near-misses feel fair
// (the sprite's transparent padding otherwise makes hits feel too strict)
const PLAYER_HITBOX_PADDING = 14;

// Score system — base points per second survived, plus rune pickup bonuses
const SCORE_PER_SECOND = 10;

// Spirit Bear power-up (rune pickup, a nod to Dota 2 runes + Lone Druid's ultimate)
const RUNE_WIDTH = 28;
const RUNE_HEIGHT = 28;
const RUNE_MIN_HEIGHT_ABOVE_GROUND = 60;  // lowest the rune floats above the ground
const RUNE_MAX_HEIGHT_ABOVE_GROUND = 115; // highest the rune floats above the ground
const RUNE_SPAWN_MIN_MS = 9000;
const RUNE_SPAWN_MAX_MS = 16000;
const RUNE_SCORE_BONUS = 50;
const INVINCIBILITY_DURATION_MS = 5000;
const RUNE_SPRITE_SRC = 'assets/rune-chick.png?v=1';

// Local leaderboard (persisted in localStorage, no backend needed)
const LEADERBOARD_STORAGE_KEY = 'naga-run-leaderboard';
const LEADERBOARD_MAX_ENTRIES = 5;

// Difficulty progression — 5 levels, keyed off how long you've survived (ms).
// speed is in px/second, spawnMin/spawnMax are the gap range in ms between obstacles.
// Level 1 is deliberately gentle; level 5 is "hard hard hard" as requested.
const LEVELS = [
  { time: 0,     speed: 180, spawnMin: 1500, spawnMax: 2600 }, // Level 1 - easiest
  { time: 12000, speed: 220, spawnMin: 1250, spawnMax: 2200 }, // Level 2
  { time: 24000, speed: 260, spawnMin: 1050, spawnMax: 1850 }, // Level 3
  { time: 36000, speed: 310, spawnMin: 850,  spawnMax: 1500 }, // Level 4
  { time: 48000, speed: 380, spawnMin: 650,  spawnMax: 1150 }, // Level 5 - hardest
];