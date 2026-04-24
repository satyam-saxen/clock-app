const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('dist/index.html');

  // Hide cursor over the window
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('* { cursor: none !important; }');
  });

  // Quit on any mouse movement or click
  ['mouse-move', 'mouse-down'].forEach(evt => {
    // Small delay to avoid quitting immediately on launch
    setTimeout(() => {
      win.hookWindowMessage && win.on(evt, () => app.quit());
    }, 2000);
  });

  // Quit on any key press
  win.webContents.on('before-input-event', () => app.quit());
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
