// 📄 frontend/src/components/StudentPortal/StudentNavbar.jsx

import { useStudentAuth } from "../../context/StudentAuthContext";

const StudentNavbar = () => {
  const { student, logout } = useStudentAuth();

  return (
    <header className="bg-white border-b border-[#eef2f5] px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-black text-[#14212a] tracking-tight">
          Java<span className="text-[#fb991d]">Gurukul</span>
        </h1>
        <span className="bg-[#fb991d]/10 text-[#fb991d] text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider border border-[#fb991d]/20">
          {student?.batch || "No Batch"}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-extrabold text-[#14212a]">
            {student?.name}
          </p>
          <p className="text-xs text-gray-400 font-medium">{student?.email}</p>
        </div>

        {/* User Profile Initial Badge */}
        <div className="w-10 h-10 bg-[#14212a] text-[#fb991d] rounded-full flex items-center justify-center font-black border-2 border-[#fb991d]">
          {student?.name ? student.name.charAt(0).toUpperCase() : "S"}
        </div>

        <button
          onClick={logout}
          className="text-gray-400 hover:text-red-500 text-sm font-bold transition-colors pl-2"
        >
          Logout 🚪
        </button>
      </div>
    </header>
  );
};

export default StudentNavbar;
