import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Outlet />
    </main>
  );
}