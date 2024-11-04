import React from 'react';
import { EditorContent } from '@tiptap/react';

interface NoteEditorProps {
  editor: any; // Replace 'any' with the proper type if known
}

const NoteEditor: React.FC<NoteEditorProps> = ({ editor }) => {
  return (
    <EditorContent className="w-full mb-2 p-2 border rounded" editor={editor} />
  );
};

export default NoteEditor;
