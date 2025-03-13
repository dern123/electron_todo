export interface NoteData {
  id: number;
  title: string;
  content: string;
}
 
export interface TaskData {
  id: string;
  title: string;
  description: string;
  startHour: number;
  duration: number;
  dayIndex: number;
}

export interface CalendarProps {
  tasks: TaskData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
}