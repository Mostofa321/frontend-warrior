import { create } from "zustand";
import { Task } from "@/types/task";

interface TaskState {
  selectedDate: string;
  tasks: Task[];
  setDate: (date: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  selectedDate: new Date().toISOString().split("T")[0],
  tasks: [],
  setDate: (date) => {
    const saved = localStorage.getItem(`tasks-${date}`);
    set({
      selectedDate: date,
      tasks: saved ? JSON.parse(saved) : [],
    });
  },
  addTask: (task) => {
    const newTasks = [...get().tasks, task];
    set({ tasks: newTasks });
    localStorage.setItem(`tasks-${get().selectedDate}`, JSON.stringify(newTasks));
  },
  updateTask: (updated) => {
    const newTasks = get().tasks.map((t) => (t.id === updated.id ? updated : t));
    set({ tasks: newTasks });
    localStorage.setItem(`tasks-${get().selectedDate}`, JSON.stringify(newTasks));
  },
  deleteTask: (id) => {
    const newTasks = get().tasks.filter((t) => t.id !== id);
    set({ tasks: newTasks });
    localStorage.setItem(`tasks-${get().selectedDate}`, JSON.stringify(newTasks));
  },
  setTasks: (tasks) => {
    set({ tasks });
    localStorage.setItem(`tasks-${get().selectedDate}`, JSON.stringify(tasks));
  },
}));
