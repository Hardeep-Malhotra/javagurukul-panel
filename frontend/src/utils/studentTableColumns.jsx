// 📄 src/utils/studentTableColumns.jsx
import { Tag, Button, Avatar, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const getStudentColumns = (
  activeTab,
  handleUnenroll,
  handleEnrollClick,
  handleStatusToggle,
  handleDelete,
) => [
  {
    title: "Student",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <div className="flex items-start gap-3">
        <Avatar style={{ backgroundColor: "#14212a" }} className="font-bold">
          {name
            ? name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "ST"}
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
        <p className="text-xs text-gray-400 mb-1">Course:</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {record.enrollmentDetails?.courseName ? (
            <Tag color="blue">{record.enrollmentDetails.courseName}</Tag>
          ) : (
            <span className="text-xs text-gray-400">No course mapped yet</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-1">Subjects:</p>
        <div className="flex flex-wrap gap-1">
          {record.enrollmentDetails?.subjects &&
          record.enrollmentDetails.subjects.length > 0 ? (
            record.enrollmentDetails.subjects.map((s) => (
              <Tag color="cyan" key={s}>
                {s}
              </Tag>
            ))
          ) : (
            <span className="text-xs text-gray-400">None</span>
          )}
        </div>
      </div>
    ),
  },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Batch", dataIndex: "batch", key: "batch" },
  {
    title: "Joined",
    dataIndex: "createdAt",
    key: "joined",
    render: (date) =>
      date ? new Date(date).toLocaleDateString("en-IN") : "N/A",
  },
  {
    // ✅ Status ab sirf ek read-only Tag nahi hai — ek live toggle hai.
    // Yeh category (Registered/Enrolled/Unenrolled) ko BILKUL touch nahi karta,
    // sirf account Active/Inactive flag flip karta hai (jaisa docs me likha hai).
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => (
      <Switch
        checked={status === "Active"}
        checkedChildren="Active"
        unCheckedChildren="Inactive"
        onChange={(checked) =>
          handleStatusToggle(record._id, checked ? "Active" : "Inactive")
        }
      />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex flex-col gap-2 items-center">
        {/* ✅ Registered tab: course/subject assign karke Enrolled me move karne ka button */}
        {activeTab === "registered" && (
          <Button
            size="small"
            type="primary"
            style={{ backgroundColor: "#fb991d", border: "none" }}
            onClick={() => handleEnrollClick(record)}
          >
            Enroll
          </Button>
        )}

        {/* ✅ Enrolled tab: wapas Unenrolled me bhejne ka button */}
        {activeTab === "enrolled" && (
          <Button
            size="small"
            danger
            onClick={() => handleUnenroll(record._id)}
          >
            Unenroll
          </Button>
        )}

        {/* ✅ Unenrolled tab: wapas Enrolled me bhejne ka button — same
            EnrollStudentModal reuse hota hai, jo purana course/subjects
            prefill kar dega (admin chahe to change kar sakta hai) */}
        {activeTab === "unenrolled" && (
          <Button
            size="small"
            type="primary"
            style={{ backgroundColor: "#fb991d", border: "none" }}
            onClick={() => handleEnrollClick(record)}
          >
            Re-enroll
          </Button>
        )}

        {/* Temporary tab ke liye abhi koi action nahi — docs me
            "Pending — sir se confirm karna hai" likha hai. */}

        {/* ✅ Delete button — Registered, Enrolled, aur Unenrolled
            teeno tabs me dikhega. Ye PERMANENT delete hai — student
            database se hamesha ke liye hata diya jaayega. */}
        {(activeTab === "registered" ||
          activeTab === "enrolled" ||
          activeTab === "unenrolled") && (
          <Button
            size="small"
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        )}
      </div>
    ),
  },
];
