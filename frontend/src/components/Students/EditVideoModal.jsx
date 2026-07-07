import { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { editVideoDetails } from "../../services/videoService";

const EditVideoModal = ({ isOpen, onClose, videoData, onRefresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && videoData) {
      form.setFieldsValue({
        title: videoData.title,
        thumbnailUrl: videoData.thumbnailUrl,
        description: videoData.description,
      });
    }
  }, [isOpen, videoData, form]);

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await editVideoDetails(videoData._id, values);
      if (response.success) {
        message.success(response.message || "Changes saved!");
        onClose();
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      message.error(error.message || "Failed to update video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <EditOutlined className="text-[#fb991d]" />
          <span>Edit Video Details</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Save Changes"
      cancelText="Cancel"
      okButtonProps={{
        style: { backgroundColor: "#fb991d", borderColor: "#fb991d" },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        className="mt-4"
      >
        <Form.Item
          name="title"
          label="Video Title"
          rules={[{ required: true, message: "Please enter the video title" }]}
        >
          <Input placeholder="Enter title name" />
        </Form.Item>
        <Form.Item name="thumbnailUrl" label="Custom Thumbnail URL (Optional)">
          <Input placeholder="Leave blank to use default YouTube thumbnail" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Enter video details..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVideoModal;
