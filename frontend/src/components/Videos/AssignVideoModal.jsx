// 📄 frontend/src/components/Students/AssignVideoModal.jsx
import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Spin } from "antd";
import { YoutubeOutlined, BookOutlined } from "@ant-design/icons";
import {
  assignVideoToBatch,
  getLiveBatchCounts,
} from "../../pages/services/videoService";

const { Option } = Select;

const AssignVideoModal = ({ isOpen, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const [fetchingBatches, setFetchingBatches] = useState(false);

  // 🌟 Fetch batches with count when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchBatches = async () => {
        setFetchingBatches(true);
        try {
          const res = await getLiveBatchCounts();
          if (res.success) {
            setBatches(res.data);
          }
        } catch (error) {
          console.log(error);

          message.error("Failed to load batch student counts.");
        } finally {
          setFetchingBatches(false);
        }
      };
      fetchBatches();
    }
  }, [isOpen]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await assignVideoToBatch(values);
      if (response.success) {
        message.success(response.message || "Video Assigned Successfully!");
        form.resetFields();
        onClose();
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <YoutubeOutlined className="text-red-500" />
          <span>Manual Lecture Deployment</span>
        </div>
      }
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Assign & Notify Students"
      cancelText="Cancel"
      okButtonProps={{
        style: { backgroundColor: "#fb991d", borderColor: "#fb991d" },
      }}
    >
      <Spin spinning={fetchingBatches} tip="Loading Active Batches...">
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={handleSubmit}
        >
          {/* Title Input */}
          <Form.Item
            name="title"
            label={
              <span className="font-semibold text-gray-700">Lecture Title</span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the lecture topic title",
              },
            ]}
          >
            <Input
              placeholder="e.g., Introduction to Java Loops"
              prefix={<BookOutlined className="text-gray-400" />}
            />
          </Form.Item>

          {/* Video URL Input */}
          <Form.Item
            name="videoUrl"
            label={
              <span className="font-semibold text-gray-700">
                YouTube Video URL
              </span>
            }
            rules={[
              {
                required: true,
                type: "url",
                message: "Please enter a valid YouTube Link",
              },
            ]}
          >
            <Input
              placeholder="e.g., https://www.youtube.com/watch?v=..."
              prefix={<YoutubeOutlined className="text-gray-400" />}
            />
          </Form.Item>

          {/* Dynamic Batch Dropdown */}
          <Form.Item
            name="batchName"
            label={
              <span className="font-semibold text-gray-700">
                Select Target Batch
              </span>
            }
            rules={[
              { required: true, message: "Please select a target batch" },
            ]}
          >
            <Select placeholder="Choose target batch for deployment">
              {batches.map((b) => (
                <Option key={b.batchName} value={b.batchName}>
                  {b.batchName} Batch ({b.count}{" "}
                  {b.count === 1 ? "Student" : "Students"})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AssignVideoModal;
