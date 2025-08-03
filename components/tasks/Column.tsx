"use client";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/types/task";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export default function Column({ id, title, status, tasks }: Props) {
  const { setNodeRef } = useDroppable({ id });

  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg shadow min-h-[300px]">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="flex flex-col gap-3">
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
