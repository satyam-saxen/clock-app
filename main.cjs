const { app, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

const isWidget = process.argv.includes('--widget');

function createWidget() {
  const win = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    skipTaskbar: true,
    resizable: true,
    hasShadow: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  });

  // On Windows, 'desktop' level doesn't work; use 'pop-up-menu' to stay visible
  if (process.platform === 'win32') {
    win.setAlwaysOnTop(true, 'pop-up-menu');
  } else {
    win.setAlwaysOnTop(true, 'floating');
    win.setVisibleOnAllWorkspaces(true);
  }

  win.loadFile('dist/index.html', { query: { mode: 'widget' } });

  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      body { background: #000 !important; -webkit-app-region: drag; }
      .clock.fullscreen {
        border-radius: 12px;
        background: rgba(17,17,17,0.95) !important;
        height: 100vh; width: 100vw;
      }
      .digit-box.fullscreen-box { font-size: 2.5vw; border-width: 1px; border-radius: 6px; }
      .digit-box.fullscreen-box.center { font-size: 3vw; border-radius: 6px; }
    `);
  });

  // Tray icon to quit
  const tray = new Tray(nativeImage.createEmpty());
  tray.setToolTip('Clock Widget');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Quit', click: () => app.quit() }
  ]));
}

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

app.whenReady().then(() => isWidget ? createWidget() : createWindow());
app.on('window-all-closed', () => app.quit());
