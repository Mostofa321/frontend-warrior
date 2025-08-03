import { ReactNode } from "react";

export default function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}
