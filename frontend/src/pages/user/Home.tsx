import { ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-blue-700 py-8 text-center text-white shadow">

        <h1 className="text-5xl font-bold">
          AI Form Builder
        </h1>

        <p className="mt-3 text-lg">
          Dynamic Forms • AI Autofill • Document Extraction
        </p>

      </header>

      {/* Cards */}

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 p-16 lg:flex-row">

        {/* Admin */}

        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-blue-600"
              size={38}
            />

            <h2 className="text-3xl font-bold">
              Admin Panel
            </h2>

          </div>

          <ul className="mt-8 space-y-4 text-lg">

            <li>✓ Login</li>

            <li>✓ Dashboard</li>

            <li>✓ Create Dynamic Form</li>

            <li>✓ View Forms</li>

            <li>✓ View Responses</li>

          </ul>

          <button
            onClick={() => navigate("/admin/login")}
            className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Go To Admin
          </button>

        </div>

        {/* User */}

        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">

          <div className="flex items-center gap-3">

            <UserRound
              className="text-green-600"
              size={38}
            />

            <h2 className="text-3xl font-bold">
              User Panel
            </h2>

          </div>

          <ul className="mt-8 space-y-4 text-lg">

            <li>✓ Upload Document</li>

            <li>✓ AI Autofill</li>

            <li>✓ Review Form</li>

            <li>✓ Submit Form</li>

          </ul>

          <button
            onClick={() => navigate("/forms")}
            className="mt-10 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white hover:bg-green-700"
          >
            Go To User
          </button>

        </div>

      </div>

    </div>
  );
}