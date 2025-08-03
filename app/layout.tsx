import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Frontend Warrior",
  description: "3-in-1 Frontend Engineering Task",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <header className="bg-white shadow p-4 flex gap-6">
          <Link href="/tasks" className="hover:text-blue-600">Tasks</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/annotate" className="hover:text-blue-600">Annotate</Link>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
