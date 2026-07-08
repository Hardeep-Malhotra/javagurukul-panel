// 📄 frontend/src/components/StudentPortal/StudentSidebar.jsx

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "lectures", label: "Video Lectures", icon: "🎥" },
    { id: "material", label: "Study Material", icon: "📚" },
    { id: "notices", label: "Announcements", icon: "📢" },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#14212a] text-gray-300 flex flex-col border-r border-gray-800 md:min-h-[calc(100vh-73px)]">
      <div className="p-4 border-b border-gray-800 bg-[#0f1920]">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          Main Ecosystem Workspace
        </p>
      </div>

      <nav className="p-3 flex-1 space-y-1 flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#fb991d] text-white shadow-md shadow-[#fb991d]/20"
                  : "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 text-[11px] text-gray-500 hidden md:block">
        &copy; {new Date().getFullYear()} JavaGurukul Engine.
      </div>
    </aside>
  );
};

export default StudentSidebar;
