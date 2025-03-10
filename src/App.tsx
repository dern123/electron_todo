import React, { useEffect, useState } from 'react';
import Note from './components/Note.tsx';
import { NoteData } from './types.ts';
import './index.css';

declare global {
  interface Window {
    electronAPI: {
      loadNotes: () => Promise<NoteData[]>;
      saveNotes: (notes: NoteData[]) => void;
      deleteNote: (id: number) => void;
    };
  }
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    window.electronAPI.loadNotes().then((loadedNotes: NoteData[]) => {
      setNotes(loadedNotes);
    });
  }, []);

  const saveNote = (updatedNote: NoteData) => {
    setNotes(notes.map(n => (n.id === updatedNote.id ? updatedNote : n)));
    window.electronAPI.saveNotes(notes); // Save all notes after updating the specific note
  };

  const addNote = () => {
    const newNote: NoteData = {
      id: Date.now(),
      title: 'New Note',
      content: '',
    };
    setNotes([newNote, ...notes]); // Prepend the new note to the existing notes
  };

  const deleteNote = (id: number) => {
    // Remove the note from the local state first
    setNotes(notes.filter(note => note.id !== id));
  
    // Call the main process to delete the note from the file/database
    window.electronAPI.deleteNote(id);  // You need to handle this in the main process
  };
  
  return (
    <div className="app p-4">
      {/* <h1 className="text-2xl font-bold mb-4">My Notes App</h1> */}
      <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
        Add Note
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note 
            key={note.id}
            note={note}
            deleteNote={() => deleteNote(note.id)} // Pass a function to delete the note
            updateNote={saveNote} // Directly call saveNote on update
            saveNote={saveNote}    // Pass saveNote for auto-save functionality
          />
        ))}
      </div>
    </div>
  );
};

export default App;
