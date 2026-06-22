// 📄 src/pages/StudentManagement.jsx
import { useState } from "react";
import { Input, Tabs, Table, Tag, Button, Avatar } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddStudentModal from "../components/Students/AddStudentModal";

// ---- Student data (will be populated from API once backend is connected) ----
const enrolledStudents = [];

const unenrolledStudents = [];
const registeredStudents = [];
const temporaryStudents = [];

// ---- Reusable Stat Card ----
const StatCard = ({ value, label }) => (
  <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-6 text-center">
    <p className="text-3xl font-black text-brand-ink mb-1">{value}</p>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

const StudentManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-start gap-3">
          <Avatar style={{ backgroundColor: "#14212a" }} className="font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </Avatar>
          <div>
            <p className="font-semibold text-brand-ink m-0">{name}</p>
            <p className="text-xs text-gray-400 m-0">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Course Info",
      key: "courseInfo",
      render: (_, record) => (
        <div>
          <p className="text-xs text-gray-400 mb-1">Courses:</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {record.courses.map((c) => (
              <Tag color="blue" key={c}>
                {c}
              </Tag>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-1">Subjects:</p>
          <div className="flex flex-wrap gap-1">
            {record.subjects.map((s) => (
              <Tag color="cyan" key={s}>
                {s}
              </Tag>
            ))}
          </div>
        </div>
      ),
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Batch", dataIndex: "batch", key: "batch" },
    { title: "Joined", dataIndex: "joined", key: "joined" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    { title: "Temp", dataIndex: "temp", key: "temp" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="flex flex-col gap-2">
          <Button size="small">Unenroll</Button>
          <div className="flex gap-3 mt-1">
            <EditOutlined className="text-brand-blue cursor-pointer" />
            <DeleteOutlined className="text-red-500 cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  const filterData = (data) =>
    data.filter(
      (s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.email.toLowerCase().includes(searchText.toLowerCase()),
    );

  const tabItems = [
    {
      key: "enrolled",
      label: "Enrolled Students",
      children: (
        <Table
          columns={columns}
          dataSource={filterData(enrolledStudents)}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
    {
      key: "unenrolled",
      label: "Unenrolled Students",
      children: (
        <Table
          columns={columns}
          dataSource={filterData(unenrolledStudents)}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
    {
      key: "registered",
      label: "Registered Students",
      children: (
        <Table
          columns={columns}
          dataSource={filterData(registeredStudents)}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
    {
      key: "temporary",
      label: "Temporary Students",
      children: (
        <Table
          columns={columns}
          dataSource={filterData(temporaryStudents)}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-ink mb-1">
            Student Management
          </h1>
          <p className="text-gray-500">View and manage all students</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="font-bold border-none"
          style={{ backgroundColor: "#fb991d" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard value={17} label="Total Students" />
        <StatCard value={14} label="Enrolled" />
        <StatCard value={0} label="Unenrolled" />
        <StatCard value={3} label="Registered" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard value={0} label="Temp" />
      </div>

      {/* Search Bar */}
      <Input
        placeholder="Search students by name or email..."
        prefix={<SearchOutlined className="text-gray-400" />}
        size="large"
        className="mb-6 max-w-md rounded-lg"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Tabs + Table */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
        <Tabs defaultActiveKey="enrolled" items={tabItems} />
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // TODO: refetch student list from API once backend is connected
        }}
      />
    </div>
  );
};

export default StudentManagement;
