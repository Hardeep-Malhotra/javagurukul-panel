import { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

import { createMeetingAPI } from "../../services/meetingService";

const { Option } = Select;

const CreateMeetingModal = ({ open, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // ==========================
  // Create Meeting
  // ==========================
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await createMeetingAPI(values);

      if (response.success) {
        message.success(response.message);

        form.resetFields();

        onClose();

        onRefresh();
      }
    } catch (error) {
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
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      centered
      destroyOnClose
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
              message: "Please select batch.",
            },
          ]}
        >
          <Input placeholder="JULY JAVASCRIPT 2026" />
        </Form.Item>

        {/* Teacher */}
        <Form.Item
          label="Teacher Name"
          name="teacherName"
          rules={[
            {
              required: true,
              message: "Please enter teacher name.",
            },
          ]}
        >
          <Input placeholder="Hardeep Singh" />
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