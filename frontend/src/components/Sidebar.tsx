import {
  ClipboardList,
  FilePlus2,
  Files,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Brand } from "./Navbar";

const links = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/create-form", label: "Create form", icon: FilePlus2 },
  { to: "/admin/forms", label: "All forms", icon: Files },
  { to: "/admin/responses", label: "Responses", icon: ClipboardList },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200/70 bg-white/85 px-4 py-5 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="px-2">
        <Brand />
      </div>

      <div className="mt-10 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
        Workspace
      </div>

      <nav className="mt-3 space-y-1.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            <Icon size={19} className="transition-transform group-hover:scale-110" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="mb-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-500">
            AI workspace
          </p>
          <p className="mt-2 text-sm font-semibold leading-5 text-slate-700">
            Build smarter forms and review every response in one place.
          </p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
