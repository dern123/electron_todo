import React from 'react';

interface ImageInputProps {
  imageUrl: string;
  onChange: (url: string) => void;
  onInsert: () => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ imageUrl, onChange, onInsert }) => {
  return (
    <div className="flex items-center mt-4 w-full">
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter image URL"
        className="w-full p-2 border rounded mr-2"
      />
      <button
        onClick={onInsert}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
          <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
        </svg>
      </button>
    </div>
  );
};

export default ImageInput;
