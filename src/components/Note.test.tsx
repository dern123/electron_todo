import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Note from './Note';
import { NoteData } from '../types.ts';
import { beforeEach, describe, expect, test, vi } from 'vitest'; 
import '@testing-library/jest-dom';


//data for testing
const noteData: NoteData = {
  id: 1,
  title: 'Test Note',
  content: '<p>Test content</p>',
};

//mock functions
const deleteNote = vi.fn();
const updateNote = vi.fn();
const saveNote = vi.fn();

describe('Note Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders note title and content', () => {
    render(
      <Note note={noteData} deleteNote={deleteNote} updateNote={updateNote} saveNote={saveNote} />
    );

    // check if title and content are rendered
    expect(screen.getByPlaceholderText('Title')).toHaveValue(noteData.title);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('calls deleteNote when delete button is clicked', () => {
    render(
      <Note note={noteData} deleteNote={deleteNote} updateNote={updateNote} saveNote={saveNote} />
    );

    const deleteButton = screen.getByLabelText('Delete Note');
    fireEvent.click(deleteButton);

    expect(deleteNote).toHaveBeenCalledWith(noteData.id);
  });

  test('calls updateNote when content is modified', () => {
    render(
      <Note note={noteData} deleteNote={deleteNote} updateNote={updateNote} saveNote={saveNote} />
    );

    const editor = screen.getByText('Test content');
    fireEvent.input(editor, { target: { innerHTML: '<p>Updated content</p>' } });

    expect(updateNote).toHaveBeenCalledWith({
      ...noteData,
      content: '<p>Updated content</p>',
    });
  });

  test('displays "Save" button when note is modified', () => {
    render(
      <Note note={noteData} deleteNote={deleteNote} updateNote={updateNote} saveNote={saveNote} />
    );

    // modify title to make the "Save" button visible
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  test('calls saveNote when "Save" button is clicked', () => {
    render(
      <Note note={noteData} deleteNote={deleteNote} updateNote={updateNote} saveNote={saveNote} />
    );

    // modify title to make the "Save" button visible
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    // click the "Save" button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(saveNote).toHaveBeenCalledWith({
      ...noteData,
      title: 'Updated Title',
    });
  });
});
