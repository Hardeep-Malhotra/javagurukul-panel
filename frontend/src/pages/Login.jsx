import { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Global configuration : give order to the browser for carry cookies in every request
axios.defaults.withCredentials = true;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (!isOtpSent) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/admin-login",
          {
            email: values.email,
            password: values.password,
          },
        );

        if (response.data.success) {
          message.success(response.data.message);
          setUserEmail(values.email);
          setIsOtpSent(true);
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-otp",
          {
            email: userEmail,
            otp: values.otp,
          },
        );

        if (response.data.success) {
          message.success(response.data.message);

          localStorage.setItem("adminUser", JSON.stringify(response.data.user));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid Credentials!";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-paper p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100 transform transition-all">
        {/* Logo Image Wrapper */}
        <div className="flex justify-center items-center mb-2">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-50 w-auto object-contain border-b-4 border-brand-orange pb-2 "
          />
        </div>

        <Spin
          spinning={loading}
          tip={isOtpSent ? "Verifying OTP secure..." : "Sending OTP..."}
        >
          <Form
            form={form}
            name="admin_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            {/* Email Address Input */}
            <Form.Item
              name="email"
              label={
                <span className="text-brand-ink font-bold text-sm">
                  Email Address
                </span>
              }
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              {/* When OTP sent , this field disable */}
              <Input
                prefix={<UserOutlined className="text-brand-muted" />}
                placeholder="admin@javagurukul.com"
                className="h-11 rounded-lg border-gray-300 focus:border-brand-blue"
                disabled={isOtpSent}
              />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              name="password"
              label={
                <span className="text-brand-ink font-bold text-sm">
                  Password
                </span>
              }
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              {/* When OTP sent , this field disable*/}
              <Input.Password
                prefix={<LockOutlined className="text-brand-muted" />}
                placeholder="••••••••"
                className="h-11 rounded-lg border-gray-300 focus:border-brand-blue"
                disabled={isOtpSent}
              />
            </Form.Item>

            {/* 🔥 DYNAMIC OTP FIELD : When backend OTP send this box show  */}
            {isOtpSent && (
              <Form.Item
                name="otp"
                label={
                  <span className="text-brand-ink font-bold text-sm text-blue-600">
                    Enter 6-Digit Secure OTP
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter the OTP received on your email!",
                  },
                ]}
              >
                <Input
                  prefix={<SafetyOutlined className="text-blue-500" />}
                  placeholder="X X X X X X"
                  maxLength={6}
                  className="h-11 rounded-lg border-blue-300 focus:border-blue-500 text-center font-bold tracking-widest"
                />
              </Form.Item>
            )}

            {/* Dynamic Button Component */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-11 rounded-lg bg-brand-blue hover:bg-brand-blue-dark font-bold text-base shadow-md transition-all border-none"
                style={{ backgroundColor: "#2f8dae" }}
              >
                {/* Change button text when otp sent */}
                {isOtpSent ? "Verify OTP & Login" : "Sign In to Panel"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>

        {/* Footer text */}
        <div className="text-center mt-4">
          <span className="text-xs text-brand-muted">
            Protected under secure RBAC framework.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
