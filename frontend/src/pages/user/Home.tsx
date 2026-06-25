import {
  ArrowRight,
  Bot,
  Check,
  FileCheck2,
  FileSearch,
  Layers3,
  ShieldCheck,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const adminFeatures = [
  "Create dynamic forms",
  "Manage forms in one workspace",
  "Review every submission",
];

const userFeatures = [
  "Upload a PDF or image",
  "Autofill fields with AI",
  "Review and submit in seconds",
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="soft-orb left-[-5rem] top-20 h-64 w-64 bg-indigo-300/25" />
      <div
        className="soft-orb right-[-4rem] top-44 h-72 w-72 bg-cyan-300/20"
        style={{ animationDelay: "-2.5s" }}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-24">
        <div className="animate-enter">
          <div className="eyebrow rounded-full border border-indigo-100 bg-white/80 px-3 py-2 shadow-sm">
            <Sparkles size={14} />
            AI-powered form workflows
          </div>

          <h1 className="page-title mt-7 max-w-3xl text-5xl font-black leading-[1.03] text-slate-950 sm:text-6xl lg:text-7xl">
            Forms that do the{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              busy work
            </span>{" "}
            for you.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Create flexible forms, extract information from documents with AI,
            and turn submissions into clean, reviewable data.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/forms")}
              className="btn-primary px-6 py-3.5"
            >
              Browse available forms
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="btn-secondary px-6 py-3.5"
            >
              Open admin workspace
            </button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              Dynamic fields
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              AI document extraction
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              Response management
            </span>
          </div>
        </div>

        <div className="animate-enter-delay relative mx-auto w-full max-w-xl [perspective:1200px]">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-indigo-400/15 via-violet-400/10 to-cyan-400/15 blur-2xl" />
          <div className="surface-card relative overflow-hidden p-4 shadow-[0_35px_80px_rgba(55,65,120,.18)] sm:p-6 lg:rotate-[1.5deg]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Bot size={21} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Smart application
                  </p>
                  <p className="text-xs text-slate-500">AI extraction ready</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                Live
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <FileSearch size={23} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800">resume.pdf</p>
                  <p className="text-sm text-slate-500">
                    Extracting name, email and experience…
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-100">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Full name", "Alex Morgan"],
                ["Email address", "alex@example.com"],
                ["Experience", "5 years"],
                ["Application", "Product Designer"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-3">
                <FileCheck2 size={22} className="text-emerald-400" />
                <div>
                  <p className="text-sm font-bold">Ready to review</p>
                  <p className="text-xs text-slate-400">4 fields completed</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="eyebrow justify-center">
            <Layers3 size={14} />
            One platform, two simple paths
          </p>
          <h2 className="page-title mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            Choose your workspace
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <WorkspaceCard
            icon={<ShieldCheck size={25} />}
            label="For administrators"
            title="Build and manage"
            description="Create custom forms, monitor activity, and keep every response organized."
            features={adminFeatures}
            action="Go to admin"
            onClick={() => navigate("/admin/login")}
            accent="indigo"
          />
          <WorkspaceCard
            icon={<UserRound size={25} />}
            label="For applicants"
            title="Fill forms faster"
            description="Choose a form, upload your document, and let AI help complete the repetitive fields."
            features={userFeatures}
            action="Explore forms"
            onClick={() => navigate("/forms")}
            accent="emerald"
          />
        </div>
      </section>
    </div>
  );
}

interface WorkspaceCardProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  features: string[];
  action: string;
  onClick: () => void;
  accent: "indigo" | "emerald";
}

function WorkspaceCard({
  icon,
  label,
  title,
  description,
  features,
  action,
  onClick,
  accent,
}: WorkspaceCardProps) {
  const emerald = accent === "emerald";

  return (
    <article className="surface-card elevated-card group relative overflow-hidden p-7 sm:p-8">
      <div
        className={`absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full blur-3xl ${
          emerald ? "bg-emerald-200/45" : "bg-indigo-200/50"
        }`}
      />
      <div className="relative">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            emerald
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {icon}
        </div>
        <p
          className={`mt-6 text-xs font-extrabold uppercase tracking-[0.16em] ${
            emerald ? "text-emerald-600" : "text-indigo-600"
          }`}
        >
          {label}
        </p>
        <h3 className="page-title mt-2 text-3xl font-black text-slate-900">
          {title}
        </h3>
        <p className="mt-3 max-w-lg leading-7 text-slate-600">{description}</p>

        <div className="mt-6 space-y-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  emerald
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </span>
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={onClick}
          className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white transition hover:-translate-y-0.5 ${
            emerald
              ? "bg-emerald-600 shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
              : "bg-indigo-600 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700"
          }`}
        >
          {action}
          {emerald ? <WandSparkles size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </article>
  );
}
