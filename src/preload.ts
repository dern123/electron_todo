import { contextBridge, ipcRenderer } from 'electron';

// Define the types for the API to ensure type safety
interface ElectronAPI {
  saveNotes: (notes: NoteData[]) => Promise<void>;
  loadNotes: () => Promise<NoteData[]>;
  deleteNote: (id: number) => Promise<void>;
}

interface NoteData {
  id: number;
  title: string;
  content: string;
}

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  saveNotes: (notes: NoteData[]) => ipcRenderer.invoke('save-notes', notes),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  deleteNote: (id: number) => ipcRenderer.invoke('delete-note', id),
} as ElectronAPI);
