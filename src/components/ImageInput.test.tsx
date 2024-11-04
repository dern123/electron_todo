import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageInput from './ImageInput';
import { beforeEach, describe, expect, test, vi } from 'vitest'; 
import '@testing-library/jest-dom';

describe('ImageInput', () => {
  const mockOnChange = vi.fn();
  const mockOnInsert = vi.fn();

  beforeEach(() => {
    render(<ImageInput imageUrl="" onChange={mockOnChange} onInsert={mockOnInsert} />);
  });

  test('renders the input and button', () => {
    expect(screen.getByPlaceholderText(/Enter image URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onChange when the input value changes', () => {
    const input = screen.getByPlaceholderText(/Enter image URL/i);
    fireEvent.change(input, { target: { value: 'https://example.com/image.jpg' } });
    expect(mockOnChange).toHaveBeenCalledWith('https://example.com/image.jpg');
  });

  test('calls onInsert when the button is clicked', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnInsert).toHaveBeenCalled();
  });
});
