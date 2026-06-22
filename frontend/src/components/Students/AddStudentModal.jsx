// 📄 src/components/Students/AddStudentModal.jsx
import { Modal, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const AddStudentModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // TODO: Replace with actual API call once backend route is ready
      // Example:
      // const response = await axios.post("http://localhost:5000/api/admin/students", values);

      console.log("Form values to send to backend:", values);

      message.success("Student added successfully!");
      form.resetFields();
      onSuccess?.(); // refresh student list after adding
      onClose();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to add student. Try again!",
      );
    }
  };

  return (
    <Modal
      title={
        <span className="text-lg font-black text-brand-ink">
          Add New Student
        </span>
      }
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="mt-4"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter student name" }]}
        >
          <Input placeholder="Enter full name" size="large" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input placeholder="student@example.com" size="large" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit phone number",
            },
          ]}
        >
          <Input placeholder="9876543210" size="large" maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input.TextArea
            placeholder="Enter full address"
            rows={2}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Batch"
          name="batch"
          rules={[{ required: true, message: "Please enter batch" }]}
        >
          <Input placeholder="e.g. Batch 2026-A" size="large" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="active"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select size="large">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item className="mt-6 mb-0">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="font-bold border-none"
            style={{ backgroundColor: "#fb991d" }}
          >
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStudentModal;
