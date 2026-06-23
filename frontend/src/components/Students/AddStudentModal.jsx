// 📄 src/components/Students/AddStudentModal.jsx
import { useState } from "react";
import { Modal, Form, Input, Select, Button, message, Spin } from "antd"; // 👈 Spin component import kiya
import {
  addStudent,
  checkEmailAvailability,
} from "../../services/studentService";

const { Option } = Select;

const AddStudentModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await addStudent(values);

      if (res.success) {
        message.success("Student added successfully!");
        form.resetFields();
        onSuccess?.();
        onClose();
      } else {
        message.error(res.message || "Failed to add student. Try again!");
      }
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message || "Failed to add student. Try again!",
      );
    } finally {
      setSubmitting(false);
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
        if (!submitting) {
          form.resetFields();
          onClose();
        }
      }}
      footer={null}
      destroyOnClose
      centered
      closable={!submitting}
      maskClosable={!submitting}
    >
      {/* 🚀 MAGIC SPIN WRAPPER: Yeh poore form ke upar ek top-class professional overlay loader chalayega */}
      <Spin
        spinning={submitting}
        tip={
          <span className="font-bold mt-2 block" style={{ color: "#fb991d" }}>
            Student Adding in Progress...
          </span>
        }
        size="large"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="mt-4"
          disabled={submitting}
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
            hasFeedback
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email address" },
              {
                validator: async (_, value) => {
                  if (!value || !value.includes("@")) {
                    return Promise.resolve();
                  }
                  try {
                    const res = await checkEmailAvailability(value);
                    if (res.exists) {
                      return Promise.reject(
                        new Error(
                          "This email is already registered with another student!",
                        ),
                      );
                    }
                    return Promise.resolve();
                  } catch (err) {
                    console.log(err);
                    return Promise.reject(
                      new Error(
                        "Unable to verify email status. Please try again.",
                      ),
                    );
                  }
                },
              },
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
            initialValue="Active"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select size="large">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
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
      </Spin>
    </Modal>
  );
};

export default AddStudentModal;
