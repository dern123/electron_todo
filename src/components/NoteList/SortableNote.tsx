import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NoteData } from '../../types';

const SortableNote = ({ note }: { note: NoteData }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });

  return (
    <div 
      ref={setNodeRef} 
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes} 
      {...listeners}
      className="note"
    >
      {note.title}
    </div>
  );
};

export default SortableNote;
