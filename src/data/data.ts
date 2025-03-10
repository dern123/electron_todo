import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { NoteData } from '../types';

const dataPath = path.join(app.getPath('userData'), 'notes.json');

export function saveNotes(notes: NoteData[]) {
  fs.writeFileSync(dataPath, JSON.stringify(notes));
}

export function loadNotes(): NoteData[] {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}
