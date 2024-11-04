import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Note from './Note';
import { NoteData } from '../types.ts';
import { beforeEach, describe, expect, test, vi } from 'vitest'; 
import '@testing-library/jest-dom';

const mockNote: NoteData = {
  id: 1,
  title: 'Sample Note',
  content: '<p>Some content</p>',
};

const mockDeleteNote = vi.fn();
const mockUpdateNote = vi.fn();
const mockSaveNote = vi.fn();

describe('Note', () => {
  beforeEach(() => {
    render(
      <Note
        note={mockNote}
        deleteNote={mockDeleteNote}
        updateNote={mockUpdateNote}
        saveNote={mockSaveNote}
      />
    );
  });

  test('renders note with title and content', () => {
    expect(screen.getByDisplayValue(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(/Some content/i)).toBeInTheDocument();
  });

  test('calls deleteNote when delete button is clicked', () => {
    fireEvent.click(screen.getByLabelText(/Delete Note/i));
    expect(mockDeleteNote).toHaveBeenCalledWith(mockNote.id);
  });

  test('updates title and calls saveNote', () => {
    const titleInput = screen.getByPlaceholderText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    
    expect(titleInput).toHaveValue('Updated Title');
    expect(mockSaveNote).toHaveBeenCalledWith({ ...mockNote, title: 'Updated Title', content: mockNote.content });
  });

  test('inserts an image when a valid URL is provided', () => {
    const imageInput = screen.getByPlaceholderText(/Enter image URL/i);
    const insertButton = screen.getByRole('button', { name: /insert image/i });

    fireEvent.change(imageInput, { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.click(insertButton);

    expect(mockSaveNote).toHaveBeenCalled(); // Verify if saveNote is called after image insertion
  });

  test('shows alert on invalid image URL', () => {
    const imageInput = screen.getByPlaceholderText(/Enter image URL/i);
    const insertButton = screen.getByRole('button', { name: /insert image/i });

    window.alert = vi.fn(); // Mock alert
    fireEvent.change(imageInput, { target: { value: 'invalid-url' } });
    fireEvent.click(insertButton);

    expect(window.alert).toHaveBeenCalledWith('Please enter a valid image URL.'); // Check if alert is called
  });
});
