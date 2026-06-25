import {
  ClipboardList,
  FilePlus2,
  Files,
  FileStack,
  Home,
  LayoutDashboard,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  admin?: boolean;
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
        <Sparkles size={20} />
        <span className="absolute -right-2 -top-3 h-5 w-5 rounded-full bg-white/25" />
      </span>
      <span>
        <span
          className={`block text-[17px] font-extrabold tracking-[-0.03em] ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          Formora AI
        </span>
        <span
          className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${
            light ? "text-indigo-200" : "text-slate-400"
          }`}
        >
          Intelligent forms
        </span>
      </span>
    </Link>
  );
}

export default function Navbar({ admin = false }: NavbarProps) {
  if (admin) {
    const mobileLinks = [
      { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
      { to: "/admin/create-form", label: "Create", icon: FilePlus2 },
      { to: "/admin/forms", label: "Forms", icon: Files },
      { to: "/admin/responses", label: "Responses", icon: ClipboardList },
    ];

    return (
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="lg:hidden">
            <Brand />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-500">Admin workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-800">Administrator</p>
              <p className="text-xs text-slate-500">admin@example.com</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden">
          {mobileLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
    );
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Brand />
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/forms" className={linkClass}>
            <FileStack size={16} />
            <span className="hidden sm:inline">Forms</span>
          </NavLink>
          <Link
            to="/admin/login"
            className="ml-1 flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600"
          >
            <LayoutGrid size={16} />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
