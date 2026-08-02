// 📄 src/components/Layout/AdminLayout.jsx
import { useState } from "react";
import { Layout, Menu, Button, message, Avatar, Drawer } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
  YoutubeOutlined,
  AppstoreAddOutlined,
  VideoCameraAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";

const { Header, Sider, Content } = Layout;

// 🌟 Configured item paths matching exact structural architecture
const menuSections = [
  {
    title: null,
    items: [
      {
        key: "/admin/dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
      { key: "/admin/students", icon: <TeamOutlined />, label: "Students" },
      {
        key: "/admin/batches",
        icon: <AppstoreAddOutlined />,
        label: "Add Batch",
      },
      {
        key: "/admin/notifications",
        icon: <BellOutlined />,
        label: "Notifications",
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        key: "/admin/videos",
        icon: <YoutubeOutlined style={{ color: "#ff0000" }} />,
        label: "Video Access",
      },
      {
        key: "/admin/meetings",
        icon: <VideoCameraAddOutlined />,
        label: "Live Meetings",
      },
      {
        key: "/admin/demo-classes",
        icon: <VideoCameraOutlined />,
        label: "Demo Classes",
      },
      { key: "/admin/courses", icon: <BookOutlined />, label: "Courses" },
      { key: "/admin/subjects", icon: <AppstoreOutlined />, label: "Subjects" },
      {
        key: "/admin/live-classes",
        icon: <VideoCameraOutlined />,
        label: "Live Classes",
      },
      {
        key: "/admin/recorded-lectures",
        icon: <PlayCircleOutlined />,
        label: "Recorded Lectures",
      },
      {
        key: "/admin/study-materials",
        icon: <FileTextOutlined />,
        label: "Study Materials",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        key: "/admin/support",
        icon: <QuestionCircleOutlined />,
        label: "Support",
      },
      {
        key: "/admin/privacy-policy",
        icon: <SafetyCertificateOutlined />,
        label: "Privacy Policy",
      },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 🚀 Read from both Cookie & LocalStorage safely
  const savedCookie = Cookies.get("adminUser");
  const savedLocal = localStorage.getItem("adminUser");
  const rawUserData = savedCookie || savedLocal;

  let userData = { name: "Admin", role: "SUPER_ADMIN" };

  if (rawUserData) {
    try {
      userData =
        typeof rawUserData === "string" && rawUserData.startsWith("{")
          ? JSON.parse(rawUserData)
          : { name: rawUserData, role: "SUPER_ADMIN" };
    } catch {
      userData = { name: "Admin", role: "SUPER_ADMIN" };
    }
  }

  // 🚀 BULLETPROOF LOGOUT HANDLER (Clears Cookies + LocalStorage + Hard Reload)
  const handleLogout = () => {
    // 1. Clear Cookies across paths
    Cookies.remove("adminUser", { path: "/" });
    Cookies.remove("token", { path: "/" });

    // 2. Clear LocalStorage & SessionStorage
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();

    message.info("Logged out successfully.");

    // 3. Hard Redirect to Admin Login to wipe out state completely
    window.location.href = "/admin/login";
  };

  const handleMenuClick = (e) => {
    navigate(e.key);
    setMobileDrawerOpen(false); // Mobile drawer auto-close on navigate
  };

  // Reusable Sidebar Nav Component
  const SidebarNav = (
    <nav
      className="py-4 px-3 overflow-y-auto h-full"
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
            selectedKeys={[location.pathname]}
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

      <div className="mt-5 pt-4 border-t border-gray-100 mb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-muted hover:text-brand-orange hover:bg-brand-paper/50 transition-all duration-200"
        >
          <LogoutOutlined />
          Logout
        </button>
      </div>
    </nav>
  );

  return (
    <Layout className="min-h-screen bg-white">
      {/* 🖥️ DESKTOP SIDEBAR */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={256}
        style={{ backgroundColor: "#ffffff" }}
        className="hidden lg:block border-r border-gray-200/80 shadow-sm"
      >
        <div className="w-full flex items-center justify-center p-4 bg-white border-b border-gray-100 h-24">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="w-[85%] max-h-[75px] object-contain cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          />
        </div>
        {SidebarNav}
      </Sider>

      {/* 📱 MOBILE SIDEBAR DRAWER */}
      <Drawer
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        bodyStyle={{ padding: 0 }}
        width={260}
        title={
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="Logo"
            className="h-10 object-contain cursor-pointer"
            onClick={() => {
              navigate("/admin/dashboard");
              setMobileDrawerOpen(false);
            }}
          />
        }
      >
        {SidebarNav}
      </Drawer>

      {/* MAIN CONTENT WRAPPER */}
      <Layout style={{ backgroundColor: "#ffffff" }}>
        {/* HEADER */}
        <Header
          className="px-4 sm:px-8 flex justify-between items-center bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-16"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Toggle Button */}
            <Button
              type="text"
              icon={<MenuOutlined className="text-lg" />}
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center p-2"
            />

            <h2 className="text-base sm:text-lg font-bold text-brand-ink m-0 flex items-center gap-2.5 tracking-tight">
              <span>Welcome, {userData.name}</span>
              <span className="text-[10px] font-bold bg-orange-50 text-brand-orange px-2.5 py-0.5 rounded-full border border-brand-orange/20 uppercase tracking-wider">
                {userData.role}
              </span>
            </h2>
          </div>

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
            >
              Logout
            </Button>
          </div>
        </Header>

        {/* 🚀 OUTLET BASED CONTENT LAYER SPECIFICATION */}
        <Content className="m-3 sm:m-6 bg-white">
          <Outlet />
        </Content>
      </Layout>

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
    </Layout>
  );
};

export default AdminLayout;
