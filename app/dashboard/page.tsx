"use client";

import ChartCard from "@/components/dashboard/ChartCard";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

export default function DashboardPage() {
  const { tasks } = useTaskStore();

  // --- Transform Data ---

  // 1. Tasks per status
  const tasksPerStatus = ["todo", "in-progress", "done"].map((status) => ({
    status,
    count: tasks.filter((t) => t.status === status).length,
  }));

  // 2. Completed tasks per day (for line chart)
  const completedTasksPerDay: Record<string, number> = {};
  tasks
    .filter((t) => t.status === "done")
    .forEach((t) => {
      completedTasksPerDay[t.dueDate] = (completedTasksPerDay[t.dueDate] || 0) + 1;
    });

  const lineData = Object.keys(completedTasksPerDay).map((date) => ({
    date,
    completed: completedTasksPerDay[date],
  }));

  // 3. Tasks by priority for Pie Chart
  const priorities: Record<string, number> = { low: 0, medium: 0, high: 0 };
  tasks.forEach((t) => {
    priorities[t.priority] += 1;
  });

  const pieData = Object.keys(priorities).map((priority) => ({
    name: priority,
    value: priorities[priority],
  }));

  const colors = ["#60a5fa", "#facc15", "#f87171"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <ChartCard title="Tasks per Status">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tasksPerStatus}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard title="Completed Tasks per Day">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Tasks by Priority">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
