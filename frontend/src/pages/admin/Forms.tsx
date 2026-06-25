import { useEffect, useState } from "react";
import {
  CalendarDays,
  Eye,
  FilePlus2,
  FileText,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";

interface Form {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function Forms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/forms/");
      setForms(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialForms = async () => {
      try {
        const res = await api.get("/forms/");
        setForms(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load forms");
      } finally {
        setLoading(false);
      }
    };

    loadInitialForms();
  }, []);

  const deleteForm = async (id: string) => {
    const ok = window.confirm("Delete this form?");
    if (!ok) return;

    try {
      await api.delete(`/forms/${id}`);
      toast.success("Form deleted");
      fetchForms();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="animate-enter flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">
              <FileText size={14} />
              Form library
            </p>
            <h1 className="page-title mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
              Your forms
            </h1>
            <p className="mt-3 text-slate-500">
              Create, preview, and manage every form from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchForms}
              disabled={loading}
              className="btn-secondary px-4 py-3"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => navigate("/admin/create-form")}
              className="btn-primary px-4 py-3"
            >
              <Plus size={18} />
              Create form
            </button>
          </div>
        </div>

        <section className="surface-card animate-enter-delay mt-8 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div>
              <p className="font-extrabold text-slate-900">All forms</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {forms.length} form{forms.length === 1 ? "" : "s"} in this workspace
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-slate-50/80 text-left">
                  <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Form
                  </th>
                  <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Created
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="mx-auto spinner" />
                      <p className="mt-3 text-sm font-semibold text-slate-500">
                        Loading your forms...
                      </p>
                    </td>
                  </tr>
                ) : forms.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <FilePlus2 size={25} />
                      </div>
                      <p className="mt-4 font-extrabold text-slate-800">
                        No forms yet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Create your first form to get started.
                      </p>
                    </td>
                  </tr>
                ) : (
                  forms.map((form) => (
                    <tr
                      key={form.id}
                      className="group transition hover:bg-indigo-50/35"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-850">
                              {form.title}
                            </p>
                            <p className="mt-0.5 max-w-sm truncate text-sm text-slate-500">
                              {form.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold capitalize text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {form.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                          <CalendarDays size={16} className="text-slate-400" />
                          {new Date(form.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/form/${form.id}`)}
                            className="icon-button bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                            aria-label={`Preview ${form.title}`}
                            title="Preview form"
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            onClick={() => deleteForm(form.id)}
                            className="icon-button bg-rose-50 text-rose-600 hover:bg-rose-100"
                            aria-label={`Delete ${form.title}`}
                            title="Delete form"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
