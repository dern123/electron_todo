import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface TaskProps {
  id: string;
  title: string;
  startHour: number;
  duration: number;
}

const Task: React.FC<TaskProps> = ({ id, title, startHour, duration }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <ResizableBox
      width={140} // Ширина колонки дня
      height={duration * 64} // Висота базується на 1 годині = 64px
      axis="y"
      minConstraints={[140, 64]}
      maxConstraints={[140, 64 * 6]}
      className="absolute left-0 bg-blue-500 text-white text-xs p-2 rounded-md shadow-md"
      style={{
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        top: startHour * 64 + 40, // 40px для заголовка дня
      }}
    >
      <div ref={setNodeRef} {...listeners} {...attributes} className="cursor-grab">
        {title}
      </div>
    </ResizableBox>
  );
};

export default Task;
