// 📄 src/components/Layout/AdminLayout.jsx
import { Layout, Menu, Button, message } from "antd";
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
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

// Map each menu key to its route path
const menuRoutes = {
  1: "/dashboard",
  2: "/students",
  // Add more as more pages get built:
  // 3: "/notifications",
  // 4: "/demo-classes",
  // 5: "/courses",
  // ...
};

// Map each route path back to its menu key (for highlighting active item)
const routeToKey = {
  "/dashboard": "1",
  "/students": "2",
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = JSON.parse(localStorage.getItem("adminUser")) || {
    name: "Admin",
    role: "SUPER_ADMIN",
  };

  const handleLogout = () => {
    localStorage.clear();
    message.info("Logged out successfully.");
    navigate("/");
  };

  const handleMenuClick = (e) => {
    const path = menuRoutes[e.key];
    if (path) navigate(path);
  };

  // Figure out which menu item should be highlighted based on current URL
  const selectedKey = routeToKey[location.pathname] || "1";

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="shadow-xl"
        style={{ backgroundColor: "#14212a" }}
      >
        <div className="h-12 m-4 bg-brand-orange text-brand-ink flex items-center justify-center font-black text-base rounded-lg tracking-wider shadow-md">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-30 w-auto object-contain border-b-4 border-brand-orange pb-2"
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: "#14212a" }}
          onClick={handleMenuClick}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined className="text-brand-orange" />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Students
          </Menu.Item>
          <Menu.Item key="3" icon={<BellOutlined />}>
            Notifications
          </Menu.Item>
          <Menu.Item key="4" icon={<VideoCameraOutlined />}>
            Demo Classes
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            Subjects
          </Menu.Item>
          <Menu.Item key="7" icon={<VideoCameraOutlined />}>
            Live Classes
          </Menu.Item>
          <Menu.Item key="8" icon={<PlayCircleOutlined />}>
            Recorded Lectures
          </Menu.Item>
          <Menu.Item key="9" icon={<FileTextOutlined />}>
            Study Materials
          </Menu.Item>
          <Menu.Item key="10" icon={<QuestionCircleOutlined />}>
            Support
          </Menu.Item>
          <Menu.Item key="11" icon={<SafetyCertificateOutlined />}>
            Privacy Policy
          </Menu.Item>
          <Menu.Item key="12" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="bg-brand-paper">
        {/* Header */}
        <Header className="bg-white px-6 flex justify-between items-center border-b border-orange-100 shadow-sm">
          <div>
            <h2 className="text-xl font-black text-brand-ink">
              Welcome, <span className="text-brand-ink">{userData.name}</span>
              <span className="text-xs bg-orange-50 text-brand-orange px-2.5 py-1 rounded-full ml-2 border border-brand-orange/30 font-bold uppercase tracking-wider">
                {userData.role}
              </span>
            </h2>
          </div>

          <Button
            type="primary"
            onClick={handleLogout}
            className="rounded-lg font-bold border-none transition-colors"
            style={{ backgroundColor: "#14212a", color: "#ffffff" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#fb991d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#14212a")
            }
          >
            Logout
          </Button>
        </Header>

        {/* 🔥 This is where Dashboard / StudentManagement / etc. will render */}
        <Content className="m-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
