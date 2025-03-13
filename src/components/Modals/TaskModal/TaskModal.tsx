import React, { useState, useEffect } from "react";

interface TaskModalProps {
  isOpen: boolean; // Визначає, чи відкрито модальне вікно
  onClose: () => void; // Функція для закриття модального вікна
  onSave: (task: any) => void; // Функція для збереження завдання
  onDelete: (id: string) => void; // Функція для видалення завдання
  task?: any; // Опціональне завдання для редагування
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, onDelete, task }) => {
  // Локальні стани для введення даних
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startHour, setStartHour] = useState(0);
  const [duration, setDuration] = useState(1);
  const [dayIndex, setDayIndex] = useState(0);

  // Заповнення форми при редагуванні завдання
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStartHour(task.startHour || 0);
      setDuration(task.duration || 1);
      setDayIndex(task.dayIndex || 0);
    } else {
      setTitle("");
      setDescription("");
      setStartHour(0);
      setDuration(1);
      setDayIndex(0);
    }
  }, [task]);

  // Обробник натискання кнопки "Save"
  const handleSave = () => {
    onSave({ id: task?.id, title, description, startHour, duration, dayIndex });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">{task ? "Edit Task" : "New Task"}</h2>
          
          {/* Поле введення назви завдання */}
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          {/* Поле введення опису завдання */}
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          
          {/* Поля введення часу початку та тривалості завдання */}
          <div className="flex gap-2 mb-2">
            <div className="w-1/2">
              <label className="block text-sm font-semibold">Start Hour</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                min={0}
                max={23}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold">Duration (hours)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={1}
                max={6}
              />
            </div>
          </div>
          
          {/* Вибір дня для завдання */}
          <label className="block text-sm font-semibold">Day Index (0-6)</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            value={dayIndex}
            onChange={(e) => setDayIndex(Number(e.target.value))}
            min={0}
            max={6}
          />
          
          {/* Кнопки керування модалкою */}
          <div className="flex justify-between">
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            {task && (
              <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            )}
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskModal;
