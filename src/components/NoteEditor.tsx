import React from 'react';
import { EditorContent } from '@tiptap/react';

interface NoteEditorProps {
  editor: any; // Replace 'any' with the proper type if known
}

const NoteEditor: React.FC<NoteEditorProps> = ({ editor }) => {
  if (!editor) {
    return <div className="w-full min-h-[100px] p-2 border rounded bg-gray-100">Loading...</div>;
  }

  return (
    <EditorContent
      editor={editor}
      className="w-full max-w-full min-h-[100px] p-2 border rounded break-words overflow-hidden"
      style={{
        wordBreak: "break-word",
        whiteSpace: "normal",
        overflowWrap: "break-word",
        maxWidth: "100%",
      }}
    />
  );
};

export default NoteEditor;
