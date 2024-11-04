import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteTitle from './NoteTitle';
import { describe, expect, test, vi } from 'vitest'; 
import '@testing-library/jest-dom';

describe('NoteTitle', () => {
  test('renders with initial title', () => {
    render(<NoteTitle title="Test Title" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/Title/i)).toHaveValue('Test Title');
  });

  test('calls onChange when title is changed', () => {
    const handleChange = vi.fn();
    render(<NoteTitle title="Test Title" onChange={handleChange} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Title' } });
    expect(handleChange).toHaveBeenCalledWith('New Title');
  });
});
