# 🐱 The Great Catscape

A pixel-art endless runner built with **vanilla JavaScript and HTML5 Canvas** — no frameworks, no libraries, no build tools.

**[▶ Play it here](https://devcodemate.github.io/the-great-catscape/)**

![Made with vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![No frameworks](https://img.shields.io/badge/Frameworks-None-blue)
![HTML5 Canvas](https://img.shields.io/badge/Rendering-HTML5%20Canvas-red)

## Screenshots

| Start | Gameplay | Game Over |
|---|---|---|
| ![Start screen](screenshots/start-game.png) | ![Gameplay](screenshots/gameplay.png) | ![Game over screen](screenshots/game-over.png) |

---

🇬🇧 **[English](#english)** | 🇦🇷 **[Español](#español)**

---

<a name="english"></a>
## 🇬🇧 English

### About

Naga, the CodeMate mascot, is on the run from everything cats hate: vacuum cleaners, cucumbers, water buckets, and the dreaded vet cone. Jump over obstacles, survive as long as you can across 5 increasingly difficult levels, and grab the golden chick power-up for a few seconds of Spirit Bear invincibility — a nod to Dota 2's Lone Druid.

This project exists to show a different set of skills than the rest of my portfolio. My other projects mostly follow a "fetch data from an API and render it" pattern; this one is about **game state management, a real-time render loop, physics, and collision detection** — no API involved.

### Features

- **Custom game loop** built on `requestAnimationFrame`, using delta-time so physics stay consistent regardless of screen refresh rate (60Hz, 120Hz, 144Hz...)
- **Physics-based jump** (gravity + initial velocity), mathematically tuned so every obstacle is guaranteed clearable with good timing
- **Procedural obstacle spawning** with randomized timing gaps
- **AABB collision detection**, with a slightly forgiving hitbox so near-misses feel fair
- **5-level difficulty progression**, scaling obstacle speed and spawn frequency over survival time
- **Power-up system**: a collectible rune (styled as a little chick) grants temporary invincibility, with a pulsing visual aura
- **Score system**: points per second survived, plus bonus points for power-up pickups
- **Local leaderboard**: top 5 scores, persisted via `localStorage`, with a "New High Score!" callout
- **Hand-crafted pixel-art sprites**, including a sprite-sheet-based run/jump/hurt animation cycle for the main character

### Built with

- Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies
- HTML5 Canvas 2D API for all rendering
- Pixel art generated with AI as a starting reference, then cleaned up and resized in [Piskel](https://www.piskelapp.com/)
- Deployed on GitHub Pages

### Development journey (step by step)

1. **Project setup & player physics** — base HTML/CSS/Canvas structure, a simple game loop, and gravity-based jump physics for the player.
2. **Sprite animation** — replaced the placeholder square with a real pixel-art sprite sheet (4 frames: run 1, run 2, jump, hurt), swapped based on player state.
3. **Obstacles, collision & difficulty** — built a spawn system for 4 obstacle types, AABB collision detection, a `GAME_OVER` state, and a 5-level difficulty curve (obstacle speed + spawn frequency scale with survival time).
4. **Score & power-up** — added a point system (survival time + bonuses), and a collectible "Spirit Bear" rune that grants temporary invincibility — a small nod to Dota 2, tying into my own gaming background.
5. **Local leaderboard** — top-5 high scores persisted with `localStorage`, no backend required.
6. **Pixel art pass** — generated and cleaned up final sprites for every obstacle and the power-up rune, replacing all placeholder shapes.
7. **Polish & scale-up** — resized the whole game ~25% larger, redesigned the start/game-over screens with rounded panels and background details, and renamed the project.
8. **Deploy** — published via GitHub Pages, with a full git history using Conventional Commits.

### What I learned

- **Delta-time physics**: early on, obstacle movement used delta-time (frame-rate independent) while player physics didn't — on a high-refresh-rate screen, this made the jump's airtime too short to clear anything. Fixing it meant converting gravity and jump force to real-world units (px/s, px/s²) instead of "per frame" values.
- **Debugging by calculation, not guesswork**: at one point the game was jumpable but *mathematically impossible to win* — the total time in the air was shorter than the time it took the widest obstacle to cross the player's position. I calculated both values from the physics formulas directly, found the mismatch, and re-tuned gravity and jump force to fix it — without needing to "eyeball" dozens of trial-and-error playtests.
- **AABB collision with forgiving hitboxes**: a strict bounding-box collision check feels unfair once sprites have transparent padding around them; shrinking the collision box slightly (independent of the visual sprite size) made hits feel much more accurate to what the player sees.
- **Working with AI-generated pixel art**: AI image tools are useful for a quick reference/starting point, but rarely produce clean, true alpha transparency — checkerboard "transparency previews" often get baked in as real pixels. Cleaning this up reliably meant writing a small flood-fill script (Python + PIL) to detect and remove background regions programmatically, rather than fixing each sprite by hand.
- **State machines matter, even in a small game**: keeping `GAME_STATE` (start/playing/game over) and the player's own state (`running`/`jumping`/`hurt`) explicit and centralized made adding new features (like the power-up's invincibility state) far easier than if states had been scattered across boolean flags.

### Run it locally

```bash
git clone https://github.com/devCODEMATE/the-great-catscape.git
cd the-great-catscape
```

Open `index.html` with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension, or any local static server.

### Author

Built by [Flo](https://github.com/devCODEMATE) — part of the [CodeMate](https://github.com/devCODEMATE) portfolio.

---

<a name="español"></a>
## 🇦🇷 Español

### Sobre el juego

Naga, la mascota de CodeMate, escapa de todo lo que un gato odia: aspiradoras, pepinos, baldes de agua, y el temido cono de veterinario. Hay que saltar los obstáculos, sobrevivir lo más posible a través de 5 niveles de dificultad creciente, y agarrar el power-up del pollito dorado para conseguir unos segundos de invencibilidad "Spirit Bear" — un guiño a Lone Druid de Dota 2.

Este proyecto existe para mostrar un conjunto de habilidades distinto al resto de mi portfolio. Mis otros proyectos siguen mayormente un patrón de "traer datos de una API y mostrarlos"; este es sobre **manejo de estado de juego, un loop de renderizado en tiempo real, física, y detección de colisiones** — sin ninguna API de por medio.

### Características

- **Game loop propio** construido sobre `requestAnimationFrame`, usando delta-time para que la física se mantenga consistente sin importar la frecuencia de refresco de la pantalla (60Hz, 120Hz, 144Hz...)
- **Salto basado en física real** (gravedad + velocidad inicial), ajustado matemáticamente para que cualquier obstáculo sea esquivable con buen timing
- **Generación procedural de obstáculos** con intervalos de aparición aleatorios
- **Detección de colisión AABB**, con un hitbox levemente más chico que el sprite visual para que los casi-choques se sientan justos
- **Progresión de dificultad de 5 niveles**, escalando velocidad y frecuencia de obstáculos según el tiempo sobrevivido
- **Sistema de power-up**: una runa coleccionable (con forma de pollito) otorga invencibilidad temporal, con un aura visual pulsante
- **Sistema de puntaje**: puntos por segundo sobrevivido, más bonus por agarrar el power-up
- **Leaderboard local**: mejores 5 puntajes, persistidos con `localStorage`, con aviso de "¡Nuevo Récord!"
- **Sprites pixel-art hechos a mano**, incluyendo un ciclo de animación de correr/saltar/golpe basado en sprite sheet para el personaje principal

### Construido con

- HTML, CSS y JavaScript vanilla — sin frameworks, sin herramientas de build, sin dependencias
- API de Canvas 2D de HTML5 para todo el renderizado
- Pixel art generado con IA como referencia inicial, después limpiado y redimensionado en [Piskel](https://www.piskelapp.com/)
- Deployado en GitHub Pages

### Proceso de desarrollo (paso a paso)

1. **Setup del proyecto y física del jugador** — estructura base de HTML/CSS/Canvas, un game loop simple, y física de salto basada en gravedad.
2. **Animación del sprite** — reemplacé el cuadrado placeholder por un sprite sheet pixel-art real (4 frames: correr 1, correr 2, salto, golpe), que cambia según el estado del jugador.
3. **Obstáculos, colisión y dificultad** — armé un sistema de spawn para 4 tipos de obstáculos, detección de colisión AABB, un estado de `GAME_OVER`, y una curva de dificultad de 5 niveles (velocidad y frecuencia de spawn escalan con el tiempo sobrevivido).
4. **Score y power-up** — agregué un sistema de puntos (tiempo sobrevivido + bonus), y una runa coleccionable "Spirit Bear" que otorga invencibilidad temporal — un guiño a Dota 2, conectado con mi propio gusto por los videojuegos.
5. **Leaderboard local** — mejores 5 puntajes persistidos con `localStorage`, sin necesidad de backend.
6. **Ronda de pixel art** — generé y limpié los sprites finales de cada obstáculo y de la runa del power-up, reemplazando todas las formas geométricas placeholder.
7. **Pulido y escalado** — agrandé todo el juego ~25%, rediseñé las pantallas de inicio y Game Over con paneles redondeados y detalles de fondo, y renombré el proyecto.
8. **Deploy** — publicado vía GitHub Pages, con un historial de git completo usando Conventional Commits.

### Qué aprendí

- **Física basada en delta-time**: al principio, el movimiento de los obstáculos usaba delta-time (independiente del framerate) pero la física del jugador no — en una pantalla de alta frecuencia de refresco, esto hacía que el tiempo en el aire del salto fuera demasiado corto para esquivar nada. Arreglarlo significó convertir la gravedad y la fuerza del salto a unidades del mundo real (px/s, px/s²) en vez de valores "por frame".
- **Debuggear con cálculo, no a prueba y error**: en un momento el juego se podía jugar (saltaba bien) pero era *matemáticamente imposible de ganar* — el tiempo total en el aire era menor al tiempo que tardaba el obstáculo más ancho en cruzar la posición del jugador. Calculé ambos valores directamente desde las fórmulas de física, encontré el desajuste, y reajusté la gravedad y la fuerza del salto para solucionarlo — sin necesitar "tantear a ojo" con decenas de partidas de prueba.
- **Colisión AABB con hitboxes perdonadores**: una detección de colisión estricta por caja se siente injusta una vez que los sprites tienen relleno transparente alrededor; achicar la caja de colisión un poco (independiente del tamaño visual del sprite) hizo que los choques se sintieran mucho más fieles a lo que el jugador realmente ve.
- **Trabajar con pixel art generado por IA**: las herramientas de IA para imágenes son útiles como referencia rápida o punto de partida, pero rara vez producen transparencia alfa limpia de verdad — el cuadriculado de "vista previa de transparencia" muchas veces queda pegado como píxeles reales. Limpiar esto de forma confiable significó escribir un pequeño script de flood-fill (Python + PIL) para detectar y quitar las regiones de fondo de forma programática, en vez de arreglar cada sprite a mano.
- **Las máquinas de estado importan, incluso en un juego chico**: mantener el `GAME_STATE` (inicio/jugando/game over) y el estado propio del jugador (`running`/`jumping`/`hurt`) explícitos y centralizados hizo que agregar funcionalidades nuevas (como el estado de invencibilidad del power-up) fuera mucho más fácil que si los estados hubieran estado dispersos en variables booleanas sueltas.

### Cómo correrlo localmente

```bash
git clone https://github.com/devCODEMATE/the-great-catscape.git
cd the-great-catscape
```

Abrí `index.html` con la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de VS Code, o cualquier servidor estático local.

### Autora

Hecho por [Flo](https://github.com/devCODEMATE) — parte del portfolio de [CodeMate](https://github.com/devCODEMATE).