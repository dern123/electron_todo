import React, { useState } from "react";
import Calendar from "./components/Calendar/Calendar.tsx";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskModal from "./components/Modals/TaskModal/TaskModal.tsx";
import { TaskData } from "./types.js";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([
    { id: "1", title: "Meeting", startHour: 10, duration: 2, dayIndex: 1, description: "Project discussion" },
    { id: "2", title: "Lunch", startHour: 13, duration: 1, dayIndex: 3, description: "Lunch with team" },
  ]);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const saveTask = (taskData: any) => {
    if (taskData.id) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskData.id ? taskData : task)));
    } else {
      const newTask = { ...taskData, id: Date.now().toString() };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    closeModal();
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    closeModal();
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Calendar App</h1>
        <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
          Add Task
        </button>
        <Calendar tasks={tasks} setTasks={setTasks} openModal={openModal} />
        <TaskModal isOpen={isModalOpen} onClose={closeModal} onSave={saveTask} onDelete={deleteTask} task={selectedTask} />
      </div>
    </DndContext>
  );
};

export default App;
