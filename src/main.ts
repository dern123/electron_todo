import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

interface NoteData {
  id: number;
  title: string;
  content: string;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.setAppUserModelId(process.execPath);

const notesPath = path.join(app.getPath('userData'), 'notes.json');

function saveNotes(notes: NoteData[]): void {
  fs.writeFileSync(notesPath, JSON.stringify(notes));
}

function loadNotes(): NoteData[] {
  if (fs.existsSync(notesPath)) {
    return JSON.parse(fs.readFileSync(notesPath, 'utf8')) as NoteData[];
  } else {
    return []; // Return an empty array if no file exists
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, // Path to the preload script
      webSecurity: false, // Disable security checks (only for development)
      allowRunningInsecureContent: true, // Allow insecure content (only for development)
    },
    autoHideMenuBar: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    sandbox: true,
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
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

// IPC Handlers
ipcMain.handle('save-notes', (event, notes: NoteData[]) => {
  saveNotes(notes);
});

ipcMain.handle('load-notes', (): NoteData[] => {
  return loadNotes();
});

ipcMain.handle('delete-note', (event, id: number): void => {
  let notes = loadNotes();

  // Filter out the note with the given id
  notes = notes.filter(note => note.id !== id);

  // Save the updated notes back to the file
  saveNotes(notes);
});
