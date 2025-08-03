"use client";
import { useTaskStore } from "@/store/taskStore";

export default function DateSelector() {
  const { selectedDate, setDate } = useTaskStore();

  return (
    <div className="mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2"
      />
    </div>
  );
}
