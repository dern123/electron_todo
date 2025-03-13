import React from "react";
import { startOfWeek, addDays, format } from "date-fns";
import Task from "../Task/Task.tsx";
import { CalendarProps } from "../../types.js";

interface CalendarData extends CalendarProps {
  openModal: () => void;
}

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const Calendar: React.FC<CalendarData> = ({ tasks, setTasks, openModal }) => {
  const today = new Date();
  const startWeek = startOfWeek(today, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startWeek, i));

  return (
    <div className="flex w-full border">
      {/* Колонка з годинами */}
      <div className="w-16 border-r bg-gray-100">
        {hours.map((hour) => (
          <div key={hour} className="h-16 flex items-center justify-center text-xs border-b">
            {hour}
          </div>
        ))}
      </div>

      {/* Колонки для днів */}
      <div className="flex flex-1 relative">
        {days.map((day, dayIndex) => (
          <div key={day.toString()} className="flex-1 border-r relative">
            <div className="h-10 bg-gray-200 flex items-center justify-center text-sm font-semibold border-b">
              {format(day, "EEEE dd")}
            </div>
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b"></div>
            ))}

            {/* Відображення тасків */}
            {tasks
              .filter((task) => task.dayIndex === dayIndex)
              .map((task) => (
                <Task key={task.id} {...task} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
