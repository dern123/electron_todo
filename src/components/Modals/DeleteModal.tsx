import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p className="mt-2">Are you sure you want to delete this note? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 flex items-center"
          >
            <XCircle className="w-5 h-5 mr-2" /> 
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
