import { Layout, Menu, Button, message, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  // UserOutlined,
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
  ReadOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Header, Sider, Content } = Layout;

// ---- Dummy data (replace with API data later) ----
const enrollmentData = [
  { month: "Jan", students: 0 },
  { month: "Feb", students: 0 },
  { month: "Mar", students: 0 },
  { month: "Apr", students: 1 },
  { month: "May", students: 12 },
  { month: "Jun", students: 4 },
  { month: "Jul", students: 0 },
  { month: "Aug", students: 0 },
  { month: "Sep", students: 0 },
  { month: "Oct", students: 0 },
  { month: "Nov", students: 0 },
  { month: "Dec", students: 0 },
];

const courseEngagementData = [
  { subject: "Java Core", engagement: 85 },
  { subject: "DSA", engagement: 70 },
  { subject: "React", engagement: 64 },
  { subject: "Spring Boot", engagement: 57 },
  { subject: "SQL", engagement: 44 },
];

const recentEnrollments = [
  {
    key: "1",
    student: "Jitt Preet",
    email: "preetsingh812@gmail.com",
    joined: "Jun 21, 2026",
    status: "Active",
  },
  {
    key: "2",
    student: "Esther Lalmalsawmi",
    email: "pachuauesther102@gmail.com",
    joined: "Jun 20, 2026",
    status: "Active",
  },
  {
    key: "3",
    student: "Amrit Pal",
    email: "officeamrit22@gmail.com",
    joined: "Jun 17, 2026",
    status: "Active",
  },
];

const recentLectures = [
  {
    key: "1",
    lecture: "Java Collections Deep Dive",
    subject: "Java Core",
    duration: "45 min",
    uploaded: "Mar 10, 2026",
  },
  {
    key: "2",
    lecture: "Binary Search Trees",
    subject: "DSA",
    duration: "38 min",
    uploaded: "Mar 9, 2026",
  },
  {
    key: "3",
    lecture: "React Hooks Overview",
    subject: "React",
    duration: "52 min",
    uploaded: "Mar 8, 2026",
  },
];

// ---- Reusable Stat Card ----
const StatCard = ({ title, value, icon, note, noteColor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5 flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
      <p className="text-3xl font-black text-brand-ink mb-1">{value}</p>
      <p className={`text-xs font-semibold ${noteColor}`}>{note}</p>
    </div>
    <div className="h-11 w-11 rounded-lg bg-brand-orange flex items-center justify-center text-white text-lg shadow-md">
      {icon}
    </div>
  </div>
);

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

  const enrollmentColumns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (t) => <span className="font-semibold text-brand-ink">{t}</span>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Joined", dataIndex: "joined", key: "joined" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="green">{status}</Tag>,
    },
  ];

  const lectureColumns = [
    {
      title: "Lecture",
      dataIndex: "lecture",
      key: "lecture",
      render: (t) => <span className="font-semibold text-brand-ink">{t}</span>,
    },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Uploaded", dataIndex: "uploaded", key: "uploaded" },
  ];

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
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#14212a" }}
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

        {/* Main Content */}
        <Content className="m-6">
          <h1 className="text-2xl font-black text-brand-ink mb-1">Dashboard</h1>
          <p className="text-gray-500 mb-6">Welcome back, {userData.name}</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Students"
              value="4"
              icon={<TeamOutlined />}
              note="+4 students"
              noteColor="text-green-600"
            />
            <StatCard
              title="Active Courses"
              value="1"
              icon={<ReadOutlined />}
              note="No new courses"
              noteColor="text-gray-400"
            />
            <StatCard
              title="Upcoming Live Classes"
              value="0"
              icon={<VideoCameraOutlined />}
              note="No upcoming"
              noteColor="text-red-500"
            />
            <StatCard
              title="Total Lectures"
              value="10"
              icon={<PlayCircleOutlined />}
              note="No new"
              noteColor="text-green-600"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
              <h3 className="font-black text-brand-ink mb-4">
                Student Enrollments (Monthly)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#fb991d"
                    fill="#fb991d"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
              <h3 className="font-black text-brand-ink mb-4">
                Course Engagement
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={courseEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="engagement"
                    fill="#14212a"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
              <h3 className="font-black text-brand-ink mb-4">
                Recent Student Enrollments
              </h3>
              <Table
                columns={enrollmentColumns}
                dataSource={recentEnrollments}
                pagination={false}
                size="small"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
              <h3 className="font-black text-brand-ink mb-4">
                Recent Uploaded Lectures
              </h3>
              <Table
                columns={lectureColumns}
                dataSource={recentLectures}
                pagination={false}
                size="small"
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
