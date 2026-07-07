// 📄 frontend/src/components/Students/AddVideoModal.jsx
import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import {
  VideoCameraOutlined,
  FileTextOutlined,
  LinkOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { addVideoToLibrary } from "../../services/videoService";

const { TextArea } = Input;

const AddVideoModal = ({ isOpen, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await addVideoToLibrary(values);
      if (response.success) {
        message.success(response.message || "Video added to library!");
        form.resetFields();
        onClose();
        if (onRefresh) onRefresh(); // List refresh karne ke liye
      }
    } catch (error) {
      message.error(error.message || "Failed to add video to repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <VideoCameraOutlined className="text-[#fb991d]" />
          <span>Add New Video Lecture</span>
        </div>
      }
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Save Video"
      cancelText="Cancel"
      okButtonProps={{
        style: { backgroundColor: "#fb991d", borderColor: "#fb991d" },
        className: "hover:bg-[#e08516]",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        {/* Lecture Title */}
        <Form.Item
          name="title"
          label={
            <span className="font-semibold text-gray-700">Lecture Title</span>
          }
          rules={[
            { required: true, message: "Please enter the lecture title" },
          ]}
        >
          <Input
            placeholder="e.g., JWT Complete Course (Part 1)"
            prefix={<VideoCameraOutlined className="text-gray-400" />}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label={
            <span className="font-semibold text-gray-700">Description</span>
          }
          rules={[
            {
              required: true,
              message: "Please enter a short lecture description",
            },
          ]}
        >
          <TextArea
            rows={3}
            placeholder="Briefly describe what is covered in this lecture session..."
            prefix={<FileTextOutlined className="text-gray-400" />}
          />
        </Form.Item>

        {/* YouTube Video URL */}
        <Form.Item
          name="videoUrl"
          label={
            <span className="font-semibold text-gray-700">
              YouTube Video URL
            </span>
          }
          rules={[
            { required: true, message: "Please paste the YouTube URL" },
            { type: "url", message: "Please enter a valid URL link" },
          ]}
        >
          <Input
            placeholder="e.g., https://www.youtube.com/watch?v=..."
            prefix={<LinkOutlined className="text-gray-400" />}
          />
        </Form.Item>

        {/* Optional Thumbnail URL */}
        <Form.Item
          name="thumbnailUrl"
          label={
            <span className="font-semibold text-gray-700">
              Custom Thumbnail URL{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </span>
          }
        >
          <Input
            placeholder="Leave empty to auto-extract from YouTube link"
            prefix={<PictureOutlined className="text-gray-400" />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVideoModal;
