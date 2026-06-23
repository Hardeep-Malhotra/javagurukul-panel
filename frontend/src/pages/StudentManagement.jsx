import React, { useState, useEffect } from "react";
import { Input, Tabs, Table, Button, message, Modal } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import AddStudentModal from "../components/Students/AddStudentModal";
import EnrollStudentModal from "../components/Students/EnrollStudentModal";
import {
  getStudentsByTab,
  unenrollStudent,
  updateStudentStatus,
  deleteStudent,
} from "../services/studentService";
import { getStudentColumns } from "../utils/studentTableColumns";

// Small reusable box that shows one number with a label below it.

const StatCard = ({ value, label }) => (
  <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-6 text-center">
    <p className="text-3xl font-black text-brand-ink mb-1">{value}</p>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

const StudentManagement = () => {
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("registered");

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const [studentToEnroll, setStudentToEnroll] = useState(null);

  const [studentData, setStudentData] = useState({
    enrolled: [],
    unenrolled: [],
    registered: [],
    temporary: [],
  });

  // True while we are waiting for data from the server (shows a loading spinner)
  const [loading, setLoading] = useState(false);

  const fetchTabData = React.useCallback(
    async (tabKey, isStale = () => false) => {
      try {
        await Promise.resolve();
        if (isStale()) return;

        // Show the loading spinner while we wait for the server
        setLoading(true);

        // Ask the backend for this tab's students
        const res = await getStudentsByTab(tabKey);

        // If the user already switched tabs while we were waiting,
        // throw away this result — it's no longer needed.
        if (isStale()) return;

        if (res && res.success) {
          setStudentData((prev) => ({
            ...prev,
            // If res.data is missing for any reason, fall back to an
            // empty array so the app never crashes trying to read
            // ".length" or ".map" on "undefined".
            [tabKey]: res.data ?? [],
          }));
        }
      } catch (err) {
        if (isStale()) return;
        console.log(err);

        message.error(`Failed to load ${tabKey} data`);
      } finally {
        // Hide the loading spinner, but only if this request is still relevant
        if (!isStale()) setLoading(false);
      }
    },
    [],
  );

  // This runs automatically every time "activeTab" changes
  // (i.e. whenever the admin clicks a different tab).
  // It loads fresh data for whichever tab is now active.
  useEffect(() => {
    // "cancelled" is a flag we flip to true if the tab changes again
    // (or the page closes) before the fetch finishes. fetchTabData
    // checks this flag and skips updating state if it's true — this
    // avoids showing outdated data from a slow/old request.
    let cancelled = false;

    // Note: a linter rule complains here that we are "calling setState
    // inside an effect". This is a false alarm — fetchTabData only
    // updates state AFTER an await, never immediately. So it's safe
    // to silence this specific warning.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTabData(activeTab, () => cancelled);

    return () => {
      cancelled = true;
    };
  }, [activeTab, fetchTabData]);

  const handleUnenroll = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to unenroll this student?",
      content:
        "This will move the student records to historical unenroll logs.",
      okText: "Yes, Unenroll",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await unenrollStudent(id);
          if (res.success) {
            message.warning("Student archived safely! 📄");
            // Refresh the current tab so the unenrolled student disappears from it
            fetchTabData(activeTab);
          }
        } catch (err) {
          console.log(err);

          message.error("Could not unenroll the student");
        }
      },
    });
  };

  const handleEnrollClick = (student) => {
    setStudentToEnroll(student);
    setEnrollModalOpen(true);
  };

  const handleEnrollSuccess = () => {
    fetchTabData("registered");
    fetchTabData("unenrolled");
    fetchTabData("enrolled");
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await updateStudentStatus(id, newStatus);
      if (res.success) {
        message.success(`Status updated to ${newStatus}`);
        // Only need to refresh the tab we're currently looking at
        fetchTabData(activeTab);
      }
    } catch (err) {
      console.log(err);
      message.error("Status update nahi ho paaya");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Delete this student permanently?",
      content:
        "This action cannot be undone. The student record will be completely removed from the database.",
      okText: "Yes, Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteStudent(id);
          if (res.success) {
            message.success("Student deleted successfully");
            // Refresh the current tab so the deleted student disappears
            fetchTabData(activeTab);
          } else {
            message.error(res.message || "Could not delete the student");
          }
        } catch (err) {
          console.log(err);
          message.error("Could not delete the student");
        }
      },
    });
  };

  const columns = getStudentColumns(
    activeTab,
    handleUnenroll,
    handleEnrollClick,
    handleStatusToggle,
    handleDelete,
  );

  const filterData = (data) =>
    (data || []).filter(
      (s) =>
        s.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchText.toLowerCase()),
    );

  const tabItems = ["enrolled", "unenrolled", "registered", "temporary"].map(
    (key) => ({
      key,
      label: `${key.charAt(0).toUpperCase() + key.slice(1)} Students`,
      children: (
        <Table
          columns={columns}
          dataSource={filterData(studentData[key])}
          pagination={{ pageSize: 10 }}
          loading={loading}
          rowKey="_id"
        />
      ),
    }),
  );

  return (
    <div>
      {/* Page header: title on the left, "Add Student" button on the right */}
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

      {/* 4 stat cards showing live counts for each category */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          value={
            (studentData.enrolled?.length || 0) +
            (studentData.registered?.length || 0) +
            (studentData.unenrolled?.length || 0)
          }
          label="Total Students"
        />
        <StatCard value={studentData.enrolled?.length || 0} label="Enrolled" />
        <StatCard
          value={studentData.unenrolled?.length || 0}
          label="Unenrolled"
        />
        <StatCard
          value={studentData.registered?.length || 0}
          label="Registered"
        />
      </div>

      {/* Search box — typing here filters whichever tab is currently open */}
      <Input
        placeholder="Search students by name or email..."
        prefix={<SearchOutlined className="text-gray-400" />}
        size="large"
        className="mb-6 max-w-md rounded-lg"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Tabs section — shows the table for whichever tab is selected */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-50 p-5">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems}
        />
      </div>

      {/* Popup for adding a brand-new student (goes into "Registered" tab) */}
      <AddStudentModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchTabData(activeTab)}
      />

      {/* Popup for enrolling / re-enrolling a student into a course */}
      <EnrollStudentModal
        visible={enrollModalOpen}
        student={studentToEnroll}
        onClose={() => setEnrollModalOpen(false)}
        onSuccess={handleEnrollSuccess}
      />
    </div>
  );
};

export default StudentManagement;
