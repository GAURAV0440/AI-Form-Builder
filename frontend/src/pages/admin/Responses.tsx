import { useEffect, useState } from "react";
import {
  CalendarClock,
  ClipboardList,
  Eye,
  FileJson,
  Hash,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

interface ResponseItem {
  id: number;
  form_id: string;
  response_data: Record<string, unknown>;
  submitted_at: string;
}

export default function Responses() {
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [selected, setSelected] = useState<ResponseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const res = await api.get("/responses/");
        setResponses(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load responses");
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, []);

  async function deleteResponse(responseId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this response?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/responses/${responseId}`);
      setResponses((prev) => prev.filter((item) => item.id !== responseId));
      setSelected((prev) => (prev?.id === responseId ? null : prev));
      toast.success("Response deleted");
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete response");
    }
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="animate-enter">
          <p className="eyebrow">
            <ClipboardList size={14} />
            Submission inbox
          </p>
          <h1 className="page-title mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
            Responses
          </h1>
          <p className="mt-3 text-slate-500">
            Review and manage the data submitted through your forms.
          </p>
        </div>

        <div
          className={`mt-8 grid items-start gap-6 ${
            selected ? "xl:grid-cols-[1.25fr_.75fr]" : ""
          }`}
        >
          <section className="surface-card animate-enter-delay min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="font-extrabold text-slate-900">All submissions</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {responses.length} response{responses.length === 1 ? "" : "s"} received
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="bg-slate-50/80 text-left">
                    <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      ID
                    </th>
                    <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Form ID
                    </th>
                    <th className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Submitted
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
                          Loading responses...
                        </p>
                      </td>
                    </tr>
                  ) : responses.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <FileJson size={25} />
                        </div>
                        <p className="mt-4 font-extrabold text-slate-800">
                          No responses yet
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          New submissions will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    responses.map((item) => (
                      <tr
                        key={item.id}
                        className={`transition hover:bg-indigo-50/35 ${
                          selected?.id === item.id ? "bg-indigo-50/60" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 font-extrabold text-slate-800">
                            <Hash size={15} className="text-slate-400" />
                            {item.id}
                          </span>
                        </td>
                        <td className="max-w-[250px] px-6 py-4">
                          <span className="block truncate font-mono text-xs font-semibold text-slate-600">
                            {item.form_id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <CalendarClock size={16} className="text-slate-400" />
                            {new Date(item.submitted_at).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelected(item)}
                              className="icon-button bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              aria-label={`View response ${item.id}`}
                              title="View response"
                            >
                              <Eye size={17} />
                            </button>
                            <button
                              onClick={() => deleteResponse(item.id)}
                              className="icon-button bg-rose-50 text-rose-600 hover:bg-rose-100"
                              aria-label={`Delete response ${item.id}`}
                              title="Delete response"
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

          {selected && (
            <aside className="surface-card animate-enter overflow-hidden xl:sticky xl:top-24">
              <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                    Response #{selected.id}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Submitted data
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="icon-button bg-slate-100 text-slate-500 hover:bg-slate-200"
                  aria-label="Close response details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[calc(100vh-13rem)] space-y-4 overflow-y-auto p-6">
                {Object.entries(selected.response_data).length === 0 ? (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                    This response contains no submitted fields.
                  </p>
                ) : (
                  Object.entries(selected.response_data).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        {key}
                      </p>
                      <div className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm font-semibold text-slate-700">
                        {String(value)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
