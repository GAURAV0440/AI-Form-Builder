import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <div className="app-background min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
