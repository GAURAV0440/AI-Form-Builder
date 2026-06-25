import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      toast.success("Login Successful");

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            AI Form Builder
          </h1>

          <p className="mt-2 text-gray-500">
            Admin Login
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label>Email</label>

            <div className="flex items-center rounded-lg border px-3">

              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                className="w-full p-3 outline-none"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>
          </div>

          <div>
            <label>Password</label>

            <div className="flex items-center rounded-lg border px-3">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type="password"
                className="w-full p-3 outline-none"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>
          </div>

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            <LogIn size={18} />

            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}