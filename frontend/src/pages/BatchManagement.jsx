// 📄 frontend/src/pages/admin/BatchManagement.jsx
import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Table,
  Tag,
  message,
  Popconfirm,
  Space,
  Select,
  Switch,
} from "antd";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import {
  createBatchAPI,
  fetchAllBatchesAPI,
  updateBatchAPI,
  deleteBatchAPI,
} from "../services/studentService";

const { Option } = Select;

const BatchManagement = () => {
  const [form] = Form.useForm();
  const [batches, setBatches] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadBatches = async () => {
    try {
      const res = await fetchAllBatchesAPI();
      if (res.success) setBatches(res.data);
    } catch (err) {
      console.log(err);

      message.error("Failed to load batch registries from ecosystem.");
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      if (editingId) {
        const res = await updateBatchAPI(editingId, values);
        if (res.success) {
          message.success(res.message);
          cancelEdit();
          loadBatches();
        }
      } else {
        const res = await createBatchAPI(values);
        if (res.success) {
          message.success(res.message);
          form.resetFields();
          loadBatches();
        }
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || "Error processing data pipeline.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // 🌟 QUICK TOGGLE: Table ke andar se hi direct Status change karne ke liye
  const handleStatusToggle = async (checked, record) => {
    try {
      const updatedData = {
        batchName: record.batchName,
        capacity: record.capacity,
        status: checked ? "Active" : "Inactive",
      };
      const res = await updateBatchAPI(record._id, updatedData);
      if (res.success) {
        message.success(`Batch status marked as ${updatedData.status}!`);
        loadBatches(); // Reload live grid mapping
      }
    } catch (err) {
      console.log(err);

      message.error("Failed to toggle batch lifecycle status.");
    }
  };

  const startEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue({
      batchName: record.batchName,
      capacity: record.capacity,
      status: record.status || "Active",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBatchAPI(id);
      if (res.success) {
        message.success(res.message);
        loadBatches();
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to delete target batch asset.",
      );
    }
  };

  const columns = [
    {
      title: "Batch Name",
      dataIndex: "batchName",
      key: "batchName",
      render: (text) => (
        <span className="font-extrabold text-[#14212a]">{text}</span>
      ),
    },
    {
      title: "Utilization Status",
      key: "utilization",
      render: (_, record) => (
        <span className="font-semibold text-gray-600">
          {record.currentStudentsCount || 0} / {record.capacity} Students
        </span>
      ),
    },
    {
      title: "Status Badge",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const isFull = (record.currentStudentsCount || 0) >= record.capacity;
        return (
          <Tag
            color={isFull ? "red" : status === "Active" ? "green" : "gray"}
            className="font-bold border-0 px-3 py-0.5 rounded-full"
          >
            {isFull ? "BATCH FULL" : status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Quick Toggle",
      key: "toggleStatus",
      render: (_, record) => (
        // 🌟 LIVE SWITCH TOGGLE CONTROL
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={record.status === "Active"}
          onChange={(checked) => handleStatusToggle(checked, record)}
        />
      ),
    },
    {
      title: "Actions Operations",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined className="text-blue-600" />}
            onClick={() => startEdit(record)}
            disabled={submitting}
          />
          <Popconfirm
            title="Are you sure you want to delete this batch profile parameters?"
            description="This action cannot be reverted."
            onConfirm={() => handleDelete(record._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              disabled={submitting}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* ➕ Form Container Pillar */}
      <Card
        title={
          <span className="text-[#14212a] font-black text-base flex justify-between items-center">
            {editingId
              ? "✏️ Edit Academic Batch"
              : "➕ Create New Academic Batch"}
            {editingId && (
              <Button
                type="text"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={cancelEdit}
                size="small"
              />
            )}
          </span>
        }
        className={`shadow-sm border-[#eef2f5] rounded-2xl h-fit transition-all duration-300 ${editingId ? "border-blue-200 bg-blue-50/10" : ""}`}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="batchName"
            label={
              <span className="text-xs font-bold uppercase text-[#14212a]/70">
                Batch Identification Name
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input batch profile identity!",
              },
            ]}
          >
            <Input
              placeholder="e.g. JAVA JULY 2026"
              className="h-10 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="capacity"
            label={
              <span className="text-xs font-bold uppercase text-[#14212a]/70">
                Maximum Student Capacity Threshold
              </span>
            }
            rules={[{ required: true, message: "Please input numeric limit!" }]}
          >
            <InputNumber
              className="w-full h-10 rounded-xl flex items-center"
              min={1}
              placeholder="30"
            />
          </Form.Item>

          {editingId && (
            <Form.Item
              name="status"
              label={
                <span className="text-xs font-bold uppercase text-[#14212a]/70">
                  Batch Phase Status
                </span>
              }
              rules={[{ required: true }]}
            >
              <Select className="h-10 rounded-xl w-full">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            className={`w-full h-11 text-white font-extrabold rounded-xl border-0 shadow-sm transition-all mt-2 ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-[#14212a] hover:bg-[#fb991d]"}`}
          >
            {editingId ? "Update Batch Matrix" : "Deploy Course Batch Matrix"}
          </Button>
        </Form>
      </Card>

      {/* 📂 Active Registry Table Grid */}
      <div className="lg:col-span-2">
        <Card
          title={
            <span className="text-[#14212a] font-black text-base">
              📂 Active Course Batches Map
            </span>
          }
          className="shadow-sm border-[#eef2f5] rounded-2xl"
        >
          <Table
            dataSource={batches}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default BatchManagement;
