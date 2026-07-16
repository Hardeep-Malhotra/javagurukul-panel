import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import Cookies from "js-cookie";

import { createMeetingAPI } from "../../services/meetingService";
import { fetchAllBatchesAPI } from "../../services/studentService";

const CreateMeetingModal = ({ open, onClose, onRefresh }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);

  // ==========================================
  // Logged In Admin
  // ==========================================

  const savedUser = Cookies.get("adminUser");

  const userData = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "",
      };

  // ==========================================
  // Load All Batches
  // ==========================================

  const loadBatches = async () => {
    try {
      const response = await fetchAllBatchesAPI();

      if (response.success) {
        setBatches(response.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to load batches.");
    }
  };

  // ==========================================
  // Open Modal
  // ==========================================

  useEffect(() => {
    if (open) {
      loadBatches();

      form.setFieldsValue({
        teacherName: userData.name,
      });
    }
  }, [open]);

  // ==========================================
  // Batch Change
  // ==========================================

  const handleBatchChange = (batchName) => {
    const currentTitle = form.getFieldValue("title");

    if (!currentTitle || currentTitle.trim() === "") {
      form.setFieldsValue({
        title: `Live Class - ${batchName}`,
      });
    }
  };

  // ==========================================
  // Create Meeting
  // ==========================================

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await createMeetingAPI(values);

      if (response.success) {
        message.success(response.message);

        form.resetFields();

        onClose();

        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message || "Failed to create meeting."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Live Meeting"
      open={open}
      footer={null}
      centered
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Meeting Title */}

        <Form.Item
          label="Meeting Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter meeting title.",
            },
          ]}
        >
          <Input placeholder="JavaScript Live Class" />
        </Form.Item>

        {/* Batch */}

        <Form.Item
          label="Batch"
          name="batch"
          rules={[
            {
              required: true,
              message: "Please select a batch.",
            },
          ]}
        >
          <Select
            placeholder="Select Batch"
            showSearch
            optionFilterProp="children"
            onChange={handleBatchChange}
          >
            {batches.map((batch) => (
              <Select.Option
                key={batch._id}
                value={batch.batchName}
              >
                {batch.batchName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Teacher Name */}

        <Form.Item
          label="Teacher Name"
          name="teacherName"
          rules={[
            {
              required: true,
              message: "Teacher name is required.",
            },
          ]}
        >
          <Input
            
            placeholder="Teacher Name"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="bg-[#fb991d]"
        >
          Create Meeting
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateMeetingModal;