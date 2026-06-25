import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";

  if (isLogin) {
    return <Outlet />;
  }

  return (
    <div className="app-background flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Navbar admin />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
