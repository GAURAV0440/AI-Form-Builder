import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Eye,
  FileText,
  PlusCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [formCount, setFormCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const forms = await api.get("/forms/");
        const responses = await api.get("/responses/");
        setFormCount(forms.data.length);
        setResponseCount(responses.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="animate-enter flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">
              <Sparkles size={14} />
              Workspace overview
            </p>
            <h1 className="page-title mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
              Good to see you, Admin.
            </h1>
            <p className="mt-3 text-slate-500">
              Here’s what is happening across your forms today.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/create-form")}
            className="btn-primary self-start px-5 py-3 sm:self-auto"
          >
            <PlusCircle size={18} />
            Create a form
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <MetricCard
            label="Total forms"
            value={formCount}
            icon={<FileText size={25} />}
            accent="indigo"
            helper="Forms currently in your workspace"
          />
          <MetricCard
            label="Total responses"
            value={responseCount}
            icon={<ClipboardList size={25} />}
            accent="emerald"
            helper="Submissions collected across all forms"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <section className="surface-card animate-enter-delay p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold text-slate-900">
                  Quick actions
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Jump back into your most common workflows.
                </p>
              </div>
              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 sm:flex">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ActionCard
                icon={<PlusCircle size={21} />}
                title="New form"
                description="Start from a blank form"
                onClick={() => navigate("/admin/create-form")}
                primary
              />
              <ActionCard
                icon={<Eye size={21} />}
                title="View forms"
                description="Manage existing forms"
                onClick={() => navigate("/admin/forms")}
              />
              <ActionCard
                icon={<ClipboardList size={21} />}
                title="Responses"
                description="Review submitted data"
                onClick={() => navigate("/admin/responses")}
              />
            </div>
          </section>

          <section className="surface-card relative overflow-hidden bg-slate-950 p-7 text-white">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                <TrendingUp size={22} />
              </div>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-300">
                Workspace pulse
              </p>
              <h2 className="page-title mt-2 text-3xl font-black">
                {responseCount === 0
                  ? "Ready for your first response"
                  : `${responseCount} response${responseCount === 1 ? "" : "s"} collected`}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Keep an eye on incoming submissions and review extracted data
                while it is fresh.
              </p>
              <button
                onClick={() => navigate("/admin/responses")}
                className="mt-6 flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3"
              >
                Open responses <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: "indigo" | "emerald";
  helper: string;
}

function MetricCard({ label, value, icon, accent, helper }: MetricCardProps) {
  const emerald = accent === "emerald";
  return (
    <article className="surface-card elevated-card relative overflow-hidden p-6 sm:p-7">
      <div
        className={`absolute right-[-2rem] top-[-3rem] h-36 w-36 rounded-full blur-3xl ${
          emerald ? "bg-emerald-200/55" : "bg-indigo-200/60"
        }`}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="page-title mt-3 text-5xl font-black text-slate-950">
            {value}
          </p>
          <p className="mt-3 text-sm text-slate-500">{helper}</p>
        </div>
        <div
          className={`flex h-13 w-13 items-center justify-center rounded-2xl ${
            emerald
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
  primary = false,
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-1 ${
        primary
          ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          primary
            ? "bg-white/15 text-white"
            : "bg-white text-indigo-600 shadow-sm"
        }`}
      >
        {icon}
      </div>
      <p className="mt-4 font-extrabold">{title}</p>
      <p
        className={`mt-1 text-xs leading-5 ${
          primary ? "text-indigo-100" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </button>
  );
}
