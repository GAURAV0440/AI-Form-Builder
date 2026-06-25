import { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  Trash2,
  RefreshCw,
  Plus,
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

      const token = localStorage.getItem("token");

      const res = await api.get("/forms/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForms(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const deleteForm = async (id: string) => {
    const ok = window.confirm("Delete this form?");

    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/forms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Form deleted");

      fetchForms();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Forms
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all created forms
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={fetchForms}
              className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 hover:bg-gray-50"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              onClick={() =>
                navigate("/admin/create-form")
              }
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Create Form
            </button>

          </div>

        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-200">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={4}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : forms.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="p-10 text-center text-gray-500"
                  >
                    No forms found.
                  </td>

                </tr>

              ) : (

                forms.map((form) => (

                  <tr
                    key={form.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <FileText
                          size={20}
                          className="text-blue-600"
                        />

                        <div>

                          <p className="font-semibold">
                            {form.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            {form.description || "No description"}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        {form.status}
                      </span>

                    </td>

                    <td className="p-4">
                      {new Date(
                        form.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(`/form/${form.id}`)
                          }
                          className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteForm(form.id)
                          }
                          className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}