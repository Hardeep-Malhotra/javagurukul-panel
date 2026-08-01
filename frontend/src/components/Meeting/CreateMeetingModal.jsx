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

import {
  createMeetingAPI,
  updateMeetingAPI,
} from "../../services/meetingService";
import { fetchAllBatchesAPI } from "../../services/studentService";

const CreateMeetingModal = ({ open, onClose, onRefresh, editingMeeting }) => {
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

      if (editingMeeting) {
        // Edit Mode: Populate values
        form.setFieldsValue({
          title: editingMeeting.title,
          batch: editingMeeting.batch,
          teacherName: editingMeeting.teacherName,
          zoomMeetingLink: editingMeeting.zoomMeetingLink,
          zoomMeetingId: editingMeeting.zoomMeetingId,
          zoomPasscode: editingMeeting.zoomPasscode,
          scheduledAt: dayjs(editingMeeting.scheduledAt),
        });
      } else {
        // Create Mode: Reset form & auto-set teacher
        form.resetFields();
        form.setFieldsValue({
          teacherName: userData.name,
        });
      }
    }
  }, [open, editingMeeting]);

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
  // Submit (Create or Update)
  // ==========================
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        scheduledAt: values.scheduledAt.toISOString(),
      };

      console.log("Submitting Payload:", payload);

      let response;

      if (editingMeeting) {
        response = await updateMeetingAPI(editingMeeting._id, payload);
      } else {
        response = await createMeetingAPI(payload);
      }

      if (response.success) {
        message.success(
          editingMeeting
            ? "Live Class Updated Successfully."
            : "Live Class Scheduled Successfully."
        );

        form.resetFields();
        onClose();

        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error("Backend Error Details:", error.response?.data);

      message.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save live class."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editingMeeting ? "Edit Live Class" : "Schedule Live Class"}
      open={open}
      footer={null}
      centered
      destroyOnHidden
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
              <Select.Option key={batch._id} value={batch.batchName}>
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
              message: "Please enter a valid Zoom Meeting Link (must start with https://).",
            },
          ]}
        >
          <Input placeholder="https://zoom.us/j/1234567890" />
        </Form.Item>

        {/* Zoom Meeting ID */}
        <Form.Item
          label="Zoom Meeting ID"
          name="zoomMeetingId"
          rules={[
            {
              required: true,
              message: "Please enter Zoom Meeting ID.",
            },
          ]}
        >
          <Input placeholder="123 456 7890" />
        </Form.Item>

        {/* Zoom Passcode */}
        <Form.Item
          label="Zoom Passcode"
          name="zoomPasscode"
          rules={[
            {
              required: true,
              message: "Please enter Zoom Passcode.",
            },
          ]}
        >
          <Input.Password placeholder="Enter Zoom Passcode" />
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
          className="bg-[#fb991d] border-none font-medium"
        >
          {editingMeeting ? "Update Live Class" : "Schedule Live Class"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateMeetingModal;