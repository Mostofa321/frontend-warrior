"use client";
import { Task } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded shadow border cursor-grab"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">Priority: {task.priority}</p>
      <div className="flex gap-2 mt-1 flex-wrap">
        {task.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-blue-100 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
