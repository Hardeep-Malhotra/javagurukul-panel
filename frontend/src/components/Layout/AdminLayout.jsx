// 📄 src/components/Layout/AdminLayout.jsx
import { Layout, Menu, Button, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom"; // 👈 useLocation hata diya hai
import {
  DashboardOutlined,
  BellOutlined,
  VideoCameraOutlined,
  BookOutlined,
  AppstoreOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Cookies from "js-cookie";
import Dashboard from "../../pages/Dashboard";
import StudentManagement from "../../pages/StudentManagement";

const { Header, Sider, Content } = Layout;

const menuSections = [
  {
    title: null,
    items: [
      { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
      { key: "2", icon: <TeamOutlined />, label: "Students" },
      { key: "3", icon: <BellOutlined />, label: "Notifications" },
    ],
  },
  {
    title: "Learning",
    items: [
      { key: "4", icon: <VideoCameraOutlined />, label: "Demo Classes" },
      { key: "5", icon: <BookOutlined />, label: "Courses" },
      { key: "6", icon: <AppstoreOutlined />, label: "Subjects" },
      { key: "7", icon: <VideoCameraOutlined />, label: "Live Classes" },
      { key: "8", icon: <PlayCircleOutlined />, label: "Recorded Lectures" },
      { key: "9", icon: <FileTextOutlined />, label: "Study Materials" },
    ],
  },
  {
    title: "Account",
    items: [
      { key: "10", icon: <QuestionCircleOutlined />, label: "Support" },
      {
        key: "11",
        icon: <SafetyCertificateOutlined />,
        label: "Privacy Policy",
      },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("1");

  // 🚀 Cookies shift check done
  const savedUser = Cookies.get("adminUser");
  const userData = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "Admin",
        role: "SUPER_ADMIN",
      };

  const handleLogout = () => {
    Cookies.remove("adminUser"); // Clear cookies safely
    message.info("Logged out successfully.");
    navigate("/");
  };

  const handleMenuClick = (e) => {
    setKey(e.key);
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar - Clean White Background */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={256}
        style={{ backgroundColor: "#ffffff" }}
        className="border-r border-gray-200/80 shadow-sm"
      >
        {/* Top-Left Big Logo Container */}
        <div className="w-full flex items-center justify-center p-4 bg-white border-b border-gray-100 h-24">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="w-[85%] h-100 max-h-[75px] object-contain cursor-pointer"
            onClick={() => setKey("1")}
          />
        </div>

        {/* Navigation Area */}
        <nav
          className="py-4 px-3 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 90px)" }}
        >
          {menuSections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "mt-5" : ""}>
              {section.title && (
                <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-brand-muted/70">
                  {section.title}
                </p>
              )}
              <Menu
                mode="inline"
                selectable
                selectedKeys={[key]} // Directly tracked by current state key
                onClick={handleMenuClick}
                style={{ backgroundColor: "transparent", border: "none" }}
                items={section.items.map((item) => ({
                  key: item.key,
                  icon: item.icon,
                  label: item.label,
                }))}
                className="custom-admin-menu"
              />
            </div>
          ))}

          {/* Logout Section in Sidebar */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-muted hover:text-brand-orange hover:bg-brand-paper/50 transition-all duration-200"
            >
              <LogoutOutlined />
              Logout
            </button>
          </div>
        </nav>

        {/* Scoped Custom Styles */}
        <style>{`
          .custom-admin-menu.ant-menu { background: transparent; }
          .custom-admin-menu .ant-menu-item { margin: 4px 0 !important; border-radius: 8px; color: #14212a !important; font-weight: 500; font-size: 14px; transition: all 0.2s ease; }
          .custom-admin-menu .ant-menu-item .anticon { color: #5d6971 !important; }
          .custom-admin-menu .ant-menu-item:hover { color: #fb991d !important; background-color: #fffaf3 !important; }
          .custom-admin-menu .ant-menu-item:hover .anticon { color: #fb991d !important; }
          .custom-admin-menu .ant-menu-item-selected { background-color: #fffaf3 !important; color: #fb991d !important; font-weight: 600; }
          .custom-admin-menu .ant-menu-item-selected .anticon { color: #fb991d !important; }
          .custom-admin-menu .ant-menu-item-selected::after { border-right: 3px solid #fb991d !important; }
        `}</style>
      </Sider>

      {/* Main Layout Area */}
      <Layout style={{ backgroundColor: "#fffaf3" }}>
        <Header
          className="px-8 flex justify-between items-center bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-16"
          style={{ backgroundColor: "#ffffff", padding: "0 32px" }}
        >
          {/* Left Side: Welcome Greeting */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-brand-ink m-0 flex items-center gap-2.5 tracking-tight">
              Welcome, <span>{userData.name}</span>
              <span className="text-[10px] font-bold bg-orange-50 text-brand-orange px-2.5 py-0.5 rounded-full border border-brand-orange/20 uppercase tracking-wider">
                {userData.role}
              </span>
            </h2>
          </div>

          {/* Right Side: Profile Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 py-1 pr-1 border-r border-gray-100 hidden sm:flex">
              <Avatar
                size={36}
                icon={<UserOutlined />}
                className="border border-gray-200"
                style={{ backgroundColor: "#ffffff", color: "#14212a" }}
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-brand-ink leading-tight">
                  {userData.name}
                </span>
                <span className="text-[10px] text-brand-muted">
                  Admin Account
                </span>
              </div>
            </div>

            <Button
              type="default"
              icon={<LogoutOutlined className="text-xs" />}
              onClick={handleLogout}
              className="rounded-lg font-bold text-xs px-4 h-9 border border-gray-200 text-brand-ink bg-white transition-all duration-200 flex items-center gap-2"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fb991d";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#fb991d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#14212a";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              Logout
            </Button>
          </div>
        </Header>

        {/* Core Content Route Area */}
        <Content className="m-6">
          {key === "1" ? (
            <Dashboard />
          ) : key === "2" ? (
            <StudentManagement />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center font-medium text-gray-500">
              Coming Soon... Component for Key {key} is under development.
            </div>
          )}{" "}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
