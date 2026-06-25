import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileSearch,
  FileText,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";
import Loader from "../../components/Loader";

interface Form {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function UserForms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForms = async () => {
      try {
        setLoading(true);
        const res = await api.get("/forms/");
        setForms(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load forms");
      } finally {
        setLoading(false);
      }
    };

    loadForms();
  }, []);

  if (loading) {
    return <Loader label="Finding available forms..." />;
  }

  return (
    <div className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="soft-orb right-[-4rem] top-16 h-64 w-64 bg-indigo-300/20" />
      <div className="mx-auto max-w-7xl">
        <div className="animate-enter max-w-3xl">
          <p className="eyebrow">
            <Sparkles size={14} />
            AI-assisted applications
          </p>
          <h1 className="page-title mt-3 text-4xl font-black text-slate-950 sm:text-6xl">
            Find the right form.
            <br />
            <span className="text-slate-400">Let AI handle the rest.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Choose a form, upload your document, and review the information
            extracted for you before submitting.
          </p>
        </div>

        {forms.length === 0 ? (
          <div className="surface-card animate-enter-delay mt-10 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FileSearch size={28} />
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-900">
              No forms available
            </h2>
            <p className="mt-2 text-slate-500">
              Please check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {forms.map((form, index) => (
              <article
                key={form.id}
                className="surface-card elevated-card animate-enter group flex flex-col overflow-hidden"
                style={{ animationDelay: `${Math.min(index * 70, 280)}ms` }}
              >
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:rotate-[-4deg] group-hover:scale-105">
                      <FileText size={23} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold capitalize text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {form.status}
                    </span>
                  </div>

                  <h2 className="page-title mt-6 text-2xl font-black text-slate-900">
                    {form.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-7 text-slate-500">
                    {form.description ||
                      "Complete this form quickly with optional AI-assisted document extraction."}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">
                    <CalendarDays size={15} />
                    Added {new Date(form.created_at).toLocaleDateString()}
                  </div>

                  <button
                    onClick={() => navigate(`/form/${form.id}`)}
                    className="btn-primary mt-5 w-full py-3.5"
                  >
                    Start application
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
