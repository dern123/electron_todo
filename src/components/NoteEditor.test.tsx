import React from 'react';
import { render } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import NoteEditor from './NoteEditor';
import { describe, expect, test } from 'vitest'; 
import '@testing-library/jest-dom';

describe('NoteEditor', () => {
  test('renders the TipTap editor with the given editor instance', () => {
    const editor = useEditor({
      extensions: [StarterKit],
      content: '<p>Initial content</p>',
    });

    const { getByRole } = render(<NoteEditor editor={editor} />);
    const editorElement = getByRole('textbox'); // Default role for EditorContent
    expect(editorElement).toBeInTheDocument();
  });
});
