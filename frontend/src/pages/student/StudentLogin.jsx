// 📄 frontend/src/pages/student/StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../../services/studentService";
import { useStudentAuth } from "../../context/StudentAuthContext";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useStudentAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginStudent(email, password);
      if (data.success) {
        // Auth Context ke login method ko trigger karo data global store karne ke liye
        login(data.student);
        navigate("/student/portal");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Server unreachable.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9] px-4">
      <div className="max-w-md w-full bg-white border border-[#eef2f5] rounded-2xl shadow-xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#14212a] via-[#fb991d] to-[#17647e]"></div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#14212a] tracking-tight">
              Java<span className="text-[#fb991d]">Gurukul</span>
            </h2>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
              Student Core Gateway
            </p>
          </div>

          <h3 className="text-xl font-extrabold text-[#14212a] text-center mb-6">
            Welcome Back, Learner! 🎉
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#14212a] uppercase tracking-wider mb-2">
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fb991d] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14212a] uppercase tracking-wider mb-2">
                Password (Phone Number)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fb991d] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fb991d] hover:bg-[#e08512] text-white py-3.5 font-bold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none disabled:opacity-50 mt-2"
            >
              {loading
                ? "Verifying Credentials..."
                : "Access Student Portal 🚀"}
            </button>
          </form>

          <div className="mt-6 border-t border-dashed border-gray-200 pt-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              🔒 <b>Security Verification Prompt:</b> Default passwords map
              exactly to your onboarding mobile number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
