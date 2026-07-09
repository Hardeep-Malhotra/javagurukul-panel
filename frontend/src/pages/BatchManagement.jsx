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
} from "antd";
import { createBatchAPI, fetchAllBatchesAPI } from "../services/studentService";

const BatchManagement = () => {
  const [form] = Form.useForm();
  const [batches, setBatches] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Database se live batches list kheenchna
  const loadBatches = async () => {
    try {
      const res = await fetchAllBatchesAPI();
      if (res.success) {
        setBatches(res.data);
      }
    } catch (err) {
      console.log(err);

      message.error("Failed to load batch registries from ecosystem.");
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  // Form submit submit engine
  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      const res = await createBatchAPI(values);
      if (res.success) {
        message.success(res.message || "Batch added successfully!");
        form.resetFields();
        loadBatches(); // Table pipeline dynamic reload
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || "Error deploying new batch metadata.",
      );
    } finally {
      setSubmitting(false);
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
            color={isFull ? "red" : "green"}
            className="font-bold border-0 px-3 py-0.5 rounded-full"
          >
            {isFull ? "BATCH FULL" : status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* ➕ Left Pillar: Add Batch Card Form */}
      <Card
        title={
          <span className="text-[#14212a] font-black text-base">
            ➕ Create New Academic Batch
          </span>
        }
        className="shadow-sm border-[#eef2f5] rounded-2xl h-fit"
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

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            className="w-full h-11 bg-[#14212a] hover:bg-[#fb991d] text-white font-extrabold rounded-xl border-0 shadow-sm transition-all mt-2"
          >
            Deploy Course Batch Matrix
          </Button>
        </Form>
      </Card>

      {/* 📂 Right Pillar: Real-time Registry Table Grid */}
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
            className="custom-admin-table"
          />
        </Card>
      </div>
    </div>
  );
};

export default BatchManagement;
