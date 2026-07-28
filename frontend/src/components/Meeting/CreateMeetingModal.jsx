import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
} from "antd";

import dayjs from "dayjs";
import Cookies from "js-cookie";

import { createMeetingAPI } from "../../services/meetingService";
import { fetchAllBatchesAPI } from "../../services/studentService";

const CreateMeetingModal = ({ open, onClose, onRefresh }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);

  // ==========================
  // Logged In Admin
  // ==========================

  const savedUser = Cookies.get("adminUser");

  const userData = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "",
      };

  // ==========================
  // Load Batches
  // ==========================

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

  useEffect(() => {
    if (open) {
      loadBatches();

      form.setFieldsValue({
        teacherName: userData.name,
      });
    }
  }, [open]);

  // ==========================
  // Auto Fill Title
  // ==========================

  const handleBatchChange = (batchName) => {
    const currentTitle = form.getFieldValue("title");

    if (!currentTitle || currentTitle.trim() === "") {
      form.setFieldsValue({
        title: `Live Class - ${batchName}`,
      });
    }
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        scheduledAt: values.scheduledAt.toISOString(),
      };

      const response = await createMeetingAPI(payload);

      if (response.success) {
        message.success("Live Class Scheduled Successfully.");

        form.resetFields();

        onClose();

        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message ||
          "Failed to schedule live class."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Schedule Live Class"
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
        {/* Live Class Title */}

        <Form.Item
          label="Live Class Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter live class title.",
            },
          ]}
        >
          <Input placeholder="React Hooks Masterclass" />
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

        {/* Teacher */}

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
          <Input placeholder="Teacher Name" />
        </Form.Item>

        {/* Zoom Meeting Link */}

        <Form.Item
          label="Zoom Meeting Link"
          name="zoomMeetingLink"
          rules={[
            {
              required: true,
              message: "Please enter Zoom Meeting Link.",
            },
            {
              type: "url",
              message: "Please enter a valid Zoom Meeting Link.",
            },
          ]}
        >
          <Input placeholder="https://zoom.us/j/1234567890" />
        </Form.Item>

        {/* Schedule */}

        <Form.Item
          label="Class Date & Time"
          name="scheduledAt"
          rules={[
            {
              required: true,
              message: "Please select class date & time.",
            },
          ]}
        >
          <DatePicker
            showTime
            className="w-full"
            format="DD-MM-YYYY HH:mm"
            placeholder="Select Date & Time"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="bg-[#fb991d] border-none"
        >
          Schedule Live Class
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateMeetingModal;