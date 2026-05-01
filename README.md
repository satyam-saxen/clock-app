# Clock Screensaver

A minimal, fullscreen animated clock built with React — designed to work as a screensaver on macOS.

Each digit of the time (HH:MM:SS) is displayed in its own scrolling column, with smooth animations as values change. The current digit is highlighted while surrounding digits fade into the background.

## Demo

🌐 **[Live Demo](https://satyam-saxen.github.io/clock-app/)** — open it and press `F11` for fullscreen.

## Download (macOS)

Download the app from [Releases](https://github.com/satyam-saxen/clock-app/releases):

| Mac Type | Download |
|----------|----------|
| Apple Silicon (M1/M2/M3/M4) | `ClockScreensaver-mac-arm64.zip` |
| Intel | `ClockScreensaver-mac-x64.zip` |

### Installation

1. Download the zip for your Mac
2. Double-click the zip to extract it
3. Drag `ClockScreensaver.app` to your **Applications** folder
4. On first launch, macOS will show a security warning. To allow it:
   - Open **System Settings → Privacy & Security**
   - Scroll down and click **Open Anyway** next to the ClockScreensaver message
   - Alternatively, open Terminal and run:
     ```bash
     xattr -cr /Applications/ClockScreensaver.app
     ```
5. Double-click the app to launch

> **Why the security warning?** The app is ad-hoc signed but not notarized with Apple, so macOS Gatekeeper blocks it on first launch. The steps above tell macOS you trust the app.

The app launches fullscreen with no window borders and hides the cursor. Press any key to quit.

## Tech Stack

- **React** — UI
- **Vite** — build tool
- **vite-plugin-singlefile** — bundles everything into a single HTML file
- **Electron** — native macOS app wrapper

## Development

```bash
# Install dependencies
npm install

# Run in browser
npm run dev

# Build for web
npm run build

# Package macOS app (replace ARCH with x64 or arm64)
npx electron-packager . ClockScreensaver --platform=darwin --arch=ARCH --icon=icon.icns --overwrite
```

## License

MIT
