import DateSelector from "@/components/tasks/DateSelector";
import Board from "@/components/tasks/Board";
import AddTaskModal from "@/components/tasks/AddTaskModal";

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tasks (Kanban Board)</h1>
      <DateSelector />
      <AddTaskModal />
      <Board />
    </div>
  );
}
