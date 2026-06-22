// 📄 src/components/Login/ForgotPasswordModal.jsx
import { useState, useRef } from "react";
import { Modal, Form, Input, Button, message, Steps } from "antd";
import axios from "axios";

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // 🔥 Ref variable immediate update hota hai aur component render hone par data lose nahi karta
  const otpRef = useRef("");
  const [form] = Form.useForm();

  // 1️⃣ Step 1: Send Reset OTP
  const handleSendOtp = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password/send-otp",
        { email: values.email },
      );
      message.success(response.data.message || "OTP sent to your email!");
      setEmail(values.email);
      setCurrentStep(1);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to send OTP!");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Step 2: Verify Reset OTP
  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password/verify-otp",
        {
          email: email,
          otp: values.otp,
        },
      );
      message.success(
        response.data.message || "OTP Verified! Set new password.",
      );

      // 🔥 Ref me value instantly bina kisi delay ke store ho jayegi
      otpRef.current = values.otp;
      setCurrentStep(2);
    } catch (error) {
      message.error(error.response?.data?.message || "Invalid or Expired OTP!");
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Step 3: Reset to New Password
  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      // Direct otpRef.current bhej rahe hain jo bina kisi state delay ke solid data dega
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password/reset",
        {
          email: email,
          otp: otpRef.current,
          newPassword: values.newPassword,
        },
      );
      message.success(
        response.data.message || "Password updated successfully!",
      );
      handleModalClose();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to reset password!",
      );
    } finally {
      setLoading(false);
    }
  };

  // Cleanup states when modal closes
  const handleModalClose = () => {
    form.resetFields();
    setCurrentStep(0);
    setEmail("");
    otpRef.current = "";
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-gray-800">
          Reset Admin Password
        </span>
      }
      open={visible}
      onCancel={handleModalClose}
      footer={null}
      destroyOnClose
      centered
    >
      {/* Steps Indicator */}
      <Steps
        current={currentStep}
        size="small"
        className="my-6"
        items={[
          { title: "Email" },
          { title: "Verify" },
          { title: "New Password" },
        ]}
      />

      {/* SCREEN 1: Enter Email */}
      {currentStep === 0 && (
        <Form form={form} onFinish={handleSendOtp} layout="vertical">
          <Form.Item
            name="email"
            label="Registered Email Address"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              placeholder="Enter admin email"
              className="h-11 rounded-lg"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="h-11 rounded-lg bg-[#2f8dae] border-none font-bold"
          >
            Send Reset OTP
          </Button>
        </Form>
      )}

      {/* SCREEN 2: Enter OTP */}
      {currentStep === 1 && (
        <Form form={form} onFinish={handleVerifyOtp} layout="vertical">
          <Form.Item
            name="otp"
            label="6-Digit Verification Code"
            rules={[
              {
                required: true,
                len: 6,
                message: "Please enter the 6-digit OTP!",
              },
            ]}
          >
            <Input
              placeholder="Enter OTP code"
              maxLength={6}
              className="h-11 rounded-lg text-center tracking-widest font-bold text-lg"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="h-11 rounded-lg bg-[#2f8dae] border-none font-bold"
          >
            Verify OTP Code
          </Button>
        </Form>
      )}

      {/* SCREEN 3: Create New Password */}
      {currentStep === 2 && (
        <Form form={form} onFinish={handleResetPassword} layout="vertical">
          <Form.Item
            name="newPassword"
            label="Create New Password"
            rules={[
              {
                required: true,
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new secure password"
              className="h-11 rounded-lg"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="h-11 rounded-lg bg-orange-500 border-none font-bold"
          >
            Update & Reset Password
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
