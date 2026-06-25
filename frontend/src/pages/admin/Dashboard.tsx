import {
  ClipboardList,
  Eye,
  FileText,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="flex items-center justify-between bg-white px-8 py-5 shadow">

        <h1 className="text-2xl font-bold">
          AI Form Builder
        </h1>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              admin@example.com
            </p>
          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl p-8">

        <h2 className="mb-8 text-4xl font-bold">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex justify-between">

              <div>

                <p>Total Forms</p>

                <h2 className="text-5xl font-bold">
                  0
                </h2>

              </div>

              <FileText
                size={45}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex justify-between">

              <div>

                <p>Responses</p>

                <h2 className="text-5xl font-bold">
                  0
                </h2>

              </div>

              <ClipboardList
                size={45}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-6 text-xl font-semibold">
            Quick Actions
          </h3>

          <div className="flex gap-5">

            <button
              onClick={() =>
                navigate("/admin/create-form")
              }
              className="rounded-lg bg-blue-600 px-6 py-3 text-white flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Create Form
            </button>

            <button
              onClick={() =>
                navigate("/admin/forms")
              }
              className="rounded-lg border px-6 py-3 flex items-center gap-2"
            >
              <Eye size={20} />
              View Forms
            </button>

            <button
              onClick={() =>
                navigate("/admin/responses")
              }
              className="rounded-lg border px-6 py-3 flex items-center gap-2"
            >
              <ClipboardList size={20} />
              Responses
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}