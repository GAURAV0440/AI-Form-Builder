import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";
import { Brand } from "../../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      toast.success("Login Successful");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-background grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_90%_85%,rgba(6,182,212,.2),transparent_35%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative z-10">
          <Brand light />
        </div>

        <div className="relative z-10 my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-indigo-200">
            <Sparkles size={14} />
            Admin workspace
          </div>
          <h1 className="page-title mt-6 text-5xl font-black leading-tight">
            Everything you need to run smarter forms.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Build, publish, and review form workflows from one focused,
            intelligent workspace.
          </p>

          <div className="mt-9 space-y-4">
            {[
              "Create dynamic forms in minutes",
              "Track submissions as they arrive",
              "Keep response data clear and accessible",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 size={19} className="text-emerald-400" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-slate-500">
          Secure access to Formora AI administration.
        </p>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-8">
        <Link
          to="/"
          className="absolute left-5 top-5 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-white hover:text-slate-900 sm:left-8 sm:top-8"
        >
          <ArrowLeft size={17} />
          Back home
        </Link>

        <div className="animate-enter w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>

          <div className="surface-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <h2 className="page-title mt-6 text-3xl font-black text-slate-950">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to manage your forms and responses.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>
                <div className="input-shell flex items-center px-4">
                  <Mail size={18} className="shrink-0 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-transparent px-3 py-3.5 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                <div className="input-shell flex items-center px-4">
                  <Lock size={18} className="shrink-0 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    className="w-full bg-transparent px-3 py-3.5 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="btn-primary mt-2 w-full py-3.5"
              >
                <LogIn size={18} />
                {loading ? "Signing in..." : "Sign in to workspace"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
