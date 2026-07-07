// 📄 frontend/src/components/Students/AssignBatchModal.jsx
import { useState, useEffect } from "react";
import { Modal, Form, Select, message, Spin } from "antd";
import { TeamOutlined, YoutubeOutlined } from "@ant-design/icons";
import {
  getLiveBatchCounts,
  assignVideoToBatch,
} from "../../services/videoService";

const AssignBatchModal = ({
  isOpen,
  onClose,
  videoData, // Pura video object
  onRefresh,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const [fetchingBatches, setFetchingBatches] = useState(false);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      const fetchBatchData = async () => {
        setFetchingBatches(true);
        try {
          const response = await getLiveBatchCounts();
          if (response.success) {
            setBatches(response.data);
          }
        } catch (error) {
          console.log(error);
          message.error("Failed to load active batch counts.");
        } finally {
          setFetchingBatches(false);
        }
      };
      fetchBatchData();
    }
  }, [isOpen, form]);

  const handleSubmit = async (values) => {
    // 🛡️ Safe Check: Agar videoData load hone se pehle submit ho jaye toh stop karein
    if (!videoData) {
      message.error(
        "Video target details not found. Please try reopening the modal.",
      );
      return;
    }

    setLoading(true);
    try {
      // 🌟 FIXED: Backend controllers ki fields mapping ke exact keys ko full check aur fallbacks ke sath bhej rahe hain
      const payload = {
        videoUrl:
          videoData.videoUrl ||
          videoData.url ||
          `https://www.youtube.com/watch?v=${videoData.youtubeVideoId}`,
        title: videoData.title,
        thumbnailUrl: videoData.thumbnailUrl || "",
        batchName: values.batchName,
      };

      console.log("Sending payload to backend:", payload); // 🔍 Debugging ke liye browser console me check karne ke liye

      const response = await assignVideoToBatch(payload);
      if (response.success) {
        message.success(response.message || `Video assigned successfully!`);
        form.resetFields();
        onClose();
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      // 🛡️ Error safely string extract karne ke liye
      message.error(error.message || error || "Failed to assign video.");
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = batches.map((b) => {
    const rawBatch = b.batchName || b._id;
    const actualBatchName = Array.isArray(rawBatch) ? rawBatch[0] : rawBatch;
    return {
      value: actualBatchName,
      label: `${actualBatchName} Batch (${b.count} ${b.count === 1 ? "Active Student" : "Active Students"})`,
    };
  });

  return (
    <Modal
      title={
        <div className="flex flex-col text-gray-800">
          <div className="flex items-center gap-2 text-lg font-bold">
            <TeamOutlined className="text-[#fb991d]" />
            <span>Assign Lecture to Batch</span>
          </div>
          <span className="text-xs text-gray-400 font-normal mt-1">
            Target Video:{" "}
            <span className="font-semibold text-gray-600">
              {videoData?.title}
            </span>
          </span>
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
        className: "hover:bg-[#e08516]",
      }}
    >
      <Spin
        spinning={fetchingBatches}
        description="Fetching active batch counts..."
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-5"
        >
          <Form.Item
            name="batchName"
            label={
              <span className="font-semibold text-gray-700">
                Select Target Batch
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please select a batch to deploy this lecture",
              },
            ]}
          >
            <Select
              placeholder="Choose course batch sequence"
              suffixIcon={<YoutubeOutlined className="text-gray-400" />}
              options={selectOptions}
              onChange={(value) => form.setFieldsValue({ batchName: value })}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AssignBatchModal;
