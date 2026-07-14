// obstacles.js
// Everything about the things Naga has to dodge: spawning, movement, drawing,
// and collision detection against the player. Difficulty scales over time
// through the LEVELS table defined in constants.js.

// Preload any pixel-art sprites declared on OBSTACLE_TYPES (via spriteSrc).
// Types without a spriteSrc keep using their placeholder shape until their
// art is ready — this lets us swap them in one at a time.
const obstacleSprites = {};
OBSTACLE_TYPES.forEach((type) => {
  if (type.spriteSrc) {
    const img = new Image();
    img.src = type.spriteSrc;
    obstacleSprites[type.id] = img;
  }
});

let obstacles = [];
let survivalTime = 0;      // ms survived in the current run — drives the level lookup
let nextSpawnInMs = 0;     // countdown (in ms) until the next obstacle spawns

function resetObstacles() {
  obstacles = [];
  survivalTime = 0;
  nextSpawnInMs = randomSpawnInterval(getCurrentLevel());
}

// Finds the highest level whose time threshold has been reached
function getCurrentLevel() {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (survivalTime >= level.time) {
      current = level;
    } else {
      break;
    }
  }
  return current;
}

// 1-based level number, handy for showing "Level 3" in the UI
function getCurrentLevelNumber() {
  return LEVELS.indexOf(getCurrentLevel()) + 1;
}

function randomSpawnInterval(level) {
  return Math.random() * (level.spawnMax - level.spawnMin) + level.spawnMin;
}

function spawnObstacle() {
  const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
  obstacles.push({
    type: type.id,
    x: CANVAS_WIDTH,
    y: GROUND_Y - type.height,
    width: type.width,
    height: type.height,
    color: type.color,
  });
}

function updateObstacles(delta) {
  survivalTime += delta;
  const level = getCurrentLevel();

  // Countdown to the next spawn, scaled by real elapsed time (not frame count)
  nextSpawnInMs -= delta;
  if (nextSpawnInMs <= 0) {
    spawnObstacle();
    nextSpawnInMs = randomSpawnInterval(level);
  }

  // Move every obstacle left at the current level's speed (px/second),
  // then drop any that scrolled off-screen
  const moveAmount = level.speed * (delta / 1000);
  obstacles.forEach((obstacle) => {
    obstacle.x -= moveAmount;
  });
  obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0);
}

function drawObstacles(ctx) {
  obstacles.forEach((obstacle) => drawObstacleShape(ctx, obstacle));
}

// Placeholder geometric shapes — one distinct silhouette per obstacle type.
// Every shape gets a dark outline so it stays visible regardless of its fill
// color or what's behind it. These get swapped for pixel-art sprites later
// without touching any other logic.
function drawObstacleShape(ctx, obstacle) {
  const sprite = obstacleSprites[obstacle.type];
  if (sprite && sprite.complete && sprite.naturalWidth > 0) {
    ctx.drawImage(sprite, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    return;
  }

  ctx.fillStyle = obstacle.color;
  ctx.strokeStyle = COLORS.navy;
  ctx.lineWidth = 3;

  switch (obstacle.type) {
    case 'cucumber': {
      ctx.beginPath();
      ctx.ellipse(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2,
        obstacle.height / 2,
        0, 0, Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'bucket': {
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width * 0.1, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width * 0.9, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'vacuum': {
      const bodyY = obstacle.y + obstacle.height * 0.3;
      const bodyHeight = obstacle.height * 0.7;
      ctx.fillRect(obstacle.x, bodyY, obstacle.width, bodyHeight);
      ctx.strokeRect(obstacle.x, bodyY, obstacle.width, bodyHeight);

      const handleWidth = obstacle.width * 0.18;
      const handleX = obstacle.x + obstacle.width * 0.25;
      const handleHeight = obstacle.height * 0.35;
      ctx.fillRect(handleX, obstacle.y, handleWidth, handleHeight);
      ctx.strokeRect(handleX, obstacle.y, handleWidth, handleHeight);
      break;
    }
    case 'cone': {
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
  }
}

// Axis-Aligned Bounding Box collision, with a small forgiving padding on
// the player's box (the sprite has transparent padding baked in, so a strict
// box-vs-box check would feel unfairly harsh).
function checkCollision(obstacle) {
  const playerLeft = player.x + PLAYER_HITBOX_PADDING;
  const playerRight = player.x + player.width - PLAYER_HITBOX_PADDING;
  const playerTop = (player.y - player.height) + PLAYER_HITBOX_PADDING;
  const playerBottom = player.y - PLAYER_HITBOX_PADDING;

  const obstacleLeft = obstacle.x;
  const obstacleRight = obstacle.x + obstacle.width;
  const obstacleTop = obstacle.y;
  const obstacleBottom = obstacle.y + obstacle.height;

  return (
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight &&
    playerBottom > obstacleTop &&
    playerTop < obstacleBottom
  );
}

function checkAllCollisions() {
  if (isPlayerInvincible()) return false;
  return obstacles.some((obstacle) => checkCollision(obstacle));
}