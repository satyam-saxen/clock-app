# Clock App - Project Information

## High-Level Purpose
A minimal, fullscreen animated clock built with React, specifically designed to function as a screensaver on macOS. It features smooth scrolling digit animations.

## Architecture & Design
- **UI Layer:** React-based single-page application.
- **Build System:** Vite, configured with `vite-plugin-singlefile` to produce a self-contained HTML file.
- **Desktop Wrapper:** Electron, used to provide a native macOS experience (fullscreen, no borders, cursor hiding, exit on interaction).

## Tech Stack & Primer
- **React (v19):** A JavaScript library for building user interfaces.
- **Vite (v7):** A fast frontend build tool and development server.
- **Electron (v37):** A framework for building desktop applications using web technologies.
- **vite-plugin-singlefile:** A plugin that bundles all assets into the HTML file to simplify distribution and loading in Electron.

## Entry Points
- `src/main.jsx`: The main entry point for the React application.
- `main.cjs`: The Electron main process script that handles window creation and native integrations.
- `index.html`: The HTML template used by Vite.

## Core Logic Flow
1. **Launch:** Electron starts and executes `main.cjs`.
2. **Window Creation:** `main.cjs` creates a fullscreen, frameless window and loads `dist/index.html`.
3. **UI Rendering:** React mounts the `App` component, which manages the clock state and animations.
4. **Interaction:** Electron listens for mouse moves, clicks, or key presses to quit the application (behaving like a screensaver).

## Project Structure
- `src/`: Contains the React source code.
    - `App.jsx`: Main application component.
    - `HyperbolaClock.jsx`: Likely the core clock visualization component.
    - `assets/`: Static assets for the React app.
- `public/`: Static assets served by Vite.
- `main.cjs`: Electron main process logic.
- `vite.config.js`: Vite configuration.
- `package.json`: Project dependencies and scripts.

## Observability & Debugging
- **Web Console:** Accessible via Electron DevTools (if enabled) or a standard browser during `npm run dev`.
- **Main Process Logs:** Outputted to the terminal where Electron is launched.

## Common Development Workflows
1. **Development:** Run `npm run dev` to start the Vite development server for browser-based testing.
2. **Building:** Run `npm run build` to generate the bundled `dist/index.html`.
3. **Native Testing (macOS):** Run `npx electron .` (after building) to test the Electron wrapper.
4. **KDE Widget (Linux):** Run `npm run build:plasmoid` to generate `clock-app.plasmoid`.
5. **Packaging:** Use `electron-packager` as described in the README to create a `.app` bundle.

## KDE Plasmoid Integration
The project now includes a KDE Plasma 6 widget wrapper.
- **Location:** `plasmoid/` directory.
- **Technology:** Uses `QtWebEngine` in QML to host the React application.
- **Deployment:** The generated `.plasmoid` file can be installed on KDE Plasma 6 using:
  ```bash
  kpackagetool6 -i clock-app.plasmoid
  ```
- **KDE Store:** The `plasmoid/package/metadata.json` is configured for submission to the KDE Store.

## Getting Started
```bash
npm install
npm run dev
```

## Potential Complexity
- **Animation Performance:** Ensuring smooth scrolling animations for the clock digits.
- **Electron Interactions:** Correctly capturing and responding to user input to exit the "screensaver" mode.
- **Single File Bundling:** Managing assets and styles when everything is inlined into one HTML file.

## STRICT RULES — Always Follow
- **NEVER run `git commit`, `git push`, `git push --force`, or any variant without the user explicitly asking.** After rebasing, formatting, or any local git operation — stop, report what was done, and wait for explicit instruction to commit or push. This applies even when the next step seems obvious.
