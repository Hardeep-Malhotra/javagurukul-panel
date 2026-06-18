import { Layout, Menu, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  //   LoadingOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("adminUser")) || {
    name: "Admin",
    role: "SUPER_ADMIN",
  };

  const handleLogout = () => {
    localStorage.clear();
    message.info("Logged out successfully.");
    navigate("/");
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar background ko brand-ink (dark tone) diya hai */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="shadow-xl"
        style={{ backgroundColor: "#14212a" }} // AntD Sider fallback to brand-ink
      >
        {/* Logo container me custom brand-orange background accent */}
        <div className="h-12 m-4 bg-brand-orange text-brand-ink flex items-center justify-center font-black text-base rounded-lg tracking-wider shadow-md">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-30 w-auto object-contain border-b-4 border-brand-orange pb-2 "
          />
        </div>

        {/* Sidebar Menu items */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#14212a" }}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined className="text-brand-orange" />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users (Onboarding)
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout background me brand-paper (creamy warm finish) use kiya hai */}
      <Layout className="bg-brand-paper">
        {/* Header wrapper */}
        <Header className="bg-white px-6 flex justify-between items-center border-b border-orange-100 shadow-sm">
          <div>
            {/* Heading me brand-ink code */}
            <h2 className="text-xl font-black text-brand-ink">
              Welcome, <span className="text-white">{userData.name}</span>
              {/* Badge labels matching the brand-blue scheme */}
              <span className="text-xs bg-orange-50 text-brand-orange px-2.5 py-1 rounded-full ml-2 border border-brand-orange/30 font-bold uppercase tracking-wider">
                {userData.role}
              </span>
            </h2>
          </div>

          {/* Logout Button styled perfectly with custom ink layout background */}
          <Button
            type="primary"
            // icon={<LoadingOutlined />}
            onClick={handleLogout}
            className="rounded-lg font-bold border-none transition-colors"
            style={{ backgroundColor: "#14212a", color: "#ffffff" }} // Custom brand-ink fallback for danger/action
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#fb991d")
            } // Orange on hover
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#14212a")
            }
          >
            Logout
          </Button>
        </Header>

        {/* Main Workspace Area */}
        <Content className="m-6 p-6 bg-white rounded-xl shadow-md border border-orange-50">
          <div className="border-2 border-dashed border-orange-100 rounded-xl p-8 text-center bg-brand-paper/40">
            <h3 className="text-xl font-black text-brand-ink mb-2">
              JavaGurukul Core System Live
            </h3>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
