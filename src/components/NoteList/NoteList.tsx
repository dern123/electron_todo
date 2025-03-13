import React from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableNote from './SortableNote.tsx'; // Компонент для нотатки
import { NoteData } from '../../types.js';

interface NoteListProps {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes }) => {
  const handleDragEnd = (event: { active: any; over: any; }) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = notes.findIndex((n) => n.id === active.id);
    const newIndex = notes.findIndex((n) => n.id === over.id);
    setNotes(arrayMove(notes, oldIndex, newIndex));
  };
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={notes} strategy={verticalListSortingStrategy}>
        {notes.map((note) => (
          <SortableNote key={note.id} note={note} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default NoteList;
