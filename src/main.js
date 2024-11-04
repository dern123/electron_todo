const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.setAppUserModelId(process.execPath);

const notesPath = path.join(app.getPath('userData'), 'notes.json');

function saveNotes(notes) {
  fs.writeFileSync(notesPath, JSON.stringify(notes));
}

function loadNotes() {
  if (fs.existsSync(notesPath)) {
    return JSON.parse(fs.readFileSync(notesPath, 'utf8'));
  } else {
    return []; // Return an empty array if no file exists
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      images: true,
      webSecurity: false,
    },
    autoHideMenuBar: true,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    sandbox: true,
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('save-notes', (event, notes) => {
  saveNotes(notes);
});

ipcMain.handle('load-notes', () => {
  return loadNotes();
});


