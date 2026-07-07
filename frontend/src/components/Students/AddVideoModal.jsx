import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import {
  VideoCameraOutlined,
  FileTextOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { addVideoToLibrary } from "../../services/videoService";

const { TextArea } = Input;

const AddVideoModal = ({ isOpen, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // YouTube Video ID Extract
      let thumbnailUrl = "";
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;

      const match = values.videoUrl.match(regExp);

      if (match && match[2].length === 11) {
        thumbnailUrl = `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
      }

      const payload = {
        title: values.title,
        description: values.description,
        videoUrl: values.videoUrl,
        thumbnailUrl,
      };

      const response = await addVideoToLibrary(payload);

      if (response.success) {
        message.success(response.message || "Video added successfully!");
        form.resetFields();

        if (onRefresh) onRefresh();
        onClose();
      }
    } catch (error) {
      message.error(error.message || "Failed to add video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold">
          <VideoCameraOutlined className="text-[#fb991d]" />
          Add New Lecture
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
        style: {
          backgroundColor: "#fb991d",
          borderColor: "#fb991d",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Lecture Title"
          rules={[
            {
              required: true,
              message: "Please enter lecture title",
            },
          ]}
        >
          <Input
            prefix={<VideoCameraOutlined />}
            placeholder="Node.js Authentication"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Brief description of this lecture..."
          />
        </Form.Item>

        <Form.Item
          name="videoUrl"
          label="YouTube Video URL"
          rules={[
            {
              required: true,
              message: "Please enter YouTube URL",
            },
            {
              type: "url",
              message: "Please enter valid URL",
            },
          ]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </Form.Item>

        <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-500">
          📌 Thumbnail will be automatically generated from the YouTube video.
        </div>
      </Form>
    </Modal>
  );
};

export default AddVideoModal;
