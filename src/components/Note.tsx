import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { NoteData } from '../types.ts';
import NoteTitle from './NoteTitle.tsx';
import NoteEditor from './NoteEditor.tsx';
import ImageInput from './ImageInput.tsx';
import DeleteNoteModal from './Modals/DeleteModal.tsx';

interface NoteProps {
  note: NoteData;
  deleteNote: (id: number) => void;
  updateNote: (updatedNote: NoteData) => void;
  saveNote: (note: NoteData) => void;
}

const Note: React.FC<NoteProps> = ({ note, deleteNote, updateNote, saveNote }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState(note.title);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: note.content || '',
    onUpdate({ editor }) {
      const updatedContent = editor.getHTML();
      updateNote({ ...note, content: updatedContent });
      saveNote({ ...note, content: updatedContent, title });
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== note.content) {
      editor.commands.setContent(note.content || '');
    }
  }, [note.content, editor]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    saveNote({ ...note, title: newTitle, content: editor ? editor.getHTML() : note.content });
  };

  const handleInsertImage = () => {
    if (imageUrl && editor) {
      const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/;
      if (imageRegex.test(imageUrl)) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
        setImageUrl('');
      } else {
        alert('Please enter a valid image URL.');
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      className="p-3 pr-6 border rounded shadow-lg bg-white relative flex items-start"
      onPointerDown={(e) => {
        // Якщо натискаємо на редактор або заголовок - не починаємо Drag & Drop
        if (e.target instanceof HTMLElement && e.target.closest('.note-content, .note-title')) {
          e.stopPropagation(); // Дозволяємо клікати та редагувати
        }
      }}
    >
      <div {...listeners} className="mr-1 text-gray-500 cursor-grab">
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="flex-grow">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsDeleteModalOpen(true);
          }}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
          aria-label="Delete Note"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <DeleteNoteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            deleteNote(note.id);
            setIsDeleteModalOpen(false);
          }}
        />

        <div className="note-title w-full">
          <NoteTitle title={title} onChange={handleTitleChange} />
        </div>

        <div className="note-content w-full">
          <NoteEditor editor={editor} />
        </div>

        <ImageInput imageUrl={imageUrl} onChange={setImageUrl} onInsert={handleInsertImage} />
      </div>
    </div>
  );
};

export default Note;
