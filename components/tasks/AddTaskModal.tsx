"use client";
import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");
  const { selectedDate, addTask } = useTaskStore();

  const handleAdd = () => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      priority: priority as Task["priority"],
      dueDate: selectedDate,
      tags: tags.split(",").map((t) => t.trim()),
      status: "todo",
    };
    addTask(newTask);
    setOpen(false);
    setTitle("");
    setTags("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              className="border w-full mb-2 p-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="border w-full mb-2 p-2 rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              className="border w-full mb-2 p-2 rounded"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
