import { ArrowRight, Check, FileCheck2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden px-4 py-14 sm:px-6">
      <div className="soft-orb left-[10%] top-[15%] h-52 w-52 bg-emerald-300/20" />
      <div
        className="soft-orb bottom-[10%] right-[10%] h-64 w-64 bg-indigo-300/20"
        style={{ animationDelay: "-3s" }}
      />

      <div className="surface-card animate-enter relative w-full max-w-xl overflow-hidden p-7 text-center sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200/35" />
          <Check size={36} strokeWidth={3} className="relative" />
        </div>

        <p className="eyebrow mt-7 justify-center">
          <Sparkles size={14} />
          Submission complete
        </p>
        <h1 className="page-title mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
          You’re all set.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
          Your response was submitted successfully and is now available to the
          form administrator.
        </p>

        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
            <FileCheck2 size={20} />
          </div>
          <div>
            <p className="text-sm font-extrabold text-emerald-900">
              Response received
            </p>
            <p className="mt-0.5 text-xs text-emerald-700">
              No further action is required.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/forms")}
          className="btn-primary mt-8 w-full py-3.5"
        >
          Browse more forms
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
