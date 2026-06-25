import { useEffect, useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
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

export default function UserForms() {
  const navigate = useNavigate();

  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForms();
  }, []);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Loading Forms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        <h1 className="mb-2 text-4xl font-bold">
          Available Forms
        </h1>

        <p className="mb-8 text-gray-500">
          Choose a form and let AI fill it from your document.
        </p>

        {forms.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            No forms available.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {forms.map((form) => (

              <div
                key={form.id}
                className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
              >

                <div className="mb-4 flex items-center gap-3">

                  <FileText
                    className="text-blue-600"
                    size={30}
                  />

                  <div>

                    <h2 className="text-xl font-semibold">
                      {form.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {form.status}
                    </p>

                  </div>

                </div>

                <p className="mb-6 text-gray-600">
                  {form.description || "No description"}
                </p>

                <button
                  onClick={() =>
                    navigate(`/form/${form.id}`)
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                >
                  Apply Now

                  <ArrowRight size={18} />
                </button>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}