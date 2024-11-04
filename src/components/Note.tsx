import React, { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { NoteData } from '../types.ts';
import NoteTitle from './NoteTitle.tsx';
import NoteEditor from './NoteEditor.tsx';
import ImageInput from './ImageInput.tsx';

interface NoteProps {
  note: NoteData;
  deleteNote: (id: number) => void;
  updateNote: (updatedNote: NoteData) => void;
  saveNote: (note: NoteData) => void;
}

const Note: React.FC<NoteProps> = ({ note, deleteNote, updateNote, saveNote }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState(note.title);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: note.content,
    onUpdate({ editor }) {
      const updatedContent = editor.getHTML();
      updateNote({ ...note, content: updatedContent });
      saveNote({ ...note, content: updatedContent, title });
    },
  });

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle); // Update the title state
    saveNote({ ...note, title: newTitle, content: editor ? editor.getHTML() : note.content }); // Save on title change
  };

  const handleInsertImage = () => {
    if (imageUrl && editor) {
      const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/; // Validating image URL
      if (imageRegex.test(imageUrl)) {
        editor.chain().focus().setImage({ src: imageUrl }).run(); // Insert the image
        setImageUrl(''); // Clear the input after inserting
      } else {
        alert('Please enter a valid image URL.'); // Error message
      }
    }
  };

  useEffect(() => {
    setTitle(note.title); // Update title state when note changes
  }, [note.title]);

  return (
    <div className="note p-4 border rounded shadow-lg bg-white relative">
      <button
        onClick={() => deleteNote(note.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
        aria-label="Delete Note"
      >
        ✕
      </button>
      <NoteTitle title={title} onChange={handleTitleChange} />
      <NoteEditor editor={editor} />
      <ImageInput imageUrl={imageUrl} onChange={setImageUrl} onInsert={handleInsertImage} />
    </div> 
  );
};

export default Note;
