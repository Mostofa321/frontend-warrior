export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
  status: TaskStatus;
}
