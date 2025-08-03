"use client";
import Column from "./Column";
import { useTaskStore } from "@/store/taskStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TaskStatus } from "@/types/task";

export default function Board() {
  const { tasks, selectedDate, updateTask } = useTaskStore();
  const filteredTasks = tasks.filter((t) => t.dueDate === selectedDate);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = filteredTasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      updateTask({ ...task, status: newStatus });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        <Column id="todo" status="todo" tasks={filteredTasks} title="To Do" />
        <Column id="in-progress" status="in-progress" tasks={filteredTasks} title="In Progress" />
        <Column id="done" status="done" tasks={filteredTasks} title="Done" />
      </div>
    </DndContext>
  );
}
