import React from 'react';

interface NoteTitleProps {
  title: string; // The current title of the note
  onChange: (title: string) => void; 
}

const NoteTitle: React.FC<NoteTitleProps> = ({ title, onChange }) => {
  return (
    <input
      type="text"
      value={title} // Bind title prop
      onChange={(e) => onChange(e.target.value)} //  input changes
      placeholder="Title" 
      className="w-full break-words mb-2 p-2 border rounded" 
    />
  );
};

export default NoteTitle;
