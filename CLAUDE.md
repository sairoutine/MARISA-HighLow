# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A canvas-based browser game (Marisa High & Low — a card-game where the loser plays Russian roulette). Targets three runtimes: web (RPGアツマール / GitHub Pages), and Electron desktop. The current default branch is `gh-pages` — committed `public/js/main.js` is what's served.

## Commands

```bash
npm run watch          # webpack-dev-server on :3000, hot-reload, opens browser
npm run compile:js     # production build → public/js/main.js (MODE=production)
npm run build:atsumaru # compile:js + zips public/ → releases/game.zip for RPGアツマール
npm run typecheck      # tsc --noEmit (type-check only, no output)
```

`compile:js` and `watch` set `NODE_OPTIONS=--openssl-legacy-provider` for webpack 4 compatibility with Node ≥17 (OpenSSL 3 dropped MD4).

After cloning, the engine submodule must be initialized or nothing will resolve:

```bash
git submodule update --init --recursive
```

## Architecture

### Language and build

The project's own code under `src/js/` (excluding the engine submodule) is **TypeScript**, built with `ts-loader`. `tsconfig.json` is `strict: true` with `target: "es5"`. Type checking happens during webpack via ts-loader, and can also be run standalone with `npm run typecheck`.

The engine submodule `src/js/hakureijs/` remains untyped JavaScript. Type definitions for the parts the game uses live in `src/js/hakurei.ts`, which also provides the runtime export. Consumers do `import Hakurei from "./hakurei"` (default) or `import { Util, Core } from "./hakurei"` (named).

`.js` files matched by webpack's `babel-loader` rule are now only the engine submodule (which is already ES5 and doesn't strictly need babel — kept for safety).

### Engine boundary

`src/js/hakureijs/` is a git submodule (`sairoutine/hakureijs`). **Treat it as a vendored library**: don't edit it as part of feature work in this repo, and don't add types to it. Add or update types in `src/js/hakurei.ts` instead.

Key engine surfaces in use: `Core`, `Util`, `Scene.Base`, `Scene.Loading`, `Object.Base`, `Object.Container`, `Object.UIParts`, `Object.UI.Group`, `Object.UI.Text`.

### Style

Modern TypeScript: `class extends`, `let`/`const`, arrow functions, `import`/`export`. The codebase used to be ES5 prototype style (`Util.inherit(Child, Parent)`); that style remains inside `hakureijs/` only. New game classes inherit from engine constructors directly via `class extends Hakurei.Object.Base`, etc.

### Lifecycle and scene graph

`Game` (src/js/game.ts) extends `Hakurei.Core` and registers all scenes with `scene_manager` at construction. Flow:

```
loading_preload (engine's loading scene, loads assets_preload.ts)
  → loading_all (src/js/scene/loading.ts, loads assets_all.ts)
  → rule (src/js/scene/rule.ts — instructions screen)
  → duel (src/js/scene/duel.ts — main gameplay)
  → clear  OR  clear_ex   (depending on final money)
```

`scene_manager.changeScene(name, AssetsConfig, nextSceneName)` is how the loading scenes chain.

### Duel is a scene-of-subscenes

`scene/duel.ts` is the gameplay container. It owns the persistent objects (`Deck`, `Marisa`, `Serif`, `RuleManager`) and switches **subscenes** for each phase:

- `tutorial` — first-run only (gated by `core.is_finish_tutorial`)
- `choose` — player picks High / Low / Same / Pass
- `win` / `lose` / `draw` / `pass` — result animations
- `dead` — Marisa shot
- `not_reach` — deck out, money below clear threshold

Subscenes inherit from `scene/duel/base.ts` and access the duel scene via the `duel` getter (typed as `SceneDuel`). When adding new gameplay states, add them as subscenes here, not new top-level scenes.

### Game rules live in RuleManager

`src/js/logic/rule_manager.ts` is the source of truth for win/loss state, money (`_money`, doubles on win, ×10 on Same correct), and the roulette bullet count (`_bullet_num`, starts at 5). Clear thresholds are in `src/js/constant.ts`:

- `CLEAR_NEED_MONEY` = 1億 (100,000,000)
- `EX_CLEAR_NEED_MONEY` = 20億 (2,000,000,000)

`isGameOver` / `isClear` / `isExClear` all key off `deck.count() === 0` plus a money threshold — game ends when the deck empties, not on bullet count.

### Asset loading pattern

Two asset configs, loaded in two phases:
- `assets_preload.ts` — minimum needed to render the loading screen itself (just `caution.png`)
- `assets_all.ts` — everything else, loaded behind the loading screen with a progress bar

Sounds in `assets_all.ts` are referenced **without extension**; `scene/loading.ts` picks `.ogg` or `.m4a` at runtime via `Util.canPlayOgg()`. When adding sounds, ship both formats in `public/sound/`.

### Debug toggles

`src/js/constant.ts` has `DEBUG`, `DEBUG_MUTE`, `DEBUG_SCENE`. When `DEBUG: true`:
- The loading screen jumps straight to `DEBUG_SCENE` instead of `rule`
- `Game.setupDebug` wires up an HTML debug panel (Run/Stop/FPS/capture/double-money buttons) into `<div id="debug">`

These are flipped to `false` for release; don't commit a `true`.

### Output and deployment

- webpack writes to `public/js/main.js` (committed — `gh-pages` serves it directly).
- `public/electron.js` is the Electron entry point and is independent of the webpack build (loads `public/index.html`).
- `public/package.json` is for `electron-packager`, not the project itself.
- `.gitignore` excludes `public/js/main.js` and `main.min.js`, but the actual `gh-pages` branch state has the compiled file checked in — be aware when committing build output.

## Conventions worth knowing

- Comments and UI strings are in Japanese; keep new ones in Japanese to match.
- Identifiers: `snake_case` for instance fields prefixed with `_` for private (`this._opened_card`), `camelCase` for methods. (TypeScript `private` modifier is used in addition to the underscore.)
- Image asset keys are flat strings registered in `assets_all.ts` and looked up with `core.image_loader.getImage("key")`. Marisa's facial expressions are composed by stacking `body_*` + `head_*` + `mouse_*_*` + `eye_*_*` — see `src/js/object/marisa.ts` for the dread-level → image-name tables.
