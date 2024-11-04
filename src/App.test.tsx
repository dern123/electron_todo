import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.tsx';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock API для Electron
window.electronAPI = {
  loadNotes: vi.fn().mockResolvedValue([]),
  saveNotes: vi.fn(),
};

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the title', () => {
    render(<App />);
    expect(screen.getByText(/My Notes App/i)).toBeInTheDocument();
  });

  test('adds a new note when "Add Note" button is clicked', () => {
    render(<App />);
    const addButton = screen.getByText(/Add Note/i);
    fireEvent.click(addButton);

    // Check if a new note with default title "New Note" is added
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  test('saves all notes when "Save All Notes" button is clicked', () => {
    render(<App />);
    const saveAllButton = screen.getByText(/Save All Notes/i);
    fireEvent.click(saveAllButton);

    expect(window.electronAPI.saveNotes).toHaveBeenCalled();
  });
});
