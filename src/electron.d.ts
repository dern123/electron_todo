import { NoteData } from "./types.ts";

export interface IElectronAPI {
    loadNotes: () => Promise<NoteData[]>;
    saveNotes: (notes: NoteData[]) => void;
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI;
    }
  }